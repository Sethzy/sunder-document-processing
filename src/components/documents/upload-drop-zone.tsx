/**
 * Drag-and-drop file upload zone.
 * Displays empty state and handles file selection via drop or click.
 * @module components/documents/upload-drop-zone
 */
import { useState, useRef, useCallback, type DragEvent } from "react";
import { FileCheck2, FileText, ShieldCheck, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ALLOWED_FILE_EXTENSIONS,
  ALLOWED_EXTENSIONS_DISPLAY,
} from "@/contexts/upload-context";

interface UploadDropZoneProps {
  /** Callback when files are selected */
  onFilesSelected: (files: File[]) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A drop zone for uploading files via drag-and-drop or click.
 * Shows empty state with instructions and file type guidance.
 */
export function UploadDropZone({
  onFilesSelected,
  className,
}: UploadDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFilesSelected(files);
      }
    },
    [onFilesSelected]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length > 0) {
        onFilesSelected(files);
      }
      // Reset input so same file can be selected again
      e.target.value = "";
    },
    [onFilesSelected]
  );

  return (
    <div
      data-testid="upload-drop-zone"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "group rounded-xl border border-dashed p-10 text-center cursor-pointer transition-all bg-card shadow-sm",
        isDragOver
          ? "border-foreground bg-foreground/[0.03] shadow-md ring-4 ring-foreground/5"
          : "border-border/60 hover:border-foreground/40 hover:bg-muted/20",
        className
      )}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-border/50 bg-background shadow-sm transition-transform group-hover:-translate-y-0.5">
        <Upload className="h-6 w-6 text-foreground/70" />
      </div>
      <p className="mt-5 text-base font-medium text-foreground">
        Drop claim documents here
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Upload medical expenses, medical reports, income records, combined PDFs,
        and redacted claim files for classification and citation review.
      </p>
      <div className="mt-5 inline-flex h-8 items-center justify-center rounded-md bg-foreground px-3 text-xs font-medium text-background shadow-sm transition-colors group-hover:bg-foreground/90">
        Browse files
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground/80">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background px-2.5 py-1">
          <FileText className="h-3.5 w-3.5" />
          {ALLOWED_EXTENSIONS_DISPLAY}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background px-2.5 py-1">
          <FileCheck2 className="h-3.5 w-3.5" />
          Duplicates flagged
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background px-2.5 py-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          Keep private PDFs out of git
        </span>
      </div>
      <p className="mt-4 text-xs text-muted-foreground/60">
        Each file is uploaded first, then queued for classification, splitting,
        extraction, and citation review.
      </p>

      <input
        ref={inputRef}
        data-testid="file-input"
        type="file"
        multiple
        accept={ALLOWED_FILE_EXTENSIONS.map((ext) => `.${ext}`).join(",")}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
