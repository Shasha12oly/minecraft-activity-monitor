require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Discord Bot Setup
const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ]
});

// Team member Discord IDs
const TEAM_MEMBERS = {
    'shashank': process.env.SHASHANK_DISCORD_ID,
    'sumit': process.env.SUMIT_DISCORD_ID,
    'enderboy': process.env.ENDERBOY_DISCORD_ID,
    'neon': process.env.NEON_DISCORD_ID
};

let discordStatuses = {};

// Discord bot login
discordClient.login(process.env.DISCORD_BOT_TOKEN).then(() => {
    console.log('Discord bot logged in!');
    updateDiscordStatuses();
    // Update statuses every 30 seconds
    setInterval(updateDiscordStatuses, 30000);
}).catch(err => {
    console.error('Discord bot login failed:', err);
});

async function updateDiscordStatuses() {
    try {
        const guild = await discordClient.guilds.fetch(process.env.DISCORD_GUILD_ID);
        
        for (const [name, userId] of Object.entries(TEAM_MEMBERS)) {
            try {
                const member = await guild.members.fetch(userId);
                const status = member.presence?.status || 'offline';
                discordStatuses[name] = status === 'online' || status === 'idle' || status === 'dnd' ? 'online' : 'offline';
            } catch (err) {
                discordStatuses[name] = 'offline';
            }
        }
        console.log('Discord statuses updated:', discordStatuses);
    } catch (err) {
        console.error('Error updating Discord statuses:', err);
    }
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Store messages in memory
let messages = [];

// Store active sessions for chat logs
let activeSessions = {};

// API endpoint to receive messages from the mod
app.post('/api/message', (req, res) => {
    const { playerName, type, message, server } = req.body;
    
    const newMessage = {
        id: Date.now(),
        playerName,
        type,
        message,
        server,
        timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);
    
    // Keep only last 1000 messages
    if (messages.length > 1000) {
        messages = messages.slice(-1000);
    }
    
    // Handle session logging
    if (type === 'JOIN') {
        activeSessions[playerName] = {
            server: server,
            startTime: new Date().toISOString(),
            messages: []
        };
    }
    
    // Add message to active session
    if (activeSessions[playerName]) {
        activeSessions[playerName].messages.push(newMessage);
    }
    
    // Handle session end
    if (type === 'LEAVE' && activeSessions[playerName]) {
        const session = activeSessions[playerName];
        session.endTime = new Date().toISOString();
        
        // Save session to file
        saveSessionLog(playerName, session);
        delete activeSessions[playerName];
    }
    
    console.log('Received message:', newMessage);
    res.json({ success: true, message: 'Message received' });
});

// Save session log to file
function saveSessionLog(playerName, session) {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }
    
    const timestamp = new Date(session.startTime).toISOString().replace(/:/g, '-').split('.')[0];
    const filename = `${playerName}_${timestamp}.txt`;
    const filepath = path.join(logsDir, filename);
    
    let logContent = `=== SHARMA GANG - Session Log ===\n`;
    logContent += `Player: ${playerName}\n`;
    logContent += `Server: ${session.server}\n`;
    logContent += `Start Time: ${session.startTime}\n`;
    logContent += `End Time: ${session.endTime}\n`;
    logContent += `Duration: ${calculateDuration(session.startTime, session.endTime)}\n`;
    logContent += `\n=== Messages ===\n\n`;
    
    session.messages.forEach(msg => {
        const time = new Date(msg.timestamp).toLocaleTimeString();
        logContent += `[${time}] [${msg.type}] ${msg.message || ''}\n`;
    });
    
    fs.writeFileSync(filepath, logContent);
    console.log(`Session log saved: ${filename}`);
}

function calculateDuration(start, end) {
    const diff = new Date(end) - new Date(start);
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
}

// API endpoint to get all messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// API endpoint to get messages by player
app.get('/api/messages/:playerName', (req, res) => {
    const playerMessages = messages.filter(m => m.playerName === req.params.playerName);
    res.json(playerMessages);
});

// API endpoint to get list of all players
app.get('/api/players', (req, res) => {
    const players = [...new Set(messages.map(m => m.playerName))];
    res.json(players);
});

// API endpoint to get Discord statuses
app.get('/api/discord-status', (req, res) => {
    res.json(discordStatuses);
});

// API endpoint to get Discord invite
app.get('/api/discord-invite', (req, res) => {
    res.json({ invite: process.env.DISCORD_INVITE });
});

// API endpoint to list available session logs
app.get('/api/logs', (req, res) => {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
        return res.json([]);
    }
    
    const files = fs.readdirSync(logsDir).filter(f => f.endsWith('.txt'));
    const logs = files.map(f => {
        const stats = fs.statSync(path.join(logsDir, f));
        return {
            filename: f,
            size: stats.size,
            created: stats.birthtime
        };
    });
    
    res.json(logs);
});

// API endpoint to download a session log
app.get('/api/logs/:filename', (req, res) => {
    const filepath = path.join(__dirname, 'logs', req.params.filename);
    if (fs.existsSync(filepath)) {
        res.download(filepath);
    } else {
        res.status(404).json({ error: 'Log file not found' });
    }
});

// Clear messages endpoint
app.delete('/api/messages', (req, res) => {
    messages = [];
    res.json({ success: true, message: 'All messages cleared' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/message`);
});
