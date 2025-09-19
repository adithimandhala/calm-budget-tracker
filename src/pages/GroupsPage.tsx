import ProfessionalPageWrapper from "@/components/ProfessionalPageWrapper";
import Groups from "@/components/Groups";
import EmergencySavingsGroups from "@/components/EmergencySavingsGroups";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Share2, DollarSign, Shield } from "lucide-react";
import { useState } from "react";

const GroupsPage = () => {
  const [activeTab, setActiveTab] = useState<'groups' | 'emergency'>('groups');

  return (
    <ProfessionalPageWrapper className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Groups & Joint Accounts</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create shared budgets with friends, family, or roommates. Split expenses and track contributions together.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-6 py-3 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'groups'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Regular Groups</span>
            </button>
            <button
              onClick={() => setActiveTab('emergency')}
              className={`px-6 py-3 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'emergency'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Emergency Savings</span>
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Create Groups</h3>
              <p className="text-sm text-gray-600">Start shared budgets with multiple members</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <UserPlus className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Add Members</h3>
              <p className="text-sm text-gray-600">Invite friends and family to join your groups</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <Share2 className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Split Expenses</h3>
              <p className="text-sm text-gray-600">Automatically calculate and track contributions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Track Balances</h3>
              <p className="text-sm text-gray-600">Monitor who owes what in real-time</p>
            </CardContent>
          </Card>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'groups' ? (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-600" />
                Your Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Groups />
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <EmergencySavingsGroups />
            </CardContent>
          </Card>
        )}
      </div>
    </ProfessionalPageWrapper>
  );
};

export default GroupsPage;


