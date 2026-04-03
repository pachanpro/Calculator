import { calculators } from "../data/calculators";

const languages = ["ru", "en", "de", "fr", "es"];
const baseUrl = "onlinecalcpro.com";

export default async function sitemap() {
  const pages = [];

  // Главные страницы языков
  for (const lang of languages) {
    pages.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    });
  }

  // Категории
  const categories = [...new Set(calculators.map(calc => calc.category))];
  for (const lang of languages) {
    for (const category of categories) {
      pages.push({
        url: `${baseUrl}/${lang}/${category}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // Калькуляторы
  for (const lang of languages) {
    for (const calc of calculators) {
      pages.push({
        url: `${baseUrl}/${lang}/${calc.category}/${calc.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return pages;
}