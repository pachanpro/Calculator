import { notFound } from "next/navigation";
import { calculators, categories } from "../../../data/calculators";
import { getTranslations } from "../../../lib/i18n";
import Card from "../../components/Card";

type PageProps = {
  params: Promise<{ lang: string; category: string }>;
};

<<<<<<< HEAD
// ✅ On-Demand ISR: динамическая генерация при первом запросе
export const dynamicParams = true;

// ✅ Кешируем на 1 час
export const revalidate = 3600;
=======
export async function generateStaticParams() {
  const languages = ["ru", "en", "de", "fr", "es"];
  const slugs = categories.map(c => c.slug);
  const params: { lang: string; category: string }[] = [];
  for (const lang of languages) {
    for (const category of slugs) {
      params.push({ lang, category });
    }
  }
  return params;
}
>>>>>>> d60039f5453b92a22607b5978ca2fa749dd88bfe

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