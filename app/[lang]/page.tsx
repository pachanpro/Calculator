import { calculators, categories } from "../../data/calculators";
import { getTranslations } from "../../lib/i18n";
import Card from "../components/Card";

type PageProps = {
  params: Promise<{ lang: string }>;
};

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
        {t.common.hero_title}
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
            <a
              key={`${calc.category}-${calc.slug}`}
              href={`/${lang}/${calc.category}/${calc.slug}`}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {t.calculators[calc.slug]?.title || calc.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {t.calculators[calc.slug]?.description || calc.description}
                </p>
              </div>
              <div className="mt-auto text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                {lang === "ru" ? "Открыть →" : "Open →"}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold mb-3">{t.common.seo_title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          {t.common.seo_description}
        </p>
      </section>
    </div>
  );
}