import "../globals.css";
import { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getTranslations } from "../../lib/i18n";

type Props = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

// ✅ On-Demand ISR: динамическая генерация при первом запросе
export const dynamicParams = true;

// ✅ Кешируем на 1 час
export const revalidate = 3600;

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const t = await getTranslations(lang);

  return (
    <div lang={lang} className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer footerText={t.common.footer_text} />
    </div>
  );
}