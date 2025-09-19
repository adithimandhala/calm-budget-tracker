import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Target, PlusCircle, MessageCircle, Users, Eye, TrendingUp, DollarSign, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProfessionalDashboard = () => {
  const navigate = useNavigate();

  const statsCards = [
    {
      title: "Average monthly savings",
      value: "₹32,000",
      icon: TrendingUp,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      iconColor: "text-green-500"
    },
    {
      title: "Budget accuracy rate",
      value: "98%",
      icon: Target,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      iconColor: "text-blue-500"
    }
  ];

  const dashboardCards = [
    {
      title: "Monthly Budget",
      value: "₹50,000",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      title: "Total Expenses",
      value: "₹22,000",
      icon: TrendingUp,
      color: "text-red-600"
    },
    {
      title: "Available Balance",
      value: "₹28,000",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Total Savings",
      value: "₹5,500",
      icon: PiggyBank,
      color: "text-purple-600"
    }
  ];

  const navTabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, active: true },
    { id: "tracker", label: "Budget Tracker", icon: Target, active: false },
    { id: "offline", label: "Offline Transactions", icon: PlusCircle, active: false },
    { id: "buddy", label: "AI Insights", icon: MessageCircle, active: false },
    { id: "groups", label: "Groups", icon: Users, active: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text and Stats */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Professional Finance{" "}
                  <span className="text-blue-600">Management</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Advanced expense tracking, budget planning, and financial insights. 
                  Take control of your finances with professional-grade tools and AI-powered recommendations.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {statsCards.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <Card className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-3xl font-bold ${stat.textColor}`}>
                              {stat.value}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {stat.title}
                            </p>
                          </div>
                          <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold text-lg">Dashboard Overview</h3>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                  
                  {/* Mock Chart Elements */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white/60 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white/60 rounded-full w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mock Numbers */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-white/80 text-sm">Total Balance</p>
                      <p className="text-white text-xl font-bold">₹4,415</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/80 text-sm">This Month</p>
                      <p className="text-white text-xl font-bold">₹2,340</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Secondary Navigation */}
      <section className="py-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {navTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={tab.active ? "default" : "ghost"}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  tab.active 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => {
                  switch(tab.id) {
                    case "dashboard":
                      navigate("/");
                      break;
                    case "tracker":
                      navigate("/tracker");
                      break;
                    case "offline":
                      navigate("/add");
                      break;
                    case "buddy":
                      navigate("/assistant");
                      break;
                    case "groups":
                      navigate("/groups");
                      break;
                  }
                }}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Summary Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                        <p className={`text-2xl font-bold ${card.color}`}>
                          {card.value}
                        </p>
                      </div>
                      <card.icon className={`w-8 h-8 ${card.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalDashboard;
