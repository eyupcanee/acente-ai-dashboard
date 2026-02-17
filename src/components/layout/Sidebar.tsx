import { LayoutDashboard, Users, Settings, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const SidebarContent = () => {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-16 items-center border-b border-zinc-800 px-6 shrink-0">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-white">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <ShieldCheck className="h-6 w-6 text-amber-500" />
          </div>
          <span>
            Acente<span className="text-amber-500">AI</span>
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium gap-2">
          <div className="flex items-center gap-3 rounded-lg bg-amber-500/10 px-4 py-3 text-amber-500 border border-amber-500/20 cursor-default">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </div>

          <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-600 cursor-not-allowed opacity-50">
            <Users className="h-5 w-5" />
            Customers
          </div>
          <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-600 cursor-not-allowed opacity-50">
            <Settings className="h-5 w-5" />
            Settings
          </div>
        </nav>
      </div>
    </div>
  );
};

export const Sidebar = ({ className }: { className?: string }) => {
  return (
    <aside
      className={cn(
        "hidden border-r border-zinc-800 bg-zinc-950 md:flex md:flex-col sticky top-0 h-screen z-30",
        className,
      )}
    >
      <SidebarContent />
    </aside>
  );
};
