import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import delmarLogo from "@/assets/delmar-logo.png";

const navItems = [
  {
    label: "Services",
    dropdown: [
      { label: "Web Design", href: "/web-design" },
      { label: "E-commerce", href: "/ecommerce" },
      { label: "AI Automation", href: "/ai-automation" },
    ],
  },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Blog", href: "/#blog" },
];

export function Navbar({ onGetStarted }: { onGetStarted: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-xl shadow-card" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src={delmarLogo} alt="Delmar Web Studios" className="h-10 w-10 rounded-xl object-contain" />
          <span className="font-bold text-lg tracking-tight">Delmar Web Studios</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-background rounded-lg shadow-premium border border-border p-2"
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          className="block px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href!}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGetStarted}
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg btn-glow transition-all hover:scale-[1.02]"
          >
            Get Started
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div key={item.label} className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.href}
                        className="block pl-4 text-sm py-1 text-foreground"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href!}
                    className="block text-sm font-medium py-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <button
                onClick={() => { onGetStarted(); setMobileOpen(false); }}
                className="w-full mt-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
