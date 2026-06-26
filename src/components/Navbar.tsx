import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import delmarLogo from "@/assets/delmar-logo.png.asset.json";

const solutions = [
  { label: "Landing Page Express", desc: "Gagner en visibilité & déclencher l'achat", href: "/solutions/landing-page" },
  { label: "Agent IA WhatsApp & Chatbot", desc: "Vendre 24/7 sans surmenage", href: "/solutions/whatsapp-ia" },
  { label: "Agent Vocal IA", desc: "Secrétariat automatisé, zéro appel manqué", href: "/solutions/vocal-ia" },
  { label: "SaaS Prospection B2B & Chatbots", desc: "La puissance des outils partenaires", href: "/solutions/saas-prospection" },
];

export function Navbar({ onGetStarted }: { onGetStarted: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={delmarLogo.url} alt="Delmar Web Studios" className="h-10 w-auto object-contain" />
          <span className="font-bold text-base lg:text-lg tracking-tight text-foreground">
            Delmar Web <span className="text-electric">Studios</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          <Link to="/" className="text-sm font-medium text-foreground/75 hover:text-foreground transition-colors">
            Accueil
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-foreground/75 hover:text-foreground transition-colors">
              Nos Solutions
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[360px] bg-white rounded-2xl shadow-premium border border-border p-2"
                >
                  {solutions.map((s) => (
                    <Link
                      key={s.label}
                      to={s.href}
                      className="block px-4 py-3 rounded-xl hover:bg-secondary transition-colors"
                    >
                      <div className="text-sm font-semibold text-foreground">{s.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/portfolio" className="text-sm font-medium text-foreground/75 hover:text-foreground transition-colors">
            Nos Réussites
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onGetStarted}
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-electric text-white text-sm font-semibold rounded-full hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_8px_24px_-8px_hsl(var(--electric-blue)/0.55)]"
          >
            Audit gratuit
          </button>
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-5 py-5 space-y-4">
              <Link to="/" className="block text-sm font-medium" onClick={() => setMobileOpen(false)}>Accueil</Link>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Nos Solutions</span>
                {solutions.map((s) => (
                  <Link
                    key={s.label}
                    to={s.href}
                    className="block pl-3 py-1.5 text-sm text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
              <Link to="/portfolio" className="block text-sm font-medium" onClick={() => setMobileOpen(false)}>Nos Réussites</Link>
              <button
                onClick={() => { onGetStarted(); setMobileOpen(false); }}
                className="w-full mt-2 px-5 py-3 bg-electric text-white text-sm font-semibold rounded-full"
              >
                Audit gratuit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
