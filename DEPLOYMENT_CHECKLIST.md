# DEPLOYMENT CHECKLIST

Before verifying the final live deployment, confirm the following:

- [ ] `frontend/package.json` build script is exactly `"vite build"`.
- [ ] `frontend/vercel.json` exists and correctly defines the Vite framework.
- [ ] Vercel Root Directory is set to `frontend`.
- [ ] Vercel `VITE_API_URL` is populated.
- [ ] `backend/requirements.txt` includes `google-genai` and `fastapi`.
- [ ] `backend/main.py` supports dynamic `$PORT` assignment.
- [ ] Railway Root Directory is set to `/backend`.
- [ ] Railway `GEMINI_API_KEY` and `ALLOWED_ORIGINS` are populated.

### Validation Status
- Local build tests (`npm run build`): **PASSED**
- No `localhost:8000` hardcoded references: **PASSED**
- Dynamic Backend Startup tests: **PASSED**
