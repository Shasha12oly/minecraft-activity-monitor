# 🚀 Step-by-Step Deployment Guide

## ✅ What You Currently Have

- **Local Website**: Running on http://localhost:3000
- **Minecraft Mod**: Sending data to Discord + Website
- **Working Features**: 
  - Player tracking
  - Chat messages
  - Commands
  - Join/Leave events

---

## 🌐 Deploy to Render.com (FREE)

### **Step 1: Create GitHub Account & Repository**

1. **Go to GitHub**: https://github.com
2. **Sign up** (if you don't have an account)
3. **Click "New Repository"** (green button)
4. **Repository Settings**:
   - Name: `minecraft-activity-monitor`
   - Description: "Minecraft player activity dashboard"
   - Public or Private: **Public** (for free deployment)
   - ✅ Check "Add a README file"
5. **Click "Create repository"**

### **Step 2: Upload Your Website Code**

**Option A: Using GitHub Desktop (Easiest)**
1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in
3. Click "Add" → "Add Existing Repository"
4. Choose: `c:/Users/Shashank Sharma/Desktop/mod/website`
5. Click "Publish repository"

**Option B: Using Git Command Line**
```bash
cd c:/Users/Shashank Sharma/Desktop/mod/website

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Minecraft Activity Monitor"

# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/minecraft-activity-monitor.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Option C: Upload via Web (Simplest)**
1. Go to your repository on GitHub
2. Click "Add file" → "Upload files"
3. Drag all files from `c:/Users/Shashank Sharma/Desktop/mod/website`
4. Click "Commit changes"

### **Step 3: Deploy to Render**

1. **Go to Render**: https://render.com
2. **Sign up** with GitHub (click "Get Started for Free")
3. **Authorize Render** to access your GitHub
4. **Click "New +"** → **"Web Service"**
5. **Connect Repository**:
   - Find `minecraft-activity-monitor`
   - Click "Connect"
6. **Configure Service**:
   - **Name**: `minecraft-monitor` (or any name you like)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**
7. **Click "Create Web Service"**

### **Step 4: Wait for Deployment**

- Render will build and deploy (takes 2-3 minutes)
- You'll see logs showing the build process
- When done, you'll see: ✅ "Live"

### **Step 5: Get Your Public URL**

- At the top of the page, you'll see your URL
- Example: `https://minecraft-monitor.onrender.com`
- **Copy this URL!**

### **Step 6: Update Your Minecraft Mod**

1. **Open this file**:
   ```
   c:/Users/Shashank Sharma/Desktop/mod/src/main/java/com/example/examplemod/WebsiteAPI.java
   ```

2. **Find this line** (around line 12):
   ```java
   private static final String API_URL = "http://localhost:3000/api/message";
   ```

3. **Replace with your Render URL**:
   ```java
   private static final String API_URL = "https://minecraft-monitor.onrender.com/api/message";
   ```
   *(Replace with YOUR actual Render URL)*

4. **Save the file**

### **Step 7: Rebuild the Mod**

```bash
cd c:/Users/Shashank Sharma/Desktop/mod
./gradlew build
```

The new JAR will be at: `build/libs/modid-1.0.jar`

### **Step 8: Test It!**

1. **Visit your public website**: `https://minecraft-monitor.onrender.com`
2. **Run Minecraft** with the updated mod
3. **Join a server** or **send a chat message**
4. **Check the website** - you should see the activity!

---

## 🎉 You're Done!

### **Now You Can:**

✅ Share the website URL with anyone
✅ They can see ALL players' activities in real-time
✅ Multiple people can use the mod
✅ Everything is separated by player name
✅ Works from anywhere in the world!

### **Share with Friends:**

1. **Give them the mod JAR**: `build/libs/modid-1.0.jar`
2. **Give them the website URL**: `https://minecraft-monitor.onrender.com`
3. **They install the mod** → Their activities appear on the website!

---

## 📝 Important Notes

### **Free Tier Limitations:**

- ⏰ **Sleeps after 15 min of inactivity**
  - First request takes ~30 seconds to wake up
  - Subsequent requests are instant
- 💾 **In-memory storage**
  - Messages are lost when server restarts
  - To fix: Add a database (see below)

### **Upgrade Options:**

**To prevent sleeping ($7/month):**
- Go to Render dashboard
- Click your service
- Click "Upgrade to Paid"

**To keep messages permanently:**
- Add MongoDB Atlas (free): https://www.mongodb.com/cloud/atlas
- Or use Render's PostgreSQL (paid)

---

## 🔧 Alternative: Railway.app

If Render doesn't work, try Railway:

1. **Go to**: https://railway.app
2. **Sign in with GitHub**
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select your repository**
5. **Railway auto-deploys!**
6. **Click on deployment** → Copy the URL
7. **Update mod** with Railway URL
8. **Rebuild & test!**

---

## 🆘 Troubleshooting

### Website shows "Application failed to respond"
- Check Render logs for errors
- Make sure `package.json` has correct start command
- Verify `server.js` uses `process.env.PORT`

### Mod can't connect to website
- Check the URL in `WebsiteAPI.java` is correct
- Must be HTTPS (not HTTP)
- Must end with `/api/message`
- Check Render logs to see if requests are arriving

### Messages not appearing
- Check if website is "sleeping" (free tier)
- Visit the website URL to wake it up
- Wait 30 seconds for first request
- Check browser console (F12) for errors

### CORS errors
- Already handled in `server.js`
- If still happening, check Render logs
- May need to add specific origin

---

## 📊 Monitoring Your Deployment

### **Render Dashboard:**
- View logs: Click "Logs" tab
- See requests: Look for "Sending to website" messages
- Monitor uptime: Check "Events" tab
- View metrics: See request count, response time

### **Website Analytics:**
- Total players
- Total messages  
- Online players
- Activity by player

---

## 🔐 Security (Optional)

### **Add Authentication:**

If you want to restrict who can view the website:

1. **Add basic auth** to `server.js`:
```javascript
const basicAuth = require('express-basic-auth');

app.use(basicAuth({
    users: { 'admin': 'your-password' },
    challenge: true
}));
```

2. **Install package**:
```bash
npm install express-basic-auth
```

3. **Redeploy to Render**

---

## 🎯 Next Steps

After deployment:

1. ✅ Test with friends
2. ✅ Share the website URL
3. ✅ Distribute the mod JAR
4. ✅ Monitor the dashboard
5. ✅ Consider upgrading if needed
6. ✅ Add database for permanent storage
7. ✅ Customize the UI colors/theme

**Your website is now live and accessible worldwide!** 🌍
