"use client";

import { useEffect, useState, type ReactNode } from "react";
import { assignVariant, trackExposure } from "@/lib/ab-testing";

interface ABTestProps<T extends string> {
  /** Name of the test — used for variant assignment + GA4 reporting. */
  name: string;
  /** Variant keys. The first variant is the control and the SSR default. */
  variants: readonly T[];
  /** Map of variant key → ReactNode. Must include an entry for every variant. */
  children: Record<T, ReactNode>;
}

/**
 * Render one of N children based on the visitor's variant assignment.
 *
 * On the server (and on the first client render before cookies are
 * available) we render the control variant so the markup is stable. On
 * mount we swap to the assigned variant and fire an exposure event so GA4
 * can compute conversion rates per variant.
 */
export function ABTest<T extends string>({
  name,
  variants,
  children,
}: ABTestProps<T>) {
  const control = variants[0];
  const [variant, setVariant] = useState<T>(control);

  useEffect(() => {
    const assigned = assignVariant(name, variants);
    setVariant(assigned);
    trackExposure(name, assigned);
  }, [name, variants]);

  const node = children[variant] ?? children[control];
  return <>{node}</>;
}
