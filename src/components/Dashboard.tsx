import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Target, Users, PiggyBank, MessageCircle, AlertTriangle } from "lucide-react";
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
    { category: "Food & Dining", amount: 12000, color: "bg-expense", percentage: 37.5 },
    { category: "Transportation", amount: 8500, color: "bg-warning", percentage: 26.6 },
    { category: "Entertainment", amount: 6000, color: "bg-budget", percentage: 18.8 },
    { category: "Shopping", amount: 5500, color: "bg-finance-navy", percentage: 17.1 }
  ];

  const progressPercentage = (budgetData.spent / budgetData.totalBudget) * 100;
  const savingsProgress = (budgetData.currentSavings / budgetData.savingsGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Budget</CardTitle>
            <Target className="h-4 w-4 text-finance-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{budgetData.totalBudget.toLocaleString()}</div>
            <p className="text-xs text-success font-medium">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            <TrendingUp className="h-4 w-4 text-expense" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{budgetData.spent.toLocaleString()}</div>
            <p className="text-xs text-expense font-medium">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-income" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{budgetData.remaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">36% remaining</p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-savings" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{budgetData.currentSavings.toLocaleString()}</div>
            <p className="text-xs text-savings font-medium">{Math.round(savingsProgress)}% of goal achieved</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card className="bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Monthly Budget Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent: ₹{budgetData.spent.toLocaleString()}</span>
              <span className="text-muted-foreground">Budget: ₹{budgetData.totalBudget.toLocaleString()}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          {progressPercentage > 80 && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning-foreground">Budget Alert</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                You've used 64% of your monthly budget. Consider tracking dining expenses.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expense Breakdown & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Spending Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {expenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${expense.color}`}></div>
                  <div>
                    <span className="text-sm font-medium">{expense.category}</span>
                    <p className="text-xs text-muted-foreground">{expense.percentage}% of total</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold">₹{expense.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Financial Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <TrendingDown className="h-4 w-4 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-success-foreground">Excellent Transportation Savings</p>
                  <p className="text-xs text-muted-foreground">15% under budget - great job using public transport!</p>
                </div>
              </div>
            </div>
            
            <div className="bg-finance-blue/10 border border-finance-blue/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Target className="h-4 w-4 text-finance-blue mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Savings Goal Progress</p>
                  <p className="text-xs text-muted-foreground">₹6,500 more needed to reach your monthly target</p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full justify-start">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get AI Financial Advice
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Preview */}
      <Card className="bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-expense/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-expense">FD</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Lunch at Cafe Mocha</p>
                  <p className="text-xs text-muted-foreground">Today, 2:30 PM</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-expense">-₹450</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-warning">TR</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Metro Card Recharge</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 8:45 AM</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-warning">-₹500</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-income/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-income">IN</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Salary Deposit</p>
                  <p className="text-xs text-muted-foreground">Mar 1, 9:00 AM</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-income">+₹75,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;