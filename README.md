<p align="center">
  <a href="https://www.trysunder.com">
    <img src="./demo-video/public/sunder-logo.svg" width="170" alt="Sunder logo" />
  </a>
</p>

<h2 align="center">AI document operations for claims teams</h2>

<p align="center">
  <a href="https://www.trysunder.com">Website</a> ·
  <a href="./DEMO.md">Demo runbook</a> ·
  <a href="./PRODUCT.md">Product notes</a> ·
  <a href="#architecture">Architecture</a>
</p>

<p align="center">
  <a href="https://www.trysunder.com">
    <img src="./docs/assets/readme/sunder-cover.svg" alt="Sunder product banner" />
  </a>
</p>

<br />

# Why Sunder

Claims review is not hard because one PDF is hard to read. It is hard because the source material arrives as a messy folder: medical bills, medical reports, income documents, duplicate scans, combined PDFs, missing fields, and numbers that need to be defensible.

Most AI document demos stop at extraction. Sunder is built around the next step: giving a human reviewer enough structure, source traceability, and workflow state to trust what happened. The product keeps the original documents visible, turns review policy into a checklist, and treats AI output as evidence to verify rather than magic to accept.

## Quick Start

```bash
npm install
npm run dev
```

For the final demo path, use Vercel Functions rather than plain Vite when document-processing API routes are required:

```bash
VITE_ENABLE_LOCAL_GEMINI_PROCESSING=true vercel dev
```

Private legal and medical PDFs are not committed to this repository. Demo documents live outside git and must be checked for redaction before any recording or live walkthrough.

## Philosophy

Evidence over theater. Sunder should make the review work inspectable: source documents, citations, field values, duplicate flags, processing status, and generated artifacts.

Human in control. AI classifies, splits, extracts, and flags. The reviewer still decides what is accepted, what is missing, and what should be escalated.

Workflow before chat. The core product is a dossier workspace, not a generic assistant shell. Chat and analyst features are useful only when they operate over structured case evidence.

Built for messy inputs. The happy path assumes real-world claim packets: scans, photos, combined PDFs, duplicates, partial uploads, and documents arriving over time.

## What It Supports

Multi-file intake - upload scattered PDFs and images into a case workspace.

Document triage - classify files, write reviewer-friendly descriptions, and track processing status.

PDF splitting - turn combined PDFs into logical review sections instead of treating the whole file as one blob.

Duplicate detection - flag repeated material so reviewers are less likely to double-count evidence.

Structured extraction - extract fields for medical expenses, medical reports, income documents, and configured claim schemas.

Citation review - show extracted values beside the source document so reviewers can verify the evidence.

Rules and validation - surface missing fields, payer classifications, and review issues as checklist-style work.

Report generation - produce downstream claim/report artifacts from reviewed case data.

## System Shape

Sunder is easiest to understand as a five-stage evidence pipeline:

1. **Ingest** - a case workspace collects source documents, stores files, records metadata, and checks duplicate hashes.
2. **Triage** - Gemini classifies files, describes them for reviewers, and splits combined PDFs into logical document sections.
3. **Extract** - typed document sections are routed to extraction processors for structured fields, citations, confidence metadata, and dashboard traces.
4. **Review** - humans inspect fields beside the source documents, edit values, dismiss validation issues, and mark work as reviewed.
5. **Generate** - reviewed case data becomes report artifacts and exportable work product.

The important boundary is intentional: Sunder prepares review packs and first-draft operational artifacts. It does not replace legal judgment, decide liability, or treat AI output as final without human review.

## Demo Flow

The current walkthrough uses a private seeded legal claim case:

1. Open a clean claim case.
2. Upload a small but realistic batch of redacted source documents.
3. Watch upload, classification, splitting, extraction, and duplicate status.
4. Open a processed document and review extracted fields against citations.
5. Check rules and validation issues.
6. Generate or inspect report artifacts from the case library.

See [DEMO.md](./DEMO.md) for the recording runbook.

## Architecture

```mermaid
flowchart LR
  Case["Claim case"] --> Upload["Upload + duplicate check"]
  Upload --> Storage["Supabase Storage"]
  Upload --> DB["Supabase Postgres"]
  Upload --> Process["Vercel processing function"]
  Process --> Gemini["Gemini classify + split"]
  Process --> Extend["Extend AI extract + cite"]
  Gemini --> DB
  Extend --> DB
  DB --> Review["Citation-backed review UI"]
  Review --> Reports["Report artifacts"]
```

The frontend is a React and TanStack workspace backed by Supabase. Vercel Functions coordinate document triage and extraction. Gemini handles classification and splitting, Extend AI handles structured extraction and citations, and Supabase stores case records, source files, split state, validation state, reviewer edits, and generated artifacts.

## Stack

- React 19 + Vite
- TypeScript
- TanStack Router
- TanStack Query
- TanStack Table
- ShadCN UI + Tailwind CSS
- Supabase Auth, Postgres, and Storage
- Vercel Functions
- Gemini for document triage
- Extend AI for structured extraction and citations

## Key Files

- `src/routes/cases/` - case list, case detail, and document review routes
- `src/components/documents/` - upload, file table, extraction review, viewer, and split panes
- `src/components/docgen/` - report history and generated artifact surfaces
- `src/config/clients/hoh-law.ts` - Hoh Law-style claim review configuration
- `src/clients/hoh-law/` - client-specific schemas and report logic
- `supabase/migrations/` - database schema recovery and portfolio demo migrations
- `DEMO.md` - private demo recording runbook
- `PRODUCT.md` - product principles and design constraints

## Health Checks

```bash
npm run build
npm run test:run
npm run lint
```

Lint currently includes legacy/non-demo debt. Production readiness should prioritize build success, the legal claim demo path, and any lint failures touching upload, extraction review, report generation, auth, Supabase, or Vercel functions.

## Repository Notes

The private product remote is `Sethzy/Sunder`. The public portfolio remote is `Sethzy/sunder-document-processing`.
