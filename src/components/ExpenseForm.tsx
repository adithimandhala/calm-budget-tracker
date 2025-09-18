import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, DollarSign, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useBudget } from "@/hooks/BudgetContext";

const ExpenseForm = ({ onAddExpense }: { onAddExpense?: (expense: any) => void }) => {
  const budget = useBudget();
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });
  
  const { toast } = useToast();

  const categories = [
    "Food & Dining",
    "Transportation", 
    "Entertainment",
    "Shopping",
    "Healthcare", 
    "Utilities",
    "Education",
    "Travel",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!expense.amount || !expense.category) {
      toast({
        title: "Missing information",
        description: "Please fill in amount and category",
        variant: "destructive"
      });
      return;
    }

    // Update local category spending so BudgetDashboard reflects instantly
    if (expense.category && expense.amount) {
      const map: Record<string, string> = {
        "Food & Dining": "1",
        "Transportation": "2",
        "Entertainment": "3",
        "Shopping": "4",
        "Utilities": "5",
        "Healthcare": "6",
      };
      const categoryId = map[expense.category];
      if (categoryId) {
        budget.updateCategorySpending(categoryId, Number(expense.amount));
      }
    }

    onAddExpense?.(expense);
    
    toast({
      title: "Expense added successfully!",
      description: `₹${expense.amount} spent on ${expense.category}`,
    });
    
    // Reset form
    setExpense({
      amount: "",
      category: "",
      description: "",
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Card className="bg-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-finance-blue" />
          <span>Add New Transaction</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={expense.amount}
                onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                className="text-lg font-semibold"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={expense.category} onValueChange={(value) => setExpense({ ...expense, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="What did you spend on?"
              value={expense.description}
              onChange={(e) => setExpense({ ...expense, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={expense.date}
                onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Tag className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;