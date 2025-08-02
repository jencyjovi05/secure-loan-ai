import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, Lightbulb, DollarSign, Shield, FileText } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm your AI Banking Assistant. I can help you with loan processes, insurance questions, and banking-related doubts. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const quickQuestions = [
    { text: "What documents do I need for a home loan?", icon: FileText },
    { text: "How is my credit score calculated?", icon: DollarSign },
    { text: "What is loan insurance?", icon: Shield },
    { text: "Eligibility criteria for personal loans", icon: Lightbulb }
  ];

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("home loan") || message.includes("house loan")) {
      return "For a home loan, you typically need: 1) Income proof (salary slips, ITR), 2) Bank statements (6 months), 3) Property documents, 4) Identity & address proof, 5) Credit score report. The loan amount can be up to 80-90% of property value, and tenure ranges from 5-30 years.";
    }
    
    if (message.includes("credit score")) {
      return "Credit score is calculated based on: 1) Payment history (35%), 2) Credit utilization (30%), 3) Length of credit history (15%), 4) Types of credit (10%), 5) New credit inquiries (10%). A score above 750 is considered excellent for loan approval.";
    }
    
    if (message.includes("personal loan")) {
      return "Personal loan eligibility depends on: 1) Age: 21-60 years, 2) Income: Minimum ₹15,000/month, 3) Credit score: 650+, 4) Employment: 2+ years experience, 5) DTI ratio: <50%. Interest rates range from 10-24% annually.";
    }
    
    if (message.includes("insurance") && message.includes("loan")) {
      return "Loan insurance protects your family from loan burden in case of unforeseen events. Types include: 1) Term life insurance, 2) Credit protection insurance, 3) Mortgage protection insurance. Premium is typically 0.5-1% of loan amount annually.";
    }
    
    if (message.includes("emi") || message.includes("calculate")) {
      return "EMI calculation formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1]. Where P=Principal, R=Monthly interest rate, N=Number of months. You can reduce EMI by: 1) Longer tenure, 2) Higher down payment, 3) Lower interest rate through negotiation.";
    }
    
    if (message.includes("documents") || message.includes("papers")) {
      return "Common loan documents: 1) Application form, 2) Identity proof (Aadhar/PAN), 3) Address proof, 4) Income proof, 5) Bank statements, 6) Employment certificate, 7) Property documents (for secured loans), 8) Photographs. Keep all documents updated and ready.";
    }
    
    if (message.includes("interest rate") || message.includes("rates")) {
      return "Current interest rates (approximate): Home loans: 8.5-11%, Personal loans: 10-24%, Car loans: 8-12%, Business loans: 11-18%. Rates vary based on credit score, income, loan amount, and lender policies. Compare multiple lenders for best rates.";
    }
    
    if (message.includes("fraud") || message.includes("fake") || message.includes("scam")) {
      return "Protect yourself from loan fraud: 1) Verify lender's RBI license, 2) Never pay upfront fees, 3) Check physical office address, 4) Read terms carefully, 5) Avoid deals that seem too good to be true. Report suspicious activities to RBI or local police.";
    }
    
    if (message.includes("rejection") || message.includes("denied") || message.includes("refused")) {
      return "Common loan rejection reasons: 1) Low credit score, 2) Insufficient income, 3) High DTI ratio, 4) Incomplete documents, 5) Job instability. To improve approval chances: maintain good credit, stable employment, and provide complete documentation.";
    }
    
    if (message.includes("hello") || message.includes("hi") || message.includes("help")) {
      return "Hello! I'm here to help with all your banking and loan related questions. You can ask me about loan eligibility, documentation, interest rates, EMI calculations, insurance, or any banking process. What would you like to know?";
    }
    
    return "I understand you're asking about banking services. Could you please be more specific? I can help with loan processes, eligibility criteria, documentation requirements, interest rates, EMI calculations, insurance products, or fraud protection. What particular aspect would you like to know more about?";
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(textToSend),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-secondary to-primary rounded-xl">
            <MessageSquare className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">AI Banking Assistant</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get instant answers to your banking, loan, and insurance questions from our intelligent AI assistant
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="h-[600px] flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`p-2 rounded-lg ${
                  message.type === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {message.type === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div className={`max-w-[80%] ${message.type === "user" ? "text-right" : ""}`}>
                  <div className={`p-4 rounded-lg ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted"
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary text-secondary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(question.text)}
                  className="text-xs h-8"
                >
                  <question.icon className="h-3 w-3 mr-1" />
                  {question.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-border">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about loans, banking, or insurance..."
                className="flex-1"
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};