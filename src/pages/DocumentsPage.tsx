
import React, { useState } from 'react';
import { Upload, FileText, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import LegalHeader from '@/components/LegalHeader';
import LegalFooter from '@/components/LegalFooter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const DocumentsPage: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [documentText, setDocumentText] = useState('');
  const [documentSummary, setDocumentSummary] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedFileName(file.name);
    setIsUploading(true);
    
    // Simulate file reading
    setTimeout(() => {
      setIsUploading(false);
      
      // For demo purposes, we'll use a mock document text
      if (file.name.toLowerCase().includes('lease')) {
        setDocumentText('THIS LEASE AGREEMENT is made and entered into this ____ day of ________, 20__, by and between Property Owner ("Landlord") and Tenant Name ("Tenant"). WITNESSETH: That in consideration of the mutual covenants contained herein, the parties hereby agree as follows:\n\n1. PROPERTY: Landlord agrees to rent to Tenant and Tenant agrees to rent from Landlord the premises located at: _____________ ("the premises").\n\n2. TERM: This lease shall be for a term of 12 months, beginning on ________ and ending on ________.');
      } else if (file.name.toLowerCase().includes('contract')) {
        setDocumentText('INDEPENDENT CONTRACTOR AGREEMENT\n\nThis Independent Contractor Agreement ("Agreement") is made effective as of ________, by and between Company Name ("Company") and Contractor Name ("Contractor").\n\n1. ENGAGEMENT: Company hereby engages Contractor, and Contractor hereby accepts engagement, as an independent contractor to provide the following services: _____________.\n\n2. TERM: This Agreement shall begin on the effective date and continue until the completion of the services, but no later than ________, unless earlier terminated.');
      } else {
        setDocumentText('This is a sample legal document text. In real implementation, this would be the extracted text from the uploaded document using Optical Character Recognition (OCR) technology.');
      }
    }, 1500);
  };

  const handleAnalyzeDocument = () => {
    if (!documentText) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Generate a mock summary based on the document type
      let summary = '';
      
      if (uploadedFileName.toLowerCase().includes('lease')) {
        summary = '📄 Document Type: Residential Lease Agreement\n\n📌 Key Points:\n- 12-month lease term\n- Addresses tenant and landlord responsibilities\n- Includes standard provisions for rent payment, security deposit, and property maintenance\n\n⚠️ Important Clauses:\n- Rent due on 1st of each month\n- Security deposit equal to one month\'s rent\n- No alterations without landlord permission\n\n📝 Plain Language Summary:\nThis is a standard residential lease agreement that establishes a 12-month rental arrangement. It outlines the responsibilities of both the tenant and landlord, including payment terms and maintenance obligations.';
      } else if (uploadedFileName.toLowerCase().includes('contract')) {
        summary = '📄 Document Type: Independent Contractor Agreement\n\n📌 Key Points:\n- Defines contractor status as independent, not employee\n- Outlines scope of services and payment terms\n- Addresses ownership of work product\n\n⚠️ Important Clauses:\n- Contractor responsible for own taxes\n- No benefits provided\n- Company owns all work produced\n\n📝 Plain Language Summary:\nThis agreement establishes an independent contractor relationship rather than employment. The contractor will provide specific services but isn\'t entitled to employee benefits and must handle their own taxes. Any work created belongs to the company.';
      } else {
        summary = '📄 Document Type: Legal Document\n\n📌 Key Points:\n- Contains legal terminology and formal structure\n- Appears to establish rights and obligations between parties\n\n⚠️ Note:\n- This is a simplified analysis for demonstration purposes\n- A full analysis would identify specific clauses and implications\n\n📝 Plain Language Summary:\nThis appears to be a legal document that establishes some form of agreement between parties. For a more accurate analysis, please upload a complete document.';
      }
      
      setDocumentSummary(summary);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LegalHeader />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-legal-primary">Document Analysis</h1>
        
        <Tabs defaultValue="upload" className="w-full">
          <TabsList>
            <TabsTrigger value="upload" className="data-[state=active]:bg-legal-primary data-[state=active]:text-white">
              Upload Document
            </TabsTrigger>
            <TabsTrigger value="paste" className="data-[state=active]:bg-legal-primary data-[state=active]:text-white">
              Paste Text
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="animate-fade-in">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Upload a Legal Document</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-legal-border rounded-lg bg-legal-background">
                  <Upload className="h-10 w-10 text-legal-muted mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a legal document (PDF, DOC, DOCX) to get a simplified explanation
                  </p>
                  <Input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileUpload}
                    className="max-w-xs"
                  />
                </div>
                
                {isUploading && (
                  <div className="flex items-center justify-center mt-4">
                    <Loader className="h-5 w-5 animate-spin text-legal-primary mr-2" />
                    <span>Uploading document...</span>
                  </div>
                )}
                
                {uploadedFileName && !isUploading && (
                  <div className="mt-4">
                    <p className="flex items-center">
                      <FileText className="h-5 w-5 text-legal-primary mr-2" />
                      <span>Uploaded: {uploadedFileName}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="paste" className="animate-fade-in">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Paste Document Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Paste the text of your legal document here..." 
                  className="min-h-[200px]"
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {documentText && (
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Text</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-legal-background p-4 rounded-md max-h-[400px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{documentText}</pre>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">AI Analysis</CardTitle>
                <Button 
                  size="sm" 
                  onClick={handleAnalyzeDocument} 
                  disabled={!documentText || isAnalyzing}
                  className="bg-legal-primary hover:bg-legal-primary/90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze'
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {documentSummary ? (
                  <div className="bg-legal-background p-4 rounded-md max-h-[400px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{documentSummary}</pre>
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    <p>Click "Analyze" to get an AI-powered summary of this document.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-700 text-sm">
            <strong>Disclaimer:</strong> This tool provides a general analysis of legal documents for informational purposes only. 
            It is not a substitute for legal advice. The accuracy of the analysis depends on the quality of the document and text extraction. 
            Always consult with a qualified attorney to understand the full legal implications of any document.
          </p>
        </div>
      </main>
      
      <LegalFooter />
    </div>
  );
};

export default DocumentsPage;
