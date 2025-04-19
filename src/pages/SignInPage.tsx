
import { useNavigate } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import LegalHeader from "@/components/LegalHeader";

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <LegalHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto w-full max-w-md",
              card: "shadow-lg rounded-lg",
            }
          }}
          afterSignInUrl="/"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
};

export default SignInPage;
