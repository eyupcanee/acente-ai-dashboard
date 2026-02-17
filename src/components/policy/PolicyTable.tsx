import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PolicyForm } from "./PolicyForm";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterValue: string;
  onSearchChange: (value: string) => void;
}

export function PolicyTable<TData, TValue>({
  columns,
  data,
  filterValue,
  onSearchChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filterValue,
    },
  });

  return (
    <div className="space-y-4 w-full">
      {/* Üst Bar */}
      {/* Üst Bar */}
      <div className="flex items-center justify-between px-6 pt-4">
        {/* Sol: Search */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search policies or customers..."
            value={filterValue}
            onChange={(event) => onSearchChange(event.target.value)}
            className="pl-10 h-10 bg-zinc-900 border-zinc-800 text-zinc-200 focus-visible:ring-amber-500 rounded-lg"
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-10 bg-amber-600 hover:bg-amber-500 text-white gap-2 px-6 font-semibold transition-all active:scale-95">
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">New Quote</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px] shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold tracking-tight">
                Create New Insurance Quote
              </DialogTitle>
            </DialogHeader>
            <div className="pt-4">
              <PolicyForm
                onSubmit={(data) => {
                  console.log("Yeni Kayıt:", data);
                  toast.success("New quote has been created successfully!");
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tablo Gövdesi */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-950/50 text-zinc-500 uppercase text-xs font-bold tracking-wider">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-zinc-800 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="h-12 px-6">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/40 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-6 py-4 text-zinc-300"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center text-zinc-500 italic"
                  >
                    No results found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
