import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { policyService } from "@/api/policyService";
import type { Policy } from "@/types";

export const usePolicies = () => {
  return useQuery({
    queryKey: ["policies"],
    queryFn: policyService.getPolicies,
  });
};

export const useDeletePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: policyService.deletePolicy,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["policies"] });
      const previousPolicies = queryClient.getQueryData<Policy[]>(["policies"]);

      queryClient.setQueryData<Policy[]>(["policies"], (old) =>
        old ? old.filter((p) => p.id !== id) : [],
      );

      return { previousPolicies };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(["policies"], context?.previousPolicies);
      console.error("Delete failed, rolling back...", err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
    },
  });
};
