import { NextRequest, NextResponse } from 'next/server';

const locales = ['ru', 'en', 'de', 'fr', 'es'];
const defaultLocale = 'ru';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return;
  }

  const acceptLanguage = request.headers.get('accept-language') || '';
  let browserLang = acceptLanguage.split(',')[0]?.split('-')[0] || defaultLocale;
  if (!locales.includes(browserLang)) {
    browserLang = defaultLocale;
  }

  const url = new URL(`/${browserLang}${pathname}`, request.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};