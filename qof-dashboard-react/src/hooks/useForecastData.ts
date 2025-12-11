import { useMemo } from 'react';
import { type ForecastData, getForecastData } from '../data/forecastData';

interface UseForecastDataReturn {
  forecast: ForecastData;
}

export function useForecastData(condition: string | null | undefined): UseForecastDataReturn {
  const forecast = useMemo(() => {
    return getForecastData(condition ?? 'default');
  }, [condition]);

  return { forecast };
}
