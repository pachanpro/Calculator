import { notFound } from "next/navigation";
import { calculators, categories } from "../../../data/calculators";
import { getTranslations } from "../../../lib/i18n";
import Card from "../../components/Card";

type PageProps = {
  params: Promise<{ lang: string; category: string }>;
};

export const dynamicParams = true;
export const revalidate = 3600;

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
          <Card
            key={`${calc.category}-${calc.slug}`}
            href={`/${lang}/${calc.category}/${calc.slug}`}
            title={t.calculators[calc.slug]?.title || calc.title}
            description={t.calculators[calc.slug]?.description || calc.description}
          />
        ))}
      </div>
    </div>
  );
}