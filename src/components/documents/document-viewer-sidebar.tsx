/**
 * Document viewer sidebar summarizing document review state.
 * @module components/documents/document-viewer-sidebar
 */
import { AlertTriangle, CheckCircle2, LocateFixed, Layers, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileThumbnail } from "./file-thumbnail";
import { cn } from "@/lib/utils";
import type { Document } from "@/types/documents";
import type { SplitExtraction } from "@/types/extraction";

interface DocumentViewerSidebarProps {
  /** Current document shown in the viewer. */
  document: Document;
  /** Extracted split rows for this document. */
  splits: SplitExtraction[];
  /** Currently selected review pane mode. */
  viewMode: "extraction" | "split";
  /** Whether extraction data exists for at least one split. */
  hasExtractionData: boolean;
  /** Whether the document has been reviewed by a human. */
  isReviewed: boolean;
  /** Switches the right pane between extraction and split views. */
  onViewModeChange: (mode: "extraction" | "split") => void;
}

/**
 * Counts fields that have at least one source citation.
 */
function countCitationLinkedFields(splits: SplitExtraction[]): number {
  return splits.reduce((total, split) => {
    const metadata = split.extractionMetadata ?? {};
    return total + Object.values(metadata).filter((field) =>
      (field.citations?.length ?? 0) > 0
    ).length;
  }, 0);
}

/**
 * Counts validation and confidence issues that require human attention.
 */
function countReviewIssues(splits: SplitExtraction[]): number {
  return splits.reduce((total, split) => {
    return total +
      (split.validationFailures?.length ?? 0) +
      (split.lowConfidenceFields?.length ?? 0);
  }, 0);
}

/**
 * Displays document metadata and mode controls beside the PDF viewer.
 */
export function DocumentViewerSidebar({
  document,
  splits,
  viewMode,
  hasExtractionData,
  isReviewed,
  onViewModeChange,
}: DocumentViewerSidebarProps) {
  const displayFilename = document.renamed_filename || document.original_filename;
  const splitCount = splits.length;
  const citationCount = countCitationLinkedFields(splits);
  const reviewIssueCount = countReviewIssues(splits);
  const pageGroupCount = document.page_ranges?.length ?? splitCount;

  return (
    <aside className="w-64 shrink-0 border-r border-border/40 bg-card">
      <div className="flex h-full flex-col">
        <div className="border-b border-border/40 p-4">
          <div className="flex items-start gap-3">
            <FileThumbnail
              filename={displayFilename}
              fileType={document.file_type}
              size="lg"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground/90">
                {displayFilename}
              </p>
              <p className="mt-1 text-xs uppercase text-muted-foreground/60">
                {document.file_type}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {isReviewed ? (
              <Badge variant="success" className="gap-1 text-[10px]">
                <CheckCircle2 className="h-3 w-3" />
                Reviewed
              </Badge>
            ) : (
              <Badge variant="outline" className="text-[10px]">
                In review
              </Badge>
            )}
            {hasExtractionData && (
              <Badge variant="outline" className="gap-1 text-[10px]">
                <ScanLine className="h-3 w-3" />
                Extracted
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-3 border-b border-border/40 p-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-border/40 bg-background p-3">
              <p className="text-lg font-semibold tabular-nums text-foreground">
                {pageGroupCount}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground/70">
                page groups
              </p>
            </div>
            <div className="rounded-lg border border-border/40 bg-background p-3">
              <p className="text-lg font-semibold tabular-nums text-foreground">
                {citationCount}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground/70">
                citations
              </p>
            </div>
          </div>

          {reviewIssueCount > 0 && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                {reviewIssueCount} field{reviewIssueCount === 1 ? "" : "s"} need review
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2 p-3">
          <Button
            type="button"
            variant={viewMode === "extraction" ? "secondary" : "ghost"}
            size="sm"
            disabled={!hasExtractionData}
            onClick={() => onViewModeChange("extraction")}
            className={cn(
              "w-full justify-start gap-2 text-xs",
              viewMode === "extraction" && "bg-muted"
            )}
          >
            <LocateFixed className="h-3.5 w-3.5" />
            Review citations
          </Button>
          <Button
            type="button"
            variant={viewMode === "split" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("split")}
            className={cn(
              "w-full justify-start gap-2 text-xs",
              viewMode === "split" && "bg-muted"
            )}
          >
            <Layers className="h-3.5 w-3.5" />
            Page splits
          </Button>
        </div>

        <div className="mt-auto border-t border-border/40 p-4">
          <p className="text-xs leading-5 text-muted-foreground/70">
            Source-linked fields highlight their evidence in the document viewer when available.
          </p>
        </div>
      </div>
    </aside>
  );
}
