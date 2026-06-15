/**
 * Right pane showing list of document splits.
 * @module components/documents/split-results-pane
 */
import { AlertTriangle, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SplitCard } from "./split-card";
import type { PageRange } from "@/types/documents";

/**
 * Extracts page reference from duplicate description.
 * "Copy of p.1" → "1", "Receipt for p.13-15" → "13-15"
 */
function extractPageRef(description: string): string | null {
  const match = description.match(/p\.(\d+(?:-\d+)?)/);
  return match ? match[1] : null;
}

/**
 * Formats page range as string (e.g., "3" or "3-5")
 */
function formatPageRange(start: number, end: number): string {
  return start === end ? `${start}` : `${start}-${end}`;
}

/**
 * Formats a document tag count for the compact summary row.
 */
function formatTagCount(tag: string, count: number): string {
  const label = tag.replace(/_/g, " ");
  return `${count} ${count === 1 && label.endsWith("s") ? label.slice(0, -1) : label}`;
}

interface SplitResultsPaneProps {
  /** Array of splits to display */
  splits: PageRange[];
  /** Document type counts from tags JSONB */
  tags?: Record<string, number> | null;
  /** Callback when a split card is clicked */
  onPageClick: (page: number) => void;
  /** Callback to return to extraction view (only shown when extraction data exists) */
  onBackToExtraction?: () => void;
}

/**
 * Displays a scrollable list of split cards with header.
 */
export function SplitResultsPane({ splits, tags, onPageClick, onBackToExtraction }: SplitResultsPaneProps) {
  const duplicateSplits = splits.filter((s) => s.potential_duplicate);
  const label = splits.length === 1 ? "document" : "documents";
  const duplicatePages = duplicateSplits.map((split) => split.startPage).join(", ");
  const tagSummary = tags
    ? Object.entries(tags)
      .filter(([, count]) => count > 0)
      .map(([tag, count]) => formatTagCount(tag, count))
      .join(", ")
    : null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border/40 bg-card px-5 py-2">
        <div className="flex items-start gap-2">
          <div className="min-w-0">
            <div className="flex h-7 items-center">
              <FileText className="mr-2 h-4 w-4" />
              <span className="text-xs font-medium text-foreground/85">
                Splitter Results
              </span>
              <span className="ml-1.5 text-xs text-muted-foreground">
                ({splits.length})
              </span>
              <span className="ml-2 text-xs text-muted-foreground/70">
                {splits.length} {label}
              </span>
            </div>
            {tagSummary && (
              <p className="mt-0.5 truncate text-xs text-muted-foreground/70">
                {tagSummary}
              </p>
            )}
            {duplicateSplits.length > 0 && (
              <p className="mt-0.5 text-xs text-warning/80">
                Potential duplicates on pages {duplicatePages}
              </p>
            )}
          </div>
          {duplicateSplits.length > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">
                    <AlertTriangle className="h-4 w-4 text-warning/80" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[280px]">
                  <p className="font-medium">Potential duplicates</p>
                  <ul className="text-xs text-background/70 mt-1 space-y-0.5">
                    {duplicateSplits.map((split, i) => {
                      const refPage = extractPageRef(split.potential_duplicate!);
                      const thisPage = formatPageRange(split.startPage, split.endPage);
                      return (
                        <li key={i}>
                          • p.{refPage} ↔ p.{thisPage}
                        </li>
                      );
                    })}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <div className="flex-1" />
          {onBackToExtraction && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBackToExtraction}
              className="h-7 px-2.5 text-xs font-normal border-border/50"
            >
              <ArrowLeft className="h-3 w-3 mr-1.5" />
              Back to Extraction
            </Button>
          )}
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {splits.length === 0 ? (
          <div className="rounded-xl border border-border/40 bg-card p-12 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground/35" />
            <p className="mt-5 text-sm font-medium text-foreground">
              No page groups yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              No splits found
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground/70">
              This document is uploaded, but processing has not produced split
              metadata for review yet.
            </p>
          </div>
        ) : (
          splits.map((split, index) => (
            <SplitCard key={index} split={split} onPageClick={onPageClick} />
          ))
        )}
      </div>
    </div>
  );
}
