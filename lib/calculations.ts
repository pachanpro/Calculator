// lib/calculations.ts
type Values = Record<string, number | string>;

export function calculate(formulaType: string, values: Values): number | null {
  switch (formulaType) {
    // Финансы
    case "loan":
      return calculateLoan(values);
    case "mortgage":
      return calculateMortgage(values);
    case "deposit":
      return calculateDeposit(values);
    case "inflation":
      return calculateInflation(values);
    case "investment":
      return calculateInvestment(values);
    case "compoundInterest":
      return calculateCompoundInterest(values);
    case "percentage":
      return calculatePercentage(values);
    case "loanOverpayment":
      return calculateLoanOverpayment(values);
    case "earlyRepayment":
      return calculateEarlyRepayment(values);
    case "tax":
      return calculateTax(values);
    case "netSalary":
      return calculateNetSalary(values);
    case "currencyConverter":
      return calculateCurrencyConverter(values);
    case "discount":
      return calculateDiscount(values);
    case "vat":
      return calculateVAT(values);
    // Бизнес
    case "roi":
      return calculateROI(values);
    case "cpa":
      return calculateCPA(values);
    case "margin":
      return calculateMargin(values);
    case "markup":
      return calculateMarkup(values);
    case "ltv":
      return calculateLTV(values);
    // Здоровье
    case "bmi":
      return calculateBMI(values);
    case "calories":
      return calculateCalories(values);
    case "caloriesForWeightLoss":
      return calculateCaloriesForWeightLoss(values);
    case "idealWeight":
      return calculateIdealWeight(values);
    case "bodyFat":
      return calculateBodyFat(values);
    case "waterIntake":
      return calculateWaterIntake(values);
    case "bmr":
      return calculateBMR(values);
    case "tdee":
      return calculateTDEE(values);
    case "bodyFatAdvanced":
      return calculateBodyFatAdvanced(values);
    case "heartRateZones":
      return calculateHeartRateZones(values);
    case "foodCalories":
      return calculateFoodCalories(values);
    // Стройка
    case "concrete":
      return calculateConcrete(values);
    case "brick":
      return calculateBrick(values);
    case "lumber":
      return calculateLumber(values);
    case "foundation":
      return calculateFoundation(values);
    case "blocks":
      return calculateBlocks(values);
    case "roof":
      return calculateRoof(values);
    case "tile":
      return calculateTile(values);
    case "screed":
      return calculateScreed(values);
    case "insulation":
      return calculateInsulation(values);
    case "paint":
      return calculatePaint(values);
    case "wallpaper":
      return calculateWallpaper(values);
    case "plaster":
      return calculatePlaster(values);
    default:
      return null;
  }
}

