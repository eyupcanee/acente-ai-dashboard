import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { POLICY_TYPES, type Policy } from "@/types";

const formSchema = z.object({
  customer: z
    .string()
    .min(2, "Customer name must be at least 2 characters long"),
  type: z.enum(POLICY_TYPES),
  premium: z.string(),
});

interface PolicyFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<Policy>;
}

export const PolicyForm = ({ onSubmit, defaultValues }: PolicyFormProps) => {
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: defaultValues?.customer || "",
      type: defaultValues?.type || "Auto",
      premium: defaultValues?.premium || "$0",
    },
  });

  const selectedType = form.watch("type");

  useEffect(() => {
    if (selectedType) {
      setIsCalculating(true);

      const timer = setTimeout(() => {
        const randomPrice = Math.floor(Math.random() * 1500) + 300;
        form.setValue("premium", `$${randomPrice}`);
        setIsCalculating(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [selectedType, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400">Customer Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="James Anderson"
                  className="bg-zinc-800 border-zinc-700 text-white focus:ring-amber-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400">Policy Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                  {POLICY_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="premium"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400">Premium Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    disabled
                    className="bg-zinc-900 border-zinc-700 font-mono text-amber-500 disabled:opacity-100"
                  />
                  {isCalculating && (
                    <div className="absolute inset-y-0 right-3 flex items-center gap-2 text-xs text-amber-500">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Calculating...
                    </div>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isCalculating}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all py-6"
        >
          {defaultValues ? "Update Quote" : "Create Quote"}
        </Button>
      </form>
    </Form>
  );
};
