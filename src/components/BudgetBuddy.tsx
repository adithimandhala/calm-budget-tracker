import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User, Lightbulb, TrendingUp } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "buddy";
  timestamp: Date;
  suggestions?: string[];
}

const BudgetBuddy = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 **Welcome to your Personal Financial Assistant!**\n\nI'm here to help you take control of your finances and achieve your money goals. I can assist you with:\n\n💰 **Budget Planning & Tracking**\n📊 **Spending Analysis**\n🎯 **Goal Setting**\n💼 **Investment Advice**\n💳 **Debt Management**\n🚨 **Emergency Fund Planning**\n\nWhat would you like to work on today?",
      sender: "buddy",
      timestamp: new Date(),
      suggestions: [
        "Create a budget",
        "Analyze my spending",
        "Set savings goals",
        "Plan investments",
        "Manage debt",
        "Build emergency fund"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    // Enhanced AI responses based on user input
    const getAIResponse = (userText: string): Message => {
      const responses = {
        save: {
          text: "Great question! Based on your spending patterns, here are 5 proven ways to save ₹5,000+ this month:\n\n💰 **Immediate Savings (₹2,500):**\n• Cook at home 3 more times/week (save ₹1,500)\n• Use public transport 2x/week instead of cabs (save ₹1,000)\n\n💡 **Smart Cuts (₹2,000):**\n• Cancel unused subscriptions (save ₹800)\n• Switch to generic brands for groceries (save ₹700)\n• Use energy-efficient appliances (save ₹500)\n\n🚀 **Long-term (₹500+):**\n• Negotiate better rates on insurance/utilities\n• Use cashback apps for purchases",
          suggestions: ["Set cooking reminders", "Find public transport routes", "Review subscriptions", "Track energy usage", "Download cashback apps"]
        },
        spending: {
          text: "📊 **Your Spending Analysis:**\n\n✅ **Good News:** You're 15% under budget on transportation (₹8,500 vs ₹10,000)\n⚠️ **Watch Out:** 25% over budget on dining out (₹12,500 vs ₹10,000)\n📈 **Trend:** Entertainment spending up 30% this month\n\n🎯 **Recommendations:**\n• Set dining alerts at ₹9,000\n• Plan 2 home-cooked meals weekly\n• Use the 24-hour rule for entertainment purchases",
          suggestions: ["Set dining budget alerts", "Plan weekly meals", "Use 24-hour rule", "Find free entertainment", "Track daily expenses"]
        },
        goal: {
          text: "🎯 **Let's Set Your Financial Goals!**\n\nBased on your income (₹75,000) and current expenses (₹32,000), here are realistic targets:\n\n**Conservative (₹15,000/month):**\n• Emergency fund: 6 months\n• Retirement: 10% of income\n\n**Moderate (₹18,000/month):**\n• Emergency fund: 8 months\n• Retirement: 15% of income\n• Vacation fund: ₹5,000/month\n\n**Ambitious (₹22,000/month):**\n• Emergency fund: 12 months\n• Retirement: 20% of income\n• Investment: ₹10,000/month",
          suggestions: ["₹15,000 conservative", "₹18,000 moderate", "₹22,000 ambitious", "Create emergency fund", "Start retirement planning"]
        },
        budget: {
          text: "📋 **Budget Planning Made Simple:**\n\n**50/30/20 Rule for Your Income (₹75,000):**\n• **Needs (50%):** ₹37,500 (rent, food, utilities)\n• **Wants (30%):** ₹22,500 (entertainment, dining)\n• **Savings (20%):** ₹15,000 (emergency, retirement)\n\n**Monthly Budget Breakdown:**\n• Rent: ₹20,000\n• Groceries: ₹8,000\n• Transportation: ₹6,000\n• Utilities: ₹3,500\n• Entertainment: ₹10,000\n• Savings: ₹15,000\n• Emergency: ₹5,000",
          suggestions: ["Use 50/30/20 rule", "Track daily expenses", "Set budget alerts", "Review monthly", "Use budgeting apps"]
        },
        investment: {
          text: "💼 **Investment Strategy for Beginners:**\n\n**Start with ₹5,000/month:**\n• **SIP in Index Funds (60%):** ₹3,000\n• **Emergency Fund (25%):** ₹1,250\n• **Direct Stocks (15%):** ₹750\n\n**Recommended Portfolio:**\n• Large Cap: 40%\n• Mid Cap: 30%\n• Small Cap: 20%\n• International: 10%\n\n**Platforms to Consider:**\n• Zerodha, Groww, Upstox\n• Start with ₹500 SIPs\n• Focus on long-term growth",
          suggestions: ["Start SIP with ₹500", "Research index funds", "Build emergency fund", "Learn about stocks", "Set investment goals"]
        },
        debt: {
          text: "💳 **Debt Management Strategy:**\n\n**Priority Order:**\n1. **High-interest debt** (Credit cards: 24-36%)\n2. **Personal loans** (12-18%)\n3. **Home loans** (8-10%)\n\n**Action Plan:**\n• Pay minimum on all debts\n• Extra payment on highest interest\n• Consider balance transfer for credit cards\n• Negotiate lower interest rates\n\n**Quick Wins:**\n• Stop using credit cards\n• Use debt snowball method\n• Set up automatic payments",
          suggestions: ["List all debts", "Create payment plan", "Negotiate rates", "Stop using cards", "Set up auto-pay"]
        },
        emergency: {
          text: "🚨 **Emergency Fund Planning:**\n\n**Target Amount:** 6-12 months of expenses\n• **Your target:** ₹1.92-3.84 lakhs\n• **Current:** ₹50,000 (estimated)\n• **Need to save:** ₹1.42-3.34 lakhs\n\n**How to Build:**\n• Save ₹15,000/month for 10-22 months\n• Keep in high-yield savings account\n• Separate from regular savings\n• Only use for true emergencies\n\n**What Counts as Emergency:**\n• Job loss, medical emergency\n• Major home/car repairs\n• NOT vacations or shopping",
          suggestions: ["Calculate 6-month expenses", "Open high-yield account", "Set monthly target", "Track progress", "Define emergency rules"]
        },
        default: {
          text: "👋 **I'm your Financial Assistant!** I can help you with:\n\n💰 **Money Management:**\n• Budget planning & tracking\n• Saving strategies\n• Investment advice\n\n📊 **Financial Analysis:**\n• Spending patterns\n• Goal setting\n• Debt management\n\n🎯 **Quick Actions:**\n• Emergency fund planning\n• Retirement preparation\n• Tax optimization\n\nWhat would you like to focus on today?",
          suggestions: ["Create a budget", "Analyze spending", "Set savings goal", "Plan investments", "Manage debt", "Build emergency fund"]
        }
      };

      const lowerText = userText.toLowerCase();
      let response = responses.default;
      
      if (lowerText.includes("save") || lowerText.includes("money") || lowerText.includes("savings")) {
        response = responses.save;
      } else if (lowerText.includes("spending") || lowerText.includes("analyze") || lowerText.includes("expense")) {
        response = responses.spending;
      } else if (lowerText.includes("goal") || lowerText.includes("target") || lowerText.includes("aim")) {
        response = responses.goal;
      } else if (lowerText.includes("budget") || lowerText.includes("plan")) {
        response = responses.budget;
      } else if (lowerText.includes("invest") || lowerText.includes("investment") || lowerText.includes("sip")) {
        response = responses.investment;
      } else if (lowerText.includes("debt") || lowerText.includes("loan") || lowerText.includes("credit")) {
        response = responses.debt;
      } else if (lowerText.includes("emergency") || lowerText.includes("fund")) {
        response = responses.emergency;
      }

      return {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "buddy",
        timestamp: new Date(),
        suggestions: response.suggestions
      };
    };

    setMessages(prev => [...prev, userMessage, getAIResponse(inputMessage)]);
    setInputMessage("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <Card className="bg-card shadow-card h-[600px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-finance-blue" />
          <span>Financial Assistant</span>
          <div className="flex items-center space-x-1 ml-auto">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                  <div className={`flex items-start space-x-2 ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user" ? "bg-finance-blue text-primary-foreground" : "bg-accent"
                    }`}>
                      {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === "user" 
                        ? "bg-finance-blue text-primary-foreground" 
                        : "bg-accent text-accent-foreground"
                    }`}>
                      <div className="text-sm whitespace-pre-line">
                        {message.text.split('\n').map((line, index) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <strong key={index} className="font-semibold">{line.slice(2, -2)}</strong>;
                          } else if (line.startsWith('• ')) {
                            return <div key={index} className="ml-2">• {line.slice(2)}</div>;
                          } else if (line.startsWith('💰') || line.startsWith('📊') || line.startsWith('🎯') || line.startsWith('💼') || line.startsWith('💳') || line.startsWith('🚨') || line.startsWith('👋') || line.startsWith('✅') || line.startsWith('⚠️') || line.startsWith('📈') || line.startsWith('📋') || line.startsWith('🚀') || line.startsWith('💡')) {
                            return <div key={index} className="font-semibold text-base">{line}</div>;
                          } else if (line.trim() === '') {
                            return <br key={index} />;
                          } else {
                            return <div key={index}>{line}</div>;
                          }
                        })}
                      </div>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  
                  {message.suggestions && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs h-7"
                        >
                          <Lightbulb className="w-3 h-3 mr-1" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Ask Financial Assistant anything..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetBuddy;