export const POLICY_TYPES = ["Auto", "Health", "Home", "Travel"] as const;
export type PolicyType = (typeof POLICY_TYPES)[number];
export const POLICY_STATUSES = [
  "Pending",
  "Approved",
  "Payment Required",
] as const;
export type PolicyStatus = (typeof POLICY_STATUSES)[number];

export interface Policy {
  id: string;
  customer: string;
  type: PolicyType;
  premium: string;
  status: PolicyStatus;
}

export interface PolicyUpdate {
  customer?: string;
  type?: PolicyType;
  premium?: string;
  status?: PolicyStatus;
}
