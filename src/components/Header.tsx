import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-card shadow-soft border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-2xl font-bold text-primary-foreground">₹</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">BudgetWise</h1>
              <p className="text-sm text-muted-foreground">Your AI Finance Companion</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <MessageCircle className="w-4 h-4 mr-2" />
              Budget Buddy
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;