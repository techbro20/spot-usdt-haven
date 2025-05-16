
import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Wallet className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">SpotUSDT</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Buy, sell, and trade cryptocurrency securely and easily.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" aria-label="Discord" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Telegram" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.5 6.416-.5 6.416l-.4.21s-.013.179-.52.226l-.181.048a.82.82 0 0 1-.293-.006 1.26 1.26 0 0 1-.259-.075 6.67 6.67 0 0 1-.85-.491c-.945-.553-1.856-1.43-2.327-1.832l-.159-.132a1.27 1.27 0 0 1 .099-2.031c.842-.671 1.865-1.432 2.422-1.873 1.7-1.34 1.027-.19.7.426-.8.137-.221.322-.4.322-.286 0-.97.096-1.759.857-1.206 1.16-3.585 3.3-3.585 3.3l-.79.62 4.39-1.866c.671-.282 1.515-.633 2.328-.959 1.35-.543 3.067-1.312 3.984-1.617.2-.065.59-.194.758-.257z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/trade" className="text-muted-foreground hover:text-foreground">Spot Trading</Link></li>
              <li><Link to="/buy" className="text-muted-foreground hover:text-foreground">Buy USDT</Link></li>
              <li><Link to="/sell" className="text-muted-foreground hover:text-foreground">Sell USDT</Link></li>
              <li><Link to="/market" className="text-muted-foreground hover:text-foreground">Market Data</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link to="/fees" className="text-muted-foreground hover:text-foreground">Fees</Link></li>
              <li><Link to="/security" className="text-muted-foreground hover:text-foreground">Security</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SpotUSDT. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              Cryptocurrencies are subject to high market risk. SpotUSDT is not responsible for any loss.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
