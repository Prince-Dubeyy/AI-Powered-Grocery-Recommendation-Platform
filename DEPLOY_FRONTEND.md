# Frontend Deployment Guide (Vercel)

This document outlines the exact steps to deploy the React Vite frontend of the AI-Powered Grocery Recommendation Platform independently using Vercel.

## 1. Vercel Dashboard Settings
When importing your GitHub repository into Vercel, ensure the following project settings are applied:

- **Root Directory**: `frontend`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

*(Note: The `vercel.json` file we created handles the Framework, Build Command, and Output Directory automatically, but you must manually set the Root Directory to `frontend` if importing the root repo).*

## 2. Environment Variables
You must configure the following Environment Variable in your Vercel Project Settings (Settings -> Environment Variables):

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_API_URL` | `https://your-backend-url.up.railway.app` | The production URL of your FastAPI backend. |

> [!IMPORTANT]  
> If you do not set `VITE_API_URL`, the frontend will default to `http://localhost:8000` and will fail to load data for production users.

## 3. Troubleshooting
- **`vite: command not found`**: You forgot to set the **Root Directory** to `frontend`.
- **Network Error on Dashboard**: Your `VITE_API_URL` is either missing, incorrect, or your backend CORS policy is blocking the Vercel domain. Ensure your backend has `ALLOWED_ORIGINS` set to include your Vercel URL.
