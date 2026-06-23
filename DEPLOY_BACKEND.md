# Backend Deployment Guide (Railway)

This document outlines the exact steps to deploy the FastAPI backend of the AI-Powered Grocery Recommendation Platform using Railway.app (or Render).

## 1. Railway Dashboard Settings
When importing your GitHub repository into Railway, follow these steps:

1. **New Project** -> **Deploy from GitHub repo**.
2. Select the repository.
3. Once the service is created, go to **Settings** -> **Service** and set the **Root Directory** to `/backend`.
4. Railway will automatically detect the `requirements.txt` and use the Python buildpack.

## 2. Environment Variables
You must configure the following Environment Variables in your Railway Variables tab:

| Key | Value | Description |
|-----|-------|-------------|
| `GEMINI_API_KEY` | `your_google_ai_studio_key` | Required for the AI Explainer and Assistant features. |
| `ALLOWED_ORIGINS` | `https://your-vercel-app.vercel.app` | Required for CORS. Replace with your actual Vercel frontend URL. Multiple URLs can be separated by commas. |

*(Note: Railway automatically provides a `$PORT` variable which `main.py` is configured to use dynamically).*

## 3. Start Command
If Railway requires a custom start command (it shouldn't, as the `main.py` block handles it), use:
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## 4. Health Checks
FastAPI automatically serves the root route `/` which returns a welcome message. You can use this for health checks:
- **Path**: `/`
- **Expected Status**: `200 OK`

## 5. Troubleshooting
- **Memory Limits (OOM)**: The free tier of Railway provides 500MB of RAM. If loading the 166MB Parquet files exceeds this limit during boot, the container will crash. Upgrading to the Hobby plan (8GB) may be required if Parquet datasets aren't downsampled.
- **CORS Errors**: If the frontend console shows CORS errors, verify that `ALLOWED_ORIGINS` contains the exact frontend URL (no trailing slashes).
