import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  id,
  style,
  ...props
}: InputProps) {
  return (
    <label
      htmlFor={id}
      style={{
        display: "grid",
        gap: 8,
      }}
    >
      {label && (
        <span
          style={{
            color: "var(--text)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {label}
        </span>
      )}

      <input
        id={id}
        {...props}
        style={{
          width: "100%",
          padding: "11px 12px",
          background: "var(--surface-light)",
          color: "var(--text)",
          border: error
            ? "1px solid rgba(239, 68, 68, 0.7)"
            : "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          outline: "none",
          ...style,
        }}
      />

      {error && (
        <span
          style={{
            color: "#fca5a5",
            fontSize: 13,
          }}
        >
          {error}
        </span>
      )}
    </label>
  );
}