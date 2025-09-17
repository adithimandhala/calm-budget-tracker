import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card shadow-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">₹</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">FinanceTracker</h1>
              <p className="text-xs text-muted-foreground">Professional Budget Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hidden sm:flex text-xs">
              <MessageCircle className="w-4 h-4 mr-1" />
              AI Assistant
            </Button>
            <Button size="sm">
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Transaction
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