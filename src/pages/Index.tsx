import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import ExpenseForm from "@/components/ExpenseForm";
import BudgetBuddy from "@/components/BudgetBuddy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PlusCircle, MessageCircle, Users } from "lucide-react";
import heroImage from "@/assets/professional-finance-hero.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Professional Finance
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Management</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Advanced expense tracking, budget planning, and financial insights. 
                Take control of your finances with professional-grade tools and AI-powered recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-success/10 border border-success/20 rounded-lg p-4 flex-1">
                  <div className="text-2xl font-bold text-success">₹32,000</div>
                  <p className="text-sm text-muted-foreground">Average monthly savings</p>
                </div>
                <div className="bg-finance-blue/10 border border-finance-blue/20 rounded-lg p-4 flex-1">
                  <div className="text-2xl font-bold text-finance-blue">98%</div>
                  <p className="text-sm text-muted-foreground">Budget accuracy rate</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Professional finance dashboard with charts and analytics" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main App Interface */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="add-expense" className="flex items-center space-x-2">
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Add Expense</span>
            </TabsTrigger>
            <TabsTrigger value="budget-buddy" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Budget Buddy</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Groups</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="add-expense" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <ExpenseForm />
            </div>
          </TabsContent>

          <TabsContent value="budget-buddy" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <BudgetBuddy />
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Group Budgets</h3>
              <p className="text-muted-foreground mb-6">
                Create shared budgets with friends, family, or roommates. Split expenses and track contributions together.
              </p>
              <div className="bg-finance-blue/10 border border-finance-blue/20 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-sm text-muted-foreground">
                  Group features require backend integration. Connect to Supabase to enable shared budgets, expense splitting, and real-time collaboration.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;