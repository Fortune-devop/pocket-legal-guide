
import React from 'react';
import { Briefcase, Home, Users, ShoppingBag, Car, Scale, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LegalHeader from '@/components/LegalHeader';
import LegalFooter from '@/components/LegalFooter';

const TopicsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LegalHeader />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-legal-primary">Legal Topics</h1>
        
        <Tabs defaultValue="family" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8 bg-legal-background">
            <TabsTrigger value="family" className="data-[state=active]:bg-legal-primary data-[state=active]:text-white">
              Family
            </TabsTrigger>
            <TabsTrigger value="employment" className="data-[state=active]:bg-legal-primary data-[state=active]:text-white">
              Employment
            </TabsTrigger>
            <TabsTrigger value="housing" className="data-[state=active]:bg-legal-primary data-[state=active]:text-white">
              Housing
            </TabsTrigger>
            <TabsTrigger value="consumer" className="data-[state=active]:bg-legal-primary data-[state=active]:text-white">
              Consumer
            </TabsTrigger>
            <TabsTrigger value="contracts" className="data-[state=active]:bg-legal-primary data-[state=active]:text-white">
              Contracts
            </TabsTrigger>
            <TabsTrigger value="accidents" className="data-[state=active]:bg-legal-primary data-[state=active]:text-white">
              Accidents
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="family" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Divorce Basics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn about the divorce process, property division, spousal support, and how to prepare for a divorce.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Child Custody</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understanding different types of custody arrangements, visitation rights, and what courts consider when determining custody.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Child Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    How child support is calculated, enforcement mechanisms, and options for modification.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Estate Planning</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Wills, trusts, power of attorney, and other important documents to protect your family and assets.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="employment" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Workplace Discrimination</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understanding what qualifies as discrimination, protected classes, and steps to take if you've been discriminated against.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Wrongful Termination</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn about at-will employment, illegal reasons for termination, and your rights if wrongfully terminated.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Wage & Hour Laws</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Minimum wage requirements, overtime rules, meal breaks, and how to address wage theft.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Workplace Safety</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    OSHA regulations, reporting unsafe conditions, and rights to a safe workplace environment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="housing" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Tenant Rights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Basic rights of tenants, including habitability, privacy, and protections against discrimination.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Eviction Process</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Legal requirements for eviction, notice periods, defenses against eviction, and tenant resources.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Security Deposits</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Laws governing security deposits, allowable deductions, and how to get your deposit back.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Repairs & Maintenance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Landlord responsibilities for repairs, proper notification procedures, and remedies for unresolved issues.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="consumer" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Consumer rights content would go here */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Product Warranties</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understanding express and implied warranties, warranty periods, and what to do when products fail.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Debt Collection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your rights under the Fair Debt Collection Practices Act and how to handle harassment from collectors.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="contracts" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Contract Basics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Elements of a valid contract, common terms, and what makes a contract legally binding.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Contract Breaches</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    What constitutes a breach of contract, available remedies, and steps to take when a contract is broken.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="accidents" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Car Accidents</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Steps to take after an accident, dealing with insurance, and understanding fault determination.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-legal-primary" />
                    <CardTitle className="text-lg">Slip & Fall</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Property owner responsibilities, proving negligence, and what to do if injured on someone else's property.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <LegalFooter />
    </div>
  );
};

export default TopicsPage;
