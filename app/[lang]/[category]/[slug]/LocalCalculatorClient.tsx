"use client";

import { useState, useEffect } from "react";
import { calculate } from "../../../../lib/calculations";

type CalculatorField = {
  key: string;
  label: string;
  type: "number" | "select" | "radio";
  defaultValue: number | string;
  options?: string[];
};

type Calculator = {
  title: string;
  description: string;
  fields: CalculatorField[];
  formulaType: string;
};

type Props = {
  calculator: Calculator;
  lang: string;
  translatedFields: CalculatorField[];
};

// Типы калькуляторов, где результат — деньги
const MONEY_TYPES = new Set([
  "loan", "mortgage", "deposit", "inflation", "investment",
  "compoundInterest", "loanOverpayment", "earlyRepayment",
  "tax", "netSalary", "currencyConverter", "discount", "vat",
  "roi", "cpa", "ltv"
]);

// Символы валют
const CURRENCY_SYMBOLS: Record<string, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
  CNY: "¥",
  TRY: "₺",
};

// Единицы измерения для всех типов
const unitMap: Record<string, string> = {
  // Финансы (по умолчанию будут использоваться выбранная валюта)
  // Бизнес
  roi: "%",
  cpa: "₽",
  margin: "%",
  markup: "%",
  ltv: "₽",
  // Здоровье
  bmi: "кг/м²",
  calories: "ккал",
  caloriesForWeightLoss: "ккал",
  idealWeight: "кг",
  bodyFat: "%",
  waterIntake: "л",
  bmr: "ккал",
  tdee: "ккал",
  bodyFatAdvanced: "%",
  heartRateZones: "уд/мин",
  foodCalories: "ккал",
  // Стройка
  concrete: "м³",
  brick: "шт",
  lumber: "м³",
  foundation: "м³",
  blocks: "шт",
  roof: "м²",
  tile: "шт",
  screed: "м³",
  insulation: "м³",
  paint: "л",
  wallpaper: "рулонов",
  plaster: "м³",
};

export default function LocalCalculatorClient({ calculator, lang, translatedFields }: Props) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    translatedFields.forEach((field) => {
      initial[field.key] = String(field.defaultValue);
    });
    return initial;
  });

  const [result, setResult] = useState<number | null>(null);
  const [unit, setUnit] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("RUB");
  const [currencyRates, setCurrencyRates] = useState<Record<string, number> | null>(null);
  const [isLoadingRates, setIsLoadingRates] = useState(true);

  // Определяем, денежный ли калькулятор
  const isMoney = MONEY_TYPES.has(calculator.formulaType);

  // Загружаем курсы валют
  useEffect(() => {
    if (!isMoney) return;
    fetch('/api/currency')
      .then(res => res.json())
      .then(data => {
        setCurrencyRates(data);
        setIsLoadingRates(false);
      })
      .catch(err => {
        console.error('Failed to load currency rates:', err);
        setIsLoadingRates(false);
      });
  }, [isMoney]);

  useEffect(() => {
    if (calculator.formulaType && unitMap[calculator.formulaType]) {
      setUnit(unitMap[calculator.formulaType]);
    } else {
      setUnit("");
    }
  }, [calculator.formulaType]);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleCalculate = () => {
    const numericValues: Record<string, number | string> = {};
    translatedFields.forEach((field) => {
      const raw = values[field.key];
      if (field.type === "number") {
        const num = raw === "" ? 0 : parseFloat(raw);
        numericValues[field.key] = isNaN(num) ? 0 : num;
      } else {
        numericValues[field.key] = raw;
      }
    });
    let res = calculate(calculator.formulaType, numericValues);
    if (res !== null && isMoney && currencyRates) {
      const rate = currencyRates[selectedCurrency] || 1;
      res = res / rate;
    }
    setResult(res);
  };

  const renderField = (field: CalculatorField) => {
    switch (field.type) {
      case "number":
        return (
          <input
            type="number"
            value={values[field.key] as string}
            onChange={(e) => handleChange(field.key, e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        );
      case "select":
        return (
          <select
            value={values[field.key] as string}
            onChange={(e) => handleChange(field.key, e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {field.options?.map((opt) => {
              let label = opt;
              if (opt === "yes") label = lang === "ru" ? "Да" : "Yes";
              else if (opt === "no") label = lang === "ru" ? "Нет" : "No";
              else if (opt === "male") label = lang === "ru" ? "Мужской" : "Male";
              else if (opt === "female") label = lang === "ru" ? "Женский" : "Female";
              else if (opt === "sedentary") label = lang === "ru" ? "Сидячий" : "Sedentary";
              else if (opt === "light") label = lang === "ru" ? "Легкая активность" : "Light";
              else if (opt === "moderate") label = lang === "ru" ? "Средняя активность" : "Moderate";
              else if (opt === "active") label = lang === "ru" ? "Высокая активность" : "Active";
              else if (opt === "veryActive") label = lang === "ru" ? "Очень высокая активность" : "Very active";
              return (
                <option key={opt} value={opt}>
                  {label}
                </option>
              );
            })}
          </select>
        );
      case "radio":
        return (
          <div className="space-x-4 mt-1">
            {field.options?.map((opt) => (
              <label key={opt} className="inline-flex items-center">
                <input
                  type="radio"
                  name={field.key}
                  value={opt}
                  checked={values[field.key] === opt}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const commonText = {
    calculate: lang === "ru" ? "Рассчитать" : "Calculate",
    result: lang === "ru" ? "Результат" : "Result",
  };

  const currencyOptions = ["RUB", "USD", "EUR", "CNY", "TRY"];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-4">
        {commonText.calculate}
      </h2>

      {translatedFields.map((field) => (
        <div key={field.key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {field.label}
          </label>
          {renderField(field)}
        </div>
      ))}

      {isMoney && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {lang === "ru" ? "Валюта результата" : "Currency of result"}
          </label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            disabled={isLoadingRates}
          >
            {currencyOptions.map((curr) => (
              <option key={curr} value={curr}>
                {curr} ({CURRENCY_SYMBOLS[curr]})
              </option>
            ))}
          </select>
          {isLoadingRates && (
            <p className="text-xs text-gray-500 mt-1">{lang === "ru" ? "Загрузка курсов..." : "Loading rates..."}</p>
          )}
        </div>
      )}

      <button
        onClick={handleCalculate}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        {commonText.calculate}
      </button>

      {result !== null && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-300">{commonText.result}:</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {result.toLocaleString(lang === "ru" ? "ru-RU" : "en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            {isMoney ? (selectedCurrency === "RUB" ? "₽" : selectedCurrency) : unit}
          </p>
        </div>
      )}
    </div>
  );
}