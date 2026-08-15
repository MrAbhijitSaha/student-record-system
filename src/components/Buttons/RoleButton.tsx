"use client";

import { ReactNode } from "react";

type Props = {
  active: boolean;
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

const RoleButton = ({ active, icon, title, description, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded border p-4 text-left transition ${
        active ? "border-primary bg-primary/5" : "hover:bg-muted"
      }`}>
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded ${
          active ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}>
        {icon}
      </div>

      <div>
        <p className="font-medium">{title}</p>

        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </button>
  );
};

export default RoleButton;
