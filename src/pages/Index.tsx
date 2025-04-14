
import React from 'react';
import { Shield, MessageSquare, FileText, BookOpen, Award, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CategoryCard from '@/components/CategoryCard';
import LegalHeader from '@/components/LegalHeader';
import LegalFooter from '@/components/LegalFooter';
import Faq from '@/components/Faq';

const faqs = [
  {
    question: "Is this a substitute for legal advice?",
    answer: "No, Pocket Legal Guide provides basic legal information but is not a substitute for professional legal advice. Always consult with a qualified attorney for specific legal matters."
  },
  {
    question: "How does the AI chat work?",
    answer: "Our AI chat uses advanced language models to provide general legal information and guidance based on common legal principles. It cannot provide personalized legal advice."
  },
  {
    question: "Is my conversation with the AI private?",
    answer: "We take privacy seriously. Your conversations are encrypted and not shared with third parties. However, please avoid sharing sensitive personal information."
  },
  {
    question: "Can I use information from this app in court?",
    answer: "The information provided is educational in nature and not intended to be used as evidence or in legal proceedings. Always consult with a qualified attorney for legal representation."
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LegalHeader />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="py-12 md:py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-legal-primary">Legal Guidance in Your Pocket</h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Get AI-powered legal information and guidance for common legal questions and concerns
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-legal-primary hover:bg-legal-primary/90" asChild>
                <a href="/chat">Ask Legal Questions</a>
              </Button>
              <Button size="lg" variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-primary/10" asChild>
                <a href="/topics">Browse Legal Topics</a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">Explore Legal Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CategoryCard 
              title="Family Law" 
              description="Divorce, child custody, adoption, and other family-related legal matters." 
              icon={Shield} 
              link="/topics/family-law" 
            />
            <CategoryCard 
              title="Employment Law" 
              description="Workplace rights, discrimination, contracts, and employment disputes." 
              icon={Award} 
              link="/topics/employment-law" 
            />
            <CategoryCard 
              title="Housing Law" 
              description="Tenant rights, eviction processes, leases, and property disputes." 
              icon={BookOpen} 
              link="/topics/housing-law" 
            />
            <CategoryCard 
              title="Consumer Rights" 
              description="Consumer protection, fraud, warranties, and handling disputes." 
              icon={Shield} 
              link="/topics/consumer-rights" 
            />
            <CategoryCard 
              title="AI Legal Chat" 
              description="Ask questions and get AI-powered answers to common legal issues." 
              icon={MessageSquare} 
              link="/chat" 
            />
            <CategoryCard 
              title="Document Analyzer" 
              description="Upload and analyze legal documents to get plain-language summaries." 
              icon={FileText} 
              link="/documents" 
            />
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-10 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          <Faq questions={faqs} />
        </section>
        
        {/* Disclaimer */}
        <section className="py-10 max-w-3xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold text-amber-700 flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Important Disclaimer
            </h3>
            <p className="text-amber-700 text-sm mt-2">
              Pocket Legal Guide provides general legal information for educational purposes only. 
              It is not a substitute for professional legal advice. Always consult with a 
              qualified attorney for advice specific to your situation.
            </p>
          </div>
        </section>
      </main>
      
      <LegalFooter />
    </div>
  );
};

export default Index;
