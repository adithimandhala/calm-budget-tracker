import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, AlertTriangle, TrendingUp, Lightbulb, Target } from 'lucide-react';
import { OverspendingAlert as OverspendingAlertType } from '@/hooks/useBudgetTracker';

interface OverspendingAlertProps {
  alert: OverspendingAlertType;
  onDismiss: (alertId: string) => void;
  onAdjustBudget: (categoryId: string, newLimit: number) => void;
}

const OverspendingAlert = ({ alert, onDismiss, onAdjustBudget }: OverspendingAlertProps) => {
  const getSeverityColor = (percentage: number) => {
    if (percentage <= 10) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (percentage <= 25) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getSeverityIcon = (percentage: number) => {
    if (percentage <= 10) return '⚠️';
    if (percentage <= 25) return '🚨';
    return '🔥';
  };

  const getSeverityText = (percentage: number) => {
    if (percentage <= 10) return 'Minor Overspend';
    if (percentage <= 25) return 'Moderate Overspend';
    return 'Critical Overspend';
  };

  return (
    <Card className="border-l-4 border-l-red-500 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Budget Alert
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(alert.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Alert Summary */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{alert.category}</h3>
            <p className="text-sm text-gray-600">
              {getSeverityIcon(alert.percentage)} {getSeverityText(alert.percentage)}
            </p>
          </div>
          <Badge className={getSeverityColor(alert.percentage)}>
            +{alert.percentage}%
          </Badge>
        </div>

        {/* Spending Details */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Budget Limit:</span>
            <span className="font-semibold">₹{alert.limit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Amount Spent:</span>
            <span className="font-semibold text-red-600">₹{alert.spent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center border-t pt-2">
            <span className="text-sm font-semibold text-red-600">Over Budget:</span>
            <span className="font-bold text-red-600">₹{alert.overAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Budget Progress</span>
            <span className="text-red-600 font-semibold">
              {Math.round((alert.spent / alert.limit) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((alert.spent / alert.limit) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">Quick Actions to Get Back on Track:</span>
          </div>
          <div className="space-y-2">
            {alert.suggestions.slice(0, 3).map((suggestion, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <Target className="w-3 h-3 mt-1 text-blue-500 flex-shrink-0" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              // Suggest a new budget that's 20% higher than current spending
              const suggestedLimit = Math.round(alert.spent * 1.2);
              onAdjustBudget(alert.id.replace('alert-', '').split('-')[0], suggestedLimit);
              onDismiss(alert.id);
            }}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            Adjust Budget
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onDismiss(alert.id)}
          >
            Dismiss
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverspendingAlert;
