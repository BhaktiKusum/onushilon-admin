"use client";

import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  onSearchChange: (
    value: string,
  ) => void;
}

export default function McqFilters({
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="flex gap-4">
      <Input
        value={search}
        placeholder="Search question..."
        onChange={(event) =>
          onSearchChange(
            event.target.value,
          )
        }
      />
    </div>
  );
}