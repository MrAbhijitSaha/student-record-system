"use client";

import type { LucideIcon } from "lucide-react";
import { Button } from "../shadcnui/button";

type Role = "student" | "teacher";

type SelectRoleButtonProps = {
  value: Role;
  currentValue: Role;
  onChange: (value: Role) => void;
  icon: LucideIcon;
  title: string;
  description: string;
};

const SelectRoleButton = ({
  value,
  currentValue,
  onChange,
  icon: Icon,
  title,
  description,
}: SelectRoleButtonProps) => {
  const isSelected = currentValue === value;

  return (
    <Button
      type="button"
      onClick={() => onChange(value)}
      aria-pressed={isSelected}
      className={[
        "rounded border p-4 text-left",
        "transition-colors",
        "hover:bg-muted",
        isSelected ? "border-primary bg-primary/5" : "",
      ].join(" ")}>
      <div className="flex items-center gap-3">
        <div
          className={[
            "flex size-10 items-center justify-center rounded",
            isSelected ?
              "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
          ].join(" ")}>
          <Icon className="size-5" />
        </div>

        <div>
          <p className="font-medium">{title}</p>

          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </Button>
  );
};

export default SelectRoleButton;
