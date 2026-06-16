# Security Policy

## Reporting A Vulnerability

Please do not open a public issue for suspected secrets, authentication bypasses, data exposure, or account/security vulnerabilities.

Use GitHub private vulnerability reporting if it is enabled for the repository. If it is not enabled, contact the maintainer privately through the portfolio/contact channel linked from the project profile.

## Secret Handling

Do not commit `.env.local`, Vercel environment dumps, Supabase service-role keys, provider API keys, private demo documents, generated build output, or local agent/workspace state.

Public `VITE_` Supabase values are browser configuration, not privileged credentials. Server-only keys such as `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `EXTEND_API_KEY`, `ANTHROPIC_API_KEY`, and `SUNDER_INTERNAL_SECRET` must only be configured in Vercel or local ignored env files.
