
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
    // Very basic email validation - just check for @ and .
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    
    console.log("=== REGISTRATION DEBUG START ===");
    console.log("Raw email input:", email);
    console.log("Trimmed/lowercased email:", trimmedEmail);
    console.log("Email validation result:", validateEmail(trimmedEmail));
    console.log("Password length:", password.length);
    console.log("Supabase URL:", "https://sjijlhihwafioolrtjrs.supabase.co");
    console.log("Current domain:", window.location.origin);
    
    if (!trimmedEmail) {
      setError("Please enter your email address");
      return;
    }
    
    if (!validateEmail(trimmedEmail)) {
      console.log("Client-side email validation failed");
      setError("Please enter a valid email address");
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
    
    console.log("All client-side validations passed, proceeding with Supabase signup...");
    setIsSubmitting(true);
    
    try {
      await signUp(trimmedEmail, password);
      console.log("Signup successful!");
      onOpenChange(false);
      resetForm();
    } catch (err: any) {
      console.error("=== REGISTRATION ERROR DETAILS ===");
      console.error("Full error object:", err);
      console.error("Error message:", err.message);
      console.error("Error code:", err.code);
      console.error("Error status:", err.status);
      console.error("Error name:", err.name);
      
      // Handle specific Supabase error codes
      let errorMessage = "Failed to create account. Please try again.";
      
      if (err.code === 'email_address_invalid') {
        errorMessage = `The email "${trimmedEmail}" was rejected by the server. This might be due to:
        • Email confirmation requirements
        • Domain restrictions
        • Supabase project settings
        Please check your Supabase authentication settings or try a different email.`;
      } else if (err.code === 'signup_disabled') {
        errorMessage = "New registrations are currently disabled. Please contact support.";
      } else if (err.code === 'weak_password') {
        errorMessage = "Password is too weak. Please use a stronger password.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.log("=== REGISTRATION DEBUG END ===");
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
              
              {error && <div className="text-sm text-destructive whitespace-pre-line">{error}</div>}
              
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
              
              {error && <div className="text-sm text-destructive whitespace-pre-line">{error}</div>}
              
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
