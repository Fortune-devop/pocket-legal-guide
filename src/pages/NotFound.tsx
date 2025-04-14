
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import LegalHeader from "@/components/LegalHeader";
import LegalFooter from "@/components/LegalFooter";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <LegalHeader />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-legal-primary/10">
              <FileQuestion className="h-12 w-12 text-legal-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-legal-primary">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Sorry, we couldn't find the legal information you were looking for.
          </p>
          <Button asChild className="bg-legal-primary hover:bg-legal-primary/90">
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </main>
      
      <LegalFooter />
    </div>
  );
};

export default NotFound;
