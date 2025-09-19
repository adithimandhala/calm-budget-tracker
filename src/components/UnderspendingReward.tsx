import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Star, Zap, Heart } from "lucide-react";
import { useState } from "react";

interface Reward {
  id: string;
  type: 'coupon' | 'scratch_card' | 'bonus';
  title: string;
  description: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface UnderspendingRewardProps {
  category: string;
  savedAmount: number;
  budget: number;
  onClaim: (reward: Reward) => void;
}

const UnderspendingReward = ({ category, savedAmount, budget, onClaim }: UnderspendingRewardProps) => {
  const [isClaimed, setIsClaimed] = useState(false);
  
  const savingsPercentage = ((savedAmount / budget) * 100).toFixed(1);
  
  // Only show rewards for significant underspending (minimum 25% under budget)
  const minimumSavingsThreshold = budget * 0.25;
  if (savedAmount < minimumSavingsThreshold) {
    return null;
  }
  
  const rewards: Reward[] = [
    {
      id: '1',
      type: 'coupon',
      title: 'Shopping Coupon',
      description: '20% off on your next purchase',
      value: '₹500',
      icon: Gift,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'scratch_card',
      title: 'Scratch Card',
      description: 'Win up to ₹1000 cashback',
      value: '₹1000',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      id: '3',
      type: 'bonus',
      title: 'Savings Bonus',
      description: 'Extra ₹200 added to your savings',
      value: '₹200',
      icon: Zap,
      color: 'text-blue-600'
    }
  ];

  const handleClaim = (reward: Reward) => {
    onClaim(reward);
    setIsClaimed(true);
  };

  if (isClaimed) {
    return (
      <Card className="border-green-200 bg-green-50 animate-slide-up">
        <CardContent className="p-6 text-center">
          <Heart className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Reward Claimed!</h3>
          <p className="text-green-700">Great job on saving money in {category}!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-green-50 animate-slide-up">
      <CardHeader>
        <CardTitle className="text-green-800 flex items-center">
          <Gift className="w-5 h-5 mr-2" />
          Savings Reward Available!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-green-700 mb-2">
            You saved <strong>₹{savedAmount.toLocaleString()}</strong> in <strong>{category}</strong>
          </p>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {savingsPercentage}% under budget
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {rewards.map((reward) => (
            <Card key={reward.id} className="bg-white border-green-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <reward.icon className={`w-8 h-8 ${reward.color}`} />
                    <div>
                      <h4 className="font-semibold text-gray-900">{reward.title}</h4>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{reward.value}</p>
                    <Button
                      size="sm"
                      onClick={() => handleClaim(reward)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Claim
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UnderspendingReward;
