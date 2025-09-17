import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Target, Users, PiggyBank, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Mock data - will be replaced with real data from backend
  const budgetData = {
    totalBudget: 50000,
    spent: 32000,
    remaining: 18000,
    monthlyIncome: 75000,
    savingsGoal: 15000,
    currentSavings: 8500
  };

  const expenses = [
    { category: "Food & Dining", amount: 12000, color: "bg-expense" },
    { category: "Transportation", amount: 8500, color: "bg-warning" },
    { category: "Entertainment", amount: 6000, color: "bg-budget" },
    { category: "Shopping", amount: 5500, color: "bg-coral" }
  ];

  const progressPercentage = (budgetData.spent / budgetData.totalBudget) * 100;
  const savingsProgress = (budgetData.currentSavings / budgetData.savingsGoal) * 100;

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
            <Target className="h-4 w-4 text-coral" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{budgetData.totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-expense" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{budgetData.spent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">64% of budget</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Remaining</CardTitle>
            <DollarSign className="h-4 w-4 text-income" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{budgetData.remaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">36% left</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Savings Goal</CardTitle>
            <PiggyBank className="h-4 w-4 text-budget" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{budgetData.currentSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round(savingsProgress)}% of ₹{budgetData.savingsGoal.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card className="bg-gradient-card shadow-card border-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Monthly Budget Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent: ₹{budgetData.spent.toLocaleString()}</span>
              <span className="text-muted-foreground">Budget: ₹{budgetData.totalBudget.toLocaleString()}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          
          {progressPercentage > 80 && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning-foreground">Almost at budget limit!</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Consider reducing spending in entertainment or dining out.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-card border-none">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Top Spending Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {expenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${expense.color}`}></div>
                  <span className="text-sm font-medium">{expense.category}</span>
                </div>
                <span className="text-sm font-semibold">₹{expense.amount.toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-none">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <TrendingDown className="h-4 w-4 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-success-foreground">Great job on transportation!</p>
                  <p className="text-xs text-muted-foreground">You're 15% under budget this month.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-coral/10 border border-coral/20 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <PiggyBank className="h-4 w-4 text-coral mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Reward suggestion</p>
                  <p className="text-xs text-muted-foreground">Treat yourself to a book under ₹500!</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with Budget Buddy
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;