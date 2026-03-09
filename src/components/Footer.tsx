import delmarLogo from "@/assets/delmar-logo.png";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={delmarLogo} alt="Delmar Web Studios" className="h-8 w-8 rounded-lg" />
            <span className="font-bold text-sm">Delmar Web Studios</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-foreground transition-colors">Portfolio</a>
            <a href="#blog" className="hover:text-foreground transition-colors">Blog</a>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Delmar Web Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
