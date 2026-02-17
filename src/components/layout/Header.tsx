import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { SidebarContent } from "./Sidebar";

interface HeaderProps {
  onSearch: (value: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center gap-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-6 shadow-sm">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-zinc-400 -ml-2 hover:bg-zinc-800 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 bg-zinc-950 border-r-zinc-800 w-[280px] text-zinc-50"
        >
          <div className="sr-only">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Navigation</SheetDescription>
          </div>

          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-zinc-500" />
          <Input
            type="search"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-zinc-900 border-zinc-800 text-zinc-200 pl-9 focus-visible:ring-amber-500 placeholder:text-zinc-600 rounded-full"
          />
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full"
      >
        <Bell className="h-5 w-5" />
      </Button>

      <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-800 flex items-center justify-center text-white text-xs font-bold ring-2 ring-zinc-900 shadow-lg cursor-pointer">
        EC
      </div>
    </header>
  );
};
