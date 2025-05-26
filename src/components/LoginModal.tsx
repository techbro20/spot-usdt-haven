
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: string;
}

const LoginModal = ({ open, onOpenChange, defaultTab = "login" }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signIn, signUp } = useAuth();
  
  const validateEmail = (email: string): boolean => {
    // Very permissive email validation - just check basic structure
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!trimmedEmail) {
      setError("Please enter your email address");
      return;
    }
    
    if (!password) {
      setError("Please enter your password");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Attempting login with email:", trimmedEmail);
      await signIn(trimmedEmail, password);
      onOpenChange(false);
      resetForm();
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const trimmedEmail = email.trim().toLowerCase();
    
    console.log("Starting registration process...");
    console.log("Raw email input:", email);
    console.log("Trimmed/lowercased email:", trimmedEmail);
    
    if (!trimmedEmail) {
      setError("Please enter your email address");
      return;
    }
    
    if (!validateEmail(trimmedEmail)) {
      console.log("Email validation failed for:", trimmedEmail);
      setError("Please enter a valid email address (e.g., user@gmail.com)");
      return;
    }
    
    if (!password) {
      setError("Please enter a password");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("All validations passed. Attempting registration with email:", trimmedEmail);
      console.log("Email regex test result:", validateEmail(trimmedEmail));
      
      await signUp(trimmedEmail, password);
      onOpenChange(false);
      resetForm();
    } catch (err: any) {
      console.error("Registration error details:", {
        error: err,
        message: err.message,
        code: err.code,
        status: err.status
      });
      
      // More specific error handling based on Supabase error codes
      if (err.code === 'email_address_invalid') {
        setError(`Email address "${trimmedEmail}" is not accepted. Please try a different email format or contact support.`);
      } else if (err.code === 'signup_disabled') {
        setError("New registrations are currently disabled. Please contact support.");
      } else {
        setError(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to TerraBit</DialogTitle>
          <DialogDescription>
            Sign in to access your account and start trading
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@gmail.com" 
                  required 
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>
              
              {error && <div className="text-sm text-destructive">{error}</div>}
              
              <Button 
                type="submit" 
                className="w-full crypto-gradient hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                <a href="#" className="hover:underline">Forgot Password?</a>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@gmail.com" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  disabled={isSubmitting}
                  minLength={6}
                  placeholder="At least 6 characters"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              {error && <div className="text-sm text-destructive">{error}</div>}
              
              <div className="text-sm text-muted-foreground pb-2">
                By registering, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </div>
              
              <Button 
                type="submit" 
                className="w-full crypto-gradient hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
