import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowIcon({ direction = "right", ...props }: IconProps & { direction?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}
      {...props}
    >
      <path d="M4 12h15.5M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false" {...props}>
      <path d="M3 9h18M8 15h13" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false" {...props}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function QuoteMark(props: IconProps) {
  return (
    <svg viewBox="0 0 64 48" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M0 48V30.4C0 14.9 7.1 4.8 21.4 0l3.2 5.6C16.4 9.3 12.3 15.1 12 23.2h12V48H0Zm38.4 0V30.4C38.4 14.9 45.5 4.8 59.8 0L63 5.6c-8.2 3.7-12.3 9.5-12.6 17.6h12V48H38.4Z" />
    </svg>
  );
}

/* Social placeholders — generic outlines, swap for official marks when links exist. */
export function SocialIcon({ id, ...props }: IconProps & { id: "instagram" | "youtube" | "facebook" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false" {...props}>
      {id === "instagram" && (
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
        </>
      )}
      {id === "youtube" && (
        <>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="m10 9.2 5 2.8-5 2.8Z" fill="currentColor" stroke="none" />
        </>
      )}
      {id === "facebook" && <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a20 20 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21" />}
    </svg>
  );
}
