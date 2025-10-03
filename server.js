const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Store messages in memory (you can use a database later)
let messages = [];

// API endpoint to receive messages from the mod
app.post('/api/message', (req, res) => {
    const { playerName, type, message, server } = req.body;
    
    const newMessage = {
        id: Date.now(),
        playerName,
        type, // MOD_ACTIVE, JOIN, LEAVE, CHAT, CHAT_SENT, COMMAND
        message,
        server,
        timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);
    
    // Keep only last 1000 messages
    if (messages.length > 1000) {
        messages = messages.slice(-1000);
    }
    
    console.log('Received message:', newMessage);
    res.json({ success: true, message: 'Message received' });
});

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

// Clear messages endpoint (optional)
app.delete('/api/messages', (req, res) => {
    messages = [];
    res.json({ success: true, message: 'All messages cleared' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/message`);
});
