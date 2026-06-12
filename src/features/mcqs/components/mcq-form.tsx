"use client";

import { useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import OptionFields from "./option-fields";

import ReferenceFields from "./reference-fields";
import ImageUploadField from "./image-upload-field";

interface Props {
  form: any;
  onSubmit: (
    values: any,
  ) => void;
  isPending?: boolean;
  submitText?: string;
}

export default function McqForm({
  form,
  onSubmit,
  isPending,
  submitText = "Save",
}: Props) {
  const optionFields =
    useFieldArray({
      control:
        form.control,
      name: "options",
    });

  const referenceFields =
    useFieldArray({
      control:
        form.control,
      name: "references",
    });

  const optionValues =
    form.watch(
      "options",
    );

  return (
    <form
      onSubmit={form.handleSubmit(
        onSubmit,
      )}
      className="space-y-6"
    >
      {/* Scenario */}
      <div className="space-y-3 rounded-lg border p-4">
        <h3 className="font-semibold">
          Scenario
        </h3>

        <textarea
          className="min-h-[100px] w-full rounded-md border p-3"
          placeholder="Scenario text"
          {...form.register(
            "scenario.text",
          )}
        />

        <ImageUploadField
          label="Scenario Image"
          value={form.watch(
            "scenario.image",
          )}
          onChange={(url) =>
            form.setValue(
              "scenario.image",
              url,
            )
          }
        />
      </div>

      {/* Question */}
      <div className="space-y-3 rounded-lg border p-4">
        <h3 className="font-semibold">
          Question
        </h3>

        <textarea
          className="min-h-[120px] w-full rounded-md border p-3"
          placeholder="Question text"
          {...form.register(
            "question.text",
          )}
        />

        <ImageUploadField
  label="Question Image"
  value={form.watch(
    "question.image",
  )}
  onChange={(url) =>
    form.setValue(
      "question.image",
      url,
    )
  }
/>

      </div>

      {/* Options */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-semibold">
          Options
        </h3>

        <OptionFields
  fields={optionFields.fields}
  append={optionFields.append}
  remove={optionFields.remove}
  register={form.register}
  watch={form.watch}
  setValue={form.setValue}
/>
      </div>

      {/* Correct Answer */}
      <div className="space-y-3 rounded-lg border p-4">
        <h3 className="font-semibold">
          Correct Answer
        </h3>

        <Select
          value={form.watch(
            "correctOptionKey",
          )}
          onValueChange={(
            value,
          ) =>
            form.setValue(
              "correctOptionKey",
              value,
            )
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Correct Answer" />
          </SelectTrigger>

          <SelectContent>
            {optionValues?.map(
              (
                option: any,
                index: number,
              ) => (
                <SelectItem
                  key={
                    option.key
                  }
                  value={
                    option.key
                  }
                >
                  {
                    option.key
                  }
                  {" - "}
                  Option{" "}
                  {index +
                    1}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Explanation */}
      <div className="space-y-3 rounded-lg border p-4">
        <h3 className="font-semibold">
          Explanation
        </h3>

        <textarea
          className="min-h-[100px] w-full rounded-md border p-3"
          placeholder="Explanation"
          {...form.register(
            "explanation.text",
          )}
        />

<ImageUploadField
  label="Explanation Image"
  value={form.watch(
    "explanation.image",
  )}
  onChange={(url) =>
    form.setValue(
      "explanation.image",
      url,
    )
  }
/>
      </div>

      {/* References */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-semibold">
          References
        </h3>

        <ReferenceFields
          fields={
            referenceFields.fields
          }
          append={
            referenceFields.append
          }
          remove={
            referenceFields.remove
          }
          register={
            form.register
          }
        />
      </div>

      {/* Difficulty */}
      <div className="space-y-3 rounded-lg border p-4">
        <h3 className="font-semibold">
          Difficulty
        </h3>

        <Select
          value={form.watch(
            "difficulty",
          )}
          onValueChange={(
            value,
          ) =>
            form.setValue(
              "difficulty",
              value,
            )
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="EASY">
              EASY
            </SelectItem>

            <SelectItem value="MEDIUM">
              MEDIUM
            </SelectItem>

            <SelectItem value="HARD">
              HARD
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={
          isPending
        }
        className="w-full"
      >
        {isPending
          ? "Saving..."
          : submitText}
      </Button>
    </form>
  );
}