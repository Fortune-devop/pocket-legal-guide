import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp, useClerk } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import LegalHeader from "@/components/LegalHeader";
import { DisclaimerDialog } from "@/components/DisclaimerDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useSignUp();
  const { setActive } = useClerk();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (!signUp) return;
      await signUp.create({
        firstName: values.firstName,
        lastName: values.lastName,
        emailAddress: values.email,
        password: values.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      if (signUp.status === "complete") {
        if (signUp.verifications?.emailAddress?.status === "unverified") {
          setEmail(values.email);
          setModalOpen(true);
        } else if (signUp.createdSessionId) {
          await setActive({ session: signUp.createdSessionId });
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/sign-in");
  };

  const handleGoogleSignUp = () => {
    navigate("/");
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
      <div className="absolute inset-0 bg-black/50" aria-hidden="true"/>
      <LegalHeader />
      <div className="flex-1 flex items-center justify-center p-4 z-10 relative">
        <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/90 backdrop-blur-md animate-fade-in border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-extrabold text-center text-[#403E43]">
              Create your account
            </CardTitle>
            <CardDescription className="text-center text-base text-[#7E69AB] font-medium">
              Enter your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          First Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} required className="bg-[#F6F6F7] border border-[#E5DEFF] focus:border-[#9b87f5]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Last Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} required className="bg-[#F6F6F7] border border-[#E5DEFF] focus:border-[#9b87f5]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} required className="bg-[#F6F6F7] border border-[#E5DEFF] focus:border-[#9b87f5]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            required
                            className="bg-[#F6F6F7] border border-[#E5DEFF] focus:border-[#9b87f5]"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.944-10-7a10.97 10.97 0 012.45-3.482M9.88 9.88a3 3 0 104.243 4.243M15 12a3 3 0 11-6 0 3 3 0 016 0zm0 0L6.5 6.5M15 12l5.5 5.5" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0c-.637-2.72-3-7-10.5-7S2.137 9.28 1.5 12c.637 2.72 3 7 10.5 7s9.863-4.28 10.5-7z" />
                              </svg>
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold shadow-md" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign up"}
                </Button>

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
                  onClick={handleGoogleSignUp}
                  className="w-full flex items-center justify-center gap-2 bg-[#F6F6F7] border-[#E5DEFF] hover:bg-[#f1f0fb]"
                >
                  <FcGoogle size={20} />
                  <span className="font-semibold text-[#403E43]">Google</span>
                </Button>

                <p className="text-center text-sm text-[#7E69AB] pt-4">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold text-[#9b87f5] hover:text-[#7E69AB]"
                    onClick={() => navigate("/sign-in")}
                  >
                    Sign in
                  </Button>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
        <EmailVerificationModal open={modalOpen} onClose={handleModalClose} email={email} />
      </div>
      <DisclaimerDialog />
    </div>
  );
};

export default SignUpPage;
