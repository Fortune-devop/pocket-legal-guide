
import { SignUp } from "@clerk/clerk-react";
import LegalHeader from "@/components/LegalHeader";
import LegalFooter from "@/components/LegalFooter";

const SignUpPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LegalHeader />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: "bg-legal-primary hover:bg-legal-primary/90",
                card: "shadow-xl border border-gray-100",
              }
            }}
          />
        </div>
      </main>
      <LegalFooter />
    </div>
  );
};

export default SignUpPage;
