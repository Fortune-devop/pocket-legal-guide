
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
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
import { toast } from "sonner";

import { Github, google } from "lucide-react";

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

  const handleGithubSignIn = () => {
    signIn("Github");
    navigate("/");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password reset instructions sent to your email");
  };

  // Background image and fade-in/slide animation via Tailwind.
  const backgroundUrl = "/lovable-uploads/6bf1146b-6ea4-4137-a080-5761e4ebda8b.png";

  return (
    <div
      className="min-h-screen w-full flex items-stretch justify-center bg-gradient-to-br from-[#f8fafc] via-[#e9e9f8] to-[#f7f2fd] relative"
      style={{
        backgroundImage: `url('${backgroundUrl}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "left bottom",
      }}
    >
      <div className="flex flex-1 z-10 animate-fade-in">
        {/* Left Side: Promotional (hidden on small screens) */}
        <div className="hidden md:flex flex-col justify-center items-center w-2/5 pr-8">
          <div className="max-w-xs flex flex-col space-y-6">
            <img src="/logo.svg" aria-label="Logo" className="w-24 mx-auto mb-8" style={{ filter: "grayscale(100%) brightness(0.9)" }} />
            <div>
              <h2 className="font-semibold text-lg text-gray-700 mb-2">🚀 Save on development time</h2>
              <p className="text-sm text-gray-500">Add authentication and user management to your app with just a few lines of code.</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-gray-700 mb-2">🤝 Increase engagement</h2>
              <p className="text-sm text-gray-500">Add intuitive UIs designed to decrease friction for your users.</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-gray-700 mb-2">🔒 Protect your users</h2>
              <p className="text-sm text-gray-500">Enable features like two-step verification and enjoy automatic security updates.</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-gray-700 mb-2">🎨 Match your brand</h2>
              <p className="text-sm text-gray-500">Theme our pre-built components or integrate your own styles easily.</p>
            </div>
            <p className="text-xs text-gray-400 pt-4">&copy; {new Date().getFullYear()} Pocket Legal Guide</p>
          </div>
        </div>

        {/* Right Side: Card */}
        <div className="flex flex-1 min-h-screen items-center justify-center">
          <Card className="w-full max-w-md rounded-2xl shadow-xl border border-[#eee] bg-white/95 animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-center text-gray-900 tracking-tight font-sans">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center text-gray-500 font-medium">
                Sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Button onClick={handleGithubSignIn} variant="outline" className="flex-1 gap-2 py-2 rounded-md border-[#eee] font-semibold">
                  <Github size={20} />
                  GitHub
                </Button>
                <Button onClick={handleGoogleSignIn} variant="outline" className="flex-1 gap-2 py-2 rounded-md border-[#eee] font-semibold">
                  <google size={20} />
                  Google
                </Button>
              </div>
              <div className="flex items-center mb-4">
                <span className="flex-grow h-px bg-gray-200"></span>
                <span className="text-xs text-gray-400 px-3">or</span>
                <span className="flex-grow h-px bg-gray-200"></span>
              </div>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="font-semibold text-sm">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-semibold text-sm">
                      Password
                    </Label>
                    <button
                      type="button"
                      className="text-xs font-medium text-[#9b87f5] hover:text-[#7E69AB]"
                      onClick={() => toast.info("Use the reset password dialog!")}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-2 bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold py-2 rounded-md transition"
                >
                  Continue
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-0 pt-0 px-8 bg-[#faf7fd] rounded-b-2xl">
              <div className="w-full flex items-center justify-center text-[#7E69AB] text-sm py-3">
                <span>Don&apos;t have an account?</span>
                <Button
                  variant="link"
                  className="px-1 h-auto font-semibold text-[#9b87f5] hover:text-[#7E69AB]"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign up
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
