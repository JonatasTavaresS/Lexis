"use client";
import React from "react";

interface ButtonProps {
  label: string;
  variant: "primary" | "secondary" | "login";
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  onClick,
  className,
}) => {
  // Use the provided className if available, otherwise use default styling based on variant
  const buttonClassName = className || getDefaultClassName(variant);

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      type={variant === "login" ? "submit" : "button"}
    >
      {label}
    </button>
  );
};

function getDefaultClassName(variant: string): string {
  switch (variant) {
    case "primary":
      return "overflow-hidden flex-1 shrink gap-2 self-stretch px-2 py-2 my-auto rounded-lg border border-solid basis-0 bg-zinc-800 border-zinc-800 text-neutral-100";
    case "secondary":
      return "overflow-hidden flex-1 shrink gap-2 self-stretch p-2 my-auto rounded-lg border border-solid basis-0 bg-neutral-200 border-neutral-500 text-stone-900";
    case "login":
      return "overflow-hidden flex-1 shrink gap-2 self-stretch p-3 my-auto w-full rounded-lg border border-solid basis-0 bg-zinc-800 border-zinc-800 text-neutral-100 min-w-60";
    default:
      return "overflow-hidden flex-1 shrink gap-2 self-stretch p-2 my-auto rounded-lg border border-solid basis-0";
  }
}

export default Button;
