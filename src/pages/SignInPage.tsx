
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LegalHeader from "@/components/LegalHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    toast.success("Password reset instructions sent to your email");
  };

  const backgroundUrl =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80";

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url('${backgroundUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <LegalHeader />
      <div className="flex-1 flex items-center justify-center p-4 z-10 relative">
        <Card className="mx-auto w-full max-w-md shadow-2xl rounded-2xl bg-white/90 backdrop-blur-md animate-fade-in border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-extrabold text-center text-[#403E43]">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center text-base text-[#7E69AB] font-medium">
              Sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="bg-[#F6F6F7] border border-[#E5DEFF] focus:border-[#9b87f5]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-semibold">
                    Password
                  </Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="text-sm text-[#9b87f5] hover:text-[#7E69AB] p-0 h-auto"
                        tabIndex={-1}
                        type="button"
                      >
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
                          <Button type="submit" className="w-full">
                            Send Instructions
                          </Button>
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
                  className="bg-[#F6F6F7] border border-[#E5DEFF] focus:border-[#9b87f5]"
                />
              </div>
              <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold shadow-md">
                Sign In
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#E5DEFF]"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-[#9F9EA1]">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 bg-[#F6F6F7] border-[#E5DEFF] hover:bg-[#f1f0fb]"
            >
              <FcGoogle size={20} />
              <span className="font-semibold text-[#403E43]">Google</span>
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-2">
            <div className="w-full flex items-center gap-1 justify-center">
              <span className="text-[#7E69AB] text-sm">Don't have an account?</span>
              <Button
                variant="link"
                className="p-0 h-auto font-semibold text-[#9b87f5] hover:text-[#7E69AB]"
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
