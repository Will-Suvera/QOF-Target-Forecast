export interface ForecastData {
  current: number;
  withPlanner: number;
  withSuvera: number;
  minAchievement: number;
  currentValue: number;
  plannerValue: number;
  suveraValue: number;
}

export type ConditionKey =
  | 'asthma'
  | 'hypertension'
  | 'cholesterol'
  | 'diabetes'
  | 'copd'
  | 'heart-failure'
  | 'atrial-fibrillation'
  | 'coronary-heart-disease'
  | 'dementia'
  | 'mental-health'
  | 'ndh'
  | 'stroke-tia'
  | 'blood-pressure'
  | 'smoking'
  | 'vaccination-immunisations'
  | 'cervical-screening';

export const forecastData: Record<ConditionKey, ForecastData> = {
  asthma: {
    current: 37,
    withPlanner: 56,
    withSuvera: 78,
    minAchievement: 56,
    currentValue: 0,
    plannerValue: 32000,
    suveraValue: 125000,
  },
  hypertension: {
    current: 29,
    withPlanner: 48,
    withSuvera: 72,
    minAchievement: 48,
    currentValue: 0,
    plannerValue: 28000,
    suveraValue: 98000,
  },
  cholesterol: {
    current: 80,
    withPlanner: 85,
    withSuvera: 92,
    minAchievement: 85,
    currentValue: 0,
    plannerValue: 15000,
    suveraValue: 45000,
  },
  diabetes: {
    current: 2,
    withPlanner: 35,
    withSuvera: 68,
    minAchievement: 35,
    currentValue: 0,
    plannerValue: 45000,
    suveraValue: 135000,
  },
  copd: {
    current: 45,
    withPlanner: 62,
    withSuvera: 81,
    minAchievement: 62,
    currentValue: 0,
    plannerValue: 38000,
    suveraValue: 112000,
  },
  'heart-failure': {
    current: 38,
    withPlanner: 55,
    withSuvera: 76,
    minAchievement: 55,
    currentValue: 0,
    plannerValue: 42000,
    suveraValue: 118000,
  },
  'atrial-fibrillation': {
    current: 61,
    withPlanner: 72,
    withSuvera: 88,
    minAchievement: 72,
    currentValue: 0,
    plannerValue: 25000,
    suveraValue: 78000,
  },
  'coronary-heart-disease': {
    current: 67,
    withPlanner: 78,
    withSuvera: 91,
    minAchievement: 78,
    currentValue: 0,
    plannerValue: 22000,
    suveraValue: 65000,
  },
  dementia: {
    current: 34,
    withPlanner: 52,
    withSuvera: 74,
    minAchievement: 52,
    currentValue: 0,
    plannerValue: 35000,
    suveraValue: 105000,
  },
  'mental-health': {
    current: 56,
    withPlanner: 68,
    withSuvera: 85,
    minAchievement: 68,
    currentValue: 0,
    plannerValue: 30000,
    suveraValue: 92000,
  },
  ndh: {
    current: 42,
    withPlanner: 58,
    withSuvera: 79,
    minAchievement: 58,
    currentValue: 0,
    plannerValue: 33000,
    suveraValue: 102000,
  },
  'stroke-tia': {
    current: 48,
    withPlanner: 64,
    withSuvera: 83,
    minAchievement: 64,
    currentValue: 0,
    plannerValue: 40000,
    suveraValue: 115000,
  },
  'blood-pressure': {
    current: 58,
    withPlanner: 70,
    withSuvera: 87,
    minAchievement: 70,
    currentValue: 0,
    plannerValue: 27000,
    suveraValue: 85000,
  },
  smoking: {
    current: 72,
    withPlanner: 82,
    withSuvera: 94,
    minAchievement: 82,
    currentValue: 0,
    plannerValue: 20000,
    suveraValue: 60000,
  },
  'vaccination-immunisations': {
    current: 85,
    withPlanner: 90,
    withSuvera: 96,
    minAchievement: 90,
    currentValue: 0,
    plannerValue: 15000,
    suveraValue: 45000,
  },
  'cervical-screening': {
    current: 64,
    withPlanner: 75,
    withSuvera: 89,
    minAchievement: 75,
    currentValue: 0,
    plannerValue: 26000,
    suveraValue: 82000,
  },
};

export const defaultForecastData: ForecastData = {
  current: 37,
  withPlanner: 56,
  withSuvera: 78,
  minAchievement: 56,
  currentValue: 0,
  plannerValue: 32000,
  suveraValue: 125000,
};

export function getForecastData(condition: string): ForecastData {
  if (condition in forecastData) {
    return forecastData[condition as ConditionKey];
  }
  return defaultForecastData;
}

