# DEPLOYMENT AUDIT REPORT

## 1. Frontend Configuration
- **package.json**: Has valid scripts (`dev`, `build`, `preview`) and lists `vite` in devDependencies. 
- **vite.config.ts**: Standard React configuration. No issues.
- **Environment Variables**: Missing `.env` and `.env.example`. The frontend currently hardcodes `http://localhost:8000` in `src/api.ts`, which will completely break in production because the deployed React app will attempt to fetch data from the user's local machine instead of the backend server.
- **Vercel Readiness**: `vercel.json` exists in `frontend/` from a previous fix, ensuring Vercel runs from the correct root with the correct `vite` framework.

## 2. Backend Configuration
- **requirements.txt**: Missing `google-genai` (which we are actively using). It still lists `openai`, which is deprecated in our architecture. This will cause the backend to crash on Railway.
- **main.py CORS**: Currently using `allow_origins=["*"]` which is insecure for production. Needs an environment-driven `ALLOWED_ORIGINS` configuration.
- **Environment Variables**: Missing `backend/.env.example` to document required variables (`GEMINI_API_KEY`, `ALLOWED_ORIGINS`). 
- **Startup Configuration**: Has `if __name__ == "__main__":` block with hardcoded port 8000. Railway will supply a dynamic `$PORT` environment variable which must be respected via a custom start command or Procfile.

## 3. Repository Structure
- The structure is a clean monorepo, meaning Vercel needs its `Root Directory` set to `frontend` and Railway needs its `Root Directory` set to `backend`. Both are perfectly capable of independent deployment.

## 4. Deployment Blockers Identified
1. **Frontend**: Hardcoded `localhost:8000` API URL.
2. **Backend**: Missing `google-genai` in `requirements.txt`.
3. **Security**: Unsafe wildcard CORS policy.
