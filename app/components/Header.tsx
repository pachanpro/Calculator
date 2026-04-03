"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const languages = [
  { code: "ru", name: "Русский" },
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
];

export default function Header() {
  const params = useParams();
  const pathname = usePathname();
  const currentLang = (params?.lang as string) || "ru";

  const getPathWithoutLang = () => {
    if (!pathname) return "/";
    const parts = pathname.split("/");
    if (parts[1] && languages.some((lang) => lang.code === parts[1])) {
      return "/" + parts.slice(2).join("/");
    }
    return pathname;
  };

  const basePath = getPathWithoutLang();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link
          href={`/${currentLang}`}
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          CalcSite
        </Link>
        <div className="flex gap-2 text-sm">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={`/${lang.code}${basePath === "/" ? "" : basePath}`}
              className={`px-3 py-1 rounded-full transition ${
                currentLang === lang.code
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {lang.code.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}