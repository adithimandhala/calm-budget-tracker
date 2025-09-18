import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Calculator, Target } from 'lucide-react';

interface BudgetAdjustModalProps {
  categoryId: string;
  categoryName: string;
  currentLimit: number;
  currentSpent: number;
  onAdjust: (categoryId: string, newLimit: number) => void;
  children: React.ReactNode;
}

const BudgetAdjustModal = ({ 
  categoryId, 
  categoryName, 
  currentLimit, 
  currentSpent, 
  onAdjust, 
  children 
}: BudgetAdjustModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newLimit, setNewLimit] = useState(currentLimit.toString());
  const [suggestedLimit, setSuggestedLimit] = useState<number | null>(null);

  const handleOpen = () => {
    setNewLimit(currentLimit.toString());
    // Suggest a new limit based on current spending
    if (currentSpent > currentLimit) {
      // If overspent, suggest 20% increase
      setSuggestedLimit(Math.round(currentSpent * 1.2));
    } else if (currentSpent < currentLimit * 0.5) {
      // If underspent by more than 50%, suggest 20% decrease
      setSuggestedLimit(Math.round(currentLimit * 0.8));
    } else {
      setSuggestedLimit(null);
    }
    setIsOpen(true);
  };

  const handleSave = () => {
    const limit = parseFloat(newLimit);
    if (!isNaN(limit) && limit > 0) {
      onAdjust(categoryId, limit);
      setIsOpen(false);
    }
  };

  const handleQuickAdjust = (multiplier: number) => {
    const newValue = Math.round(currentLimit * multiplier);
    setNewLimit(newValue.toString());
  };

  const getAdjustmentReason = () => {
    if (currentSpent > currentLimit) {
      return {
        type: 'increase',
        message: 'You\'re overspending by ₹' + (currentSpent - currentLimit).toLocaleString(),
        suggestion: 'Consider increasing your budget'
      };
    } else if (currentSpent < currentLimit * 0.5) {
      return {
        type: 'decrease',
        message: 'You\'re using only ' + Math.round((currentSpent / currentLimit) * 100) + '% of your budget',
        suggestion: 'Consider reducing your budget to free up money for other categories'
      };
    } else {
      return {
        type: 'maintain',
        message: 'Your spending is well within budget',
        suggestion: 'Your current budget seems appropriate'
      };
    }
  };

  const reason = getAdjustmentReason();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={handleOpen}>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Adjust Budget - {categoryName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Status */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Budget:</span>
                  <span className="font-semibold">₹{currentLimit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Amount Spent:</span>
                  <span className="font-semibold">₹{currentSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm text-gray-600">Remaining:</span>
                  <span className={`font-semibold ${currentSpent > currentLimit ? 'text-red-600' : 'text-green-600'}`}>
                    ₹{(currentLimit - currentSpent).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold">Analysis:</span>
            </div>
            <p className="text-sm text-gray-600">{reason.message}</p>
            <p className="text-xs text-gray-500">{reason.suggestion}</p>
          </div>

          {/* Suggested Limit */}
          {suggestedLimit && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-blue-800">Suggested Budget:</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">₹{suggestedLimit.toLocaleString()}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setNewLimit(suggestedLimit.toString())}
                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  Use This
                </Button>
              </div>
            </div>
          )}

          {/* New Budget Input */}
          <div className="space-y-2">
            <Label htmlFor="newLimit">New Budget Amount (₹)</Label>
            <Input
              id="newLimit"
              type="number"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
              placeholder="Enter new budget amount"
              min="0"
              step="100"
            />
          </div>

          {/* Quick Adjustments */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Quick Adjustments:</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAdjust(0.8)}
                className="text-xs"
              >
                -20%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAdjust(1.0)}
                className="text-xs"
              >
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickAdjust(1.2)}
                className="text-xs"
              >
                +20%
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSave}
              className="flex-1"
              disabled={!newLimit || parseFloat(newLimit) <= 0}
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetAdjustModal;
