# VERCEL DEPLOYMENT SETUP

This guide forces Vercel to explicitly deploy the React frontend and prevents multi-service detection errors.

## Required Vercel Configuration
In your Vercel Dashboard for `cartmind-ai`:

- **Project Name**: `cartmind-ai`
- **Root Directory**: `frontend`
- **Framework**: `Vite`
- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Environment Variables
- **`VITE_API_URL`**: `https://your-backend-url.up.railway.app` (Or Render URL)

*The `vercel.json` and `package.json` in the frontend directory have already been configured to support this setup seamlessly.*
