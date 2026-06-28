import { Link } from "react-router-dom";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import delmarLogo from "@/assets/delmar-logo.png.asset.json";

const EMAIL = "info@delmarwebstudios.qzz.io";
const WHATSAPP = "+237655671935";

export function Footer() {
  return (
    <footer className="relative z-10 py-16 border-t border-border bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={delmarLogo.url} alt="Delmar Web Studios" className="h-10 w-auto object-contain" />
              <span className="font-bold text-lg tracking-tight">
                Delmar Web <span className="text-electric">Studios</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Nous rendons les entreprises africaines <span className="text-foreground font-semibold">indépendantes</span>
              {" "}financièrement et techniquement grâce à des systèmes qui travaillent seuls.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Liens rapides</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-electric transition-colors">Accueil</Link></li>
              <li><Link to="/solutions/landing-page" className="hover:text-electric transition-colors">Nos Solutions</Link></li>
              <li><Link to="/demos" className="hover:text-electric transition-colors">Démos</Link></li>
              <li><Link to="/portfolio" className="hover:text-electric transition-colors">Nos Réussites</Link></li>
              <li><Link to="/#contact" className="hover:text-electric transition-colors">Audit gratuit</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Contact direct</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 text-muted-foreground hover:text-electric transition-colors">
                  <MessageCircle className="h-4 w-4 text-electric" /> {WHATSAPP}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-electric transition-colors">
                  <Mail className="h-4 w-4 text-electric" /> {EMAIL}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-electric" /> Yaoundé · Cameroun
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Delmar Web Studios. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link to="/legal/conditions-utilisation" className="hover:text-electric transition-colors">Conditions</Link>
            <Link to="/legal/politique-confidentialite" className="hover:text-electric transition-colors">Confidentialité</Link>
            <Link to="/legal/suppression-donnees" className="hover:text-electric transition-colors">Suppression données</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
