
import { useNavigate } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";
import LegalHeader from "@/components/LegalHeader";

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <LegalHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto w-full max-w-md",
              card: "shadow-lg rounded-lg",
            }
          }}
          afterSignUpUrl="/"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
