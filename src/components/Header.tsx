import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API } from "@/lib/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onAIAssistantClick?: () => void;
  onAddTransactionClick?: () => void;
}

const Header = ({ onAIAssistantClick, onAddTransactionClick }: HeaderProps) => {
  const navigate = useNavigate();
  const logout = () => {
    API.token = "";
    localStorage.removeItem("token");
    navigate("/auth", { replace: true });
  };
  const authed = !!API.token;
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
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex text-xs"
              onClick={() => navigate("/assistant")}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              AI Assistant
            </Button>
            <Button 
              size="sm"
              onClick={() => navigate("/add")}
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Transaction
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>Dashboard</Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/groups")}>Groups</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={!authed}>{authed ? "Signed in" : "Not signed in"}</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;