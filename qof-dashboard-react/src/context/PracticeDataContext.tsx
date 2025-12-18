import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { getDataForPractice, type MetaData, type TargetAreas, type TargetData, type AreaData } from '../extracts/dataService';

interface PracticeDataContextValue {
  meta: MetaData;
  getTargetAreas: () => TargetAreas[];
  getAreaData: (area: TargetAreas) => AreaData | undefined;
  getTargetData: (area: TargetAreas, targetCode: string) => TargetData | undefined;
  getAllTargetsForArea: (area: TargetAreas) => Array<{ code: string; data: TargetData }>;
}

const PracticeDataContext = createContext<PracticeDataContextValue | null>(null);

export function PracticeDataProvider({ children, ods = 'E82031' }: { children: ReactNode; ods?: string }) {
  const practiceData = useMemo(() => getDataForPractice(ods), [ods]);

  const value: PracticeDataContextValue = useMemo(() => ({
    meta: practiceData.meta,
    getTargetAreas: () => Object.keys(practiceData.historic) as TargetAreas[],
    getAreaData: (area) => practiceData.historic[area],
    getTargetData: (area, code) => practiceData.historic[area]?.targets[code],
    getAllTargetsForArea: (area) => {
      const areaData = practiceData.historic[area];
      if (!areaData) return [];
      return Object.entries(areaData.targets).map(([code, data]) => ({ code, data }));
    },
  }), [practiceData]);

  return (
    <PracticeDataContext.Provider value={value}>
      {children}
    </PracticeDataContext.Provider>
  );
}

export function usePracticeData() {
  const context = useContext(PracticeDataContext);
  if (!context) throw new Error('usePracticeData must be used within PracticeDataProvider');
  return context;
}

export type { AreaData, PracticeDataContextValue };
