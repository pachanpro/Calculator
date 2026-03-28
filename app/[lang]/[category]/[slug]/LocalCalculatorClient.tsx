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

const unitMap: Record<string, string> = {
  loan: "₽",
  mortgage: "₽",
  deposit: "₽",
  inflation: "₽",
  investment: "₽",
  roi: "%",
  cpa: "₽",
  margin: "%",
  markup: "%",
  ltv: "₽",
  bmi: "kg/m²",
  calories: "kcal",
  caloriesForWeightLoss: "kcal",
  idealWeight: "kg",
  bodyFat: "%",
  waterIntake: "L",
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

  useEffect(() => {
    setUnit(unitMap[calculator.formulaType] || "");
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
    const res = calculate(calculator.formulaType, numericValues);
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
            {unit}
          </p>
        </div>
      )}
    </div>
  );
}