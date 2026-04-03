// data/calculators.ts
export type CalculatorField = {
  key: string;
  label: string;
  type: "number" | "select" | "radio";
  defaultValue: number | string;
  options?: string[];
};

export type Calculator = {
  category: string;
  slug: string;
  title: string;
  description: string;
  fields: CalculatorField[];
  formulaType: string;
};

export type Category = {
  name: string;
  slug: string;
};

export const calculators: Calculator[] = [
  // ========== ФИНАНСЫ (существующие + новые) ==========
  {
    category: "finance",
    slug: "loan-calculator",
    title: "Кредитный калькулятор",
    description: "Рассчитайте ежемесячный платёж по кредиту (аннуитетный).",
    fields: [
      { key: "amount", label: "Сумма кредита (₽)", type: "number", defaultValue: 1000000 },
      { key: "rate", label: "Процентная ставка (% годовых)", type: "number", defaultValue: 12 },
      { key: "term", label: "Срок (мес.)", type: "number", defaultValue: 60 },
    ],
    formulaType: "loan",
  },
  {
    category: "finance",
    slug: "mortgage",
    title: "Ипотечный калькулятор",
    description: "Рассчитайте ежемесячный платёж по ипотеке (аннуитетный).",
    fields: [
      { key: "amount", label: "Сумма кредита (₽)", type: "number", defaultValue: 3000000 },
      { key: "rate", label: "Процентная ставка (% годовых)", type: "number", defaultValue: 8 },
      { key: "term", label: "Срок (лет)", type: "number", defaultValue: 20 },
    ],
    formulaType: "mortgage",
  },
  {
    category: "finance",
    slug: "deposit",
    title: "Калькулятор вклада",
    description: "Рассчитайте доходность по вкладу с капитализацией процентов.",
    fields: [
      { key: "amount", label: "Сумма вклада (₽)", type: "number", defaultValue: 100000 },
      { key: "rate", label: "Процентная ставка (% годовых)", type: "number", defaultValue: 10 },
      { key: "term", label: "Срок (мес.)", type: "number", defaultValue: 12 },
      { key: "capitalization", label: "Капитализация", type: "select", defaultValue: "yes", options: ["yes", "no"] },
    ],
    formulaType: "deposit",
  },
  {
    category: "finance",
    slug: "inflation",
    title: "Калькулятор инфляции",
    description: "Рассчитайте, как изменится покупательная способность денег с учётом инфляции.",
    fields: [
      { key: "amount", label: "Сумма (₽)", type: "number", defaultValue: 10000 },
      { key: "inflationRate", label: "Инфляция (% годовых)", type: "number", defaultValue: 6 },
      { key: "years", label: "Количество лет", type: "number", defaultValue: 5 },
    ],
    formulaType: "inflation",
  },
  {
    category: "finance",
    slug: "investment-return",
    title: "Калькулятор доходности инвестиций",
    description: "Рассчитайте будущую стоимость инвестиций с учётом ежегодной доходности.",
    fields: [
      { key: "amount", label: "Начальная сумма (₽)", type: "number", defaultValue: 100000 },
      { key: "rate", label: "Годовая доходность (%)", type: "number", defaultValue: 12 },
      { key: "years", label: "Срок (лет)", type: "number", defaultValue: 10 },
      { key: "annualAdd", label: "Ежегодное пополнение (₽)", type: "number", defaultValue: 0 },
    ],
    formulaType: "investment",
  },
  {
    category: "finance",
    slug: "compound-interest",
    title: "Калькулятор сложных процентов",
    description: "Рассчитайте будущую стоимость вклада с реинвестированием процентов.",
    fields: [
      { key: "principal", label: "Начальная сумма (₽)", type: "number", defaultValue: 100000 },
      { key: "rate", label: "Годовая ставка (%)", type: "number", defaultValue: 10 },
      { key: "years", label: "Срок (лет)", type: "number", defaultValue: 5 },
      { key: "compoundFrequency", label: "Капитализация", type: "select", defaultValue: "yearly", options: ["yearly", "monthly", "quarterly"] },
    ],
    formulaType: "compoundInterest",
  },
  {
    category: "finance",
    slug: "percentage-calculator",
    title: "Калькулятор процентов",
    description: "Вычислите процент от числа, или число от процента.",
    fields: [
      { key: "type", label: "Тип расчёта", type: "select", defaultValue: "percentOf", options: ["percentOf", "whatPercent"] },
      { key: "value", label: "Число", type: "number", defaultValue: 1000 },
      { key: "percent", label: "Процент", type: "number", defaultValue: 20 },
    ],
    formulaType: "percentage",
  },
  {
    category: "finance",
    slug: "annuity-payment",
    title: "Калькулятор аннуитетного платежа",
    description: "Рассчитайте ежемесячный аннуитетный платёж.",
    fields: [
      { key: "amount", label: "Сумма кредита (₽)", type: "number", defaultValue: 1000000 },
      { key: "rate", label: "Годовая ставка (%)", type: "number", defaultValue: 12 },
      { key: "term", label: "Срок (мес.)", type: "number", defaultValue: 60 },
    ],
    formulaType: "loan",
  },
  {
    category: "finance",
    slug: "loan-overpayment",
    title: "Калькулятор переплаты по кредиту",
    description: "Рассчитайте общую сумму переплаты по кредиту.",
    fields: [
      { key: "amount", label: "Сумма кредита (₽)", type: "number", defaultValue: 1000000 },
      { key: "rate", label: "Годовая ставка (%)", type: "number", defaultValue: 12 },
      { key: "term", label: "Срок (мес.)", type: "number", defaultValue: 60 },
    ],
    formulaType: "loanOverpayment",
  },
  {
    category: "finance",
    slug: "early-repayment",
    title: "Калькулятор досрочного погашения кредита",
    description: "Рассчитайте новую сумму платежа или сокращение срока при досрочном погашении.",
    fields: [
      { key: "amount", label: "Остаток долга (₽)", type: "number", defaultValue: 500000 },
      { key: "rate", label: "Годовая ставка (%)", type: "number", defaultValue: 12 },
      { key: "remainingTerm", label: "Оставшийся срок (мес.)", type: "number", defaultValue: 36 },
      { key: "earlyAmount", label: "Сумма досрочного погашения (₽)", type: "number", defaultValue: 100000 },
      { key: "method", label: "Метод погашения", type: "select", defaultValue: "reducePayment", options: ["reducePayment", "reduceTerm"] },
    ],
    formulaType: "earlyRepayment",
  },
  {
    category: "finance",
    slug: "tax-calculator",
    title: "Калькулятор налогов (доход/зарплата)",
    description: "Рассчитайте НДФЛ и сумму на руки.",
    fields: [
      { key: "income", label: "Доход (₽)", type: "number", defaultValue: 100000 },
      { key: "taxRate", label: "Ставка налога (%)", type: "number", defaultValue: 13 },
    ],
    formulaType: "tax",
  },
  {
    category: "finance",
    slug: "net-salary",
    title: "Калькулятор зарплаты «на руки»",
    description: "Рассчитайте зарплату после вычета НДФЛ.",
    fields: [
      { key: "grossSalary", label: "Зарплата до вычета налогов (₽)", type: "number", defaultValue: 80000 },
      { key: "taxRate", label: "Ставка НДФЛ (%)", type: "number", defaultValue: 13 },
    ],
    formulaType: "netSalary",
  },
  {
    category: "finance",
    slug: "currency-converter",
    title: "Калькулятор валют (конвертер)",
    description: "Конвертируйте рубли в иностранную валюту.",
    fields: [
      { key: "amount", label: "Сумма в рублях (₽)", type: "number", defaultValue: 10000 },
      { key: "currency", label: "Валюта", type: "select", defaultValue: "USD", options: ["USD", "EUR", "GBP", "CNY", "TRY"] },
      { key: "rate", label: "Курс выбранной валюты (₽)", type: "number", defaultValue: 100 },
    ],
    formulaType: "currencyConverter",
  },
  {
    category: "finance",
    slug: "discount-calculator",
    title: "Калькулятор скидок",
    description: "Рассчитайте цену со скидкой и размер экономии.",
    fields: [
      { key: "price", label: "Цена (₽)", type: "number", defaultValue: 5000 },
      { key: "discount", label: "Скидка (%)", type: "number", defaultValue: 15 },
    ],
    formulaType: "discount",
  },
  {
    category: "finance",
    slug: "vat-calculator",
    title: "Калькулятор НДС",
    description: "Выделите или начислите НДС.",
    fields: [
      { key: "amount", label: "Сумма (₽)", type: "number", defaultValue: 100000 },
      { key: "vatRate", label: "Ставка НДС (%)", type: "number", defaultValue: 20 },
      { key: "operation", label: "Операция", type: "select", defaultValue: "add", options: ["add", "remove"] },
    ],
    formulaType: "vat",
  },

  // ========== БИЗНЕС ==========
  {
    category: "business",
    slug: "roi",
    title: "ROI (Return on Investment)",
    description: "Рентабельность инвестиций — отношение прибыли к вложениям.",
    fields: [
      { key: "profit", label: "Прибыль (₽)", type: "number", defaultValue: 100000 },
      { key: "investment", label: "Инвестиции (₽)", type: "number", defaultValue: 50000 },
    ],
    formulaType: "roi",
  },
  {
    category: "business",
    slug: "cpa",
    title: "CPA (Cost per Action)",
    description: "Стоимость за целевое действие (лид, продажа).",
    fields: [
      { key: "adSpend", label: "Расходы на рекламу (₽)", type: "number", defaultValue: 50000 },
      { key: "actions", label: "Количество целевых действий", type: "number", defaultValue: 100 },
    ],
    formulaType: "cpa",
  },
  {
    category: "business",
    slug: "margin",
    title: "Маржинальность",
    description: "Процент маржи от выручки.",
    fields: [
      { key: "revenue", label: "Выручка (₽)", type: "number", defaultValue: 200000 },
      { key: "cost", label: "Себестоимость (₽)", type: "number", defaultValue: 120000 },
    ],
    formulaType: "margin",
  },
  {
    category: "business",
    slug: "markup",
    title: "Наценка",
    description: "Процент наценки от себестоимости.",
    fields: [
      { key: "cost", label: "Себестоимость (₽)", type: "number", defaultValue: 1000 },
      { key: "price", label: "Цена продажи (₽)", type: "number", defaultValue: 1500 },
    ],
    formulaType: "markup",
  },
  {
    category: "business",
    slug: "ltv",
    title: "LTV (Customer Lifetime Value)",
    description: "Прибыль от клиента за всё время сотрудничества.",
    fields: [
      { key: "avgPurchase", label: "Средний чек (₽)", type: "number", defaultValue: 5000 },
      { key: "purchasesPerYear", label: "Покупок в год", type: "number", defaultValue: 2 },
      { key: "avgLifetime", label: "Средняя продолжительность жизни клиента (лет)", type: "number", defaultValue: 3 },
      { key: "margin", label: "Маржинальность (%)", type: "number", defaultValue: 30 },
    ],
    formulaType: "ltv",
  },
  // Дублируем финансовые калькуляторы для бизнеса (по необходимости)
  {
    category: "business",
    slug: "compound-interest",
    title: "Калькулятор сложных процентов",
    description: "Рассчитайте будущую стоимость инвестиций с реинвестированием.",
    fields: [
      { key: "principal", label: "Начальная сумма (₽)", type: "number", defaultValue: 100000 },
      { key: "rate", label: "Годовая ставка (%)", type: "number", defaultValue: 10 },
      { key: "years", label: "Срок (лет)", type: "number", defaultValue: 5 },
      { key: "compoundFrequency", label: "Капитализация", type: "select", defaultValue: "yearly", options: ["yearly", "monthly", "quarterly"] },
    ],
    formulaType: "compoundInterest",
  },
  {
    category: "business",
    slug: "percentage-calculator",
    title: "Калькулятор процентов",
    description: "Вычислите процент от числа, или число от процента.",
    fields: [
      { key: "type", label: "Тип расчёта", type: "select", defaultValue: "percentOf", options: ["percentOf", "whatPercent"] },
      { key: "value", label: "Число", type: "number", defaultValue: 1000 },
      { key: "percent", label: "Процент", type: "number", defaultValue: 20 },
    ],
    formulaType: "percentage",
  },
  // ... можно добавить другие финансовые для бизнеса по аналогии, но для краткости опускаю

  // ========== ЗДОРОВЬЕ ==========
  {
    category: "health",
    slug: "bmi",
    title: "Индекс массы тела (ИМТ)",
    description: "Рассчитайте индекс массы тела и оцените соответствие веса норме.",
    fields: [
      { key: "weight", label: "Вес (кг)", type: "number", defaultValue: 70 },
      { key: "height", label: "Рост (см)", type: "number", defaultValue: 170 },
    ],
    formulaType: "bmi",
  },
  {
    category: "health",
    slug: "calories",
    title: "Суточная норма калорий",
    description: "Узнайте, сколько калорий нужно употреблять в день для поддержания веса.",
    fields: [
      { key: "age", label: "Возраст (лет)", type: "number", defaultValue: 30 },
      { key: "height", label: "Рост (см)", type: "number", defaultValue: 170 },
      { key: "weight", label: "Вес (кг)", type: "number", defaultValue: 70 },
      { key: "gender", label: "Пол", type: "select", defaultValue: "male", options: ["male", "female"] },
      { key: "activity", label: "Уровень активности", type: "select", defaultValue: "moderate", options: ["sedentary", "light", "moderate", "active", "veryActive"] },
    ],
    formulaType: "calories",
  },
  {
    category: "health",
    slug: "calories-for-weight-loss",
    title: "Калории для похудения",
    description: "Рассчитайте дневную норму калорий для снижения веса.",
    fields: [
      { key: "age", label: "Возраст (лет)", type: "number", defaultValue: 30 },
      { key: "height", label: "Рост (см)", type: "number", defaultValue: 170 },
      { key: "weight", label: "Вес (кг)", type: "number", defaultValue: 70 },
      { key: "gender", label: "Пол", type: "select", defaultValue: "male", options: ["male", "female"] },
      { key: "activity", label: "Уровень активности", type: "select", defaultValue: "moderate", options: ["sedentary", "light", "moderate", "active", "veryActive"] },
      { key: "deficit", label: "Дефицит калорий (ккал/день)", type: "number", defaultValue: 500 },
    ],
    formulaType: "caloriesForWeightLoss",
  },
  {
    category: "health",
    slug: "ideal-weight",
    title: "Расчёт веса по росту",
    description: "Определите идеальный вес для желаемого индекса массы тела.",
    fields: [
      { key: "height", label: "Рост (см)", type: "number", defaultValue: 170 },
      { key: "targetBmi", label: "Желаемый ИМТ", type: "number", defaultValue: 22 },
    ],
    formulaType: "idealWeight",
  },
  {
    category: "health",
    slug: "body-fat",
    title: "Процент жира в организме",
    description: "Примерная оценка процента жира по ИМТ и возрасту.",
    fields: [
      { key: "age", label: "Возраст (лет)", type: "number", defaultValue: 30 },
      { key: "bmi", label: "Индекс массы тела (ИМТ)", type: "number", defaultValue: 24 },
      { key: "gender", label: "Пол", type: "select", defaultValue: "male", options: ["male", "female"] },
    ],
    formulaType: "bodyFat",
  },
  {
    category: "health",
    slug: "water-intake",
    title: "Норма воды в день",
    description: "Рассчитайте, сколько воды нужно пить в день.",
    fields: [
      { key: "weight", label: "Вес (кг)", type: "number", defaultValue: 70 },
    ],
    formulaType: "waterIntake",
  },
  {
    category: "health",
    slug: "bmr",
    title: "BMR (Основной обмен веществ)",
    description: "Рассчитайте базовую скорость метаболизма.",
    fields: [
      { key: "age", label: "Возраст (лет)", type: "number", defaultValue: 30 },
      { key: "height", label: "Рост (см)", type: "number", defaultValue: 170 },
      { key: "weight", label: "Вес (кг)", type: "number", defaultValue: 70 },
      { key: "gender", label: "Пол", type: "select", defaultValue: "male", options: ["male", "female"] },
    ],
    formulaType: "bmr",
  },
  {
    category: "health",
    slug: "tdee",
    title: "TDEE (Общий расход энергии)",
    description: "Рассчитайте суточную потребность в калориях с учётом активности.",
    fields: [
      { key: "age", label: "Возраст (лет)", type: "number", defaultValue: 30 },
      { key: "height", label: "Рост (см)", type: "number", defaultValue: 170 },
      { key: "weight", label: "Вес (кг)", type: "number", defaultValue: 70 },
      { key: "gender", label: "Пол", type: "select", defaultValue: "male", options: ["male", "female"] },
      { key: "activity", label: "Уровень активности", type: "select", defaultValue: "moderate", options: ["sedentary", "light", "moderate", "active", "veryActive"] },
    ],
    formulaType: "tdee",
  },
  {
    category: "health",
    slug: "body-fat-advanced",
    title: "Калькулятор процента жира (расширенный)",
    description: "Уточнённая оценка процента жира по трём измерениям.",
    fields: [
      { key: "neck", label: "Обхват шеи (см)", type: "number", defaultValue: 40 },
      { key: "waist", label: "Обхват талии (см)", type: "number", defaultValue: 80 },
      { key: "hip", label: "Обхват бёдер (см)", type: "number", defaultValue: 95 },
      { key: "height", label: "Рост (см)", type: "number", defaultValue: 170 },
      { key: "gender", label: "Пол", type: "select", defaultValue: "male", options: ["male", "female"] },
    ],
    formulaType: "bodyFatAdvanced",
  },
  {
    category: "health",
    slug: "heart-rate-zones",
    title: "Калькулятор пульса (зоны)",
    description: "Рассчитайте зоны пульса для тренировок.",
    fields: [
      { key: "age", label: "Возраст (лет)", type: "number", defaultValue: 30 },
    ],
    formulaType: "heartRateZones",
  },
  {
    category: "health",
    slug: "food-calories",
    title: "Калькулятор калорий по продуктам",
    description: "Оцените калорийность блюда по составу.",
    fields: [
      { key: "protein", label: "Белки (г)", type: "number", defaultValue: 20 },
      { key: "fat", label: "Жиры (г)", type: "number", defaultValue: 10 },
      { key: "carbs", label: "Углеводы (г)", type: "number", defaultValue: 30 },
    ],
    formulaType: "foodCalories",
  },

  // ========== СТРОЙКА ==========
  {
    category: "construction",
    slug: "concrete",
    title: "Калькулятор бетона",
    description: "Рассчитайте объём бетона для фундамента, плиты, стяжки.",
    fields: [
      { key: "length", label: "Длина (м)", type: "number", defaultValue: 10 },
      { key: "width", label: "Ширина (м)", type: "number", defaultValue: 10 },
      { key: "height", label: "Высота (м)", type: "number", defaultValue: 0.2 },
    ],
    formulaType: "concrete",
  },
  {
    category: "construction",
    slug: "brick",
    title: "Калькулятор кирпича",
    description: "Рассчитайте количество кирпича для стены.",
    fields: [
      { key: "length", label: "Длина стены (м)", type: "number", defaultValue: 10 },
      { key: "height", label: "Высота стены (м)", type: "number", defaultValue: 3 },
      { key: "brickType", label: "Тип кирпича", type: "select", defaultValue: "single", options: ["single", "oneAndHalf", "double"] },
      { key: "wallThickness", label: "Толщина стены (кирпичей)", type: "select", defaultValue: "1", options: ["0.5", "1", "1.5", "2"] },
    ],
    formulaType: "brick",
  },
  {
    category: "construction",
    slug: "lumber",
    title: "Калькулятор досок / пиломатериалов",
    description: "Рассчитайте объём и количество досок.",
    fields: [
      { key: "length", label: "Длина (м)", type: "number", defaultValue: 6 },
      { key: "width", label: "Ширина (мм)", type: "number", defaultValue: 150 },
      { key: "thickness", label: "Толщина (мм)", type: "number", defaultValue: 50 },
      { key: "quantity", label: "Количество", type: "number", defaultValue: 10 },
    ],
    formulaType: "lumber",
  },
  {
    category: "construction",
    slug: "foundation",
    title: "Калькулятор фундамента",
    description: "Рассчитайте объём бетона и арматуру для ленточного фундамента.",
    fields: [
      { key: "length", label: "Длина ленты (м)", type: "number", defaultValue: 40 },
      { key: "width", label: "Ширина ленты (м)", type: "number", defaultValue: 0.4 },
      { key: "height", label: "Высота ленты (м)", type: "number", defaultValue: 0.6 },
      { key: "rebarDiameter", label: "Диаметр арматуры (мм)", type: "number", defaultValue: 12 },
    ],
    formulaType: "foundation",
  },
  {
    category: "construction",
    slug: "blocks",
    title: "Калькулятор блоков (газобетон / пеноблок)",
    description: "Рассчитайте количество блоков для стен.",
    fields: [
      { key: "length", label: "Длина стены (м)", type: "number", defaultValue: 10 },
      { key: "height", label: "Высота стены (м)", type: "number", defaultValue: 3 },
      { key: "blockType", label: "Тип блока", type: "select", defaultValue: "gas", options: ["gas", "foam"] },
    ],
    formulaType: "blocks",
  },
  {
    category: "construction",
    slug: "roof",
    title: "Калькулятор крыши",
    description: "Рассчитайте площадь кровли и материалы.",
    fields: [
      { key: "length", label: "Длина ската (м)", type: "number", defaultValue: 10 },
      { key: "width", label: "Ширина ската (м)", type: "number", defaultValue: 8 },
      { key: "roofType", label: "Тип покрытия", type: "select", defaultValue: "metal", options: ["metal", "ondulin", "soft"] },
    ],
    formulaType: "roof",
  },
  {
    category: "construction",
    slug: "tile",
    title: "Калькулятор плитки",
    description: "Рассчитайте количество плитки для стен и пола.",
    fields: [
      { key: "length", label: "Длина помещения (м)", type: "number", defaultValue: 5 },
      { key: "width", label: "Ширина помещения (м)", type: "number", defaultValue: 4 },
      { key: "tileLength", label: "Длина плитки (см)", type: "number", defaultValue: 30 },
      { key: "tileWidth", label: "Ширина плитки (см)", type: "number", defaultValue: 30 },
    ],
    formulaType: "tile",
  },
  {
    category: "construction",
    slug: "screed",
    title: "Калькулятор стяжки пола",
    description: "Рассчитайте объём смеси для стяжки пола.",
    fields: [
      { key: "length", label: "Длина помещения (м)", type: "number", defaultValue: 5 },
      { key: "width", label: "Ширина помещения (м)", type: "number", defaultValue: 4 },
      { key: "thickness", label: "Толщина стяжки (м)", type: "number", defaultValue: 0.05 },
    ],
    formulaType: "screed",
  },
  {
    category: "construction",
    slug: "insulation",
    title: "Калькулятор утеплителя",
    description: "Рассчитайте количество утеплителя (м², м³).",
    fields: [
      { key: "area", label: "Площадь утепления (м²)", type: "number", defaultValue: 100 },
      { key: "thickness", label: "Толщина утеплителя (м)", type: "number", defaultValue: 0.1 },
    ],
    formulaType: "insulation",
  },
  {
    category: "construction",
    slug: "paint",
    title: "Калькулятор краски",
    description: "Рассчитайте расход краски по площади.",
    fields: [
      { key: "area", label: "Площадь окрашивания (м²)", type: "number", defaultValue: 50 },
      { key: "consumption", label: "Расход краски (л/м²)", type: "number", defaultValue: 0.1 },
      { key: "coats", label: "Количество слоёв", type: "number", defaultValue: 2 },
    ],
    formulaType: "paint",
  },
  {
    category: "construction",
    slug: "wallpaper",
    title: "Калькулятор обоев",
    description: "Рассчитайте количество рулонов обоев.",
    fields: [
      { key: "roomPerimeter", label: "Периметр комнаты (м)", type: "number", defaultValue: 20 },
      { key: "roomHeight", label: "Высота стен (м)", type: "number", defaultValue: 2.5 },
      { key: "rollLength", label: "Длина рулона (м)", type: "number", defaultValue: 10 },
      { key: "rollWidth", label: "Ширина рулона (м)", type: "number", defaultValue: 0.53 },
    ],
    formulaType: "wallpaper",
  },
  {
    category: "construction",
    slug: "plaster",
    title: "Калькулятор штукатурки",
    description: "Рассчитайте объём штукатурной смеси.",
    fields: [
      { key: "area", label: "Площадь стен (м²)", type: "number", defaultValue: 100 },
      { key: "thickness", label: "Толщина слоя (мм)", type: "number", defaultValue: 20 },
    ],
    formulaType: "plaster",
  },
];

// Автоматическое формирование категорий из списка калькуляторов
export const categories: Category[] = Array.from(
  new Map(
    calculators.map(calc => [
      calc.category,
      {
        name: calc.category === "finance" ? "Финансы" :
              calc.category === "business" ? "Бизнес" :
              calc.category === "health" ? "Здоровье" :
              calc.category === "construction" ? "Стройка" : calc.category,
        slug: calc.category,
      },
    ])
  ).values()
);