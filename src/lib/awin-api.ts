const AWIN_API_BASE = "https://api.awin.com";
const PUBLISHER_ID =
  process.env.NEXT_PUBLIC_AWIN_PUBLISHER_ID ?? "2793280";

function getToken(): string {
  const token = process.env.AWIN_API_TOKEN;
  if (!token) {
    throw new Error("AWIN_API_TOKEN environment variable is not set");
  }
  return token;
}

function headers(): HeadersInit {
  return {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/json",
  };
}

async function awinFetch<T>(path: string): Promise<T> {
  const url = `${AWIN_API_BASE}${path}`;
  const res = await fetch(url, { headers: headers() });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Awin API error ${res.status} for ${path}: ${body}`,
    );
  }

  return res.json() as Promise<T>;
}

// --- Types ---

export interface AwinProgramme {
  id: number;
  name: string;
  displayUrl: string;
  clickThroughUrl: string;
  logoUrl: string;
  primarySector: { id: number; name: string };
  status: string;
  kpiPerformanceRating?: number;
}

export interface AwinTransaction {
  id: number;
  advertiserId: number;
  advertiserName: string;
  publisherId: number;
  commissionStatus: string;
  commissionAmount: { amount: number; currency: string };
  saleAmount: { amount: number; currency: string };
  clickDate: string;
  transactionDate: string;
  validationDate: string | null;
  type: string;
  url: string;
}

export interface AwinCommissionGroup {
  groupId: number;
  groupName: string;
  groupCode: string;
  type: string;
  percentage: number | null;
  amount: number | null;
  currency: string;
}

// --- API Functions ---

/**
 * Get all programmes the publisher has joined (approved).
 */
export async function getJoinedPrograms(): Promise<AwinProgramme[]> {
  return awinFetch<AwinProgramme[]>(
    `/publishers/${PUBLISHER_ID}/programmes?relationship=joined`,
  );
}

/**
 * Get all programmes with a pending application.
 */
export async function getPendingPrograms(): Promise<AwinProgramme[]> {
  return awinFetch<AwinProgramme[]>(
    `/publishers/${PUBLISHER_ID}/programmes?relationship=pending`,
  );
}

/**
 * Get transactions within a date range.
 * @param startDate YYYY-MM-DDT00:00:00 format
 * @param endDate   YYYY-MM-DDT00:00:00 format
 */
export async function getTransactions(
  startDate: string,
  endDate: string,
): Promise<AwinTransaction[]> {
  return awinFetch<AwinTransaction[]>(
    `/publishers/${PUBLISHER_ID}/transactions/?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&timezone=UTC`,
  );
}

/**
 * Get commission groups for a specific advertiser.
 */
export async function getCommissionGroups(
  advertiserId: number,
): Promise<AwinCommissionGroup[]> {
  return awinFetch<AwinCommissionGroup[]>(
    `/publishers/${PUBLISHER_ID}/commissiongroups?advertiserId=${advertiserId}`,
  );
}
