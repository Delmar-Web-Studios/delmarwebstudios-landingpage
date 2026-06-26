import logoMaison from "@/assets/logo-maison-blanche.png.asset.json";
import logoJecam from "@/assets/logo-jecam.png.asset.json";
import logoEcole from "@/assets/logo-ecole-canadienne.png.asset.json";
import logoInpolitics from "@/assets/logo-inpolitics.png.asset.json";
import logoSauvons from "@/assets/logo-sauvonstonexam.png.asset.json";

const clients = [
  { name: "SauvonsTonExam", logo: logoSauvons.url },
  { name: "École Canadienne Inter-Nations", logo: logoEcole.url },
  { name: "La Maison Blanche Afanayo", logo: logoMaison.url },
  { name: "Inpolitics Institute", logo: logoInpolitics.url },
  { name: "JECAM", logo: logoJecam.url },
];

export function LogosMarquee() {
  const loop = [...clients, ...clients];
  return (
    <section className="py-16 lg:py-20 bg-white border-y border-border/60">
      <div className="container mx-auto px-6 mb-10 text-center">
        <p className="text-sm md:text-base text-foreground/70 font-medium">
          Ils nous font confiance pour <span className="text-foreground font-semibold">automatiser leur croissance</span> et gagner du temps :
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex gap-16 animate-[marquee_30s_linear_infinite] w-max">
          {loop.map((c, i) => (
            <div key={i} className="flex items-center justify-center h-20 shrink-0">
              <img
                src={c.logo}
                alt={c.name}
                className="h-16 w-auto max-w-[180px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
