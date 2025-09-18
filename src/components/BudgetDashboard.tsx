import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Trophy, 
  Gift,
  Plus,
  Minus,
  Target,
  DollarSign
} from 'lucide-react';
import { useBudgetTracker } from '@/hooks/useBudgetTracker';
import OverspendingAlert from './OverspendingAlert';
import AchievementNotification from './AchievementNotification';
import ScratchCard from './ScratchCard';
import BudgetAdjustModal from './BudgetAdjustModal';

const BudgetDashboard = () => {
  const {
    timePeriod,
    setTimePeriod,
    budgetCategories,
    alerts,
    achievements,
    showScratchCard,
    currentReward,
    updateCategorySpending,
    adjustBudgetLimit,
    dismissAlert,
    claimReward,
    getTotalBudget,
    getTotalSpent,
    getTotalSaved,
    getBudgetStatus,
    triggerReward,
    setTestScenario
  } = useBudgetTracker();

  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<typeof achievements[0] | null>(null);

  const totalBudget = getTotalBudget();
  const totalSpent = getTotalSpent();
  const totalSaved = getTotalSaved();
  const budgetPercentage = Math.round((totalSpent / totalBudget) * 100);

  const handleAchievementClick = (achievement: typeof achievements[0]) => {
    setCurrentAchievement(achievement);
    setShowAchievement(true);
  };

  const handleClaimAchievement = () => {
    setShowAchievement(false);
    setCurrentAchievement(null);
    setShowScratchCard(true);
  };

  const getCategoryStatus = (category: typeof budgetCategories[0]) => {
    const percentage = Math.round((category.spent / category.limit) * 100);
    const remaining = category.limit - category.spent;
    const overAmount = category.spent - category.limit;
    
    // Clear logic: Only show overspent if significantly over (10%+)
    if (category.spent > category.limit && percentage >= 110) {
      return {
        status: 'overspent',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: <AlertTriangle className="w-4 h-4" />,
        text: `Over by ₹${overAmount.toLocaleString()}`
      };
    } 
    // Only show underspent if significantly under (30%+ savings)
    else if (remaining > category.limit * 0.3 && category.spent > 0) {
      return {
        status: 'underspent',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: <Trophy className="w-4 h-4" />,
        text: `Saved ₹${remaining.toLocaleString()}`
      };
    } 
    // Everything else is on-track
    else {
      return {
        status: 'on-track',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: <Target className="w-4 h-4" />,
        text: `₹${remaining.toLocaleString()} left`
      };
    }
  };

  // Determine what to show based on exclusive logic (global totals)
  const budgetStatus = getBudgetStatus();
  const hasOverspending = budgetStatus === "overspent";
  const hasUnderspending = budgetStatus === "underspent";

  return (
    <div className="space-y-6">
      {/* Test Scenario Buttons - Remove in production */}
      <Card className="bg-gray-50 border-dashed">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700">Test Scenarios (Development Only)</h3>
            <Badge variant="outline" className="text-xs">DEV</Badge>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTestScenario('overspending')}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Test Overspending
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTestScenario('underspending')}
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              Test Underspending
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTestScenario('neutral')}
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              Test Neutral
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Time Period Selector */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="text-sm text-gray-600">
            Time period
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant={timePeriod === "monthly" ? "default" : "outline"} onClick={() => setTimePeriod("monthly")}>Monthly</Button>
            <Button size="sm" variant={timePeriod === "weekly" ? "default" : "outline"} onClick={() => setTimePeriod("weekly")}>Weekly</Button>
            <Button size="sm" variant={timePeriod === "custom" ? "default" : "outline"} onClick={() => setTimePeriod("custom")}>Custom</Button>
          </div>
        </CardContent>
      </Card>

      {/* EXCLUSIVE RENDERING: Only show alerts OR rewards or neutral, never both */}
      
      {/* Show Overspending Alerts ONLY if there are overspending issues */}
      {hasOverspending && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Budget Alerts ({alerts.length})
          </h2>
          {alerts.map((alert) => (
            <OverspendingAlert
              key={alert.id}
              alert={alert}
              onDismiss={dismissAlert}
              onAdjustBudget={adjustBudgetLimit}
            />
          ))}
        </div>
      )}

      {/* Show Achievements ONLY if there are no overspending issues */}
      {hasUnderspending && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-green-600 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Reward
          </h2>
          <Card className="border-green-200">
            <CardContent className="p-4 space-y-3">
              <div className="text-sm text-gray-700">
                {`Great job! You saved ₹${(totalBudget - totalSpent).toLocaleString()}. Keep this up every ${timePeriod}!`}
              </div>
              <Button size="sm" onClick={triggerReward} className="bg-green-600 hover:bg-green-700">
                Reveal Reward
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Show neutral message if neither overspending nor underspending */}
      {!hasOverspending && !hasUnderspending && (
        <div className="text-center py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Perfect!</h3>
            <p className="text-blue-600">You utilized your budget exactly as planned.</p>
          </div>
        </div>
      )}

      {/* Overall Budget Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Budget Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">₹{totalBudget.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">₹{totalSpent.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹{totalSaved.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Saved</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Budget Usage</span>
              <span className={budgetPercentage > 100 ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                {budgetPercentage}%
              </span>
            </div>
            <Progress 
              value={Math.min(budgetPercentage, 100)} 
              className="h-3"
            />
            {budgetPercentage > 100 && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  You've exceeded your budget by ₹{(totalSpent - totalBudget).toLocaleString()}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {budgetCategories.map((category) => {
            const status = getCategoryStatus(category);
            const percentage = Math.round((category.spent / category.limit) * 100);
            
            return (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline" className={`text-xs ${status.color} ${status.bgColor} ${status.borderColor}`}>
                      {status.icon}
                      {status.text}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-600">
                      ₹{category.spent.toLocaleString()} / ₹{category.limit.toLocaleString()}
                    </div>
                    <BudgetAdjustModal
                      categoryId={category.id}
                      categoryName={category.name}
                      currentLimit={category.limit}
                      currentSpent={category.spent}
                      onAdjust={adjustBudgetLimit}
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                      >
                        <Target className="w-3 h-3" />
                      </Button>
                    </BudgetAdjustModal>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{percentage}% used</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => updateCategorySpending(category.id, 100)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => updateCategorySpending(category.id, -100)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Modals */}
      {showAchievement && currentAchievement && (
        <AchievementNotification
          achievement={currentAchievement}
          onClose={() => setShowAchievement(false)}
          onClaim={handleClaimAchievement}
        />
      )}

      {showScratchCard && currentReward && (
        <ScratchCard
          isOpen={showScratchCard}
          onClose={claimReward}
          reward={currentReward}
        />
      )}
    </div>
  );
};

export default BudgetDashboard;
