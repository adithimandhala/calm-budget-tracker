import { useState, useEffect } from 'react';

export interface BudgetCategory {
  id: string;
  name: string;
  limit: number;
  spent: number;
  color: string;
}

export interface OverspendingAlert {
  id: string;
  category: string;
  spent: number;
  limit: number;
  overAmount: number;
  percentage: number;
  suggestions: string[];
  timestamp: Date;
}

export interface Achievement {
  id: string;
  type: 'underspending' | 'savings' | 'streak';
  title: string;
  description: string;
  reward: {
    type: 'coupon' | 'offer' | 'cashback';
    value: string;
    code?: string;
  };
  unlockedAt: Date;
}

export const useBudgetTracker = () => {
  const [timePeriod, setTimePeriod] = useState<"monthly" | "weekly" | "custom">("monthly");
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    { id: '1', name: 'Food & Dining', limit: 10000, spent: 7500, color: '#FF6B6B' },
    { id: '2', name: 'Transportation', limit: 6000, spent: 4200, color: '#4ECDC4' },
    { id: '3', name: 'Entertainment', limit: 5000, spent: 2000, color: '#45B7D1' },
    { id: '4', name: 'Shopping', limit: 8000, spent: 12000, color: '#96CEB4' },
    { id: '5', name: 'Utilities', limit: 4000, spent: 3800, color: '#FFEAA7' },
    { id: '6', name: 'Healthcare', limit: 3000, spent: 0, color: '#DDA0DD' },
  ]);

  const [alerts, setAlerts] = useState<OverspendingAlert[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [currentReward, setCurrentReward] = useState<Achievement['reward'] | null>(null);

  // Check for budget status - EXCLUSIVE logic: only overspending OR underspending, never both
  useEffect(() => {
    const newAlerts: OverspendingAlert[] = [];
    const newAchievements: Achievement[] = [];
    
    // First, check if there are any overspending categories
    let hasOverspending = false;
    
    budgetCategories.forEach(category => {
      if (category.spent > category.limit) {
        hasOverspending = true;
        const overAmount = category.spent - category.limit;
        const percentage = Math.round((overAmount / category.limit) * 100);
        
        const suggestions = getOverspendingSuggestions(category.name, overAmount, percentage);
        
        newAlerts.push({
          id: `alert-${category.id}-${Date.now()}`,
          category: category.name,
          spent: category.spent,
          limit: category.limit,
          overAmount,
          percentage,
          suggestions,
          timestamp: new Date()
        });
      }
    });

    // Only show achievements if NO overspending exists
    if (!hasOverspending) {
      budgetCategories.forEach(category => {
        const spentPercentage = Math.round((category.spent / category.limit) * 100);
        const savedAmount = category.limit - category.spent;
        const savedPercentage = Math.round((savedAmount / category.limit) * 100);
        
        // Only give achievements if user has spent some money and saved significantly
        // AND not exactly at budget (neutral state)
        if (category.spent > 0 && category.spent < category.limit && savedPercentage >= 20) {
          // Check if achievement already exists
          const existingAchievement = achievements.find(a => 
            a.type === 'underspending' && a.title.includes(category.name)
          );
          
          if (!existingAchievement) {
            const reward = generateReward(savedAmount, category.name);
            newAchievements.push({
              id: `achievement-${category.id}-${Date.now()}`,
              type: 'underspending',
              title: `💰 ${category.name} Saver!`,
              description: `You saved ₹${savedAmount} (${savedPercentage}%) in ${category.name}`,
              reward,
              unlockedAt: new Date()
            });
          }
        }
      });
    }

    // Update alerts and achievements
    setAlerts(newAlerts);

    // We no longer auto-open rewards here; dashboard will explicitly trigger reward UI
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }

    if (hasOverspending) {
      // Clear any existing achievements when overspending
      setAchievements([]);
      setShowScratchCard(false);
      setCurrentReward(null);
    }
  }, [budgetCategories, achievements]);

  const getOverspendingSuggestions = (category: string, overAmount: number, percentage: number): string[] => {
    const suggestions: { [key: string]: string[] } = {
      'Food & Dining': [
        'Cook at home 2 more times this week',
        'Use grocery coupons and discounts',
        'Plan meals to avoid food waste',
        'Try cheaper restaurants or street food'
      ],
      'Transportation': [
        'Use public transport instead of cabs',
        'Carpool with colleagues',
        'Walk or cycle for short distances',
        'Use bike-sharing services'
      ],
      'Entertainment': [
        'Look for free events and activities',
        'Use streaming service family plans',
        'Find local community events',
        'Host game nights at home'
      ],
      'Shopping': [
        'Wait 24 hours before buying non-essentials',
        'Use price comparison apps',
        'Look for sales and clearance items',
        'Consider buying second-hand'
      ],
      'Utilities': [
        'Switch to energy-efficient appliances',
        'Use LED bulbs and smart power strips',
        'Negotiate better rates with providers',
        'Reduce water and electricity usage'
      ],
      'Healthcare': [
        'Use generic medicines when possible',
        'Preventive care to avoid major expenses',
        'Compare pharmacy prices',
        'Use health insurance benefits'
      ]
    };

    return suggestions[category] || [
      'Review your spending habits',
      'Look for ways to reduce costs',
      'Consider if this expense is necessary',
      'Find alternative cheaper options'
    ];
  };

  const generateReward = (savedAmount: number, category: string): Achievement['reward'] => {
    const rewards = [
      { type: 'coupon' as const, value: '10% off next purchase', code: 'SAVE10' },
      { type: 'offer' as const, value: 'Free delivery on orders above ₹500', code: 'FREEDEL' },
      { type: 'cashback' as const, value: '₹100 cashback on next transaction', code: 'CASH100' },
      { type: 'coupon' as const, value: '20% off dining out', code: 'DINE20' },
      { type: 'offer' as const, value: 'Buy 1 Get 1 free on entertainment', code: 'BOGO' },
      { type: 'cashback' as const, value: '₹50 cashback on utilities', code: 'UTIL50' }
    ];

    return rewards[Math.floor(Math.random() * rewards.length)];
  };

  const updateCategorySpending = (categoryId: string, amount: number) => {
    setBudgetCategories(prev => 
      prev.map(category => 
        category.id === categoryId 
          ? { ...category, spent: Math.max(0, category.spent + amount) }
          : category
      )
    );
  };

  const adjustBudgetLimit = (categoryId: string, newLimit: number) => {
    setBudgetCategories(prev => 
      prev.map(category => 
        category.id === categoryId 
          ? { ...category, limit: Math.max(0, newLimit) }
          : category
      )
    );
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const claimReward = () => {
    setShowScratchCard(false);
    setCurrentReward(null);
  };

  const getTotalBudget = () => budgetCategories.reduce((sum, cat) => sum + cat.limit, 0);
  const getTotalSpent = () => budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const getTotalSaved = () => getTotalBudget() - getTotalSpent();

  const getBudgetStatus = (): "overspent" | "underspent" | "neutral" => {
    const totalBudget = getTotalBudget();
    const totalSpent = getTotalSpent();
    if (totalSpent > totalBudget) return "overspent";
    if (totalSpent < totalBudget) return "underspent";
    return "neutral";
  };

  const triggerReward = () => {
    const saved = getTotalSaved();
    const reward = generateReward(Math.max(saved, 0), "Overall");
    setCurrentReward(reward);
    setShowScratchCard(true);
  };

  // Test function to switch between different budget states
  const setTestScenario = (scenario: 'overspending' | 'underspending' | 'neutral') => {
    switch (scenario) {
      case 'overspending':
        setBudgetCategories([
          { id: '1', name: 'Food & Dining', limit: 10000, spent: 7500, color: '#FF6B6B' },
          { id: '2', name: 'Transportation', limit: 6000, spent: 4200, color: '#4ECDC4' },
          { id: '3', name: 'Entertainment', limit: 5000, spent: 2000, color: '#45B7D1' },
          { id: '4', name: 'Shopping', limit: 8000, spent: 12000, color: '#96CEB4' }, // Overspent
          { id: '5', name: 'Utilities', limit: 4000, spent: 3800, color: '#FFEAA7' },
          { id: '6', name: 'Healthcare', limit: 3000, spent: 0, color: '#DDA0DD' },
        ]);
        break;
      case 'underspending':
        setBudgetCategories([
          { id: '1', name: 'Food & Dining', limit: 10000, spent: 6000, color: '#FF6B6B' }, // Saved 40%
          { id: '2', name: 'Transportation', limit: 6000, spent: 3000, color: '#4ECDC4' }, // Saved 50%
          { id: '3', name: 'Entertainment', limit: 5000, spent: 2000, color: '#45B7D1' }, // Saved 60%
          { id: '4', name: 'Shopping', limit: 8000, spent: 5000, color: '#96CEB4' },
          { id: '5', name: 'Utilities', limit: 4000, spent: 3800, color: '#FFEAA7' },
          { id: '6', name: 'Healthcare', limit: 3000, spent: 0, color: '#DDA0DD' },
        ]);
        break;
      case 'neutral':
        setBudgetCategories([
          { id: '1', name: 'Food & Dining', limit: 10000, spent: 9500, color: '#FF6B6B' },
          { id: '2', name: 'Transportation', limit: 6000, spent: 5800, color: '#4ECDC4' },
          { id: '3', name: 'Entertainment', limit: 5000, spent: 4800, color: '#45B7D1' },
          { id: '4', name: 'Shopping', limit: 8000, spent: 7800, color: '#96CEB4' },
          { id: '5', name: 'Utilities', limit: 4000, spent: 3800, color: '#FFEAA7' },
          { id: '6', name: 'Healthcare', limit: 3000, spent: 0, color: '#DDA0DD' },
        ]);
        break;
    }
  };

  return {
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
  };
};
