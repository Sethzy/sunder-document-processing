# Sunder Demo Walkthrough

This guide describes a public-safe demo path for Sunder. Demo documents are not included in this repository; use only redacted files that you have permission to process and show.

## Setup

1. Configure `.env.local` from `.env.example`.
2. Run the app with Vercel Functions when testing document processing:

```bash
VITE_ENABLE_LOCAL_GEMINI_PROCESSING=true vercel dev
```

Plain `npm run dev` is useful for UI work, but it does not exercise the same serverless function path used for document triage and extraction.

## Walkthrough

1. Sign in to a demo account.
2. Create a clean claim case in `Workspace`.
3. Upload a small redacted packet of PDFs or images.
4. Wait for processing to classify, split, and extract the documents.
5. Review the `Files` table for status, tags, descriptions, and duplicate indicators.
6. Open a processed document and compare extracted fields against citations in the source viewer.
7. Open `Rules` to review missing fields or validation issues.
8. Use `AI Analyst` or `Reports` only when the underlying case data has finished processing.

## Recording Checklist

- Use redacted demo files only.
- Close unrelated browser tabs and desktop apps.
- Hide notifications, bookmarks, credentials, and unrelated private data.
- Keep the case focused on the document workflow: upload, processing, review, validation, and generated artifacts.
- Do not record `.env` files, cloud dashboards, Supabase SQL editor screens, Vercel environment settings, private chats, or email.
- Stop and retake the clip if any unredacted personal, legal, medical, or credential material appears.

## Notes

The demo should show Sunder as an evidence workflow, not a generic chatbot. The strongest path is: messy input documents become structured review sections, the reviewer verifies values against source citations, and reviewed data becomes report-ready output.
