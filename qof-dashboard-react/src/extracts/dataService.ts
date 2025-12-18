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

type HistoricData = {
  [key in TargetAreas]: {
    areaName: string;
    earningsPerPoint: number;
    listSize: number;
    prevalence: number;
    subIcbTopQuartilePrevalence: number;
    earningsByIncreasingPrevalence: number;
    targets: {
      [key: string]: TargetData;
    }
  }
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