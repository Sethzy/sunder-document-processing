# Sunder Demo Recording Runbook

This is the exact runbook for the current Sunder walkthrough demo. The fastest path is **not** to talk live while clicking. Record clean product footage first, then record yourself talking separately, then cut the two together.

Keep all private legal and medical PDFs outside git.

## Final Demo Shape

Target length: 4-5 minutes.

Final edit structure:

```text
A-roll: Seth talking to camera, reading the script naturally
B-roll: silent Sunder screen recordings, cut over the relevant parts
```

Do not try to sync every sentence with every click during recording. The screen clips only need to prove the workflow while your voiceover carries the story.

## Use These Four Files

Primary folder:

- `/Users/sethlim/Desktop/Sunder Demo Docs`

Use exactly these four files for the demo:

1. `/Users/sethlim/Desktop/Sunder Demo Docs/(valid)combined demo.pdf`
2. `/Users/sethlim/Desktop/Sunder Demo Docs/C - MR_Redacted Securus 1.pdf`
3. `/Users/sethlim/Desktop/Sunder Demo Docs/P - ME - Securus 3.pdf`
4. `/Users/sethlim/Desktop/Sunder Demo Docs/duplicate demo.pdf`

Do not live-upload:

- `/Users/sethlim/Desktop/Sunder Demo Docs/P - ME - Securus 3 copy.pdf`
- `/Users/sethlim/Desktop/Sunder Demo Docs/Grab & Gojek Demo Docs 1`
- the folder with 16 `C - ME_Redacted` copies

Why: the 52-page `P - ME - Securus 3 copy.pdf` missed page 52 in live Gemini verification. The four-file set is safer and still substantial: 67 source pages that become many reviewable document sections.

## Environment Setup

Use an environment where `/api/gemini/process` works.

Preferred:

1. Use the deployed or preview Vercel app that includes the patched Sunder repo code.
2. Confirm the demo account is signed in.

Local fallback:

```bash
cd /Users/sethlim/Documents/Sunder
VITE_ENABLE_LOCAL_GEMINI_PROCESSING=true vercel dev
```

Avoid plain `npm run dev` for the final rehearsal. Plain Vite may not run the document-processing API route.

## One-Time Demo Case Prep

Do this before recording anything final.

1. Open Sunder.
2. Sign in with the private seeded demo account.
3. Go to `Workspace`.
4. Create or open a clean case named:

```text
Sunder Demo - Hoh Law Claim Walkthrough
```

5. Open the case.
6. Click `Rules`.
7. Confirm the rules are Hoh Law-style rules:
   - Medical Expense
   - Medical Report
   - Income Document
   - payer / cash / Medisave / MediShield / insurance style fields
8. If you see generic `Invoices`, `Reports`, `Contracts`, stop. The demo account is on the wrong config.
9. Click `Files`.
10. Upload the four primary files.
11. Wait until processing completes enough for review.
12. Confirm:
    - Files table has processed rows.
    - `(valid)combined demo.pdf` produced multiple sections.
    - `P - ME - Securus 3.pdf` produced many medical expense sections.
    - `duplicate demo.pdf` shows duplicate flags.
    - At least one medical expense or medical report opens into the review view.
    - `Rules` shows validation issues or rule counts.
    - `AI Analyst` opens.
    - `Reports` opens.

If processing is slow, leave the case processing and take a break. Do not record yourself waiting.

## Screen Recording Rules

Record screen clips silently. No microphone needed.

Use a clean browser window:

1. Hide bookmarks bar if distracting.
2. Close unrelated tabs.
3. Turn off notifications / Focus mode.
4. Browser zoom: 90-100 percent.
5. Make the window large enough that table columns and tabs are visible.
6. Keep movements slow. Pause 1-2 seconds after each important screen.
7. Do not expose credentials, env vars, private chats, email, or unrelated files.

Save the screen clips with these exact names if possible:

```text
00-folder-mess.mov
01-workspace-case.mov
02-upload.mov
03-processed-files.mov
04-combined-split.mov
05-expense-review.mov
06-duplicate-detection.mov
07-rules.mov
08-optional-analyst.mov
```

