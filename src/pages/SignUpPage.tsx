
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUp, useSignUp, useClerk } from "@clerk/clerk-react";
import LegalHeader from "@/components/LegalHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const EmailVerificationModal = ({ open, onClose, email }: { open: boolean; onClose: () => void; email: string }) => (
  <Dialog open={open}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Verify your email</DialogTitle>
        <DialogDescription>
          A verification link has been sent to <span className="font-bold">{email}</span>.<br />
          Please check your inbox and follow the link to verify your email address before signing in.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button className="w-full" onClick={onClose}>Return to Sign In</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const SignUpPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { signUp } = useSignUp();
  const { setActive } = useClerk();

  // Use signUpComplete event from Clerk
  const handleComplete = () => {
    if (signUp?.status === "complete") {
      if (signUp.verifications?.emailAddress?.status === "pending") {
        setEmail(signUp.emailAddress || "");
        setModalOpen(true);
      } else if (signUp.createdSessionId) {
        setActive({ session: signUp.createdSessionId })
          .then(() => navigate("/"))
          .catch(console.error);
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LegalHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md flex flex-col gap-8">
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            appearance={{
              elements: { card: "shadow-lg rounded-lg" },
            }}
          />
        </div>
        <EmailVerificationModal open={modalOpen} onClose={handleModalClose} email={email} />
      </div>
    </div>
  );
};

export default SignUpPage;
