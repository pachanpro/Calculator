type Result = {
  label: string;
  value: string;
};

function toNumber(value: number | undefined) {
  return Number(value ?? 0);
}

export function calculateResult(
  formula: string,
  values: Record<string, number>
): Result {
  if (formula === "mortgage") {
    const loan = toNumber(values.loan);
    const rate = toNumber(values.rate);
    const years = toNumber(values.years);

    const monthlyRate = rate / 100 / 12;
    const months = years * 12;

    if (monthlyRate === 0 || months === 0) {
      return { label: "Monthly payment", value: "0.00" };
    }

    const payment =
      (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

    return {
      label: "Monthly payment",
      value: payment.toFixed(2),
    };
  }

  if (formula === "simple-interest") {
    const amount = toNumber(values.amount);
    const rate = toNumber(values.rate);
    const years = toNumber(values.years);

    const total = amount * (1 + (rate / 100) * years);

    return {
      label: "Future value",
      value: total.toFixed(2),
    };
  }

  if (formula === "compound-interest") {
    const amount = toNumber(values.amount);
    const rate = toNumber(values.rate);
    const years = toNumber(values.years);

    const result = amount * Math.pow(1 + rate / 100, years);

    return {
      label: "Future value",
      value: result.toFixed(2),
    };
  }

  if (formula === "discount") {
    const amount = toNumber(values.amount);
    const rate = toNumber(values.rate);

    const result = amount - amount * (rate / 100);

    return {
      label: "Discounted price",
      value: result.toFixed(2),
    };
  }

  if (formula === "profit-margin") {
    const revenue = toNumber(values.revenue);
    const margin = toNumber(values.margin);

    const result = revenue * (margin / 100);

    return {
      label: "Profit",
      value: result.toFixed(2),
    };
  }

  if (formula === "markup") {
    const cost = toNumber(values.cost);
    const markup = toNumber(values.markup);

    const result = cost * (1 + markup / 100);

    return {
      label: "Selling price",
      value: result.toFixed(2),
    };
  }

  if (formula === "percentage") {
    const base = toNumber(values.base);
    const percent = toNumber(values.percent);

    const result = base * (percent / 100);

    return {
      label: "Percentage value",
      value: result.toFixed(2),
    };
  }

  if (formula === "bmi") {
    const weight = toNumber(values.weight);
    const heightCm = toNumber(values.height);
    const heightM = heightCm / 100;

    if (heightM === 0) {
      return {
        label: "BMI",
        value: "0.00",
      };
    }

    const bmi = weight / (heightM * heightM);

    return {
      label: "BMI",
      value: bmi.toFixed(2),
    };
  }

  if (formula === "calories") {
    const weight = toNumber(values.weight);
    const height = toNumber(values.height);
    const age = toNumber(values.age);
    const activity = toNumber(values.activity);

    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const calories = bmr * activity;

    return {
      label: "Daily calories",
      value: calories.toFixed(0),
    };
  }

  if (formula === "concrete") {
    const length = toNumber(values.length);
    const width = toNumber(values.width);
    const depth = toNumber(values.depth);

    const volume = length * width * depth;

    return {
      label: "Concrete volume (m3)",
      value: volume.toFixed(2),
    };
  }

  return {
    label: "Result",
    value: "0.00",
  };
}