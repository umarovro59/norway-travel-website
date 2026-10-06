import styles from "./SectionLabel.module.css";

type SectionLabelProps = {
  children: string;
  tone?: "dark" | "light";
  className?: string;
};

/** Small uppercase eyebrow with a thin leading rule. */
export function SectionLabel({ children, tone = "dark", className }: SectionLabelProps) {
  return (
    <p className={`${styles.label} ${tone === "light" ? styles.light : ""} ${className ?? ""}`}>
      <span className={styles.rule} aria-hidden="true" />
      {children}
    </p>
  );
}
