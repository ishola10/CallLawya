"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { MOBILE_APP, ROUTES, STORE_LINKS } from "@/constants";

const APP_STORE_FALLBACK_MS = 1500;

function openAppOnIOS() {
  const fallback = window.setTimeout(() => {
    window.location.href = STORE_LINKS.appStore;
  }, APP_STORE_FALLBACK_MS);
  const cancel = () => window.clearTimeout(fallback);
  document.addEventListener("visibilitychange", () => document.hidden && cancel(), { once: true });
  window.addEventListener("pagehide", cancel, { once: true });
  window.location.href = `${MOBILE_APP.scheme}://`;
}

function openAppOnAndroid() {
  const fallback = encodeURIComponent(STORE_LINKS.googlePlay);
  window.location.href = `intent://#Intent;scheme=${MOBILE_APP.scheme};package=${MOBILE_APP.androidPackage};S.browser_fallback_url=${fallback};end`;
}

type BookButtonProps = {
  className?: string;
  children: ReactNode;
};

export default function BookButton({ className, children }: BookButtonProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const userAgent = navigator.userAgent;
    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1);
    if (!isAndroid && !isIOS) return;
    event.preventDefault();
    if (isAndroid) openAppOnAndroid();
    else openAppOnIOS();
  };

  return (
    <Link href={ROUTES.download} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
