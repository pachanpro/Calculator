// app/api/currency/route.ts
import { NextResponse } from 'next/server';

const DEFAULT_RATES: Record<string, number> = {
  RUB: 1,
  USD: 100,
  EUR: 110,
  CNY: 13.5,
  TRY: 3.5,
};

export async function GET() {
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error('CBR API error');
    const data = await response.json();
    const rates: Record<string, number> = {
      RUB: 1,
      USD: data.Valute.USD.Value,
      EUR: data.Valute.EUR.Value,
      CNY: data.Valute.CNY.Value,
      TRY: data.Valute.TRY.Value,
    };
    return NextResponse.json(rates);
  } catch (error) {
    console.error('Currency API error:', error);
    return NextResponse.json(DEFAULT_RATES, { status: 200 });
  }
}