import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Users, Wallet } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    icon: Wallet,
    change: "+20.1% from last month",
  },
  {
    title: "Active Policies",
    value: "+2350",
    icon: ShieldCheck,
    change: "+180.1% from last month",
  },
  {
    title: "Pending Approvals",
    value: "12",
    icon: Users,
    change: "+19% from last month",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      {stats.map((item, index) => (
        <Card
          key={index}
          className="bg-zinc-900 border-zinc-800 text-zinc-100 shadow-lg shadow-black/40"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{item.value}</div>
            <p className="text-xs text-zinc-500 mt-1">
              <span className="text-emerald-500">
                {item.change.split(" ")[0]}
              </span>{" "}
              {item.change.split(" ").slice(1).join(" ")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
