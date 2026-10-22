import type { IconDefinition } from "@/assets/icons";
import { cn } from "@/lib/utils";

type IconProps = {
  icon: IconDefinition;
  className?: string;
};

export default function Icon({ icon: [width, height, path], className }: IconProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={cn("inline-block h-[1em] shrink-0 overflow-visible align-[-0.125em]", className)}
      style={{ width: `${(width / height).toFixed(4)}em` }}
    >
      <path d={path} />
    </svg>
  );
}
