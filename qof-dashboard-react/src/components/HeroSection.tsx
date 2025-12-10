import { useMemo } from 'react';
import { useForecastData } from '../hooks/useForecastData';
import { getFinancialYearProgress } from '../hooks/useIndicatorsData';

interface HeroSectionProps {
  condition?: string | null | undefined;
}

interface HeroSummaryData {
  complete: number;
  incomplete: number;
  exceptionInvited: number;
  exceptionClinical: number;
}

const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

function getHeroSummaryData(targetCode: string): HeroSummaryData {
  const summaryData: Record<string, HeroSummaryData> = {
    HYP008: {
      complete: 54.4,
      incomplete: 32.7,
      exceptionInvited: 12.9,
      exceptionClinical: 0,
    },
    HYP009: {
      complete: 67,
      incomplete: 28.2,
      exceptionInvited: 4.8,
      exceptionClinical: 0,
    },
  };
  return summaryData[targetCode] ?? { complete: 0, incomplete: 0, exceptionInvited: 0, exceptionClinical: 0 };
}

function calculateQOFPoints(
  achievement: number,
  minThreshold: number,
  maxThreshold: number,
  maxPoints: number
): number {
  if (achievement < minThreshold) {
    return 0;
  }
  if (achievement >= maxThreshold) {
    return maxPoints;
  }
  return 1 + ((achievement - minThreshold) / (maxThreshold - minThreshold)) * (maxPoints - 1);
}

export function HeroSection({ condition }: HeroSectionProps) {
  const { forecast: baseForecast } = useForecastData(condition);

  const forecast = useMemo(() => {
    if (condition === 'hypertension') {
      const hyp008Data = getHeroSummaryData('HYP008');
      const hyp009Data = getHeroSummaryData('HYP009');

      const hyp008WorkDone = hyp008Data.complete + hyp008Data.exceptionInvited;
      const hyp009WorkDone = hyp009Data.complete + hyp009Data.exceptionInvited;
      const averageWorkDone = (hyp008WorkDone + hyp009WorkDone) / 2;

      return {
        ...baseForecast,
        current: Math.round(averageWorkDone * 10) / 10,
      };
    }
    return baseForecast;
  }, [condition, baseForecast]);

  const { pointsAchieved, maxPoints } = useMemo(() => {
    if (condition === 'hypertension') {
      const hyp008Data = getHeroSummaryData('HYP008');
      const hyp009Data = getHeroSummaryData('HYP009');

      const hyp008Achievement =
        hyp008Data.complete + hyp008Data.exceptionClinical + hyp008Data.exceptionInvited;
      const hyp009Achievement =
        hyp009Data.complete + hyp009Data.exceptionClinical + hyp009Data.exceptionInvited;

      const hyp008Points = calculateQOFPoints(hyp008Achievement, 40, 85, 38);
      const hyp009Points = calculateQOFPoints(hyp009Achievement, 40, 85, 14);

      return {
        pointsAchieved: Math.round((hyp008Points + hyp009Points) * 10) / 10,
        maxPoints: 52,
      };
    }
    return {
      pointsAchieved: Math.round((forecast.withPlanner / 100) * 564),
      maxPoints: 564,
    };
  }, [condition, forecast.withPlanner]);

  const expectedWorkDonePercentage = useMemo(() => {
    const yearProgress = getFinancialYearProgress();
    return yearProgress * 100;
  }, []);

  const pointsPercentage = maxPoints > 0 ? (pointsAchieved / maxPoints) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* QOF Forecast Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Your forecast for this QOF year
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Showing potential QOF achievement, based on recalling method.
        </p>

        {/* Progress Bars Container */}
        <div
          className="relative"
          style={{ minHeight: '200px', paddingTop: '40px', paddingBottom: '50px' }}
        >
          {/* Expected at Time of Year Label */}
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: '30px' }}
          >
            <div className="relative w-full">
              <span
                className="absolute left-0 text-sm text-purple-600 font-semibold whitespace-nowrap"
                style={{
                  maxWidth: `calc(${String(expectedWorkDonePercentage)}% - 60px)`,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Expected at time of year
              </span>
              <span
                className="absolute text-sm text-purple-600 font-semibold whitespace-nowrap"
                style={{
                  left: `${String(expectedWorkDonePercentage)}%`,
                  marginLeft: '16px',
                }}
              >
                {Math.round(expectedWorkDonePercentage * 10) / 10}%
              </span>
            </div>
          </div>

          {/* Expected at Time of Year Vertical Line */}
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              left: `${String(expectedWorkDonePercentage)}%`,
              top: '30px',
              bottom: '50px',
            }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 border-l-2 border-dashed border-purple-500"
              style={{ transform: 'translateX(-50%)' }}
            />
            <div
              className="absolute left-0 top-0 w-2 h-2 bg-purple-500"
              style={{ transform: 'translateX(-50%) translateY(-4px) rotate(45deg)' }}
            />
            <div
              className="absolute left-0 bottom-0 w-2 h-2 bg-purple-500"
              style={{ transform: 'translateX(-50%) translateY(4px) rotate(45deg)' }}
            />
          </div>

          {/* Progress Bars */}
          <div className="space-y-4 relative z-0">
            {/* Work Done */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Work Done</span>
                <span className="text-sm font-semibold text-gray-900">{forecast.current}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-visible">
                <div
                  className="bg-amber-700 h-6 rounded-full"
                  style={{ width: `${String(forecast.current)}%` }}
                />
              </div>
            </div>

            {/* Points achieved */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Points achieved</span>
                <span className="text-sm font-semibold text-gray-900">
                  {pointsAchieved} out of {maxPoints} points
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-visible">
                <div
                  className="bg-blue-800 h-6 rounded-full"
                  style={{ width: `${String(pointsPercentage)}%` }}
                />
              </div>
            </div>
          </div>

          {/* X-axis with months */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: '50px', paddingTop: '8px' }}
          >
            <div className="relative w-full flex justify-between items-start">
              {MONTHS.map((month) => (
                <div key={month} className="flex flex-col items-center" style={{ flex: 1 }}>
                  <span className="text-xs text-gray-600 font-medium">{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Estimated Value Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Estimated value</h3>
        <p className="text-sm text-gray-600 mb-6">How much you could gain in returns.</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Current */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Current</div>
            <div className="text-2xl font-bold text-gray-500">
              £{forecast.currentValue.toLocaleString()}
            </div>
          </div>

          {/* Planner */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Planner</div>
            <div className="text-2xl font-bold text-green-600">
              £{forecast.plannerValue.toLocaleString()}
            </div>
          </div>

          {/* Suvera Clinic */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Suvera Clinic</div>
            <div className="text-2xl font-bold text-green-600">
              £{forecast.suveraValue.toLocaleString()}
            </div>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          View pricing breakdown
        </button>
      </div>
    </div>
  );
}
