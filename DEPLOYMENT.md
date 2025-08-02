# 🚀 Deployment Guide

This guide will help you deploy your Intern Dashboard application to Railway (backend) and Vercel (frontend).

## 📋 Prerequisites

- GitHub account with the repository: https://github.com/hemantmeena2005/intern
- Railway account: https://railway.app
- Vercel account: https://vercel.com

## 🚂 Backend Deployment (Railway)

### Step 1: Deploy to Railway

1. **Go to Railway**: https://railway.app
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**: `hemantmeena2005/intern`
6. **Select the repository** and click "Deploy"

### Step 2: Configure Railway

1. **Wait for deployment** to complete
2. **Go to Settings** in your Railway project
3. **Copy the generated domain** (e.g., `https://your-app-name.up.railway.app`)
4. **Note this URL** - you'll need it for the frontend

### Step 3: Verify Backend

1. **Test the health endpoint**: `https://your-app-name.up.railway.app/api/health`
2. **Should return**: `{"status":"OK","message":"Intern Dashboard API is running"}`

## 🌐 Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Import your repository**: `hemantmeena2005/intern`
5. **Configure the project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `cd client && npm run build`
   - **Output Directory**: `client/build`
   - **Install Command**: `npm run install-all`

### Step 2: Set Environment Variables

1. **In Vercel project settings**, go to "Environment Variables"
2. **Add the following variable**:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-railway-app.up.railway.app` (use your Railway URL)
   - **Environment**: Production, Preview, Development

### Step 3: Deploy

1. **Click "Deploy"**
2. **Wait for build** to complete
3. **Your app will be live** at the provided Vercel URL

## 🔧 Configuration Files

### Railway Configuration (`railway.json`)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd server && npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Vercel Configuration (`vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_API_URL": "@react_app_api_url"
  }
}
```

## 🧪 Testing Your Deployment

### Backend Testing
```bash
# Health check
curl https://your-railway-app.up.railway.app/api/health

# Test login
curl -X POST https://your-railway-app.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"hemant@example.com","password":"test"}'
```

### Frontend Testing
1. **Visit your Vercel URL**
2. **Login with**: `hemant@example.com` (any password)
3. **Test all features**: Dashboard, Leaderboard, etc.

## 🔄 Updating Your Deployment

### Backend Updates
1. **Push changes** to GitHub
2. **Railway will automatically redeploy**

### Frontend Updates
1. **Push changes** to GitHub
2. **Vercel will automatically redeploy**

## 🛠️ Troubleshooting

### Common Issues

1. **Backend not connecting**:
   - Check Railway logs
   - Verify environment variables
   - Ensure port is set correctly

2. **Frontend build fails**:
   - Check Vercel build logs
   - Verify environment variables
   - Ensure all dependencies are installed

3. **CORS issues**:
   - Backend is configured to allow all origins
   - Check if Railway domain is correct

### Useful Commands

```bash
# Check Railway logs
railway logs

# Check Vercel logs
vercel logs

# Test API locally
curl http://localhost:5001/api/health
```

## 📞 Support

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Repository**: https://github.com/hemantmeena2005/intern

## 🎉 Success!

Once deployed, your Intern Dashboard will be:
- **Backend**: `https://your-app-name.up.railway.app`
- **Frontend**: `https://your-app-name.vercel.app`

Both will be automatically updated when you push changes to GitHub! 