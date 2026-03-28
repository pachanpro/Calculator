import { NextRequest, NextResponse } from 'next/server';

const locales = ['ru', 'en', 'de', 'fr', 'es'];
const defaultLocale = 'ru';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Пропускаем системные пути
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return;
  }

  // Проверяем, есть ли уже префикс языка
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // Получаем язык браузера
  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferredLocale = acceptLanguage.split(',')[0]?.split('-')[0] || defaultLocale;
  const locale = locales.includes(preferredLocale) ? preferredLocale : defaultLocale;

  // Создаём новый URL с префиксом языка
  const url = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(url);
}

// Настройка, какие пути обрабатывать
export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};

// Явно указываем Edge Runtime
export const runtime = 'edge';