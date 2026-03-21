"use client";

export function BackgroundPattern() {
  return (
    <div
      className="fixed inset-0 -z-10 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(to right, var(--color-pattern) 1px, transparent 1px),
          linear-gradient(to bottom, var(--color-pattern) 1px, transparent 1px)
        `,
        backgroundSize: "96px 96px",
      }}
      aria-hidden
    />
  );
}
