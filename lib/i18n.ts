import fs from "fs";
import path from "path";

const localesDir = path.join(process.cwd(), "locales");

export async function getTranslations(lang: string) {
  try {
    const filePath = path.join(localesDir, `${lang}.json`);
    const content = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    // Если файл не найден, пытаемся загрузить русский
    try {
      const fallbackPath = path.join(localesDir, "ru.json");
      const content = await fs.promises.readFile(fallbackPath, "utf8");
      return JSON.parse(content);
    } catch (fallbackError) {
      // Если даже русский не доступен – возвращаем минимальный объект, чтобы не падало
      console.error("Translation files not found");
      return {
        common: {
          calculate: "Calculate",
          result: "Result",
          related: "Related",
          title: "Calculators",
          categories: "Categories",
          all_calculators: "All calculators",
          hero_title: "Calculators",
          hero_description: "Online calculators",
          seo_title: "About",
          seo_description: "Useful calculators",
          footer_text: "CalcSite — all calculators",
        },
        categories: {},
        calculators: {},
      };
    }
  }
}