## Clip 00 - Folder Mess

Goal: show that the input is a messy real-world packet, not a clean spreadsheet.

Steps:

1. Open Finder.
2. Navigate to `/Users/sethlim/Desktop/Sunder Demo Docs`.
3. Start screen recording.
4. Show the folder for 2 seconds.
5. Click once on `(valid)combined demo.pdf`.
6. Click once on `C - MR_Redacted Securus 1.pdf`.
7. Click once on `P - ME - Securus 3.pdf`.
8. Click once on `duplicate demo.pdf`.
9. Briefly scroll or resize so the viewer sees there are more files/folders too.
10. Stop recording.

Do not open the PDFs unless you are confident nothing sensitive appears. The point is the folder shape, not reading the PDFs.

Voiceover that will cover this clip:

> This is closer to what claims teams receive in practice. Not a clean spreadsheet, but a folder with medical expenses, medical reports, duplicate files, and multi-document PDFs.

## Clip 01 - Workspace Case

Goal: show the product surface and the case workflow.

Steps:

1. Open Sunder.
2. Go to `Workspace`.
3. Start screen recording.
4. Show the case list for 2 seconds.
5. Open `Sunder Demo - Hoh Law Claim Walkthrough`.
6. Pause on the case header.
7. Move the cursor across the tabs slowly:
   - `Files`
   - `Rules`
   - `AI Analyst`
   - `Reports`
8. Stop recording.

Voiceover:

> In Sunder, the case is the workspace. Everything is organized around the dossier: source files, validation rules, analyst workflow, and final report outputs.

## Clip 02 - Upload

Goal: show the intake action. This can be a throwaway case if the main case is already processed.

Recommended approach:

1. Create a separate clean case named:

```text
Sunder Demo - Upload Take
```

2. Open the `Files` tab.
3. Open Finder beside the browser.
4. Select only the four primary files.
5. Start screen recording.
6. Drag the four files into Sunder.
7. Wait until the upload queue/status visibly appears.
8. Stop recording once rows or upload progress are visible.

Do not wait for processing in this clip. The edit can jump from upload to the already-processed case.

Voiceover:

> I can drag the raw files straight into the case. Sunder stores the originals, queues them for AI processing, and keeps the status visible.

## Clip 03 - Processed Files

Goal: show the payoff after processing.

Steps:

1. Open the already-processed `Sunder Demo - Hoh Law Claim Walkthrough` case.
2. Click `Files`.
3. Start screen recording.
4. Pause on the full table.
5. Slowly move cursor over:
   - filename / renamed filename
   - tags
   - descriptions
   - status badges
   - duplicate indicator if visible
6. If the table has filters, briefly click the tag filter and show available tags.
7. Stop recording.

Voiceover:

> Once processing finishes, the case stops looking like a pile of filenames. The system classifies each document, writes descriptions, flags duplicates, and gives the reviewer a structured dossier.

## Clip 04 - Combined PDF Split

Goal: show that one uploaded PDF can become multiple logical documents.

Steps:

1. In `Files`, find the processed row for `(valid)combined demo.pdf`.
2. Start screen recording.
3. Open the document review page.
4. Wait for the PDF and extraction/split side panel to render.
5. Switch to the split view if the page opens on extraction view.
6. Show the sections from the combined PDF:
   - medical expense
   - income document
   - medical expense
   - medical report
7. Click one section or page reference if available.
8. Stop recording.

Voiceover:

> The combined PDF is especially important. In real claims, one PDF can contain several logical documents. Sunder splits that into reviewable sections so the reviewer is not forced to treat the whole thing as one blob.

## Clip 05 - Expense Review

Goal: show evidence review beside the PDF.

Steps:

1. In `Files`, open a processed medical expense document.
2. Prefer a split from `P - ME - Securus 3.pdf` or the medical expense split inside `(valid)combined demo.pdf`.
3. Start screen recording once the review page is loaded.
4. Show the PDF on the left.
5. Show extracted fields on the right.
6. Slowly scroll through fields like:
   - provider name
   - invoice number
   - date
   - total amount before deductions
   - cash amount
   - payer
   - Medisave / MediShield / insurance
