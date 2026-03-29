// lib/i18n.ts
import ru from '../locales/ru.json';
import en from '../locales/en.json';
import de from '../locales/de.json';
import fr from '../locales/fr.json';
import es from '../locales/es.json';

const translations: Record<string, any> = {
  ru,
  en,
  de,
  fr,
  es,
};

export async function getTranslations(lang: string) {
  return translations[lang] || translations.ru;
}