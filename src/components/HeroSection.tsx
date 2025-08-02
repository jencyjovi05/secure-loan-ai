import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileCheck, AlertTriangle, MessageSquare, CheckCircle, Shield, Brain } from "lucide-react";
import type { ActiveSection } from "@/pages/Index";

interface HeroSectionProps {
  onNavigate: (section: ActiveSection) => void;
}

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const features = [
    {
      id: "documentation" as ActiveSection,
      icon: FileCheck,
      title: "Documentation Checking",
      description: "AI-powered analysis of loan and insurance requirements with ML eligibility assessment and company recommendations.",
      color: "text-primary"
    },
    {
      id: "fraud" as ActiveSection,
      icon: AlertTriangle,
      title: "Fraud Detection",
      description: "Advanced verification system to detect fake companies, unauthorized loans, and provide real-time security warnings.",
      color: "text-warning"
    },
    {
      id: "chat" as ActiveSection,
      icon: MessageSquare,
      title: "AI Banking Assistant",
      description: "Intelligent chatbot to clarify banking doubts, loan processes, and insurance-related questions instantly.",
      color: "text-secondary"
    }
  ];

  const benefits = [
    "AI-powered eligibility assessment",
    "Real-time fraud detection",
    "Personalized company recommendations",
    "24/7 intelligent assistance"
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Content */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg">
            <Shield className="h-12 w-12 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Secure Loan AI Agent
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Revolutionary AI-powered platform for secure loan processing, fraud detection, and intelligent banking assistance. 
          Get instant eligibility assessments and personalized recommendations.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="hero" size="lg" onClick={() => onNavigate("documentation")}>
            <Brain className="h-5 w-5" />
            Start Assessment
          </Button>
          <Button variant="outline" size="lg" onClick={() => onNavigate("fraud")}>
            <Shield className="h-5 w-5" />
            Check Security
          </Button>
        </div>
        
        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
              <span className="text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-card to-accent/10"
            onClick={() => onNavigate(feature.id)}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`p-3 rounded-xl bg-accent/20 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              <Button variant="ghost" className="mt-4 group-hover:bg-accent">
                Learn More →
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Partner Banks</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">AI Support</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary mb-2">5 Min</div>
            <div className="text-sm text-muted-foreground">Quick Assessment</div>
          </div>
        </div>
      </div>
    </div>
  );
};