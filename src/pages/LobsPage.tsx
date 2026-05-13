import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { useControlTower } from "../controlTower/ControlTowerContext";
import { blankLob, LOB_FORM_FIELDS, parseLobProfile } from "../controlTower/lobEntityForms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function LobsPage() {
  const { listLobs, upsertLob, deleteLob, nextLobId } = useControlTower();
  const lobs = listLobs();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});

  function openCreate() {
    setDraft(blankLob(nextLobId));
    setOpen(true);
  }

  function submitNew() {
    upsertLob(parseLobProfile(draft));
    setOpen(false);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">LOB 360</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">LOB 360</strong> is the workspace for one line of business:
          profile plus outcomes, requirements, gaps, actions, risks, training, KPIs, meetings, and
          artifacts. See{" "}
          <Link to="/system-design#lob-360" className="text-primary underline-offset-4 hover:underline">
            What is LOB 360?
          </Link>
          . Seed data loads from <code className="rounded bg-muted px-1 py-0.5 text-xs">normalizedSeed.json</code>;
          edits persist in this browser until you reset or replace Phase 2 APIs.
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="button" size="sm" onClick={openCreate}>
          <Plus className="mr-1 h-4 w-4" />
          Add LOB
        </Button>
      </div>

      <div className="grid gap-3">
        {lobs.map((lob) => (
          <Card key={lob.lobId} className="overflow-hidden border-border/80 bg-card/50">
            <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
              <div className="min-w-0 flex-1">
                <CardTitle className="truncate text-base">
                  <Link
                    to={`/lobs/${encodeURIComponent(lob.lobId)}`}
                    className="text-primary hover:underline"
                  >
                    {lob.lobName}
                  </Link>
                </CardTitle>
                <CardDescription className="mt-1 font-mono text-xs">
                  {lob.lobId} · {lob.currentEpStatus} · {lob.health}
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 text-destructive hover:text-destructive"
                aria-label={`Delete ${lob.lobName}`}
                onClick={() => {
                  if (
                    window.confirm(
                      `Delete LOB "${lob.lobName}" and all nested rows for this LOB in local data?`,
                    )
                  ) {
                    deleteLob(lob.lobId);
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <Link to={`/lobs/${encodeURIComponent(lob.lobId)}`}>
                <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                  Open workspace
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New LOB profile</DialogTitle>
            <DialogDescription>
              Creates a new LOB partition in local storage. Use a unique LOB ID; it becomes the URL
              segment and Dynamo partition key in Phase 2.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            {LOB_FORM_FIELDS.map((f) => (
              <div key={f.key} className="grid gap-1.5">
                <Label htmlFor={`new-lob-${f.key}`}>{f.label}</Label>
                {f.multiline ? (
                  <textarea
                    id={`new-lob-${f.key}`}
                    className={cn(
                      "flex min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    )}
                    value={draft[f.key] ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                  />
                ) : (
                  <Input
                    id={`new-lob-${f.key}`}
                    value={draft[f.key] ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={submitNew}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
