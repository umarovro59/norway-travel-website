import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Stats.module.css";

type StatsProps = {
  items: { value: string; label: string }[];
  className?: string;
};

export function Stats({ items, className }: StatsProps) {
  return (
    <dl className={`${styles.stats} ${className ?? ""}`}>
      {items.map((item, i) => (
        <Reveal key={item.label} className={styles.item} delay={i * 110}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </Reveal>
      ))}
    </dl>
  );
}
