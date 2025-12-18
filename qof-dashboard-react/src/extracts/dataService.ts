export type MetaData = {
  ods: string;
  practiceName: string;
  pcnCode: string;
  pcnName: string;
  icbCode: string;
  icbName: string;
  listSize: number;
  currentMonthTargetWorkDone: number;
}

export type TargetAreas = 'asthma' | 'hypertension' // | 'cholesterol' | 'diabetes' | 'copd' | 'heart-failure' | 'atrial-fibrillation' | 'coronary-heart-disease' | 'dementia' | 'mental-health' | 'ndh' | 'stroke-tia' | 'blood-pressure';

export type TargetData = {
  denominator: number;
  completionPercentage: number;
  completionCount: number;
  clinicalCompletionPercentage: number;
  exceptionReportingPercentage: number;
  exceptionReportingCount: number;
  minThreshold: number;
  maxThreshold: number;
  todayThreshold: number;
  maxPoints: number;
  currentPoints: number;
  workUnitsDone: number;
  workUnitsForMax: number;
  description: string;
  suveraCostForFullList: number;
  traditionalCostForFullList: number;
  suveraCostForIncompletePatients: number;
  traditionalCostForIncompletePatients: number;
}

export type AreaData = {
  areaName: string;
  earningsPerPoint: number;
  listSize: number;
  prevalence: number;
  subIcbTopQuartilePrevalence: number;
  earningsByIncreasingPrevalence: number;
  targets: Record<string, TargetData>;
};

export type HistoricData = {
  [key in TargetAreas]: AreaData;
}

export const getDataForPractice = (ods: string): {
  meta: MetaData,
  historic: HistoricData,
  current: null,
} => {
  return {
    meta: {
      ods,
      practiceName: 'Maltings Surgery',
      pcnCode: 'U06079',
      pcnName: 'Abbey Health PCN',
      icbCode: '06N',
      icbName: 'NHS Hertfordshire and West Essex ICB',
      listSize: 19026,
      currentMonthTargetWorkDone: 0.71,
    },
    historic: {
      asthma: {
        areaName: 'Asthma',
        earningsPerPoint: 200,
        listSize: 1500,
        prevalence: 1500 / 19026,
        subIcbTopQuartilePrevalence: 0.09,
        earningsByIncreasingPrevalence: 2000,
        targets: {
          AST007: {
            minThreshold: 0.4,
            maxThreshold: 0.8,
            maxPoints: 15,
            currentPoints: 7.5,
            workUnitsDone: 400,
            workUnitsForMax: 800,
            denominator: 1400,
            completionCount: 700,
            completionPercentage: 0.6,
            exceptionReportingCount: 100,
            clinicalCompletionPercentage: 0.4666666667,
            exceptionReportingPercentage: 0.06666666667,
            todayThreshold: 0.568,
            suveraCostForFullList: 20000,
            traditionalCostForFullList: 25000,
            suveraCostForIncompletePatients: 10000,
            traditionalCostForIncompletePatients: 12500,
            description: 'Asthma review in last 12 months',
          },
        }
      },
      hypertension: {
        areaName: 'Hypertension',
        earningsPerPoint: 400,
        listSize: 2000,
        prevalence: 2000 / 19026,
        subIcbTopQuartilePrevalence: (2000 * 1.05) / 19026,
        earningsByIncreasingPrevalence: 4000,
        targets: {
          HYP008: {
            minThreshold: 0.6,
            maxThreshold: 0.9,
            maxPoints: 15,
            currentPoints: 5,
            workUnitsDone: 600,
            workUnitsForMax: 800,
            denominator: 1400,
            completionCount: 980,
            completionPercentage: 0.7,
            exceptionReportingCount: 100,
            clinicalCompletionPercentage: 980/1500,
            exceptionReportingPercentage: 100/1500,
            todayThreshold: 0.9*0.71,
            suveraCostForFullList: 27000,
            traditionalCostForFullList: 54000,
            suveraCostForIncompletePatients: 5400,
            traditionalCostForIncompletePatients: 10800,
            description: 'BP in range (age 79 or under)',
          },
          HYP009: {
            minThreshold: 0.6,
            maxThreshold: 0.9,
            maxPoints: 6,
            currentPoints: 4,
            workUnitsDone: 180,
            workUnitsForMax: 200,
            denominator: 450,
            completionCount: 360,
            completionPercentage: 0.8,
            exceptionReportingCount: 50,
            clinicalCompletionPercentage: 360/500,
            exceptionReportingPercentage: 50/500,
            todayThreshold: 0.639,
            suveraCostForFullList: 9000,
            traditionalCostForFullList: 18000,
            suveraCostForIncompletePatients: 900,
            traditionalCostForIncompletePatients: 1800,
            description: 'BP in range (age 80 or over)',
          },
        },
      },
    },
    current: null,
  };
}

