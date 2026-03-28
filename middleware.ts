import { NextRequest, NextResponse } from 'next/server';

// Поддерживаемые языки (должны совпадать с папками в app/[lang])
const locales = ['ru', 'en', 'de', 'fr', 'es'];
const defaultLocale = 'ru';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Проверяем, есть ли уже префикс языка в пути
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Если префикс уже есть — ничего не делаем
  if (pathnameHasLocale) return;

  // Определяем предпочтительный язык пользователя из заголовка Accept-Language
  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferredLocale = acceptLanguage.split(',')[0]?.split('-')[0] || defaultLocale;
  const locale = locales.includes(preferredLocale) ? preferredLocale : defaultLocale;

  // Создаём новый URL с добавленным префиксом языка
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  // Перенаправляем
  return NextResponse.redirect(newUrl);
}

// Настройка: middleware будет вызываться для всех путей, кроме системных
export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};