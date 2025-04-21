
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp, useClerk } from "@clerk/clerk-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { google } from "lucide-react";
import { toast } from "sonner";
import LegalHeader from "../components/LegalHeader";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useSignUp();
  const { setActive, openSignIn } = useClerk();
  const [form, setForm] = useState({
    email: "",
    password: "",
    verifyPassword: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    verifyPassword?: string;
    firstName?: string;
    lastName?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validates required fields, including matching passwords
  const validate = () => {
    const errors: {
      email?: string;
      password?: string;
      verifyPassword?: string;
      firstName?: string;
      lastName?: string;
    } = {};
    if (!form.firstName) errors.firstName = "First name is required";
    if (!form.lastName) errors.lastName = "Last name is required";
    if (!form.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email address";
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 8) errors.password = "Password must be at least 8 characters";
    if (!form.verifyPassword) errors.verifyPassword = "Please verify your password";
    else if (form.password && form.password !== form.verifyPassword) {
      errors.verifyPassword = "Passwords do not match";
    }
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
        firstName: form.firstName,
        lastName: form.lastName,
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
      await openSignIn({
        appearance: {
          elements: {
            socialButtonsIconButton: {
              width: '100%'
            }
          }
        }
      });
      // Clerk handles redirection/session on success.
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
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#1E40AF"
                className="w-10 h-10"
              >
                <path d="M12 0L9.7 7.3H2L8 12.6L5.7 20L12 14.7L18.3 20L16 12.6L22 7.3H14.3L12 0Z" />
              </svg>
              <span className="text-3xl font-extrabold text-legal-primary tracking-tight select-none">
                PocketLegal
              </span>
            </div>
            <CardDescription className="text-center mt-2">Please fill in your details to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="firstName" className="font-semibold text-sm">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    placeholder="Enter your first name"
                    required
                    aria-describedby="signup-firstname-error"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1" id="signup-firstname-error">{errors.firstName}</p>}
                </div>
                <div className="flex-1">
                  <Label htmlFor="lastName" className="font-semibold text-sm">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    placeholder="Enter your last name"
                    required
                    aria-describedby="signup-lastname-error"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1" id="signup-lastname-error">{errors.lastName}</p>}
                </div>
              </div>
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
              <div>
                <Label htmlFor="verifyPassword" className="font-semibold text-sm">
                  Verify Password
                </Label>
                <Input
                  id="verifyPassword"
                  type="password"
                  autoComplete="new-password"
                  value={form.verifyPassword}
                  onChange={e => setForm(f => ({ ...f, verifyPassword: e.target.value }))}
                  placeholder="Retype your password"
                  required
                  aria-describedby="signup-verifypassword-error"
                />
                {errors.verifyPassword && (
                  <p className="text-red-500 text-xs mt-1" id="signup-verifypassword-error">
                    {errors.verifyPassword}
                  </p>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleGoogleSignUp} variant="outline" className="flex-1 gap-2 py-2 rounded-md border-[#eee] font-semibold" disabled={isLoading}>
                  <google size={20} />
                  Continue with Google
                </Button>
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

