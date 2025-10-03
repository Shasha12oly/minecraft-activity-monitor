# 🔧 Fix "Cannot GET /" Error

I've fixed the server.js file. Now you need to update it on GitHub and Render will auto-deploy.

## Quick Fix Steps:

### **Option 1: Upload via GitHub Web (Easiest)**

1. **Go to your GitHub repo**: https://github.com/Shasha12oly/minecraft-activity-monitor

2. **Click on `server.js`** file

3. **Click the pencil icon** (Edit this file) on the right

4. **Find line 12** (after `app.use(express.static('public'));`)

5. **Add these lines**:
   ```javascript
   
   // Serve index.html at root
   app.get('/', (req, res) => {
       res.sendFile(path.join(__dirname, 'public', 'index.html'));
   });
   ```

6. **Scroll down** and click **"Commit changes"**

7. **Wait 2-3 minutes** - Render will auto-deploy

8. **Refresh your website**: https://minecrafter-wjuj.onrender.com

### **Option 2: Re-upload server.js**

1. **Go to**: https://github.com/Shasha12oly/minecraft-activity-monitor

2. **Click on `server.js`**

3. **Click the trash icon** to delete it

4. **Click "Commit changes"**

5. **Click "Add file"** → **"Upload files"**

6. **Drag the updated `server.js`** from:
   ```
   c:\Users\Shashank Sharma\Desktop\mod\website\server.js
   ```

7. **Click "Commit changes"**

8. **Wait for Render to redeploy** (check Render dashboard)

---

## ✅ After Fix

Your website should show the dashboard instead of "Cannot GET /"

The fix adds a root route that serves the index.html file properly.
