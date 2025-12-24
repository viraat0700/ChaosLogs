# Deployment Guide

This guide explains how to deploy ChaosLog to production.

## Backend Deployment Options

### Option 1: Render.com (Recommended)
1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Configure:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment**: Node
5. Deploy!

### Option 2: Railway.app
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `cd server && railway init`
4. Deploy: `railway up`

### Environment Variables
Set `PORT=3000` (or let the platform assign it).

## Frontend Deployment

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Import project on vercel.com
3. Configure:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL=https://your-backend-url.render.com/api`

### Option 2: Netlify
Similar to Vercel - point to `client` directory.

## Important: Update API URL
Before deploying frontend, update `App.jsx` line 8:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

Then create `.env.production` in `client/`:
```
VITE_API_URL=https://your-actual-backend.com/api
```

## Database Note
SQLite file (`chaoslog.db`) will be created automatically. On platforms like Render, this will reset on each deploy (ephemeral filesystem). For production, consider using:
- PostgreSQL (recommended for Render)
- Or mount a persistent volume
