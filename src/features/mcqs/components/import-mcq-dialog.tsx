"use client";

import { useState } from "react";

import { Upload } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { useImportMcqs } from "../hooks/use-import-mcqs";

interface Props {
  subjectId: string;
  chapterId: string;
  topicId: string;
}

export default function ImportMcqDialog({
  subjectId,
  chapterId,
  topicId,
}: Props) {
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const { mutate, isPending } = useImportMcqs();

  const handleImport = () => {
    if (!file) {
      toast.error("Select XLSX file");

      return;
    }

    mutate(
      {
        file,
        subjectId,
        chapterId,
        topicId,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message ?? "MCQs imported successfully");

          setOpen(false);

          setFile(null);
        },

        onError: (error: any) => {
          toast.error(error.response?.data?.message ?? "Import failed");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Import XLSX
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import MCQs</DialogTitle>

          <DialogDescription>
            Upload an XLSX file to create multiple MCQs.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="file"
            accept=".xlsx"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />

          <Button variant="secondary" asChild>
            <a href="/templates/mcq-template.xlsx" download>
              Download Template
            </a>
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={handleImport} disabled={isPending}>
            {isPending ? "Importing..." : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
