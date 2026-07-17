import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "neutral" | "success" | "warning" | "danger";
};

const variantStyles = {
  neutral: {
    background: "rgba(148, 163, 184, 0.14)",
    color: "var(--muted)",
  },
  success: {
    background: "rgba(34, 197, 94, 0.14)",
    color: "#86efac",
  },
  warning: {
    background: "rgba(234, 179, 8, 0.14)",
    color: "#fde047",
  },
  danger: {
    background: "rgba(239, 68, 68, 0.14)",
    color: "#fca5a5",
  },
};

export default function Badge({
  children,
  variant = "neutral",
}: BadgeProps) {
  return (
    <span
      style={{
        ...variantStyles[variant],
        display: "inline-flex",
        alignItems: "center",
        width: "fit-content",
        padding: "4px 9px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}