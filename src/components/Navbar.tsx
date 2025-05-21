
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Wallet,
  User,
  LogOut,
  ChevronDown
} from "lucide-react";
import LoginModal from "./LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user, profile, signOut, isAdmin } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="py-3 px-4 md:px-8 border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wallet className="h-6 w-6 text-primary" />
          <Link to="/" className="font-bold text-xl">TerraBit</Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/market" className="text-foreground/80 hover:text-foreground transition-colors">Markets</Link>
          <Link to="/trade" className="text-foreground/80 hover:text-foreground transition-colors">Trade</Link>
          {user && (
            <Link to="/portfolio" className="text-foreground/80 hover:text-foreground transition-colors">Portfolio</Link>
          )}
          <Link to="/buy" className="text-foreground/80 hover:text-foreground transition-colors">Buy USDT</Link>
          {isAdmin && (
            <Link to="/admin" className="text-foreground/80 hover:text-foreground transition-colors">Admin</Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || undefined} alt="User" />
                    <AvatarFallback>{getInitials(user.email || "User")}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{profile?.username || user.email}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" onClick={() => setShowLogin(true)}>
                Sign In
              </Button>
              <Button 
                onClick={() => {
                  setShowLogin(true);
                }} 
                className="crypto-gradient hover:opacity-90 transition-opacity"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </nav>
  );
};

export default Navbar;
