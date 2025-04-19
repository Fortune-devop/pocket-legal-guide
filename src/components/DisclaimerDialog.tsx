
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DisclaimerDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('legal-disclaimer-accepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('legal-disclaimer-accepted', 'true');
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Important Legal Disclaimer</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4 text-base py-4">
            <p className="font-medium text-destructive">
              This tool does not provide legal advice. Consult a licensed attorney.
            </p>
            <p>
              The information provided through this service:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Is for general informational purposes only</li>
              <li>AI responses may be incomplete or outdated</li>
              <li>No attorney-client relationship is formed</li>
              <li>Should not be relied upon as a substitute for professional legal counsel</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleAccept} className="w-full">
            I Understand and Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
