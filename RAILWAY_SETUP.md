# RAILWAY DEPLOYMENT SETUP

This guide covers the deployment of the FastAPI backend to Railway.

## Required Railway Configuration
1. Connect your GitHub Repository to Railway.
2. In the Service Settings, set the **Root Directory** to `/backend`.
3. Railway will automatically detect the `requirements.txt` and assign the Python buildpack.

## Environment Variables
Ensure the following variables are securely added to the Railway variables panel:
- `GEMINI_API_KEY`: Your Google AI Studio API key.
- `ALLOWED_ORIGINS`: `https://cartmind-ai.vercel.app` (Your frontend URL, required for CORS).

## Startup Command
The `main.py` is fully prepared for Railway. If Railway requires an explicit start command, use:
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```
