import ProfessionalPageWrapper from "@/components/ProfessionalPageWrapper";
import BudgetDashboard from "@/components/BudgetDashboard";
import AttractiveCharts from "@/components/AttractiveCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, DollarSign, PiggyBank } from "lucide-react";

const BudgetTrackerPage = () => {
  return (
    <ProfessionalPageWrapper className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Budget Tracker</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor your spending, track categories, and stay within your budget limits with detailed analytics.
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                  <p className="text-2xl font-bold text-blue-600">₹50,000</p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Spent This Month</p>
                  <p className="text-2xl font-bold text-red-600">₹22,000</p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Remaining</p>
                  <p className="text-2xl font-bold text-green-600">₹28,000</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Savings Rate</p>
                  <p className="text-2xl font-bold text-purple-600">56%</p>
                </div>
                <PiggyBank className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <BudgetDashboard />
          <AttractiveCharts />
        </div>
      </div>
    </ProfessionalPageWrapper>
  );
};

export default BudgetTrackerPage;


