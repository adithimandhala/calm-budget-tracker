import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OverspendingAlertProps {
  category: string;
  spent: number;
  budget: number;
  onDismiss: () => void;
}

const OverspendingAlert = ({ category, spent, budget, onDismiss }: OverspendingAlertProps) => {
  const overspendAmount = spent - budget;
  const overspendPercentage = ((overspendAmount / budget) * 100).toFixed(1);

  return (
    <Alert className="border-red-200 bg-red-50 text-red-800 animate-slide-down">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="flex items-center justify-between w-full">
        <div>
          <strong>Budget Alert!</strong> You've overspent in <strong>{category}</strong> by ₹{overspendAmount.toLocaleString()} 
          ({overspendPercentage}% over budget). Consider reducing expenses in this category.
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="text-red-600 hover:text-red-800 hover:bg-red-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default OverspendingAlert;