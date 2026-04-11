/**
 * Awin Affiliate Utility
 * Publisher ID: 2793280
 *
 * Deep link format:
 * https://www.awin1.com/cread.php?awinmid={ADVERTISER_ID}&awinaffid={PUBLISHER_ID}&ued={ENCODED_DESTINATION_URL}
 */

const PUBLISHER_ID =
  process.env.NEXT_PUBLIC_AWIN_PUBLISHER_ID ?? "2793280";

/**
 * Build a tracked Awin deep link for an advertiser.
 *
 * @param awinmid   - Advertiser ID from the Awin dashboard (My Advertisers)
 * @param destinationUrl - The target URL on the advertiser's site
 * @returns Fully-formed Awin tracking URL
 */
export function buildAwinLink(
  awinmid: number,
  destinationUrl: string
): string {
  const encoded = encodeURIComponent(destinationUrl);
  return `https://www.awin1.com/cread.php?awinmid=${awinmid}&awinaffid=${PUBLISHER_ID}&ued=${encoded}`;
}
