import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle, User, LogOut, BarChart3, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API } from "@/lib/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

interface HeaderProps {
  onAIAssistantClick?: () => void;
  onAddTransactionClick?: () => void;
}

const Header = ({ onAIAssistantClick, onAddTransactionClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        setName(u?.accountName || null);
      }
    } catch {}
  }, []);
  const logout = () => {
    API.token = "";
    localStorage.removeItem("token");
    navigate("/auth", { replace: true });
  };
  const authed = !!API.token;
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">₹</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FinanceTracker</h1>
              <p className="text-xs text-gray-500">Professional Budget Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex text-xs border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
              onClick={() => navigate("/")}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Dashboard
            </Button>
            <Button 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-200"
              onClick={() => navigate("/add")}
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Transaction
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex text-xs border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
              onClick={() => navigate("/groups")}
            >
              <Users className="w-4 h-4 mr-1" />
              Groups
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex text-xs border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
              onClick={() => navigate("/assistant")}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              AI Assistant
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100 hover:scale-105 transition-all duration-200">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={!authed}>{authed ? "Signed in" : "Not signed in"}</DropdownMenuItem>
                {name && (
                  <>
                    <DropdownMenuItem disabled className="text-gray-600 font-semibold">
                      👤 {name}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={logout} className="text-red-600 focus:bg-red-50 focus:text-red-700">
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