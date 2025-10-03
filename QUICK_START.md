# 🚀 Quick Start - Testing Locally

## Step 1: Install Node.js

1. Go to https://nodejs.org/
2. Download the **LTS version** (Long Term Support)
3. Run the installer
4. Click "Next" → "Next" → "Install"
5. **Restart your terminal/command prompt**

## Step 2: Verify Installation

Open a new terminal and type:
```bash
node --version
npm --version
```

You should see version numbers like:
```
v18.17.0
9.6.7
```

## Step 3: Install Dependencies

```bash
cd c:/Users/Shashank Sharma/Desktop/mod/website
npm install
```

This will install Express and other required packages.

## Step 4: Start the Server

```bash
npm start
```

You should see:
```
Server running on http://localhost:3000
API endpoint: http://localhost:3000/api/message
```

## Step 5: Open the Dashboard

Open your browser and go to:
```
http://localhost:3000
```

## Step 6: Test with Minecraft

1. Make sure the website is running (Step 4)
2. Run your Minecraft mod
3. Join a server or send chat messages
4. Check the website - you should see updates!

---

## Troubleshooting

### "npm is not recognized"
- You need to install Node.js first
- After installing, **restart your terminal**
- Try again

### "Port 3000 already in use"
- Another program is using port 3000
- Edit `server.js` and change `const PORT = 3000;` to `const PORT = 3001;`
- Update the mod's `WebsiteAPI.java` to use port 3001

### Website shows no messages
- Check if the server is running (you should see "Server running on..." message)
- Check if the mod is running
- Look at the mod logs for "Sending to website" messages
- Check browser console (F12) for errors

### Messages go to Discord but not website
- Make sure the website server is running
- The mod sends to BOTH Discord and website
- If website server is off, Discord still works but website won't update

---

## Alternative: Use start.bat

Just double-click `start.bat` in the website folder!

It will:
1. Install dependencies
2. Start the server
3. Open on http://localhost:3000
