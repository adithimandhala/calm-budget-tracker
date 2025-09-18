import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Gift, X } from 'lucide-react';
import { Achievement } from '@/hooks/useBudgetTracker';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
  onClaim: () => void;
}

const AchievementNotification = ({ achievement, onClose, onClaim }: AchievementNotificationProps) => {
  const getAchievementIcon = () => {
    switch (achievement.type) {
      case 'underspending':
        return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 'savings':
        return <Star className="w-8 h-8 text-green-500" />;
      case 'streak':
        return <Gift className="w-8 h-8 text-purple-500" />;
      default:
        return <Trophy className="w-8 h-8 text-blue-500" />;
    }
  };

  const getAchievementColor = () => {
    switch (achievement.type) {
      case 'underspending':
        return 'from-yellow-400 to-orange-500';
      case 'savings':
        return 'from-green-400 to-emerald-500';
      case 'streak':
        return 'from-purple-400 to-pink-500';
      default:
        return 'from-blue-400 to-indigo-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-80 animate-in slide-in-from-right-5 duration-300">
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {getAchievementIcon()}
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="bg-white/60 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Reward:</span>
              <Badge className={`bg-gradient-to-r ${getAchievementColor()} text-white`}>
                {achievement.reward.value}
              </Badge>
            </div>
            {achievement.reward.code && (
              <div className="mt-2 text-center">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                  {achievement.reward.code}
                </code>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onClaim}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
            >
              <Gift className="w-4 h-4 mr-1" />
              Claim Reward
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="px-3"
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementNotification;
