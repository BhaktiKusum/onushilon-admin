"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export interface McqColumn {
  key: string;
  label: string;
  visible: boolean;
}

interface Props {
  columns: McqColumn[];

  onToggle: (
    key: string,
  ) => void;
}

export default function McqColumnSelector({
  columns,
  onToggle,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
      >
        <Button variant="outline">
          Columns
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        {columns.map(
          (column) => (
            <DropdownMenuCheckboxItem
              key={
                column.key
              }
              checked={
                column.visible
              }
              onCheckedChange={() =>
                onToggle(
                  column.key,
                )
              }
            >
              {
                column.label
              }
            </DropdownMenuCheckboxItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}