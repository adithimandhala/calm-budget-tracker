import ProfessionalPageWrapper from "@/components/ProfessionalPageWrapper";
import ExpenseForm from "@/components/ExpenseForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Receipt, TrendingUp, DollarSign } from "lucide-react";

const AddExpensePage = () => {
  return (
    <ProfessionalPageWrapper className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Offline Transactions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Record your cash expenses and offline transactions to keep your budget tracking accurate and complete.
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <PlusCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Add Transaction</h3>
              <p className="text-sm text-gray-600">Record cash expenses and offline spending</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Receipt className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Track Categories</h3>
              <p className="text-sm text-gray-600">Organize expenses by category for better insights</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Budget Sync</h3>
              <p className="text-sm text-gray-600">Automatically updates your budget tracking</p>
            </CardContent>
          </Card>
        </div>

        {/* Expense Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
              Add New Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseForm />
          </CardContent>
        </Card>
      </div>
    </ProfessionalPageWrapper>
  );
};

export default AddExpensePage;


