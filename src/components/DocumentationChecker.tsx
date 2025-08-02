import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Brain, TrendingUp, Building, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LoanType = "personal" | "home" | "auto" | "business";
type ApplicationStatus = "pending" | "processing" | "approved" | "rejected";

interface AssessmentResult {
  eligibility: "high" | "medium" | "low";
  score: number;
  recommendations: string[];
  suggestedCompanies: Array<{
    name: string;
    approvalChance: number;
    type: string;
  }>;
}

export const DocumentationChecker = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [formData, setFormData] = useState({
    applicantName: "",
    age: "",
    income: "",
    employment: "",
    loanType: "" as LoanType,
    loanAmount: "",
    creditScore: "",
    purpose: "",
    documents: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      // Mock ML assessment based on form data
      const income = parseFloat(formData.income);
      const loanAmount = parseFloat(formData.loanAmount);
      const creditScore = parseFloat(formData.creditScore);
      
      let score = 0;
      if (creditScore >= 750) score += 30;
      else if (creditScore >= 650) score += 20;
      else score += 10;
      
      if (income * 12 >= loanAmount * 3) score += 40;
      else if (income * 12 >= loanAmount * 2) score += 25;
      else score += 10;
      
      score += Math.floor(Math.random() * 30);

      let eligibility: "high" | "medium" | "low" = "low";
      if (score >= 70) eligibility = "high";
      else if (score >= 50) eligibility = "medium";

      const mockResult: AssessmentResult = {
        eligibility,
        score,
        recommendations: [
          eligibility === "high" 
            ? "Excellent financial profile - apply with premium lenders"
            : eligibility === "medium" 
            ? "Good chances - consider improving credit score"
            : "Consider reducing loan amount or improving credit history",
          "Submit complete documentation for faster processing",
          "Compare interest rates across multiple lenders"
        ],
        suggestedCompanies: [
          { name: "Prime Bank", approvalChance: eligibility === "high" ? 95 : eligibility === "medium" ? 75 : 45, type: "Bank" },
          { name: "SecureFinance", approvalChance: eligibility === "high" ? 90 : eligibility === "medium" ? 70 : 40, type: "NBFC" },
          { name: "TrustLoan Corp", approvalChance: eligibility === "high" ? 85 : eligibility === "medium" ? 65 : 35, type: "Financial Institution" }
        ]
      };

      setResult(mockResult);
      setIsProcessing(false);
      
      toast({
        title: "Assessment Complete",
        description: `Your eligibility score is ${score}/100 with ${eligibility} approval chances.`,
      });
    }, 3000);
  };

  const documents = [
    "Income Certificate", "Bank Statements", "Credit Report", "Identity Proof", 
    "Address Proof", "Employment Letter", "Tax Returns", "Collateral Documents"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
            <FileCheck className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Documentation Checker</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          AI-powered analysis of your loan requirements with ML eligibility assessment and personalized company recommendations
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Application Form */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Loan Application Details
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Applicant Name</Label>
                <Input
                  id="name"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="income">Monthly Income (₹)</Label>
                <Input
                  id="income"
                  type="number"
                  value={formData.income}
                  onChange={(e) => setFormData({...formData, income: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="employment">Employment Type</Label>
                <Select onValueChange={(value) => setFormData({...formData, employment: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                    <SelectItem value="business">Business Owner</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanType">Loan Type</Label>
                <Select onValueChange={(value: LoanType) => setFormData({...formData, loanType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="home">Home Loan</SelectItem>
                    <SelectItem value="auto">Auto Loan</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Loan Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="credit">Credit Score</Label>
              <Input
                id="credit"
                type="number"
                min="300"
                max="900"
                value={formData.creditScore}
                onChange={(e) => setFormData({...formData, creditScore: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="purpose">Loan Purpose</Label>
              <Textarea
                id="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                placeholder="Describe the purpose of your loan..."
              />
            </div>

            <div>
              <Label>Available Documents</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {documents.map((doc) => (
                  <Badge key={doc} variant="outline" className="justify-center py-2">
                    {doc}
                  </Badge>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isProcessing}
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Brain className="h-4 w-4 animate-pulse mr-2" />
                  Processing with AI...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analyze Eligibility
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Results */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-secondary" />
            AI Assessment Results
          </h2>

          {!result ? (
            <div className="text-center py-12 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Complete the form to get your AI-powered eligibility assessment</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Eligibility Score */}
              <div className="text-center p-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-lg">
                <div className="text-4xl font-bold mb-2">
                  {result.score}/100
                </div>
                <Badge 
                  variant={result.eligibility === "high" ? "default" : result.eligibility === "medium" ? "secondary" : "destructive"}
                  className="text-sm"
                >
                  {result.eligibility.toUpperCase()} ELIGIBILITY
                </Badge>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  AI Recommendations
                </h3>
                <div className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                      {rec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Suggestions */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Suggested Lenders
                </h3>
                <div className="space-y-3">
                  {result.suggestedCompanies.map((company, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{company.name}</h4>
                        <Badge variant="outline">{company.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-secondary to-success h-2 rounded-full transition-all duration-500"
                            style={{ width: `${company.approvalChance}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{company.approvalChance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};