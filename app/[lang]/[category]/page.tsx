import { notFound } from "next/navigation";
import { calculators } from "../../../data/calculators";
import { getTranslations } from "../../../lib/i18n";

type PageProps = {
  params: Promise<{ lang: string; category: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { lang, category } = await params;
  const t = await getTranslations(lang);

  const categoryCalculators = calculators.filter(
    (calc) => calc.category === category
  );

  if (categoryCalculators.length === 0) {
    notFound();
  }

  const categoryName = t.categories[category] || category;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">
        {lang === "ru"
          ? `Калькуляторы в категории "${categoryName}"`
          : `Calculators in category "${categoryName}"`}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryCalculators.map((calc) => (
          <a
            key={`${calc.category}-${calc.slug}`}
            href={`/${lang}/${calc.category}/${calc.slug}`}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition duration-200 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {t.calculators[calc.slug]?.title || calc.title}
              </h2>
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
    </div>
  );
}