import { useState, useCallback, useMemo } from 'react';
import {
  type TargetCode,
  targetCompletions,
  specialCases,
  DEFAULT_REGISTER_SIZE,
} from '../data/indicatorsData';

export interface SummaryData {
  complete: number;
  incomplete: number;
  exceptionInvited: number;
  exceptionClinical: number;
  totalRegister: number;
  completePatients: number;
  incompletePatients: number;
  exceptionInvitedPatients: number;
  exceptionClinicalPatients: number;
}

interface Breakdown {
  complete: number;
  exceptionInvited: number;
  incomplete: number;
}

function calculateBreakdown(totalCompletion: number): Breakdown {
  if (totalCompletion === 0) {
    return { complete: 0, exceptionInvited: 0, incomplete: 100 };
  }
  const completePercent = Math.round(totalCompletion * 0.88);
  const exceptionInvitedPercent = totalCompletion - completePercent;
  const incompletePercent = 100 - totalCompletion;
  return {
    complete: completePercent,
    exceptionInvited: Math.round(exceptionInvitedPercent * 10) / 10,
    incomplete: Math.round(incompletePercent * 10) / 10,
  };
}

export function getFinancialYearProgress(): number {
  const today = new Date();
  const currentYear = today.getFullYear();

  let financialYearStart: Date;
  if (today.getMonth() < 3) {
    financialYearStart = new Date(currentYear - 1, 3, 1);
  } else {
    financialYearStart = new Date(currentYear, 3, 1);
  }

  const daysElapsed = Math.floor(
    (today.getTime() - financialYearStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  const year = financialYearStart.getFullYear();
  const isLeapYear =
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeapYear ? 366 : 365;

  return daysElapsed / daysInYear;
}

export function getExpectedAchievementForSummary(): number {
  const yearProgress = getFinancialYearProgress();
  const maxAchievement = 85;
  return yearProgress * maxAchievement;
}

export function getSummaryData(targetCode: string): SummaryData {
  const specialCase = specialCases[targetCode as TargetCode];
  if (specialCase) {
    return {
      ...specialCase,
      completePatients: Math.round((specialCase.complete / 100) * specialCase.totalRegister),
      incompletePatients: Math.round((specialCase.incomplete / 100) * specialCase.totalRegister),
      exceptionInvitedPatients: Math.round(
        (specialCase.exceptionInvited / 100) * specialCase.totalRegister
      ),
      exceptionClinicalPatients: Math.round(
        (specialCase.exceptionClinical / 100) * specialCase.totalRegister
      ),
    };
  }

  const totalCompletion = targetCompletions[targetCode as TargetCode] ?? 0;
  const breakdown = calculateBreakdown(totalCompletion);

  return {
    complete: breakdown.complete,
    incomplete: breakdown.incomplete,
    exceptionInvited: breakdown.exceptionInvited,
    exceptionClinical: 0,
    totalRegister: DEFAULT_REGISTER_SIZE,
    completePatients: Math.round((breakdown.complete / 100) * DEFAULT_REGISTER_SIZE),
    incompletePatients: Math.round((breakdown.incomplete / 100) * DEFAULT_REGISTER_SIZE),
    exceptionInvitedPatients: Math.round((breakdown.exceptionInvited / 100) * DEFAULT_REGISTER_SIZE),
    exceptionClinicalPatients: 0,
  };
}

// Last year summary data - based on historical performance
// For HYP008: 62.52% total completion (51% complete + 11.5% exception), 37.5% incomplete
// For HYP009: ~71.8% total completion (64% complete + 7.8% exception), ~28.2% incomplete
const lastYearSpecialCases: Record<string, Omit<SummaryData, 'completePatients' | 'incompletePatients' | 'exceptionInvitedPatients' | 'exceptionClinicalPatients'>> = {
  HYP008: {
    complete: 51.0,
    incomplete: 37.5,
    exceptionInvited: 11.5,
    exceptionClinical: 0,
    totalRegister: 683, // Same as current
  },
  HYP009: {
    complete: 64.0,
    incomplete: 28.2,
    exceptionInvited: 7.8,
    exceptionClinical: 0,
    totalRegister: 234, // Same as current
  },
};

export function getLastYearSummaryData(targetCode: string): SummaryData {
  const lastYearCase = lastYearSpecialCases[targetCode];
  if (lastYearCase) {
    return {
      ...lastYearCase,
      completePatients: Math.round((lastYearCase.complete / 100) * lastYearCase.totalRegister),
      incompletePatients: Math.round((lastYearCase.incomplete / 100) * lastYearCase.totalRegister),
      exceptionInvitedPatients: Math.round(
        (lastYearCase.exceptionInvited / 100) * lastYearCase.totalRegister
      ),
      exceptionClinicalPatients: 0,
    };
  }

  // For other targets, estimate last year as ~3-4% lower than current
  const currentData = getSummaryData(targetCode);
  const estimatedTotalCompletion = Math.max(0, (currentData.complete + currentData.exceptionInvited) * 0.96);
  const breakdown = calculateBreakdown(estimatedTotalCompletion);

  return {
    complete: breakdown.complete,
    incomplete: breakdown.incomplete,
    exceptionInvited: breakdown.exceptionInvited,
    exceptionClinical: 0,
    totalRegister: currentData.totalRegister,
    completePatients: Math.round((breakdown.complete / 100) * currentData.totalRegister),
    incompletePatients: Math.round((breakdown.incomplete / 100) * currentData.totalRegister),
    exceptionInvitedPatients: Math.round((breakdown.exceptionInvited / 100) * currentData.totalRegister),
    exceptionClinicalPatients: 0,
  };
}

interface UseIndicatorsDataReturn {
  expandedSections: Record<string, boolean>;
  toggleAccordion: (section: string) => void;
  initializeAccordionSections: (targetCodes: string[]) => void;
}

export function useIndicatorsData(): UseIndicatorsDataReturn {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleAccordion = useCallback((section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  const initializeAccordionSections = useCallback((targetCodes: string[]) => {
    setExpandedSections((prev) => {
      const updated = { ...prev };
      for (const code of targetCodes) {
        if (!(code in updated)) {
          updated[code] = false;
        }
      }
      return updated;
    });
  }, []);

  return {
    expandedSections,
    toggleAccordion,
    initializeAccordionSections,
  };
}

export function useFinancialYearData() {
  const yearProgress = useMemo(() => getFinancialYearProgress(), []);
  const expectedAchievement = useMemo(() => getExpectedAchievementForSummary(), []);

  return {
    yearProgress,
    expectedAchievement,
  };
}
