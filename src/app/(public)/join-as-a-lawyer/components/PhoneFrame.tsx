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
};

export default function PhoneFrame({ screenshot, alt = "", children, className, floatDelay, preload }: PhoneFrameProps) {
  return (
    <div className={cn("w-[240px] sm:w-[270px]", className)}>
      <div className="animate-float" style={floatDelay ? { animationDelay: floatDelay } : undefined}>
        <div className="relative aspect-[9/19.5] rounded-[46px] border-[10px] border-[#151a23] bg-[#151a23] shadow-[0_30px_70px_rgba(10,37,64,.35)] ring-1 ring-white/10">
          <span className="absolute -left-[13px] top-24 h-10 w-[3px] rounded-l bg-[#151a23]" aria-hidden="true" />
          <span className="absolute -left-[13px] top-36 h-14 w-[3px] rounded-l bg-[#151a23]" aria-hidden="true" />
          <span className="absolute -right-[13px] top-32 h-20 w-[3px] rounded-r bg-[#151a23]" aria-hidden="true" />
          <div className="relative h-full overflow-hidden rounded-[36px] bg-white">
            <span
              className="absolute left-1/2 top-2 z-10 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-[#151a23]"
              aria-hidden="true"
            />
            {screenshot ? (
              <Image
                src={screenshot}
                alt={alt}
                fill
                sizes="270px"
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