7. Click a field or source/page reference if available.
8. Show any needs-review / validation signal if visible.
9. Stop recording.

Voiceover:

> This is the most important part of the product. Sunder is not asking the reviewer to trust a chatbot summary. The extracted fields sit next to the original PDF, and the reviewer can check the source page before accepting the output.

## Clip 06 - Duplicate Detection

Goal: show the clean duplicate aha.

Steps:

1. Go back to the case `Files` tab.
2. Find `duplicate demo.pdf`.
3. Start screen recording.
4. Show its duplicate indicator in the table.
5. Open the document if useful.
6. Show the split list where pages 4 and 5 are flagged as copies of earlier pages.
7. Stop recording.

Voiceover:

> Sunder also flags duplicate material. In this demo file, later pages are recognized as copies of earlier pages, so the reviewer is less likely to double-count the same evidence.

## Clip 07 - Rules

Goal: show that this is a configured legal review workflow, not generic document tagging.

Steps:

1. Open the processed case.
2. Click `Rules`.
3. Start screen recording.
4. Pause on the rules summary.
5. Expand `Medical Expense`.
6. Show rules around:
   - total amount
   - cash amount
   - patient ID
   - payer
   - Medisave
   - MediShield
   - insurance
   - employer scheme
7. Expand `Medical Report`.
8. Show patient name / diagnosis / injury / findings style checks.
9. Stop recording.

Voiceover:

> The rules tab turns review policy into a checklist. For this workflow, Sunder checks whether the extracted data has the fields a legal reviewer cares about: patient identity, payer, cash amount, and payer categories like insurance, Medisave, MediShield, or employer schemes.

## Clip 08 - Optional AI Analyst

Goal: only use this if the prompt has been tested and the response looks polished. The demo should not depend on this clip.

Steps:

1. Open the processed case.
2. Click `AI Analyst`.
3. Start screen recording.
4. Paste this prompt:

```text
Audit this case for medical expense discrepancies, duplicate documents, missing payer fields, and any amounts that should be checked before settlement. Output a concise reviewer report with flagged issues and recommended next actions.
```

5. Send the prompt only if you are in a safe environment and have time.
6. If you already have a useful response, show the existing response instead.
7. Show only the first polished response section or useful issue summary.
8. Stop recording.

If the response feels weak, too generic, too long, or visually messy, cut this clip entirely. Do not show Reports unless there is already a clean generated artifact.

Voiceover:

> Once the dossier is structured, the analyst can work across the case instead of across one file at a time. I can ask for a discrepancy review and use the response as a reviewer checklist.

## Camera Recording

Record this after the screen clips.

Setup:

1. Camera at eye level.
2. Clean background.
3. Good front light.
4. Microphone close enough that speech is crisp.
5. Script visible near the camera.
6. Do not screen-share during this take.

Record one continuous camera take. If you stumble, pause, restart the sentence, and keep going. The edit can cut around it.

## Voiceover Script

Read this naturally. Do not rush.

### Hook

> I built Sunder for the kind of document review work where the hard part is not reading one PDF. The hard part is turning a messy folder of scans, bills, reports, duplicates, and combined PDFs into something a reviewer can actually trust.
>
> I am going to show the legal claim workflow because it makes the value concrete: upload the case documents, let Sunder classify and split them, review the extracted evidence against the source pages, and produce a report the team can use.

### Messy Input

> This is closer to what claims teams receive in practice. Not a clean spreadsheet, but a folder with medical expenses, medical reports, duplicate files, and multi-document PDFs.
>
> The first job is to make the packet legible without losing the original evidence.

### Workspace

> In Sunder, the case is the workspace. Everything is organized around the dossier: source files, validation rules, analyst workflow, and final report outputs.
>
> For this client configuration, the important document types are medical expenses, medical reports, and income documents. That means the app is not just doing generic file tagging. It knows what fields matter for this legal review.

### Upload

> I can drag the raw files straight into the case. Sunder stores the originals, queues them for AI processing, and keeps the status visible so a reviewer can tell what is uploaded, processing, complete, or blocked.
>
> For the demo I am using a small batch, but the workflow is designed for the real situation where these documents arrive in pieces over time.

