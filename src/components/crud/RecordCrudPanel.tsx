import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type FieldSpec = { key: string; label: string; multiline?: boolean };

function rowToStrings(row: Record<string, unknown>): Record<string, string> {
  const o: Record<string, string> = {};
  for (const [k, v] of Object.entries(row)) {
    o[k] = v === undefined || v === null ? "" : String(v);
  }
  return o;
}

export function RecordCrudPanel({
  title,
  rows,
  idField,
  tableColumns,
  formFields,
  blankRow,
  onSave,
  onDelete,
}: {
  title: string;
  rows: Record<string, unknown>[];
  idField: string;
  tableColumns: FieldSpec[];
  formFields: FieldSpec[];
  blankRow: () => Record<string, string>;
  onSave: (row: Record<string, string>) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});

  function openCreate() {
    setDraft(blankRow());
    setOpen(true);
  }

  function openEdit(row: Record<string, unknown>) {
    setDraft(rowToStrings(row));
    setOpen(true);
  }

  function submit() {
    onSave(draft);
    setOpen(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <Button type="button" size="sm" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
      <div className="rounded-md border border-border bg-card/40">
        <Table>
          <TableHeader>
            <TableRow>
              {tableColumns.map((c) => (
                <TableHead key={c.key}>{c.label}</TableHead>
              ))}
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={tableColumns.length + 1} className="text-muted-foreground">
                  No rows yet. Use Add to create one.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, i) => (
                <TableRow key={String(row[idField] ?? i)}>
                  {tableColumns.map((c) => (
                    <TableCell key={c.key} className="max-w-[14rem] truncate" title={String(row[c.key] ?? "")}>
                      {String(row[c.key] ?? "")}
                    </TableCell>
                  ))}
                  <TableCell className="text-right space-x-1">
                    <Button type="button" variant="ghost" size="icon" onClick={() => openEdit(row)} aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        if (window.confirm("Delete this record?")) onDelete(String(row[idField]));
                      }}
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>Edit fields and save. IDs should stay stable when editing.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            {formFields.map((f) => (
              <div key={f.key} className="grid gap-1.5">
                <Label htmlFor={f.key}>{f.label}</Label>
                {f.multiline ? (
                  <textarea
                    id={f.key}
                    className={cn(
                      "flex min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                    )}
                    value={draft[f.key] ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                  />
                ) : (
                  <Input
                    id={f.key}
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
            <Button type="button" onClick={submit}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
