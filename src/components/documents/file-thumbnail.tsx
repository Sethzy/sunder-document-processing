/**
 * Small file thumbnail primitive for document rows, upload queue items, and report artifacts.
 * @module components/documents/file-thumbnail
 */
import {
  File,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileType,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileThumbnailProps {
  /** File name used for extension detection and accessible label text. */
  filename: string;
  /** Optional explicit file extension or MIME-ish type. */
  fileType?: string | null;
  /** Visual size of the thumbnail. */
  size?: "sm" | "md" | "lg";
  /** Additional class names for the outer thumbnail. */
  className?: string;
}

interface FileVisualConfig {
  Icon: LucideIcon;
  label: string;
  className: string;
}

/**
 * Extracts a normalized extension from either a file type or filename.
 */
function getFileExtension(filename: string, fileType?: string | null): string {
  const typeExtension = fileType?.split("/").pop()?.toLowerCase();
  if (typeExtension && typeExtension !== "octet-stream") return typeExtension;
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

/**
 * Returns icon and color treatment for common document file types.
 */
function getFileVisualConfig(extension: string): FileVisualConfig {
  if (["pdf"].includes(extension)) {
    return {
      Icon: FileText,
      label: "PDF",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (["png", "jpg", "jpeg", "gif", "webp", "bmp", "heic"].includes(extension)) {
    return {
      Icon: FileImage,
      label: "IMG",
      className: "border-blue-200 bg-blue-50 text-blue-700",
    };
  }

  if (["xlsx", "xls", "csv"].includes(extension)) {
    return {
      Icon: FileSpreadsheet,
      label: extension === "csv" ? "CSV" : "XLS",
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }

  if (["doc", "docx"].includes(extension)) {
    return {
      Icon: FileType,
      label: "DOC",
      className: "border-sky-200 bg-sky-50 text-sky-700",
    };
  }

  return {
    Icon: File,
    label: "FILE",
    className: "border-border bg-muted/40 text-muted-foreground",
  };
}

/**
 * Renders a compact file thumbnail with a semantic file-type icon and label.
 */
export function FileThumbnail({
  filename,
  fileType,
  size = "md",
  className,
}: FileThumbnailProps) {
  const extension = getFileExtension(filename, fileType);
  const config = getFileVisualConfig(extension);
  const { Icon } = config;

  return (
    <div
      aria-label={`${config.label} file thumbnail for ${filename}`}
      className={cn(
        "flex shrink-0 flex-col items-center justify-center rounded-md border font-semibold",
        config.className,
        size === "sm" && "h-8 w-7 gap-0.5 text-[8px]",
        size === "md" && "h-10 w-8 gap-0.5 text-[9px]",
        size === "lg" && "h-14 w-12 gap-1 text-[10px]",
        className
      )}
    >
      <Icon
        className={cn(
          size === "sm" && "h-3.5 w-3.5",
          size === "md" && "h-4 w-4",
          size === "lg" && "h-5 w-5"
        )}
      />
      <span>{config.label}</span>
    </div>
  );
}
