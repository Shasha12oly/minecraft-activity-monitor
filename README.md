# Minecraft Activity Monitor Website

A beautiful web dashboard to monitor Minecraft player activities in real-time!

## Features

- 📊 **Real-time monitoring** - See all player activities as they happen
- 👥 **Player separation** - Each player has their own card with their messages
- 📈 **Statistics** - Track total players, messages, and who's online
- 🎨 **Beautiful UI** - Modern, responsive design with color-coded message types
- 🔄 **Auto-refresh** - Updates every 2 seconds automatically

## Setup Instructions

### 1. Install Node.js
Download and install Node.js from https://nodejs.org/ (if not already installed)

### 2. Install Dependencies
Open terminal/command prompt in the `website` folder and run:
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```

The server will start on http://localhost:3000

### 4. Open the Dashboard
Open your browser and go to:
```
http://localhost:3000
```

## Message Types

The dashboard displays different types of messages with color coding:

- 🟢 **MOD_ACTIVE** - When a player loads the mod (Green)
- 🔵 **JOIN** - When a player joins a server (Blue)
- 🟠 **LEAVE** - When a player leaves a server (Orange)
- 🟣 **CHAT** - Chat messages received (Purple)
- 🟣 **CHAT_SENT** - Chat messages sent by the player (Purple)
- 🔴 **COMMAND** - Commands executed by the player (Red)

## Features

### Player Cards
- Each player gets their own card showing:
  - Player avatar (first letter of name)
  - Online/Offline status
  - Current server
  - All their messages in chronological order

### Statistics Dashboard
- **Total Players** - Number of unique players
- **Total Messages** - All messages received
- **Online Now** - Players currently online

### Filters
- Filter by specific player or view all players
- Clear all messages button
- Manual refresh button

## API Endpoints

The server provides these API endpoints:

- `POST /api/message` - Receive messages from the mod
- `GET /api/messages` - Get all messages
- `GET /api/messages/:playerName` - Get messages for specific player
- `GET /api/players` - Get list of all players
- `DELETE /api/messages` - Clear all messages

## Customization

### Change Port
Edit `server.js` and change:
```javascript
const PORT = 3000; // Change to your desired port
```

### Change Auto-refresh Interval
Edit `public/index.html` and change:
```javascript
setInterval(refreshMessages, 2000); // Change 2000 to desired milliseconds
```

### Message Limit
The server keeps the last 1000 messages. To change this, edit `server.js`:
```javascript
if (messages.length > 1000) { // Change 1000 to desired limit
```

## Troubleshooting

**Messages not showing up?**
- Make sure the server is running (`npm start`)
- Check that the mod is built with the latest changes
- Verify the API URL in the mod matches your server (default: http://localhost:3000)

**Port already in use?**
- Change the PORT in `server.js` to a different number
- Update the API_URL in `WebsiteAPI.java` to match

## Production Deployment

To deploy this to a real server:

1. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js
   ```

2. Use a reverse proxy like Nginx to serve on port 80/443

3. Update the `API_URL` in `WebsiteAPI.java` to your server's address

4. Consider using a database (MongoDB, PostgreSQL) instead of in-memory storage

Enjoy monitoring your Minecraft activities! 🎮
