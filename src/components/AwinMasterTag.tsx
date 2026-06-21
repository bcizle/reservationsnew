/**
 * Awin MasterTag — publisher-side tracking script.
 *
 * Loads Awin's `dwin1.com/{publisherId}.js` bundle, which powers
 * cross-device journey tracking, voucher attribution, and the
 * publisher-side half of conversion attribution for advertisers that
 * require it. Server-to-server postback merchants (Booking.com) work
 * without it, but several smaller programs in our portfolio (and most new
 * Awin advertisers we'll be approved for) need this loaded sitewide to
 * attribute commissions.
 *
 * Loaded with `defer` so it does not block first paint. Awin recommends
 * sitewide placement, so this mounts from the root layout.
 */
const AWIN_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_AWIN_PUBLISHER_ID ?? "2793280";

export default function AwinMasterTag() {
  return (
    <script
      defer
      src={`https://www.dwin1.com/${AWIN_PUBLISHER_ID}.js`}
      type="text/javascript"
    />
  );
}
