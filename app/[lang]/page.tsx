import { calculators, categories } from "../../data/calculators";
import { getTranslations } from "../../lib/i18n";
import Card from "../components/Card";
import Canonical from "../components/Canonical";

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
    <>
      <Canonical />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* ... остальной JSX без изменений ... */}
      </div>
    </>
  );
}