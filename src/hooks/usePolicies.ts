import { useQuery } from "@tanstack/react-query";
import { policyService } from "../api/policyService";

export const usePolicies = () => {
  return useQuery({
    queryKey: ["policies"],
    queryFn: policyService.getPolicies,
  });
};
