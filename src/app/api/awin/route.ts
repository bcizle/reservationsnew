import { NextRequest, NextResponse } from "next/server";
import {
  getJoinedPrograms,
  getPendingPrograms,
  getTransactions,
} from "@/lib/awin-api";

/**
 * Admin-only Awin dashboard endpoint.
 * Requires `Authorization: Bearer <AWIN_API_TOKEN>` header to access.
 *
 * GET /api/awin
 * Optional query params:
 *   - startDate (YYYY-MM-DD, default: 30 days ago)
 *   - endDate   (YYYY-MM-DD, default: today)
 */
export async function GET(request: NextRequest) {
  // Simple auth: require the same API token as a bearer header
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.AWIN_API_TOKEN;

  if (!expectedToken) {
    return NextResponse.json(
      { error: "AWIN_API_TOKEN not configured" },
      { status: 500 },
    );
  }

  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Date range for transactions (default: last 30 days)
  const searchParams = request.nextUrl.searchParams;
  const endDate =
    searchParams.get("endDate") ?? new Date().toISOString().slice(0, 10);
  const startDate =
    searchParams.get("startDate") ??
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

  try {
    const [joined, pending, transactions] = await Promise.all([
      getJoinedPrograms(),
      getPendingPrograms(),
      getTransactions(
        `${startDate}T00:00:00`,
        `${endDate}T23:59:59`,
      ),
    ]);

    // Summarize transactions
    const totalCommission = transactions.reduce(
      (sum, t) => sum + t.commissionAmount.amount,
      0,
    );
    const totalSales = transactions.reduce(
      (sum, t) => sum + t.saleAmount.amount,
      0,
    );
    const statusCounts = transactions.reduce(
      (acc, t) => {
        acc[t.commissionStatus] = (acc[t.commissionStatus] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return NextResponse.json({
      programs: {
        joined: joined.length,
        pending: pending.length,
        joinedList: joined.map((p) => ({
          id: p.id,
          name: p.name,
          sector: p.primarySector?.name,
        })),
      },
      transactions: {
        period: { startDate, endDate },
        count: transactions.length,
        totalCommission: Math.round(totalCommission * 100) / 100,
        totalSales: Math.round(totalSales * 100) / 100,
        byStatus: statusCounts,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch Awin data", details: message },
      { status: 502 },
    );
  }
}
