
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp, useClerk } from "@clerk/clerk-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Github, Search } from "lucide-react";
import { toast } from "sonner";
import LegalHeader from "../components/LegalHeader";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useSignUp();
  const { setActive, openSignIn } = useClerk();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validates email and password fields
  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!form.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email address";
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 8) errors.password = "Password must be at least 8 characters";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Custom sign up handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await signUp?.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.success("Check your email for verification!");
      // You might want to redirect or show an email verify modal here.
    } catch (err: any) {
      toast.error(
        err?.errors?.[0]?.message ||
          err?.message ||
          "Sign up failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      // Fix: Changed to use Clerk's openSignIn method with correct parameters
      await openSignIn({
        appearance: {
          elements: {
            socialButtonsIconButton: {
              width: '100%'
            }
          }
        }
      });
      // Clerk will handle redirection and session automatically on success.
    } catch (err: any) {
      toast.error("Google sign up failed.");
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
            <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
            <CardDescription className="text-center">Please fill in your details to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Button onClick={handleGoogleSignUp} variant="outline" className="flex-1 gap-2 py-2 rounded-md border-[#eee] font-semibold" disabled={isLoading}>
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
                  aria-describedby="signup-email-error"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1" id="signup-email-error">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="password" className="font-semibold text-sm">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                  aria-describedby="signup-password-error"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1" id="signup-password-error">{errors.password}</p>}
              </div>
              <Button
                type="submit"
                className="w-full mt-2 bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold py-2 rounded-md transition"
                disabled={isLoading}
              >
                {isLoading ? "Creating account…" : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-0 pt-0 px-8 bg-[#faf7fd] rounded-b-2xl">
            <div className="w-full flex items-center justify-center text-[#7E69AB] text-sm py-3">
              <span>Already have an account?</span>
              <Button
                variant="link"
                className="px-1 h-auto font-semibold text-[#9b87f5] hover:text-[#7E69AB]"
                onClick={() => navigate("/sign-in")}
                tabIndex={-1}
              >
                Sign in
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SignUpPage;
