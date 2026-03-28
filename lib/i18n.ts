import fs from "fs";
import path from "path";

const localesDir = path.join(process.cwd(), "locales");

export async function getTranslations(lang: string) {
  try {
    const filePath = path.join(localesDir, `${lang}.json`);
    const content = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    const fallbackPath = path.join(localesDir, "ru.json");
    const content = await fs.promises.readFile(fallbackPath, "utf8");
    return JSON.parse(content);
  }
}