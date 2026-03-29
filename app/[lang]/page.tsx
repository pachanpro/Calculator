import { calculators, categories } from "../../data/calculators";
import { getTranslations } from "../../lib/i18n";

type PageProps = {
  params: Promise<{ lang: string }>;
};

// Явно указываем, какие языки должны быть сгенерированы при сборке
export async function generateStaticParams() {
  return [
    { lang: 'ru' },
    { lang: 'en' },
    { lang: 'de' },
    { lang: 'fr' },
    { lang: 'es' },
  ];
}

const categoryIcons: Record<string, string> = {
  finance: "💰",
  business: "📊",
  health: "💪",
  construction: "🔨🚬",
};

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations(lang);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {t.common.title}
      </h1>

      {/* Категории */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">{t.common.categories}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/${lang}/${cat.slug}`}
              className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition duration-200"
            >
              <div className="text-3xl mb-3">{categoryIcons[cat.slug] || "📁"}</div>
              <h3 className="text-xl font-semibold mb-2">
                {t.categories[cat.slug] || cat.slug}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {lang === "ru"
                  ? `Калькуляторы по теме ${t.categories[cat.slug] || cat.slug}`
                  : `Calculators for ${t.categories[cat.slug] || cat.slug}`}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Все калькуляторы */}
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
    </div>
  );
}