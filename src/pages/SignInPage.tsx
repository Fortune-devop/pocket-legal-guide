
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useClerk, useSignIn } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Github, Search } from "lucide-react";
import LegalHeader from "../components/LegalHeader";

const SignInPage = () => {
  const navigate = useNavigate();
  const { signIn: signInMock } = useAuth();
  const { openSignIn } = useClerk();
  const { signIn } = useSignIn();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validate fields
  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!form.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email address";
    if (!form.password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Authenticate via Clerk
      await signIn?.create({
        identifier: form.email,
        password: form.password,
      });
      toast.success("Signed in!");
      navigate("/");
    } catch (err: any) {
      toast.error(
        err?.errors?.[0]?.message ||
          err?.message ||
          "Sign in failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      // Fix: Changed strategy parameter format to use the OAuth provider directly
      await openSignIn({
        appearance: {
          elements: {
            socialButtonsIconButton: {
              width: '100%'
            }
          }
        }
      });
      // Clerk will handle redirection & session
    } catch {
      toast.error("Google sign-in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LegalHeader />
      <div className="min-h-screen w-full bg-gradient-to-br from-[#f8fafc] via-[#e9e9f8] to-[#f7f2fd] flex items-center justify-center">
        <Card className="w-full max-w-md rounded-2xl shadow-lg p-0 border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Button onClick={handleGoogleSignIn} variant="outline" className="flex-1 gap-2 py-2 rounded-md border-[#eee] font-semibold" disabled={isLoading}>
                <Search size={20} />
                Continue with Google
              </Button>
              <Button onClick={() => toast.info("GitHub auth coming soon")} variant="outline" className="flex-1 gap-2 py-2 rounded-md border-[#eee] font-semibold" disabled>
                <Github size={20} />
                GitHub
              </Button>
            </div>
            <div className="flex items-center mb-4">
              <span className="flex-grow h-px bg-gray-200"></span>
              <span className="text-xs text-gray-400 px-3">or</span>
              <span className="flex-grow h-px bg-gray-200"></span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="font-semibold text-sm">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="Enter your email address"
                  required
                  aria-describedby="signin-email-error"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1" id="signin-email-error">{errors.email}</p>}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-semibold text-sm">
                    Password
                  </Label>
                  <button
                    type="button"
                    className="text-xs font-medium text-[#9b87f5] hover:text-[#7E69AB]"
                    onClick={() => toast.info("Password reset coming soon!")}
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                  aria-describedby="signin-password-error"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1" id="signin-password-error">{errors.password}</p>}
              </div>
              <Button
                type="submit"
                className="w-full mt-2 bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold py-2 rounded-md transition"
                disabled={isLoading}
              >
                {isLoading ? "Signing in…" : "Sign In"}
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
                tabIndex={-1}
              >
                Sign up
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SignInPage;
