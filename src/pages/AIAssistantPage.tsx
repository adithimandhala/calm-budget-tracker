import ProfessionalPageWrapper from "@/components/ProfessionalPageWrapper";
import BudgetBuddy from "@/components/BudgetBuddy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Brain, TrendingUp, Target, Lightbulb, BarChart3 } from "lucide-react";

const AIAssistantPage = () => {
  return (
    <ProfessionalPageWrapper className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">AI Insights</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get intelligent financial insights, personalized recommendations, and smart budget analysis powered by AI.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Smart Analysis</h3>
              <p className="text-sm text-gray-600">AI-powered spending pattern analysis</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Goal Setting</h3>
              <p className="text-sm text-gray-600">Personalized financial goal recommendations</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Predictions</h3>
              <p className="text-sm text-gray-600">Future spending and savings forecasts</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Tips & Advice</h3>
              <p className="text-sm text-gray-600">Personalized money-saving recommendations</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Reports</h3>
              <p className="text-sm text-gray-600">Detailed financial health reports</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Chat Assistant</h3>
              <p className="text-sm text-gray-600">Interactive AI financial advisor</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Component */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
              AI Financial Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetBuddy />
          </CardContent>
        </Card>
      </div>
    </ProfessionalPageWrapper>
  );
};

export default AIAssistantPage;


