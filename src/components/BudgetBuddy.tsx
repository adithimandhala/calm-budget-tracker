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
      text: "Hi! I'm Budget Buddy, your AI finance companion. I've analyzed your spending and noticed you're doing great with transportation savings! How can I help you today?",
      sender: "buddy",
      timestamp: new Date(),
      suggestions: [
        "Help me save more money",
        "Analyze my spending patterns",
        "Set a savings goal"
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

    // Mock AI responses based on user input
    const getAIResponse = (userText: string): Message => {
      const responses = {
        save: {
          text: "Great question! Based on your spending, here are 3 ways to save ₹3,000 this month: 1) Cook at home 2 more times per week (save ₹1,200), 2) Use public transport instead of cab twice a week (save ₹800), 3) Cancel one unused subscription (save ₹1,000).",
          suggestions: ["Set cooking reminders", "Find public transport routes", "Review subscriptions"]
        },
        spending: {
          text: "Your spending analysis shows you're 15% under budget on transportation but 20% over on dining out. You've spent ₹12,000 on food this month vs your ₹10,000 budget.",
          suggestions: ["Set dining budget alerts", "Find cheaper restaurants", "Plan weekly meals"]
        },
        goal: {
          text: "Let's set a realistic savings goal! With your current income of ₹75,000 and expenses of ₹32,000, you could aim to save ₹15,000-20,000 monthly. What's your target?",
          suggestions: ["₹15,000 conservative", "₹18,000 moderate", "₹20,000 ambitious"]
        },
        default: {
          text: "I understand you want to improve your finances! I can help you track spending, set budgets, or find ways to save money. What specific area would you like to focus on?",
          suggestions: ["Reduce expenses", "Increase savings", "Budget planning"]
        }
      };

      const lowerText = userText.toLowerCase();
      let response = responses.default;
      
      if (lowerText.includes("save") || lowerText.includes("money")) {
        response = responses.save;
      } else if (lowerText.includes("spending") || lowerText.includes("analyze")) {
        response = responses.spending;
      } else if (lowerText.includes("goal") || lowerText.includes("target")) {
        response = responses.goal;
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
    <Card className="bg-gradient-card shadow-card border-none h-[600px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-coral" />
          <span>Budget Buddy</span>
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
                      message.sender === "user" ? "bg-coral text-primary-foreground" : "bg-accent"
                    }`}>
                      {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === "user" 
                        ? "bg-coral text-primary-foreground" 
                        : "bg-accent text-accent-foreground"
                    }`}>
                      <p className="text-sm">{message.text}</p>
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
            placeholder="Ask Budget Buddy anything..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetBuddy;