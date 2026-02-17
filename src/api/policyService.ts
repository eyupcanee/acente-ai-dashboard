import type { Policy } from "@/types";

let MOCK_POLICIES: Policy[] = [
  {
    id: "1",
    customer: "James Anderson",
    type: "Auto",
    premium: "$1,450",
    status: "Pending",
  },
  {
    id: "2",
    customer: "Sophia Martinez",
    type: "Health",
    premium: "$820",
    status: "Approved",
  },
  {
    id: "3",
    customer: "Liam Johnson",
    type: "Home",
    premium: "$2,100",
    status: "Payment Required",
  },
  {
    id: "4",
    customer: "Emma Wilson",
    type: "Travel",
    premium: "$120",
    status: "Approved",
  },
  {
    id: "5",
    customer: "Oliver Brown",
    type: "Auto",
    premium: "$1,100",
    status: "Pending",
  },
  {
    id: "6",
    customer: "Isabella Garcia",
    type: "Health",
    premium: "$950",
    status: "Approved",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const policyService = {
  getPolicies: async (): Promise<Policy[]> => {
    await delay(800);
    return [...MOCK_POLICIES];
  },

  deletePolicy: async (id: string): Promise<void> => {
    await delay(500);
    MOCK_POLICIES = MOCK_POLICIES.filter((p) => p.id !== id);
  },

  updatePolicy: async (updatedPolicy: Policy): Promise<Policy> => {
    await delay(500);
    MOCK_POLICIES = MOCK_POLICIES.map((p) =>
      p.id === updatedPolicy.id ? updatedPolicy : p,
    );
    return updatedPolicy;
  },

  createPolicy: async (policy: Omit<Policy, "id">): Promise<Policy> => {
    await delay(500);
    const newPolicy = {
      ...policy,
      id: Math.random().toString(36).substr(2, 9),
    };
    MOCK_POLICIES.push(newPolicy);
    return newPolicy;
  },
};
