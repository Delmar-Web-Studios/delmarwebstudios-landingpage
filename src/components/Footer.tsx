import { Link } from "react-router-dom";
import delmarLogo from "@/assets/delmar-logo.png";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={delmarLogo} alt="Delmar Web Studios" className="h-7 w-7 rounded-lg object-contain" />
            <span className="font-bold text-sm">Delmar Web Studios</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/web-design" className="hover:text-foreground transition-colors">Web Design</Link>
            <Link to="/ecommerce" className="hover:text-foreground transition-colors">E-commerce</Link>
            <Link to="/ai-automation" className="hover:text-foreground transition-colors">AI Automation</Link>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Delmar Web Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
