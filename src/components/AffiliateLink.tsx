"use client";

import { ReactNode } from "react";

interface AffiliateLinkProps {
  href: string;
  provider: string;
  children: ReactNode;
  className?: string;
}

type GtagEvent = (
  command: "event",
  eventName: string,
  params: Record<string, string>,
) => void;

export default function AffiliateLink({ href, provider, children, className }: AffiliateLinkProps) {
  function handleClick() {
    const gtag = (window as Window & { gtag?: GtagEvent }).gtag;

    if (typeof gtag === "function") {
      gtag("event", "affiliate_click", {
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
