import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locales = ['ru', 'en', 'de', 'fr', 'es'];

  // Пропускаем системные пути
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return;
  }

  // Если уже есть язык – ничего не делаем
  if (locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)) {
    return;
  }

  // Получаем язык браузера (упрощённо)
  const acceptLang = request.headers.get('accept-language') || '';
  const browserLang = acceptLang.split(',')[0]?.split('-')[0] || 'ru';
  const locale = locales.includes(browserLang) ? browserLang : 'ru';

  // Перенаправляем
  const url = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(url);
}