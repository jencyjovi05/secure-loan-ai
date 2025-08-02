import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { DocumentationChecker } from "@/components/DocumentationChecker";
import { FraudDetection } from "@/components/FraudDetection";
import { ChatBot } from "@/components/ChatBot";

export type ActiveSection = "home" | "documentation" | "fraud" | "chat";

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");

  const renderSection = () => {
    switch (activeSection) {
      case "documentation":
        return <DocumentationChecker />;
      case "fraud":
        return <FraudDetection />;
      case "chat":
        return <ChatBot />;
      default:
        return <HeroSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-muted">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="pt-20">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;