// ========== ФИНАНСЫ ==========
function calculateLoan(values: Values): number {
  const amount = Number(values.amount);
  const rate = Number(values.rate) / 100 / 12;
  const term = Number(values.term);
  if (isNaN(amount) || isNaN(rate) || isNaN(term)) return 0;
  if (amount <= 0 || rate <= 0 || term <= 0) return 0;
  return (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
}

function calculateMortgage(values: Values): number {
  const amount = Number(values.amount);
  const rate = Number(values.rate) / 100 / 12;
  const years = Number(values.term);
  const term = years * 12;
  if (isNaN(amount) || isNaN(rate) || isNaN(term)) return 0;
  if (amount <= 0 || rate <= 0 || term <= 0) return 0;
  return (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
}

function calculateDeposit(values: Values): number {
  const amount = Number(values.amount);
  const rate = Number(values.rate) / 100;
  const term = Number(values.term);
  const capitalization = values.capitalization === "yes";
  if (isNaN(amount) || isNaN(rate) || isNaN(term)) return 0;
  if (amount <= 0 || rate <= 0 || term <= 0) return 0;
  if (capitalization) {
    const monthlyRate = rate / 12;
    return amount * Math.pow(1 + monthlyRate, term);
  } else {
    return amount * (1 + rate * (term / 12));
  }
}

function calculateInflation(values: Values): number {
  const amount = Number(values.amount);
  const inflationRate = Number(values.inflationRate) / 100;
  const years = Number(values.years);
  if (isNaN(amount) || isNaN(inflationRate) || isNaN(years)) return 0;
  if (amount <= 0 || inflationRate <= 0 || years <= 0) return 0;
  return amount * Math.pow(1 + inflationRate, years);
}

function calculateInvestment(values: Values): number {
  const amount = Number(values.amount);
  const rate = Number(values.rate) / 100;
  const years = Number(values.years);
  const annualAdd = Number(values.annualAdd);
  if (isNaN(amount) || isNaN(rate) || isNaN(years) || isNaN(annualAdd)) return 0;
  if (amount <= 0 || rate <= 0 || years <= 0) return 0;
  let future = amount * Math.pow(1 + rate, years);
  if (annualAdd > 0) {
    const annuity = annualAdd * ((Math.pow(1 + rate, years) - 1) / rate);
    future += annuity;
  }
  return future;
}

function calculateCompoundInterest(values: Values): number {
  const principal = Number(values.principal);
  const rate = Number(values.rate) / 100;
  const years = Number(values.years);
  const freq = values.compoundFrequency as string;
  if (isNaN(principal) || isNaN(rate) || isNaN(years)) return 0;
  if (principal <= 0 || rate <= 0 || years <= 0) return 0;
  let periodsPerYear = 1;
  if (freq === "monthly") periodsPerYear = 12;
  if (freq === "quarterly") periodsPerYear = 4;
  const totalPeriods = years * periodsPerYear;
  const periodRate = rate / periodsPerYear;
  return principal * Math.pow(1 + periodRate, totalPeriods);
}

function calculatePercentage(values: Values): number {
  const type = values.type as string;
  const value = Number(values.value);
  const percent = Number(values.percent);
  if (isNaN(value) || isNaN(percent)) return 0;
  if (type === "percentOf") {
    return (percent / 100) * value;
  } else {
    return (value / percent) * 100;
  }
}

function calculateLoanOverpayment(values: Values): number {
  const amount = Number(values.amount);
  const rate = Number(values.rate) / 100 / 12;
  const term = Number(values.term);
  if (isNaN(amount) || isNaN(rate) || isNaN(term)) return 0;
  if (amount <= 0 || rate <= 0 || term <= 0) return 0;
  const monthlyPayment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
  return monthlyPayment * term - amount;
}

function calculateEarlyRepayment(values: Values): number {
  const remaining = Number(values.amount);
  const rate = Number(values.rate) / 100 / 12;
  const remainingTerm = Number(values.remainingTerm);
  const earlyAmount = Number(values.earlyAmount);
  const method = values.method as string;
  if (isNaN(remaining) || isNaN(rate) || isNaN(remainingTerm) || isNaN(earlyAmount)) return 0;
  if (remaining <= 0 || rate <= 0 || remainingTerm <= 0 || earlyAmount <= 0) return 0;
  const newBalance = remaining - earlyAmount;
  if (newBalance <= 0) return 0;
  if (method === "reducePayment") {
    return (newBalance * rate * Math.pow(1 + rate, remainingTerm)) / (Math.pow(1 + rate, remainingTerm) - 1);
  } else {
    const monthlyPayment = (remaining * rate * Math.pow(1 + rate, remainingTerm)) / (Math.pow(1 + rate, remainingTerm) - 1);
    const newTerm = Math.log(monthlyPayment / (monthlyPayment - newBalance * rate)) / Math.log(1 + rate);
    return Math.ceil(newTerm);
  }
}

function calculateTax(values: Values): number {
  const income = Number(values.income);
  const taxRate = Number(values.taxRate) / 100;
  if (isNaN(income) || isNaN(taxRate)) return 0;
  return income * taxRate;
}

function calculateNetSalary(values: Values): number {
  const gross = Number(values.grossSalary);
  const taxRate = Number(values.taxRate) / 100;
  if (isNaN(gross) || isNaN(taxRate)) return 0;
  return gross * (1 - taxRate);
}

function calculateCurrencyConverter(values: Values): number {
  const amount = Number(values.amount);
  const rate = Number(values.rate);
  if (isNaN(amount) || isNaN(rate)) return 0;
  return amount / rate;
}

function calculateDiscount(values: Values): number {
  const price = Number(values.price);
  const discount = Number(values.discount) / 100;
  if (isNaN(price) || isNaN(discount)) return 0;
  return price * (1 - discount);
}

function calculateVAT(values: Values): number {
  const amount = Number(values.amount);
  const vatRate = Number(values.vatRate) / 100;
  const operation = values.operation as string;
  if (isNaN(amount) || isNaN(vatRate)) return 0;
  if (operation === "add") {
    return amount * (1 + vatRate);
  } else {
    return amount / (1 + vatRate);
  }
}

// ========== БИЗНЕС ==========
function calculateROI(values: Values): number {
  const profit = Number(values.profit);
  const investment = Number(values.investment);
  if (isNaN(profit) || isNaN(investment) || investment === 0) return 0;
  return (profit / investment) * 100;
}

function calculateCPA(values: Values): number {
  const adSpend = Number(values.adSpend);
  const actions = Number(values.actions);
  if (isNaN(adSpend) || isNaN(actions) || actions === 0) return 0;
  return adSpend / actions;
}

function calculateMargin(values: Values): number {
  const revenue = Number(values.revenue);
  const cost = Number(values.cost);
  if (isNaN(revenue) || isNaN(cost) || revenue === 0) return 0;
  return ((revenue - cost) / revenue) * 100;
}

function calculateMarkup(values: Values): number {
  const cost = Number(values.cost);
  const price = Number(values.price);
  if (isNaN(cost) || isNaN(price) || cost === 0) return 0;
  return ((price - cost) / cost) * 100;
}

function calculateLTV(values: Values): number {
  const avgPurchase = Number(values.avgPurchase);
  const purchasesPerYear = Number(values.purchasesPerYear);
  const avgLifetime = Number(values.avgLifetime);
  const marginPercent = Number(values.margin);
  if (isNaN(avgPurchase) || isNaN(purchasesPerYear) || isNaN(avgLifetime) || isNaN(marginPercent)) return 0;
  return avgPurchase * purchasesPerYear * avgLifetime * (marginPercent / 100);
}

// ========== ЗДОРОВЬЕ ==========
function calculateBMI(values: Values): number {
  const weight = Number(values.weight);
  const heightCm = Number(values.height);
  if (isNaN(weight) || isNaN(heightCm)) return 0;
  if (weight <= 0 || heightCm <= 0) return 0;
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
}

function calculateCalories(values: Values): number {
  const age = Number(values.age);
  const height = Number(values.height);
  const weight = Number(values.weight);
  const gender = values.gender === "male" ? "male" : "female";
  const activity = values.activity as string;
  if (isNaN(age) || isNaN(height) || isNaN(weight)) return 0;
  let bmr: number;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  const activityMap: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  const factor = activityMap[activity] || 1.55;
  return bmr * factor;
}

function calculateCaloriesForWeightLoss(values: Values): number {
  const calories = calculateCalories(values);
  const deficit = Number(values.deficit);
  if (isNaN(deficit)) return calories;
  const result = calories - deficit;
  return result > 0 ? result : 0;
}

function calculateIdealWeight(values: Values): number {
  const heightCm = Number(values.height);
  const targetBmi = Number(values.targetBmi);
  if (isNaN(heightCm) || isNaN(targetBmi)) return 0;
  if (heightCm <= 0 || targetBmi <= 0) return 0;
  const heightM = heightCm / 100;
  return targetBmi * (heightM * heightM);
}

function calculateBodyFat(values: Values): number {
  const age = Number(values.age);
  const bmi = Number(values.bmi);
  const gender = values.gender === "male" ? "male" : "female";
  if (isNaN(age) || isNaN(bmi)) return 0;
  if (age <= 0 || bmi <= 0) return 0;
  if (gender === "male") {
    return (1.20 * bmi) + (0.23 * age) - 16.2;
  } else {
    return (1.20 * bmi) + (0.23 * age) - 5.4;
  }
}

function calculateWaterIntake(values: Values): number {
  const weight = Number(values.weight);
  if (isNaN(weight) || weight <= 0) return 0;
  return (weight * 30) / 1000;
}

function calculateBMR(values: Values): number {
  const age = Number(values.age);
  const height = Number(values.height);
  const weight = Number(values.weight);
  const gender = values.gender === "male" ? "male" : "female";
  if (isNaN(age) || isNaN(height) || isNaN(weight)) return 0;
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

function calculateTDEE(values: Values): number {
  const bmr = calculateBMR(values);
  const activity = values.activity as string;
  const activityMap: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  const factor = activityMap[activity] || 1.55;
  return bmr * factor;
}

function calculateBodyFatAdvanced(values: Values): number {
  const neck = Number(values.neck);
  const waist = Number(values.waist);
  const hip = Number(values.hip);
  const height = Number(values.height);
  const gender = values.gender === "male" ? "male" : "female";
  if (isNaN(neck) || isNaN(waist) || isNaN(hip) || isNaN(height)) return 0;
  if (gender === "male") {
    return 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else {
    return 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
  }
}

function calculateHeartRateZones(values: Values): number {
  const age = Number(values.age);
  if (isNaN(age) || age <= 0) return 0;
  return 220 - age;
}

function calculateFoodCalories(values: Values): number {
  const protein = Number(values.protein);
  const fat = Number(values.fat);
  const carbs = Number(values.carbs);
  if (isNaN(protein) || isNaN(fat) || isNaN(carbs)) return 0;
  return protein * 4 + fat * 9 + carbs * 4;
}

// ========== СТРОЙКА ==========
function calculateConcrete(values: Values): number {
  const length = Number(values.length);
  const width = Number(values.width);
  const height = Number(values.height);
  if (isNaN(length) || isNaN(width) || isNaN(height)) return 0;
  return length * width * height;
}

function calculateBrick(values: Values): number {
  const length = Number(values.length);
  const height = Number(values.height);
  const brickType = values.brickType as string;
  const wallThickness = parseFloat(values.wallThickness as string);
  if (isNaN(length) || isNaN(height) || isNaN(wallThickness)) return 0;
  // Размеры кирпича в метрах: 0.25 x 0.12 x 0.065 (одинарный)
  let brickVolume = 0.25 * 0.12 * 0.065;
  if (brickType === "oneAndHalf") brickVolume = 0.25 * 0.12 * 0.088;
  if (brickType === "double") brickVolume = 0.25 * 0.12 * 0.138;
  const wallArea = length * height;
  // Количество кирпичей на 1 м² кладки в 1 кирпич (без учёта швов, упрощённо)
  const bricksPerM2 = 1 / (0.12 * 0.065);
  const bricks = wallArea * bricksPerM2 * wallThickness;
  return Math.ceil(bricks);
}

function calculateLumber(values: Values): number {
  const length = Number(values.length);
  const width = Number(values.width) / 1000;
  const thickness = Number(values.thickness) / 1000;
  const quantity = Number(values.quantity);
  if (isNaN(length) || isNaN(width) || isNaN(thickness) || isNaN(quantity)) return 0;
  return length * width * thickness * quantity;
}

function calculateFoundation(values: Values): number {
  const length = Number(values.length);
  const width = Number(values.width);
  const height = Number(values.height);
  if (isNaN(length) || isNaN(width) || isNaN(height)) return 0;
  return length * width * height;
}

function calculateBlocks(values: Values): number {
  const length = Number(values.length);
  const height = Number(values.height);
  const blockType = values.blockType as string;
  if (isNaN(length) || isNaN(height)) return 0;
  const blockArea = 0.6 * 0.3; // стандартный блок 600x300 мм
  const wallArea = length * height;
  const blocks = wallArea / blockArea;
  return Math.ceil(blocks);
}

function calculateRoof(values: Values): number {
  const length = Number(values.length);
  const width = Number(values.width);
  if (isNaN(length) || isNaN(width)) return 0;
  return length * width;
}

function calculateTile(values: Values): number {
  const roomLength = Number(values.length);
  const roomWidth = Number(values.width);
  const tileLength = Number(values.tileLength) / 100;
  const tileWidth = Number(values.tileWidth) / 100;
  if (isNaN(roomLength) || isNaN(roomWidth) || isNaN(tileLength) || isNaN(tileWidth)) return 0;
  const roomArea = roomLength * roomWidth;
  const tileArea = tileLength * tileWidth;
  const tiles = roomArea / tileArea;
  return Math.ceil(tiles * 1.1);
}

function calculateScreed(values: Values): number {
  const length = Number(values.length);
  const width = Number(values.width);
  const thickness = Number(values.thickness);
  if (isNaN(length) || isNaN(width) || isNaN(thickness)) return 0;
  return length * width * thickness;
}

function calculateInsulation(values: Values): number {
  const area = Number(values.area);
  const thickness = Number(values.thickness);
  if (isNaN(area) || isNaN(thickness)) return 0;
  return area * thickness;
}

function calculatePaint(values: Values): number {
  const area = Number(values.area);
  const consumption = Number(values.consumption);
  const coats = Number(values.coats);
  if (isNaN(area) || isNaN(consumption) || isNaN(coats)) return 0;
  return area * consumption * coats;
}

function calculateWallpaper(values: Values): number {
  const perimeter = Number(values.roomPerimeter);
  const height = Number(values.roomHeight);
  const rollLength = Number(values.rollLength);
  const rollWidth = Number(values.rollWidth);
  if (isNaN(perimeter) || isNaN(height) || isNaN(rollLength) || isNaN(rollWidth)) return 0;
  const wallArea = perimeter * height;
  const rollArea = rollLength * rollWidth;
  const rolls = wallArea / rollArea;
  return Math.ceil(rolls);
}

function calculatePlaster(values: Values): number {
  const area = Number(values.area);
  const thickness = Number(values.thickness) / 1000;
  if (isNaN(area) || isNaN(thickness)) return 0;
  return area * thickness;
}