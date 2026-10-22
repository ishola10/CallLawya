"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type LawyerAvatarProps = {
  src: string | null;
  name: string;
  initials: string;
  sizes: string;
  className?: string;
  initialsClassName?: string;
  preload?: boolean;
};

export default function LawyerAvatar({
  src,
  name,
  initials,
  sizes,
  className,
  initialsClassName,
  preload,
}: LawyerAvatarProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-navy", className)}>
      {src && !failed ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={sizes}
          className="object-cover"
          preload={preload}
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          role="img"
          aria-label={name}
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy to-brand font-serif font-bold text-white",
            initialsClassName,
          )}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
