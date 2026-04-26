import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import delmarLogo from "@/assets/delmar-logo.png";

const CONTACT_EMAIL = "info@delmarwebstudios.qzz.io";

export function Footer() {
  return (
    <footer className="relative z-10 py-14 border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={delmarLogo} alt="Delmar Web Studios" className="h-12 w-12 rounded-xl object-contain" />
              <span className="font-bold text-lg">Delmar Web Studios</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-4">
              Sites web premium et agents IA pour les ambitieuses entreprises d'Afrique.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-electric font-medium hover:underline"
            >
              <Mail className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/web-design" className="hover:text-foreground transition-colors">Design Web</Link></li>
              <li><Link to="/ecommerce" className="hover:text-foreground transition-colors">E-commerce</Link></li>
              <li><Link to="/ai-automation" className="hover:text-foreground transition-colors">Automatisation IA</Link></li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/legal/conditions-utilisation" className="hover:text-foreground transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/legal/politique-confidentialite" className="hover:text-foreground transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/legal/suppression-donnees" className="hover:text-foreground transition-colors">
                  Suppression de données
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Delmar Web Studios. Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground">
            Conçu avec passion en Afrique.
          </p>
        </div>
      </div>
    </footer>
  );
}