// Last Year's Performance Data
// Based on historical performance data from IndicatorsTargetCards and targets-sub-icb.json
export const lastYearForecastData: Record<ConditionKey, ForecastData> = {
  asthma: {
    current: 34, // ~3% lower than current year
    withPlanner: 52, // ~4% lower
    withSuvera: 74, // ~4% lower
    minAchievement: 52,
    currentValue: 0,
    plannerValue: 28000,
    suveraValue: 110000,
  },
  hypertension: {
    current: 26, // Based on HYP008: 62.52% total completion (54.4% + 12.9% exception)
    withPlanner: 44, // ~4% lower
    withSuvera: 68, // ~4% lower
    minAchievement: 44,
    currentValue: 0,
    plannerValue: 25000,
    suveraValue: 90000,
  },
  cholesterol: {
    current: 77, // ~3% lower
    withPlanner: 82, // ~3% lower
    withSuvera: 89, // ~3% lower
    minAchievement: 82,
    currentValue: 0,
    plannerValue: 14000,
    suveraValue: 42000,
  },
  diabetes: {
    current: 0, // Very low last year
    withPlanner: 32, // ~3% lower
    withSuvera: 65, // ~3% lower
    minAchievement: 32,
    currentValue: 0,
    plannerValue: 42000,
    suveraValue: 130000,
  },
  copd: {
    current: 42, // ~3% lower
    withPlanner: 59, // ~3% lower
    withSuvera: 78, // ~3% lower
    minAchievement: 59,
    currentValue: 0,
    plannerValue: 35000,
    suveraValue: 105000,
  },
  'heart-failure': {
    current: 35, // ~3% lower
    withPlanner: 52, // ~3% lower
    withSuvera: 73, // ~3% lower
    minAchievement: 52,
    currentValue: 0,
    plannerValue: 39000,
    suveraValue: 110000,
  },
  'atrial-fibrillation': {
    current: 58, // ~3% lower
    withPlanner: 69, // ~3% lower
    withSuvera: 85, // ~3% lower
    minAchievement: 69,
    currentValue: 0,
    plannerValue: 23000,
    suveraValue: 75000,
  },
  'coronary-heart-disease': {
    current: 64, // ~3% lower
    withPlanner: 75, // ~3% lower
    withSuvera: 88, // ~3% lower
    minAchievement: 75,
    currentValue: 0,
    plannerValue: 20000,
    suveraValue: 62000,
  },
  dementia: {
    current: 31, // ~3% lower
    withPlanner: 49, // ~3% lower
    withSuvera: 71, // ~3% lower
    minAchievement: 49,
    currentValue: 0,
    plannerValue: 32000,
    suveraValue: 100000,
  },
  'mental-health': {
    current: 53, // ~3% lower
    withPlanner: 65, // ~3% lower
    withSuvera: 82, // ~3% lower
    minAchievement: 65,
    currentValue: 0,
    plannerValue: 28000,
    suveraValue: 88000,
  },
  ndh: {
    current: 39, // ~3% lower
    withPlanner: 55, // ~3% lower
    withSuvera: 76, // ~3% lower
    minAchievement: 55,
    currentValue: 0,
    plannerValue: 30000,
    suveraValue: 98000,
  },
  'stroke-tia': {
    current: 45, // ~3% lower
    withPlanner: 61, // ~3% lower
    withSuvera: 80, // ~3% lower
    minAchievement: 61,
    currentValue: 0,
    plannerValue: 37000,
    suveraValue: 110000,
  },
  'blood-pressure': {
    current: 55, // ~3% lower
    withPlanner: 67, // ~3% lower
    withSuvera: 84, // ~3% lower
    minAchievement: 67,
    currentValue: 0,
    plannerValue: 25000,
    suveraValue: 82000,
  },
  smoking: {
    current: 69, // ~3% lower
    withPlanner: 79, // ~3% lower
    withSuvera: 91, // ~3% lower
    minAchievement: 79,
    currentValue: 0,
    plannerValue: 19000,
    suveraValue: 58000,
  },
  'vaccination-immunisations': {
    current: 82, // ~3% lower
    withPlanner: 87, // ~3% lower
    withSuvera: 93, // ~3% lower
    minAchievement: 87,
    currentValue: 0,
    plannerValue: 14000,
    suveraValue: 43000,
  },
  'cervical-screening': {
    current: 61, // ~3% lower
    withPlanner: 72, // ~3% lower
    withSuvera: 86, // ~3% lower
    minAchievement: 72,
    currentValue: 0,
    plannerValue: 24000,
    suveraValue: 79000,
  },
};

export const defaultLastYearForecastData: ForecastData = {
  current: 34,
  withPlanner: 52,
  withSuvera: 74,
  minAchievement: 52,
  currentValue: 0,
  plannerValue: 28000,
  suveraValue: 110000,
};

export function getLastYearForecastData(condition: string): ForecastData {
  if (condition in lastYearForecastData) {
    return lastYearForecastData[condition as ConditionKey];
  }
  return defaultLastYearForecastData;
}
