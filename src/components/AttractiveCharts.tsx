import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useBudget } from "@/hooks/BudgetContext";

const COLORS = ["#00b894", "#0984e3", "#D4AF37", "#6c5ce7", "#ff7675", "#00cec9"];

export default function AttractiveCharts() {
  const { budgetCategories } = useBudget();

  const pieData = useMemo(() => budgetCategories.map(c => ({ name: c.name, value: c.spent })), [budgetCategories]);
  const barData = useMemo(() => budgetCategories.map(c => ({ name: c.name.split(" ")[0], spent: c.spent, limit: c.limit })), [budgetCategories]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Spending Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Spent vs Limit</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="limit" fill="#e2e8f0" radius={[6,6,0,0]} />
              <Bar dataKey="spent" fill="#60a5fa" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}


