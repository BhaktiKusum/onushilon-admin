"use client";

import ImageUploadField from "./image-upload-field";

import { Button } from "@/components/ui/button";

interface Props {
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
  register: any;
  watch: any;
  setValue: any;
}

const OPTION_KEYS = [
  "A",
  "B",
  "C",
  "D",
  "E",
];

export default function OptionFields({
  fields,
  append,
  remove,
  register,
  watch,
  setValue,
}: Props) {
  return (
    <div className="space-y-4">
      {fields.map(
        (
          field,
          index,
        ) => (
          <div
            key={field.id}
            className="rounded-lg border p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-semibold">
                Option{" "}
                {OPTION_KEYS[index]}
              </h4>

              {index >= 2 && (
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    remove(index)
                  }
                >
                  Remove
                </Button>
              )}
            </div>

            <input
              type="hidden"
              {...register(
                `options.${index}.key`,
              )}
            />

            <textarea
              className="mb-4 min-h-[100px] w-full rounded-md border p-3"
              placeholder={`Option ${OPTION_KEYS[index]} Text`}
              {...register(
                `options.${index}.text`,
              )}
            />

            <ImageUploadField
              label={`Option ${OPTION_KEYS[index]} Image`}
              value={watch(
                `options.${index}.image`,
              )}
              onChange={(url) =>
                setValue(
                  `options.${index}.image`,
                  url,
                )
              }
            />
          </div>
        ),
      )}

      {fields.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              key:
                OPTION_KEYS[
                  fields.length
                ],
              text: "",
              image: null,
            })
          }
        >
          Add Option
        </Button>
      )}
    </div>
  );
}