
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

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
          <Link to="/portfolio" className="text-foreground/80 hover:text-foreground transition-colors">Portfolio</Link>
          <Link to="/buy" className="text-foreground/80 hover:text-foreground transition-colors">Buy USDT</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setShowLogin(true)}>
            Sign In
          </Button>
          <Button 
            onClick={() => setShowLogin(true)} 
            className="crypto-gradient hover:opacity-90 transition-opacity"
          >
            Register
          </Button>
        </div>
      </div>
      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </nav>
  );
};

export default Navbar;
