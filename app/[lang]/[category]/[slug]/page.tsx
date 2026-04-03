import { notFound } from "next/navigation";
import { calculators } from "../../../../data/calculators";
import LocalCalculatorClient from "./LocalCalculatorClient";
import Link from "next/link";
import Script from "next/script";
import { getTranslations } from "../../../../lib/i18n";
import Canonical from "../../../components/Canonical";

type PageProps = {
  params: Promise<{ lang: string; category: string; slug: string }>;
};

export async function generateStaticParams() {
  const languages = ["ru", "en", "de", "fr", "es"];
  const params: { lang: string; category: string; slug: string }[] = [];
  for (const lang of languages) {
    for (const calc of calculators) {
      params.push({ lang, category: calc.category, slug: calc.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, category, slug } = await params;
  const calculator = calculators.find(
    (c) => c.category === category && c.slug === slug
  );
  if (!calculator) {
    return { title: "Not found" };
  }
  const t = await getTranslations(lang);
  const title = t.calculators[slug]?.title || calculator.title;
  const description = t.calculators[slug]?.description || calculator.description;
  return {
    title,
    description,
    alternates: {
      languages: {
        ru: `/${slug}`,
        en: `/en/${category}/${slug}`,
        de: `/de/${category}/${slug}`,
        fr: `/fr/${category}/${slug}`,
        es: `/es/${category}/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://onlinecalcpro.com/${lang}/${category}/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { lang, category, slug } = await params;
  const calculator = calculators.find(
    (c) => c.category === category && c.slug === slug
  );
  if (!calculator) {
    notFound();
  }

  const t = await getTranslations(lang);
  const calcData = t.calculators[slug] || {};

  const translatedFields = calculator.fields.map((field) => ({
    ...field,
    label: calcData.fields?.[field.key] || field.label,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: calcData.title || calculator.title,
    description: calcData.description || calculator.description,
    step: translatedFields.map((field) => ({
      "@type": "HowToStep",
      name: field.label,
      text: `Введите ${field.label}`,
    })),
  };

  const relatedCalculators = calculators
    .filter((c) => c.category === category && c.slug !== slug)
    .slice(0, 4);

  return (
    <>
      <Canonical />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold mb-4">
          {calcData.title || calculator.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {calcData.description || calculator.description}
        </p>

        <LocalCalculatorClient
          calculator={calculator}
          lang={lang}
          translatedFields={translatedFields}
        />

        {relatedCalculators.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">{t.common.related}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedCalculators.map((rel) => {
                const relData = t.calculators[rel.slug] || {};
                return (
                  <Link
                    key={`${rel.category}-${rel.slug}`}
                    href={`/${lang}/${rel.category}/${rel.slug}`}
                    className="block p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition card-hover"
                  >
                    <h3 className="font-semibold text-lg mb-1">
                      {relData.title || rel.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {(relData.description || rel.description).substring(0, 80)}
                      {(relData.description || rel.description).length > 80 ? "…" : ""}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
