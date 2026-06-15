/**
 * Cases dashboard page component.
 * Loaded lazily via TanStack Router to keep landing bundle lean.
 */
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCases } from "@/hooks/use-cases";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CasesTable } from "@/components/cases/cases-table";
import { CreateCaseDialog } from "@/components/cases/create-case-dialog";
import { AppLayout } from "@/components/layout/app-layout";
import { Briefcase, FileCheck2, FileText, Plus, Search } from "lucide-react";
import { Stepper } from "@/components/extendui/stepper";

export const Route = createLazyFileRoute("/cases/")({
  component: CasesPage,
});

export function CasesPage() {
  const [search, setSearch] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { data: cases = [], isLoading } = useCases({ filter: "all", search });

  return (
    <AppLayout>
      <div className="px-12 py-10">
        {/* Header section with title and subtitle */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Workspace
          </h1>
          <p className="mt-2 text-sm text-muted-foreground/80">
            Build claim dossiers from messy documents: upload files, verify cited fields, and generate report artifacts.
          </p>
        </div>

        {/* New button aligned right */}
        <div className="mt-6 flex justify-end">
          <Button
            className="h-7 px-3 text-xs font-normal bg-foreground text-background hover:bg-foreground/90 rounded-lg shadow-sm"
            onClick={() => setCreateDialogOpen(true)}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            New claim case
          </Button>
        </div>

        {/* Search bar */}
        <div className="mt-3 relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            placeholder="Search your folders by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 w-full border-border/50 shadow-sm focus-visible:ring-1"
          />
        </div>

        {/* Table or empty state */}
        <div className="mt-6">
          {/* Defensive fallback - data should be prefetched by route loader */}
          {isLoading ? null : cases.length === 0 ? (
            <div className="rounded-xl border border-border/40 bg-card p-12 shadow-sm">
              {search ? (
                <div className="text-center">
                  <Search className="mx-auto h-10 w-10 text-muted-foreground/40" />
                  <p className="mt-5 text-sm font-medium text-foreground">
                    No cases match your search
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground/70">
                    Clear the search to return to every claim workspace.
                  </p>
                </div>
              ) : (
                <div className="mx-auto max-w-3xl">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-muted text-foreground">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-foreground">
                        Start with a claim case
                      </p>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground/80">
                        Each case keeps documents, extraction review, validation rules, and generated reports in one workspace.
                      </p>
                    </div>
                  </div>

                  <Stepper value={0} className="mt-8 w-full" separatorWidth={80}>
                    <Stepper.Item step={0}>
                      <Stepper.Trigger disabled>
                        <Stepper.Indicator variant="outline">
                          <FileText className="h-3.5 w-3.5" />
                        </Stepper.Indicator>
                        <div className="text-left">
                          <Stepper.Title>Create case</Stepper.Title>
                          <Stepper.Description>Open a legal claim workspace</Stepper.Description>
                        </div>
                      </Stepper.Trigger>
                      <Stepper.Separator />
                    </Stepper.Item>
                    <Stepper.Item step={1}>
                      <Stepper.Trigger disabled>
                        <Stepper.Indicator variant="outline" />
                        <div className="text-left">
                          <Stepper.Title>Upload</Stepper.Title>
                          <Stepper.Description>Add PDFs, scans, and bundles</Stepper.Description>
                        </div>
                      </Stepper.Trigger>
                      <Stepper.Separator />
                    </Stepper.Item>
                    <Stepper.Item step={2}>
                      <Stepper.Trigger disabled>
                        <Stepper.Indicator variant="outline">
                          <FileCheck2 className="h-3.5 w-3.5" />
                        </Stepper.Indicator>
                        <div className="text-left">
                          <Stepper.Title>Review</Stepper.Title>
                          <Stepper.Description>Verify fields against citations</Stepper.Description>
                        </div>
                      </Stepper.Trigger>
                    </Stepper.Item>
                  </Stepper>

                  <div className="mt-8 flex justify-end">
                    <Button onClick={() => setCreateDialogOpen(true)}>
                      <Plus className="mr-1.5 h-4 w-4" />
                      New claim case
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <CasesTable cases={cases} />
          )}
        </div>
      </div>

      <CreateCaseDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </AppLayout>
  );
}
