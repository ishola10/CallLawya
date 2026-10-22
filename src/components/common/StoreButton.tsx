import { STORE_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { faApple, faGooglePlay } from "@/assets/icons";
import Icon from "./Icon";

const STORES = {
  googlePlay: { icon: faGooglePlay, caption: "GET IT ON", name: "Google Play" },
  appStore: { icon: faApple, caption: "DOWNLOAD ON THE", name: "App Store" },
} as const;

type StoreButtonProps = {
  store: keyof typeof STORES;
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
};

export default function StoreButton({ store, variant = "dark", compact = false, className }: StoreButtonProps) {
  const { icon, caption, name } = STORES[store];

  return (
    <a
      href={STORE_LINKS[store]}
      className={cn(
        "press inline-flex items-center gap-3 rounded-lg px-6 py-4 text-left",
        variant === "dark" ? "bg-black text-white hover:bg-neutral-900" : "bg-white text-black hover:bg-slate-100",
        className,
      )}
    >
      <Icon icon={icon} className={compact ? "text-lg" : "text-2xl"} />
      {compact ? (
        <strong>{name}</strong>
      ) : (
        <span className="leading-tight">
          <span className="block text-[10px]">{caption}</span>
          <strong>{name}</strong>
        </span>
      )}
    </a>
  );
}
