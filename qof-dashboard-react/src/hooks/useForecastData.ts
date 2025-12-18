import { useMemo } from 'react';
import { type ForecastData, getForecastData, getLastYearForecastData } from '../data/forecastData';

export type ViewMode = 'forecast' | 'lastYear';

interface UseForecastDataReturn {
  forecast: ForecastData;
}

export function useForecastData(
  condition: string | null | undefined,
  viewMode: ViewMode = 'forecast'
): UseForecastDataReturn {
  const forecast = useMemo(() => {
    if (viewMode === 'lastYear') {
      return getLastYearForecastData(condition ?? 'default');
    }
    return getForecastData(condition ?? 'default');
  }, [condition, viewMode]);

  return { forecast };
}
