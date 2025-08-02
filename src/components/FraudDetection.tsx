import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Search, CheckCircle, XCircle, AlertCircle, Building, Phone, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type VerificationStatus = "safe" | "warning" | "danger" | "unknown";

interface CompanyInfo {
  name: string;
  status: VerificationStatus;
  riskLevel: "low" | "medium" | "high";
  license: string;
  established: string;
  website: string;
  contact: string;
  warnings: string[];
  verifications: string[];
}

interface LoanHistory {
  hasActiveLoans: boolean;
  loanCount: number;
  totalAmount: number;
  recentApplications: string[];
  suspiciousActivity: string[];
}

export const FraudDetection = () => {
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [checkType, setCheckType] = useState<"company" | "personal">("company");
  const [companyResult, setCompanyResult] = useState<CompanyInfo | null>(null);
  const [loanHistory, setLoanHistory] = useState<LoanHistory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCompanyCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsChecking(true);
    
    // Simulate fraud detection API
    setTimeout(() => {
      // Mock company verification based on search query
      const isKnownBad = searchQuery.toLowerCase().includes("fake") || 
                         searchQuery.toLowerCase().includes("scam") ||
                         searchQuery.toLowerCase().includes("fraud");
      
      const isWarning = searchQuery.toLowerCase().includes("warning") || 
                       searchQuery.toLowerCase().includes("risk");

      let status: VerificationStatus = "safe";
      let riskLevel: "low" | "medium" | "high" = "low";
      let warnings: string[] = [];
      let verifications: string[] = [];

      if (isKnownBad) {
        status = "danger";
        riskLevel = "high";
        warnings = [
          "Company reported for fraudulent activities",
          "Multiple complaints registered",
          "Invalid license information",
          "Suspicious contact details"
        ];
      } else if (isWarning) {
        status = "warning";
        riskLevel = "medium";
        warnings = [
          "Limited operational history",
          "Few customer reviews available"
        ];
        verifications = [
          "Valid business registration",
          "Active website presence"
        ];
      } else {
        status = "safe";
        verifications = [
          "RBI approved financial institution",
          "Valid business license",
          "Positive customer reviews",
          "Established track record",
          "Secure website with SSL"
        ];
      }

      const mockCompany: CompanyInfo = {
        name: searchQuery,
        status,
        riskLevel,
        license: status === "danger" ? "INVALID/EXPIRED" : "RBI-FL-" + Math.floor(Math.random() * 10000),
        established: status === "danger" ? "Unknown" : "2015",
        website: `www.${searchQuery.toLowerCase().replace(/\s+/g, '')}.com`,
        contact: status === "danger" ? "Unverified" : "+91-" + Math.floor(Math.random() * 9000000000 + 1000000000),
        warnings,
        verifications
      };

      setCompanyResult(mockCompany);
      setIsChecking(false);
      
      toast({
        title: "Verification Complete",
        description: `Company risk level: ${riskLevel.toUpperCase()}`,
        variant: status === "danger" ? "destructive" : "default"
      });
    }, 2000);
  };

  const handlePersonalCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsChecking(true);
    
    // Simulate personal loan history check
    setTimeout(() => {
      const mockHistory: LoanHistory = {
        hasActiveLoans: Math.random() > 0.6,
        loanCount: Math.floor(Math.random() * 5),
        totalAmount: Math.floor(Math.random() * 1000000),
        recentApplications: [
          "HDFC Bank - Personal Loan (2 months ago)",
          "ICICI Bank - Credit Card (4 months ago)"
        ],
        suspiciousActivity: Math.random() > 0.7 ? [
          "Multiple loan applications in short period",
          "Inconsistent income reporting"
        ] : []
      };

      setLoanHistory(mockHistory);
      setIsChecking(false);
      
      toast({
        title: "History Check Complete",
        description: `Found ${mockHistory.loanCount} previous loan records`,
      });
    }, 2000);
  };

  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case "safe": return <CheckCircle className="h-5 w-5 text-success" />;
      case "warning": return <AlertCircle className="h-5 w-5 text-warning" />;
      case "danger": return <XCircle className="h-5 w-5 text-destructive" />;
      default: return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case "safe": return "success";
      case "warning": return "secondary";
      case "danger": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-warning to-destructive rounded-xl">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Fraud Detection System</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Advanced verification system to protect against fraudulent companies and unauthorized loan activities
        </p>
      </div>

      {/* Check Type Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-muted p-1 rounded-lg flex">
          <Button
            variant={checkType === "company" ? "default" : "ghost"}
            onClick={() => setCheckType("company")}
            className="rounded-md"
          >
            <Building className="h-4 w-4 mr-2" />
            Company Verification
          </Button>
          <Button
            variant={checkType === "personal" ? "default" : "ghost"}
            onClick={() => setCheckType("personal")}
            className="rounded-md"
          >
            <Shield className="h-4 w-4 mr-2" />
            Loan History Check
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Search Form */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            {checkType === "company" ? "Company Verification" : "Personal Loan History"}
          </h2>
          
          <form onSubmit={checkType === "company" ? handleCompanyCheck : handlePersonalCheck} className="space-y-6">
            <div>
              <Label htmlFor="search">
                {checkType === "company" ? "Company Name or Website" : "PAN Number or Phone"}
              </Label>
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={checkType === "company" ? "Enter company name or website URL" : "Enter PAN number or phone number"}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isChecking}
              size="lg"
              variant={checkType === "company" ? "default" : "secondary"}
            >
              {isChecking ? (
                <>
                  <Search className="h-4 w-4 animate-pulse mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  {checkType === "company" ? "Verify Company" : "Check History"}
                </>
              )}
            </Button>
          </form>

          {/* Quick Check Examples */}
          <div className="mt-6 p-4 bg-accent/20 rounded-lg">
            <h3 className="font-medium mb-2">Quick Test Examples:</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>• Try "Fake Finance" (High Risk)</div>
              <div>• Try "Warning Bank" (Medium Risk)</div>
              <div>• Try "HDFC Bank" (Safe)</div>
            </div>
          </div>
        </Card>

        {/* Results */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-warning" />
            Verification Results
          </h2>

          {checkType === "company" ? (
            !companyResult ? (
              <div className="text-center py-12 text-muted-foreground">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter a company name to start verification</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Company Status */}
                <div className="p-4 rounded-lg border-2" style={{
                  borderColor: companyResult.status === "safe" ? "hsl(var(--success))" : 
                             companyResult.status === "warning" ? "hsl(var(--warning))" : "hsl(var(--destructive))"
                }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{companyResult.name}</h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(companyResult.status)}
                      <Badge variant={getStatusColor(companyResult.status) as any}>
                        {companyResult.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>License: {companyResult.license}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>Est: {companyResult.established}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{companyResult.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>{companyResult.website}</span>
                    </div>
                  </div>
                </div>

                {/* Warnings */}
                {companyResult.warnings.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-destructive">
                      <XCircle className="h-5 w-5" />
                      Security Warnings
                    </h4>
                    <div className="space-y-2">
                      {companyResult.warnings.map((warning, index) => (
                        <div key={index} className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm">
                          {warning}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verifications */}
                {companyResult.verifications.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-success">
                      <CheckCircle className="h-5 w-5" />
                      Verified Information
                    </h4>
                    <div className="space-y-2">
                      {companyResult.verifications.map((verification, index) => (
                        <div key={index} className="p-3 bg-success/10 border border-success/20 rounded-lg text-sm">
                          {verification}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          ) : (
            !loanHistory ? (
              <div className="text-center py-12 text-muted-foreground">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter personal details to check loan history</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Loan Status Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/20 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-1">{loanHistory.loanCount}</div>
                    <div className="text-sm text-muted-foreground">Total Loans</div>
                  </div>
                  <div className="p-4 bg-accent/20 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-1">₹{(loanHistory.totalAmount / 100000).toFixed(1)}L</div>
                    <div className="text-sm text-muted-foreground">Total Amount</div>
                  </div>
                </div>

                {/* Active Loans */}
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    {loanHistory.hasActiveLoans ? (
                      <AlertCircle className="h-5 w-5 text-warning" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                    <h4 className="font-semibold">
                      {loanHistory.hasActiveLoans ? "Active Loans Found" : "No Active Loans"}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {loanHistory.hasActiveLoans 
                      ? "Applicant has existing loan obligations that may affect new loan approval"
                      : "Clean loan history with no current obligations"
                    }
                  </p>
                </div>

                {/* Recent Applications */}
                <div>
                  <h4 className="font-semibold mb-3">Recent Applications</h4>
                  <div className="space-y-2">
                    {loanHistory.recentApplications.map((application, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                        {application}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suspicious Activity */}
                {loanHistory.suspiciousActivity.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Suspicious Activity Detected
                    </h4>
                    <div className="space-y-2">
                      {loanHistory.suspiciousActivity.map((activity, index) => (
                        <div key={index} className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm">
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </Card>
      </div>
    </div>
  );
};