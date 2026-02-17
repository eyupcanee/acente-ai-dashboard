import type { ColumnDef } from "@tanstack/react-table";
import type { Policy } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-500 hover:bg-green-600";
    case "Pending":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "Payment Required":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500";
  }
};

export const columns: ColumnDef<Policy>[] = [
  {
    accessorKey: "customer",
    header: "Customer Name",
  },
  {
    accessorKey: "type",
    header: "Policy Type",
  },
  {
    accessorKey: "premium",
    header: "Premium",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("premium")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge className={`${getStatusColor(status)} text-white border-0`}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const policy = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          onClick={() => console.log(`Inquire about ${policy.customer}`)}
        >
          <MessageSquareText className="h-4 w-4" />
          Inquire
        </Button>
      );
    },
  },
];
