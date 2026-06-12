"use client";

import { CheckCircle2 } from "lucide-react";

import { Loader2 } from "lucide-react";

import { AlertCircle } from "lucide-react";

interface Props {
  status:
    | "idle"
    | "saving"
    | "saved"
    | "error";
}

export default function McqSaveStatus({
  status,
}: Props) {
  if (status === "saving") {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Saving...
      </div>
    );
  }

  if (status === "saved") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <CheckCircle2 className="h-4 w-4" />
        Saved
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-2 text-sm text-red-600">
        <AlertCircle className="h-4 w-4" />
        Save Failed
      </div>
    );
  }

  return null;
}