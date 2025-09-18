import { useState, useRef } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import ModernFinanceDashboard from "@/components/ModernFinanceDashboard";
import ExpenseForm from "@/components/ExpenseForm";
import BudgetBuddy from "@/components/BudgetBuddy";
import BudgetDashboard from "@/components/BudgetDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PlusCircle, MessageCircle, Users, Target } from "lucide-react";
import heroImage from "@/assets/professional-finance-hero.jpg";
import Groups from "@/components/Groups";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const addExpenseRef = useRef<HTMLDivElement | null>(null);
  const aiBuddyRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = (el: HTMLElement | null) => {
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAIAssistantClick = () => {
    setActiveTab("budget-buddy");
    setTimeout(() => scrollIntoView(aiBuddyRef.current), 0);
  };

  const handleAddTransactionClick = () => {
    setActiveTab("add-expense");
    setTimeout(() => scrollIntoView(addExpenseRef.current), 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onAIAssistantClick={handleAIAssistantClick}
        onAddTransactionClick={handleAddTransactionClick}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-card border-b border-border overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-40"
          initial={{ background: "radial-gradient(1200px 600px at 20% 20%, rgba(59,130,246,0.25), transparent)", opacity: 0 }}
          animate={{ opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Professional Finance
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Management</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Advanced expense tracking, budget planning, and financial insights. 
                Take control of your finances with professional-grade tools and AI-powered recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ y: -4, scale: 1.01 }} className="bg-success/10 border border-success/20 rounded-lg p-4 flex-1 transition hover:shadow-md hover:border-success/40">
                  <div className="text-2xl font-bold text-success">₹32,000</div>
                  <p className="text-sm text-muted-foreground">Average monthly savings</p>
                </motion.div>
                <motion.div whileHover={{ y: -4, scale: 1.01 }} className="bg-finance-blue/10 border border-finance-blue/20 rounded-lg p-4 flex-1 transition hover:shadow-md hover:border-finance-blue/40">
                  <div className="text-2xl font-bold text-finance-blue">98%</div>
                  <p className="text-sm text-muted-foreground">Budget accuracy rate</p>
                </motion.div>
              </div>
            </motion.div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Professional finance dashboard with charts and analytics" 
                className="rounded-xl shadow-lg w-full h-auto transition hover:shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main App Interface */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2 transition hover:bg-accent">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="budget-tracker" className="flex items-center space-x-2 transition hover:bg-accent">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Budget Tracker</span>
            </TabsTrigger>
            <TabsTrigger value="add-expense" className="flex items-center space-x-2 transition hover:bg-accent">
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Offline Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="budget-buddy" className="flex items-center space-x-2 transition hover:bg-accent">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Budget Buddy</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center space-x-2 transition hover:bg-accent">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Groups</span>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <TabsContent value="dashboard" className="space-y-6">
                  <ModernFinanceDashboard />
                </TabsContent>
              </motion.div>
            )}
            {activeTab === "budget-tracker" && (
              <motion.div key="budget-tracker" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <TabsContent value="budget-tracker" className="space-y-6">
                  <BudgetDashboard />
                </TabsContent>
              </motion.div>
            )}
            {activeTab === "add-expense" && (
              <motion.div key="add-expense" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <TabsContent value="add-expense" className="space-y-6" ref={addExpenseRef}>
                  <div className="max-w-2xl mx-auto">
                    <ExpenseForm />
                  </div>
                </TabsContent>
              </motion.div>
            )}
            {activeTab === "budget-buddy" && (
              <motion.div key="budget-buddy" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }}>
                <TabsContent value="budget-buddy" className="space-y-6" ref={aiBuddyRef}>
                  <div className="max-w-4xl mx-auto">
                    <BudgetBuddy />
                  </div>
                </TabsContent>
              </motion.div>
            )}
            {activeTab === "groups" && (
              <motion.div key="groups" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <TabsContent value="groups" className="space-y-6">
                  <Groups />
                </TabsContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;