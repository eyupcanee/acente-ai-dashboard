import { useState } from "react";
import {
  Pencil,
  Trash2,
  MoreHorizontal,
  MessageSquareText,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PolicyForm } from "./PolicyForm";
import { useDeletePolicy } from "@/hooks/usePolicies";
import { type Policy, type PolicyUpdate } from "@/types";
import { toast } from "sonner";
import { useChatStore } from "@/lib/chat-store";

interface ActionCellProps {
  policy: Policy;
}

export const ActionCell = ({ policy }: ActionCellProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { mutate: deletePolicy, isPending: isDeleting } = useDeletePolicy();
  const openWithInquiry = useChatStore((state) => state.openWithInquiry);

  const handleEditSubmit = (data: PolicyUpdate) => {
    console.log("Güncellenen Veri:", data);
    setIsEditDialogOpen(false);
    toast.success(`${policy.customer} policy has been successfully updated.`);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
        onClick={() => openWithInquiry(policy.customer, policy.type)}
      >
        <MessageSquareText className="h-4 w-4 mr-2" />
        Inquire
      </Button>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-zinc-500 hover:text-white"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
              ) : (
                <MoreHorizontal className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-zinc-900 border-zinc-800 text-zinc-300 shadow-2xl"
          >
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer focus:bg-amber-500/10 focus:text-amber-500">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Policy
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuItem
              className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer"
              onClick={() => {
                if (
                  window.confirm(
                    "Bu poliçeyi silmek istediğinize emin misiniz?",
                  )
                ) {
                  deletePolicy(policy.id);
                }
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Policy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">
              Edit Policy:{" "}
              <span className="text-amber-500">{policy.customer}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="pt-4">
            <PolicyForm defaultValues={policy} onSubmit={handleEditSubmit} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
