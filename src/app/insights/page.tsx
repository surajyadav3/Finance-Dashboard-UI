import { InsightsCards } from "@/components/InsightsCards";
import { MonthlyComparisonChart } from "@/components/MonthlyComparisonChart";
import { MonthlyGoal } from "@/components/MonthlyGoal";

export default function InsightsPage() {
  return (
    <div className="w-full space-y-10 relative animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col gap-1 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tighter">Insights.</h2>
        <p className="text-lg text-muted-foreground font-medium">Analytics & automated financial breakdown.</p>
      </div>

      {/* Highlights Section */}
      <div className="grid gap-8 lg:grid-cols-12 relative z-10">
        <section className="lg:col-span-12 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-emerald-500 rounded-full" />
            <h3 className="text-2xl font-bold tracking-tight">Financial Highlights</h3>
          </div>
          <InsightsCards />
        </section>

        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-indigo-500 rounded-full" />
            <h3 className="text-2xl font-bold tracking-tight">Trends & Comparison</h3>
          </div>
          <MonthlyComparisonChart />
        </section>

        <section className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-orange-500 rounded-full" />
            <h3 className="text-2xl font-bold tracking-tight">Targets</h3>
          </div>
          <MonthlyGoal />
        </section>
      </div>

      {/* AI Recommendation Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-blue-500 rounded-full" />
          <h3 className="text-2xl font-bold tracking-tight">AI Strategy</h3>
        </div>
        <div className="p-8 glass-card rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 h-64 w-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-700" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="h-16 w-16 rounded-2xl bg-background/50 backdrop-blur-xl flex items-center justify-center border border-white/10 shrink-0">
              <span className="text-3xl text-emerald-500">💡</span>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold tracking-tight">Savings Opportunity</h4>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                Analysis of your <span className="text-foreground font-semibold">fixed expenses</span> suggests a potential for 
                <span className="text-emerald-500 font-bold ml-1">optimization in digital subscriptions.</span> 
                By consolidating your "Gadgets" and "Software" categories, you could save up to 
                <span className="text-foreground font-bold mx-1">₹12,500</span> annually.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">High Impact</span>
                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">Recommended</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
