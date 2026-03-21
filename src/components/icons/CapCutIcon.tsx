export function CapCutIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192 192"
      fill="none"
      className={className ? `inline-block shrink-0 ${className}` : "inline-block shrink-0"}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12}
    >
      <path d="M170 42 22 124v14c0 6.627 5.373 12 12 12h78c6.627 0 12-5.373 12-12v-9.5" />
      <path d="M170 150 22 68V54c0-6.627 5.373-12 12-12h78c6.627 0 12 5.373 12 12v9.5" />
    </svg>
  );
}
