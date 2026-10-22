import type { IconComponent } from "@/assets/icons";
import { cn } from "@/lib/utils";

type IconProps = {
  icon: IconComponent;
  className?: string;
  strokeWidth?: number;
};

export default function Icon({ icon: Glyph, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <Glyph
      aria-hidden="true"
      focusable="false"
      strokeWidth={strokeWidth}
      className={cn("inline-block h-[1em] w-[1em] shrink-0 align-[-0.125em]", className)}
    />
  );
}
