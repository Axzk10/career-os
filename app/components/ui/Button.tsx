import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

const variantStyles = {
  primary: {
    background: "var(--yellow)",
    color: "#111",
    border: "1px solid transparent",
  },
  secondary: {
    background: "var(--surface-light)",
    color: "var(--text)",
    border: "1px solid var(--border)",
  },
  danger: {
    background: "rgba(239, 68, 68, 0.14)",
    color: "#fca5a5",
    border: "1px solid rgba(239, 68, 68, 0.35)",
  },
};

export default function Button({
  children,
  variant = "primary",
  style,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        ...variantStyles[variant],
        borderRadius: "var(--radius-sm)",
        padding: "10px 16px",
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.65 : 1,
        transition: "var(--transition-fast)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
