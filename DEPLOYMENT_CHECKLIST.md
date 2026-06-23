# Final Deployment Checklist

Before going live, verify the following steps have been completed:

## Frontend (Vercel)
- [ ] Root Directory set to `frontend`.
- [ ] Environment variable `VITE_API_URL` set to the live backend URL.
- [ ] Build completes successfully without `tsc` or `vite` errors.
- [ ] No `localhost` network calls visible in the browser network tab.

## Backend (Railway/Render)
- [ ] Root Directory set to `backend`.
- [ ] Environment variable `GEMINI_API_KEY` is set.
- [ ] Environment variable `ALLOWED_ORIGINS` is set to the Vercel URL.
- [ ] Startup logs show `Application startup complete` on port `$PORT`.
- [ ] Hitting the backend URL directly in the browser returns the Welcome JSON.

## Integration
- [ ] The Vercel frontend successfully loads the Dashboard charts.
- [ ] The Product Recommendations page successfully connects to the backend and returns items.
- [ ] The AI Explainer feature successfully utilizes the Gemini API.
