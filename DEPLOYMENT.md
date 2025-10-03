# 🚀 Deployment Guide - Make Your Website Public

## Option 1: Deploy to Render.com (FREE & EASY)

### Step 1: Prepare Your Code
1. Create a GitHub account if you don't have one: https://github.com
2. Create a new repository (e.g., "minecraft-monitor")
3. Upload the `website` folder to GitHub

### Step 2: Deploy to Render
1. Go to https://render.com and sign up (free)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: minecraft-monitor
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click "Create Web Service"
6. Wait 2-3 minutes for deployment

### Step 3: Get Your URL
- Render will give you a URL like: `https://minecraft-monitor.onrender.com`
- Copy this URL!

### Step 4: Update Your Mod
Update `WebsiteAPI.java`:
```java
private static final String API_URL = "https://minecraft-monitor.onrender.com/api/message";
```

Rebuild the mod:
```bash
./gradlew build
```

---

## Option 2: Deploy to Railway.app (FREE)

### Step 1: Setup
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository

### Step 2: Configure
Railway auto-detects Node.js and deploys automatically!

### Step 3: Get Your URL
- Click on your deployment
- Copy the URL (e.g., `https://minecraft-monitor.up.railway.app`)

### Step 4: Update Mod
Same as Render - update the API_URL in `WebsiteAPI.java`

---

## Option 3: Deploy to Your Own Server (VPS)

### Requirements:
- A VPS (DigitalOcean, Linode, AWS, etc.)
- Ubuntu/Linux server
- Domain name (optional)

### Steps:

1. **SSH into your server**
```bash
ssh root@your-server-ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install PM2 (Process Manager)**
```bash
sudo npm install -g pm2
```

4. **Upload your code**
```bash
# On your local machine
scp -r website root@your-server-ip:/var/www/
```

5. **Start the server**
```bash
cd /var/www/website
npm install
pm2 start server.js --name minecraft-monitor
pm2 save
pm2 startup
```

6. **Setup Nginx (Optional - for custom domain)**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/minecraft-monitor
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/minecraft-monitor /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **Setup SSL (HTTPS)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Option 4: Ngrok (Quick Testing - NOT PERMANENT)

For quick testing without deployment:

1. **Install Ngrok**: https://ngrok.com/download
2. **Start your local server**:
```bash
npm start
```
3. **In another terminal, run**:
```bash
ngrok http 3000
```
4. **Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)
5. **Update mod** with this URL

⚠️ **Warning**: Ngrok URLs change every time you restart, so this is only for testing!

---

## Updating the Mod for Public URL

After deploying, update `WebsiteAPI.java`:

```java
private static final String API_URL = "https://YOUR-DEPLOYED-URL.com/api/message";
```

Then rebuild:
```bash
cd c:/Users/Shashank Sharma/Desktop/mod
./gradlew build
```

The JAR file will be in: `build/libs/modid-1.0.jar`

---

## Database Setup (For Production)

For permanent storage, use a database instead of in-memory storage:

### MongoDB Atlas (Free)
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `server.js` to use MongoDB

### PostgreSQL (Render/Railway)
Both Render and Railway offer free PostgreSQL databases!

---

## Recommended: Render.com

**Why Render?**
- ✅ Free tier available
- ✅ Auto-deploys from GitHub
- ✅ HTTPS included
- ✅ Easy to use
- ✅ No credit card required

**Steps Summary:**
1. Push code to GitHub
2. Connect to Render
3. Deploy (takes 2 minutes)
4. Get your public URL
5. Update mod with new URL
6. Share with friends!

---

## Security Tips

1. **Add Rate Limiting** (prevent spam):
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100 // limit each IP to 100 requests per minute
});

app.use('/api/', limiter);
```

2. **Add API Key** (optional):
```javascript
app.post('/api/message', (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // ... rest of code
});
```

3. **Use Environment Variables** for sensitive data

---

## Cost Comparison

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| Render | 750 hours/month | $7/month |
| Railway | $5 credit/month | Pay as you go |
| Vercel | Unlimited | $20/month |
| DigitalOcean | - | $5/month |
| AWS | 12 months free | Varies |

**Recommendation**: Start with Render's free tier!
