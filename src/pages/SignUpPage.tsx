
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LegalHeader from "@/components/LegalHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    signIn();
    navigate("/");
  };

  const handleGoogleSignIn = () => {
    signIn("Google");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LegalHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-md shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">Create an account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required 
                  />
                </div>
              </div>
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
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full">Sign Up</Button>
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
            <Button variant="link" onClick={() => navigate("/sign-in")}>
              Already have an account? Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
