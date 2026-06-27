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
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6 mb-10 text-center">
        <p className="text-sm md:text-base text-foreground/70 font-medium">
          Ils nous font confiance pour <span className="text-foreground font-semibold">automatiser leur croissance</span> et gagner du temps :
        </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-8">
          {clients.map((c) => (
            <div key={c.name} className="flex items-center justify-center h-24">
              <img
                src={c.logo}
                alt={c.name}
                className="h-20 w-auto max-w-[220px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