// Helper Functions

/**
 * Calculate summary breakdown from TargetData
 * Returns percentages and patient counts for UI display
 */
export function calculateSummaryData(target: TargetData) {
  const completePatients = Math.round(target.completionCount);
  const exceptionPatients = Math.round(target.exceptionReportingCount);
  const incompletePatients = target.denominator - completePatients - exceptionPatients;

  return {
    complete: target.completionPercentage * 100,
    incomplete: (incompletePatients / target.denominator) * 100,
    exceptionInvited: target.exceptionReportingPercentage * 100,
    exceptionClinical: 0, // Not tracked separately in current data
    totalRegister: target.denominator,
    completePatients,
    incompletePatients,
    exceptionInvitedPatients: exceptionPatients,
    exceptionClinicalPatients: 0,
  };
}

/**
 * Calculate QOF points from achievement vs thresholds
 */
export function calculateQOFPoints(target: TargetData): number {
  const achievement = target.completionPercentage + target.exceptionReportingPercentage;
  if (achievement < target.minThreshold) return 0;
  if (achievement >= target.maxThreshold) return target.maxPoints;

  const range = target.maxThreshold - target.minThreshold;
  const progress = (achievement - target.minThreshold) / range;
  return 1 + progress * (target.maxPoints - 1);
}

/**
 * Calculate total points and earnings for an area
 */
export function calculateAreaTotals(areaData: AreaData) {
  const targets = Object.values(areaData.targets);
  const totalMaxPoints = targets.reduce((sum, t) => sum + t.maxPoints, 0);
  const totalCurrentPoints = targets.reduce((sum, t) => sum + calculateQOFPoints(t), 0);
  const totalEarned = Math.round(totalCurrentPoints * areaData.earningsPerPoint);
  const totalPotential = totalMaxPoints * areaData.earningsPerPoint;

  // Calculate average work done (completion + exceptions)
  const avgWorkDone = targets.reduce((sum, t) => {
    return sum + (t.completionPercentage + t.exceptionReportingPercentage);
  }, 0) / targets.length * 100;

  return {
    totalMaxPoints,
    totalCurrentPoints: Math.round(totalCurrentPoints * 10) / 10,
    totalEarned,
    totalPotential,
    avgWorkDone: Math.round(avgWorkDone * 10) / 10,
  };
}

/**
 * Calculate costs for an area
 */
export function calculateAreaCosts(areaData: AreaData) {
  const targets = Object.values(areaData.targets);
  return {
    suveraCost: targets.reduce((sum, t) => sum + t.suveraCostForIncompletePatients, 0),
    traditionalCost: targets.reduce((sum, t) => sum + t.traditionalCostForIncompletePatients, 0),
    suveraFullCost: targets.reduce((sum, t) => sum + t.suveraCostForFullList, 0),
    traditionalFullCost: targets.reduce((sum, t) => sum + t.traditionalCostForFullList, 0),
  };
}