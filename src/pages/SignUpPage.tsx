
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp, useClerk } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Github, google } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useSignUp();
  const { setActive } = useClerk();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (!signUp) return;
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      if (signUp.status === "complete") {
        // Verification email sent
        if (signUp.verifications?.emailAddress?.status === "unverified") {
          // Show a modal, etc (skipped here for brevity)
        } else if (signUp.createdSessionId) {
          await setActive({ session: signUp.createdSessionId });
          navigate("/");
        }
      }
    } catch (error) {
      // Handle error (add toast or similar here)
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // You should implement real Google OAuth for production!
    navigate("/");
  };
  const handleGithubSignUp = () => {
    // You should implement real Github OAuth for production!
    navigate("/");
  };

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
                Create your account
              </CardTitle>
              <CardDescription className="text-center text-gray-500 font-medium">
                Welcome! Please fill in the details to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Button onClick={handleGithubSignUp} variant="outline" className="flex-1 gap-2 py-2 rounded-md border-[#eee] font-semibold">
                  <Github size={20} />
                  GitHub
                </Button>
                <Button onClick={handleGoogleSignUp} variant="outline" className="flex-1 gap-2 py-2 rounded-md border-[#eee] font-semibold">
                  <google size={20} />
                  Google
                </Button>
              </div>
              <div className="flex items-center mb-4">
                <span className="flex-grow h-px bg-gray-200"></span>
                <span className="text-xs text-gray-400 px-3">or</span>
                <span className="flex-grow h-px bg-gray-200"></span>
              </div>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="font-semibold text-sm">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...form.register("email")}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="font-semibold text-sm">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...form.register("password")}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-2 bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold py-2 rounded-md transition"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Continue"}
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
                >
                  Sign in
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
