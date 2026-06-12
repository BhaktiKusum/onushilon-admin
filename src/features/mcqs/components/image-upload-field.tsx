"use client";

import { useRef } from "react";

import Image from "next/image";

import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useUploadImage } from "../hooks/use-upload-image";

interface Props {
  value?: string | null;

  onChange: (value: string | null) => void;

  label: string;
}

export default function ImageUploadField({ value, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync, isPending } = useUploadImage();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const response = await mutateAsync(file);

      onChange(response.url);
    } catch {
      // handled by mutation
    }
  };

  const removeImage = () => {
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      {!value ? (
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => inputRef.current?.click()}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />

          {isPending ? "Uploading..." : "Upload Image"}
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-lg border">
            <Image
              src={value}
              alt={label}
              width={800}
              height={400}
              className="max-h-72 w-full object-contain"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
            >
              Replace
            </Button>

            <Button type="button" variant="destructive" onClick={removeImage}>
              <X className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
