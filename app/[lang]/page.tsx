import { calculators, categories } from "../../data/calculators";
import { getTranslations } from "../../lib/i18n";
import Card from "../components/Card";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return [
    { lang: "ru" },
    { lang: "en" },
    { lang: "de" },
    { lang: "fr" },
    { lang: "es" },
  ];
}

export const dynamic = 'force-static';
export const dynamicParams = false;

const categoryIcons: Record<string, string> = {
  finance: "💰",
  business: "📊",
  health: "💪",
  construction: "🏗️",
};

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations(lang);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {t.common.title}
      </h1>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">{t.common.categories}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Card
              key={cat.slug}
              href={`/${lang}/${cat.slug}`}
              title={t.categories[cat.slug] || cat.slug}
              description={
                lang === "ru"
                  ? `Калькуляторы по теме ${t.categories[cat.slug] || cat.slug}`
                  : `Calculators for ${t.categories[cat.slug] || cat.slug}`
              }
              icon={categoryIcons[cat.slug] || "📁"}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">{t.common.all_calculators}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Card
              key={`${calc.category}-${calc.slug}`}
              href={`/${lang}/${calc.category}/${calc.slug}`}
              title={t.calculators[calc.slug]?.title || calc.title}
              description={t.calculators[calc.slug]?.description || calc.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}