export type PolicyStatus = "Pending" | "Approved" | "Payment Required";
export type PolicyType = "Auto" | "Health" | "Home" | "Travel";

export interface Policy {
  id: string;
  customer: string;
  type: PolicyType;
  premium: string;
  status: PolicyStatus;
}
