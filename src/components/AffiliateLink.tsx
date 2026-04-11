"use client";

import { ReactNode } from "react";

interface AffiliateLinkProps {
  href: string;
  provider: string;
  children: ReactNode;
  className?: string;
}

export default function AffiliateLink({ href, provider, children, className }: AffiliateLinkProps) {
  function handleClick() {
    // Track affiliate click in Google Analytics
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "affiliate_click", {
        event_category: "affiliate",
        event_label: provider,
        affiliate_url: href,
      });
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
