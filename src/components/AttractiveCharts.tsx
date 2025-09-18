import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList } from "recharts";
import { useBudget } from "@/hooks/BudgetContext";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#a78bfa", "#ef4444", "#06b6d4", "#84cc16", "#f472b6"];

export default function AttractiveCharts() {
  const { budgetCategories } = useBudget();

  const pieData = useMemo(() => budgetCategories.map(c => ({ name: c.name, value: c.spent })), [budgetCategories]);
  const barData = useMemo(() => budgetCategories.map(c => ({ name: c.name.split(" ")[0], spent: c.spent, limit: c.limit })), [budgetCategories]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Spending Distribution by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => `₹${Number(v).toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={24} wrapperStyle={{ color: "#ffffff" }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Spent vs Budget Limit (per Category)</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip formatter={(v: any) => `₹${Number(v).toLocaleString()}`} />
              <Legend wrapperStyle={{ color: "#ffffff" }} />
              <Bar dataKey="limit" name="Limit" fill="#9aa4b2" radius={[6,6,0,0]}>
                <LabelList dataKey="limit" position="top" formatter={(v: any) => `₹${Number(v).toLocaleString()}`} style={{ fontSize: 10 }} />
              </Bar>
              <Bar dataKey="spent" name="Spent" fill="#60a5fa" radius={[6,6,0,0]}>
                <LabelList dataKey="spent" position="top" formatter={(v: any) => `₹${Number(v).toLocaleString()}`} style={{ fontSize: 10 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}


