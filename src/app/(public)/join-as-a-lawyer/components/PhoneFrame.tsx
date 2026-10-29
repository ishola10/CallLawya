import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PhoneFrameProps = {
  /** App screenshot to show; alternatively pass a coded screen as children. */
  screenshot?: StaticImageData;
  alt?: string;
  children?: ReactNode;
  className?: string;
  /** Offsets the float animation so neighbouring phones don't bob in sync. */
  floatDelay?: string;
  preload?: boolean;
  /** "sm" slims the bezel and notch for phones shown in pairs. */
  size?: "md" | "sm";
};

export default function PhoneFrame({
  screenshot,
  alt = "",
  children,
  className,
  floatDelay,
  preload,
  size = "md",
}: PhoneFrameProps) {
  const small = size === "sm";

  return (
    <div className={cn(small ? "w-[150px] sm:w-[200px] lg:w-[180px] xl:w-[220px]" : "w-[240px] sm:w-[270px]", className)}>
      <div className="animate-float" style={floatDelay ? { animationDelay: floatDelay } : undefined}>
        <div
          className={cn(
            "relative aspect-[9/19.5] border-[#151a23] bg-[#151a23] shadow-[0_30px_70px_rgba(10,37,64,.35)] ring-1 ring-white/10",
            small ? "rounded-[30px] border-[7px] sm:rounded-[38px] sm:border-[8px]" : "rounded-[46px] border-[10px]",
          )}
        >
          <span
            className={cn("absolute top-24 h-10 w-[3px] rounded-l bg-[#151a23]", small ? "-left-[10px]" : "-left-[13px]")}
            aria-hidden="true"
          />
          <span
            className={cn("absolute top-36 h-14 w-[3px] rounded-l bg-[#151a23]", small ? "-left-[10px]" : "-left-[13px]")}
            aria-hidden="true"
          />
          <span
            className={cn("absolute top-32 h-20 w-[3px] rounded-r bg-[#151a23]", small ? "-right-[10px]" : "-right-[13px]")}
            aria-hidden="true"
          />
          <div className={cn("relative h-full overflow-hidden bg-white", small ? "rounded-[23px] sm:rounded-[30px]" : "rounded-[36px]")}>
            <span
              className={cn(
                "absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#151a23]",
                small ? "top-1.5 h-[16px] w-[56px] sm:h-[18px] sm:w-[68px]" : "top-2 h-[22px] w-[84px]",
              )}
              aria-hidden="true"
            />
            {screenshot ? (
              <Image
                src={screenshot}
                alt={alt}
                fill
                sizes={small ? "220px" : "270px"}
                className="object-cover object-top"
                placeholder="blur"
                preload={preload}
              />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