### Organization

> Once processing finishes, the case stops looking like a pile of filenames. The system classifies each document, writes a short description, and flags duplicates.
>
> The combined PDF is especially important. In real claims, one PDF can contain several logical documents. Sunder splits that into reviewable sections so the reviewer is not forced to treat the whole thing as one blob.

### Evidence Review

> This is the most important part of the product. Sunder is not asking the reviewer to trust a chatbot summary.
>
> The extracted fields sit next to the original PDF, and the reviewer can check the source page before accepting the output. For medical expenses, the system looks for fields like provider, invoice date, total amount, cash amount, payer, insurance, Medisave, and MediShield.

### Claim Audit

> The reason this matters is that legal claim packets often contain accounting mistakes. In one review, the Statement of Claim number was `SGD 11,118.54`, while the stricter reviewed medical expense amount looked closer to `SGD 9,306.04`. That is a variance of `SGD 1,812.50`.
>
> The point is not that the AI gets to make the legal decision. The point is that Sunder surfaces the evidence, separates the categories, and gives the human reviewer a much better chance of catching inflated, duplicated, or misclassified amounts.

### Rules

> The rules tab turns review policy into a checklist. For this workflow, Sunder checks whether the extracted data has the fields a legal reviewer cares about: patient identity, payer, cash amount, and payer categories like insurance, Medisave, MediShield, or employer schemes.
>
> Different lawyers may make different calls on what is ultimately claimable. Sunder's job is to pull the facts out cleanly, show what is missing, and make those decisions easier to defend.

### Optional Analyst

Only include this paragraph if the Analyst response is clean:

> Once the dossier is structured, the analyst can work across the case instead of across one file at a time. I can ask for a discrepancy review and use the response as a reviewer checklist.
>
> The end state is not "AI answered a question." The end state is a cleaner review packet: original evidence preserved, extracted data checked, and issues flagged for the human reviewer.

### Close

> Under the hood, this is a React and TanStack app on Supabase, with Vercel functions orchestrating Gemini for triage and Extend AI for extraction.
>
> But the product idea is simple: preserve the source documents, make the review work visible, and keep a human in control of the final claim judgment.
>
> That is Sunder: messy documents in, reviewable dossier out.

## Edit Plan

Use this rough order:

1. Camera hook.
2. Cut to `00-folder-mess.mov`.
3. Cut to `01-workspace-case.mov`.
4. Cut to `02-upload.mov`.
5. Jump cut to `03-processed-files.mov`.
6. Cut to `04-combined-split.mov`.
7. Cut to `05-expense-review.mov`.
8. Cut to `06-duplicate-detection.mov`.
9. Cut to `07-rules.mov`.
10. Optional: cut to `08-optional-analyst.mov` only if the prompt response is strong.
11. Camera close.

Recommended overlays:

- `67 source pages`
- `4 uploaded files -> many reviewable sections`
- `Duplicate pages flagged`
- `SGD 11,118.54 claimed`
- `SGD 9,306.04 reviewed`
- `SGD 1,812.50 variance`
- `Messy documents in. Reviewable dossier out.`

## Fallback Lines

If processing is slow:

> Processing can take a little while on real PDFs, so I am going to jump to a processed version of the same case.

If a citation is missing:

> This field still needs source verification, which is exactly why the review surface makes incomplete evidence visible instead of hiding it.

If Analyst/report generation is weak:

> I am going to keep the focus on the core dossier workflow here: upload, classification, evidence review, duplicate detection, and validation rules.

If private details appear:

> I am going to crop this section because the source documents are real redacted legal demo files.

## Final Pre-Publish Checklist

- The video shows the real Sunder app.
- The four verified files are used.
- `P - ME - Securus 3 copy.pdf` is not live-uploaded.
- The demo account uses the Hoh Law config.
- The processed case opens cleanly.
- The edit includes upload, processed files, split view, extraction review, duplicate detection, and rules.
- Analyst is included only if the tested prompt produces a polished response.
- No credentials are visible.
- No unredacted personal/private information is visible.
- No browser notifications or unrelated tabs appear.
- The final export is a shareable MP4.
