import { useState } from "react";
import { usePolicies } from "@/hooks/usePolicies";
import { columns } from "@/components/policy/PolicyColumns";
import { PolicyTable } from "./components/policy/PolicyTable";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const { data: policies, isLoading } = usePolicies();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr] bg-zinc-950 text-zinc-50 font-sans selection:bg-amber-500/30">
      <Sidebar />

      <div className="flex flex-col w-full min-w-0">
        <Header onSearch={setSearchTerm} />
        <main className="flex-1 flex flex-col space-y-8 p-6 lg:p-10 overflow-x-hidden">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Dashboard
            </h1>
            <p className="text-zinc-400">
              Overview of your insurance portfolio.
            </p>
          </div>
          <div className="w-full">
            <StatsCards />
          </div>
          <Card className="bg-zinc-900 border-zinc-800 shadow-xl overflow-hidden w-full">
            <CardHeader className="border-b border-zinc-800 pb-4 bg-zinc-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-white">
                    Active Policies
                  </CardTitle>
                  <p className="text-sm text-zinc-500 mt-1">
                    Manage realtime quotes.
                  </p>
                </div>
                <div className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
                  {policies?.length || 0} Total Records
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                  <p className="text-zinc-500 animate-pulse">
                    Synchronizing Data...
                  </p>
                </div>
              ) : (
                <PolicyTable
                  columns={columns}
                  data={policies || []}
                  filterValue={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
