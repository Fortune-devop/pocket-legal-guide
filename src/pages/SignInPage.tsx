
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LegalHeader from "@/components/LegalHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const SignInPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn();
    navigate("/");
  };

  const handleGoogleSignIn = () => {
    signIn("Google");
    navigate("/");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Since we're using mock auth, just show a success message
    toast.success("Password reset instructions sent to your email");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LegalHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-md shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="text-sm text-[#9b87f5] hover:text-[#7E69AB] p-0">
                        Forgot password?
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <form onSubmit={handleResetPassword}>
                        <DialogHeader>
                          <DialogTitle>Reset Password</DialogTitle>
                          <DialogDescription>
                            Enter your email address and we'll send you instructions to reset your password.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 space-y-2">
                          <Label htmlFor="reset-email">Email</Label>
                          <Input
                            id="reset-email"
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                          />
                        </div>
                        <DialogFooter className="mt-4">
                          <Button type="submit">Send Instructions</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              type="button" 
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2"
            >
              <FcGoogle size={20} />
              <span>Google</span>
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" onClick={() => navigate("/sign-up")}>
              Don't have an account? Sign Up
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
