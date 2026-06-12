"use client";

import { Button } from "@/components/ui/button";

interface Props {
  fields: any[];
  append: (
    value: any,
  ) => void;
  remove: (
    index: number,
  ) => void;
  register: any;
}

export default function ReferenceFields({
  fields,
  append,
  remove,
  register,
}: Props) {
  return (
    <div className="space-y-4">
      {fields.map(
        (
          field,
          index,
        ) => (
          <div
            key={
              field.id
            }
            className="rounded border p-4"
          >
            <input
              className="mb-2 w-full rounded border p-2"
              placeholder="BOOK"
              {...register(
                `references.${index}.type`,
              )}
            />

            <input
              className="w-full rounded border p-2"
              placeholder="Reference"
              {...register(
                `references.${index}.value`,
              )}
            />

            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="mt-2"
              onClick={() =>
                remove(
                  index,
                )
              }
            >
              Remove
            </Button>
          </div>
        ),
      )}

      <Button
        type="button"
        onClick={() =>
          append({
            type: "",
            value: "",
          })
        }
      >
        Add Reference
      </Button>
    </div>
  );
}