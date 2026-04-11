import { buildAwinLink } from "@/lib/awin";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface AwinLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  awinmid: number;
  destinationUrl: string;
  children: ReactNode;
}

/**
 * Renders a tracked Awin affiliate link that opens in a new tab.
 * Automatically encodes the destination URL and appends the publisher ID.
 */
export default function AwinLink({
  awinmid,
  destinationUrl,
  children,
  className,
  ...rest
}: AwinLinkProps) {
  const href = buildAwinLink(awinmid, destinationUrl);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
