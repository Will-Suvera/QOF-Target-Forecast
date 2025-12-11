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

//const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

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

  // Calculate dynamic color based on performance relative to target
  const workDoneColors = useMemo(() => {
    const ratio = forecast.current / expectedWorkDonePercentage;
    if (ratio < 0.9) {
      return { bar: 'bg-red-600', text: 'text-red-600', background: 'bg-red-200' };
    }
    if (ratio < 1.0) {
      return { bar: 'bg-amber-700', text: 'text-amber-700', background: 'bg-amber-200' };
    }
    return { bar: 'bg-green-700', text: 'text-green-700', background: 'bg-green-200' };
  }, [forecast.current, expectedWorkDonePercentage]);

  const pointsPercentage = maxPoints > 0 ? (pointsAchieved / maxPoints) * 100 : 0;

  // Dummy calculation for earned so far (placeholder)
  const earnedSoFar = useMemo(() => {
    // Simple dummy calculation: pointsAchieved * 150
    return Math.round(pointsAchieved * 150);
  }, [pointsAchieved]);

  const maxEarned = useMemo(() => {
    // Maximum potential earnings: maxPoints * 150
    return maxPoints * 150;
  }, [maxPoints]);

  const earnedPercentage = maxEarned > 0 ? (earnedSoFar / maxEarned) * 100 : 0;

  // Calculate the three sections for earned so far bar
  const remainingToEarnPercentage = useMemo(() => {
    return Math.max(0, 100 - earnedPercentage - 5); // 5% for prevalence opportunity
  }, [earnedPercentage]);

  const prevalenceOpportunityPercentage = 5; // Fixed 5% for now

  // Calculate amounts for legend
  const remainingToEarnAmount = useMemo(() => {
    return Math.round((remainingToEarnPercentage / 100) * maxEarned);
  }, [remainingToEarnPercentage, maxEarned]);

  const prevalenceOpportunityAmount = useMemo(() => {
    return Math.round((prevalenceOpportunityPercentage / 100) * maxEarned);
  }, [prevalenceOpportunityPercentage, maxEarned]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* QOF Forecast Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          Your forecast for this QOF year
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Showing potential QOF achievement, based on recalling method.
        </p>

        {/* Progress Bars Container */}
        <div className="relative" style={{ minHeight: '160px' }}>
          {/* Progress Bars */}
          <div className="space-y-6 relative z-0">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Points achieved */}
              <div>
                <div className="flex items-baseline mb-2 justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-blue-800">
                      {pointsAchieved}
                    </span>
                    <span className="text-sm font-medium text-blue-800">points</span>
                  </div>
                  <span className="text-sm font-medium text-blue-800">out of {maxPoints}</span>
                </div>
                <div className="w-full bg-blue-200 rounded-md h-3 relative overflow-visible">
                  <div
                    className="bg-blue-800 h-3 rounded-md"
                    style={{ width: `${String(pointsPercentage)}%` }}
                  />
                </div>
              </div>

              {/* Work Done */}
              <div>
                <div className="flex items-baseline mb-2 gap-2">
                  <span className={`text-3xl font-medium ${workDoneColors.text}`}>{forecast.current}%</span>
                  <span className={`text-sm font-medium ${workDoneColors.text}`}>work done so far</span>
                </div>
                <div className="relative">
                  <div className={`${workDoneColors.background} w-full rounded-md h-3 relative overflow-visible`}>
                    <div
                      className={`${workDoneColors.bar} h-3 rounded-md`}
                      style={{ width: `${String(forecast.current)}%` }}
                    />
                  </div>
                </div>
                {/* Arrow Indicator for Expected at Time of Year - positioned below the bar */}
                <div className="relative" style={{ height: '30px' }}>
                  <div
                    className="absolute z-20 pointer-events-none"
                    style={{
                      left: `${String(expectedWorkDonePercentage)}%`,
                      top: '8px',
                    }}
                  >
                    {/* Upward pointing triangle arrow - centered at the exact position */}
                    <div
                      className="w-0 h-0"
                      style={{
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderBottom: `14px solid #6b7280`,
                        transform: 'translateX(-50%)',
                      }}
                    />
                    {/* Expected at Time of Year Label - positioned based on arrow position */}
                    <div 
                      className="text-sm text-gray-500 font-medium whitespace-nowrap absolute"
                      style={{
                        ...(expectedWorkDonePercentage >= 50 
                          ? { right: '30px', textAlign: 'right' }
                          : { left: '12px', textAlign: 'left' }
                        ),
                        top: '-2px',
                      }}
                    >
                      Target for {new Date().toLocaleDateString('en-GB', { month: 'short' })}: {Math.round(expectedWorkDonePercentage * 10) / 10}%
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Earned So Far - Partitioned into 3 sections */}
            <div>
              <div className="flex items-baseline mb-2 justify-between">
                <div className="flex items-baseline gap-2">

                  <span className="text-3xl font-semibold text-green-700">
                    £{earnedSoFar.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-green-700">earned so far</span>
                </div>
                <span className="text-sm font-medium text-green-700">out of £{maxEarned.toLocaleString()}</span>
              </div>
              <div className="w-full rounded-md h-6 relative overflow-visible flex">
                {/* Section 1: Earned so far (solid green) */}
                <div
                  className="bg-green-700 h-6 rounded-l-md"
                  style={{ width: `${String(earnedPercentage)}%` }}
                />
                {/* Section 2: Remaining to earn (lighter solid green) */}
                <div
                  className="bg-green-100 h-6"
                  style={{ width: `${String(remainingToEarnPercentage)}%` }}
                />
                {/* Section 3: Prevalence opportunity (green diagonal stripes with transparent background) */}
                <div
                  className="h-6 rounded-r-md"
                  style={{
                    width: `${String(prevalenceOpportunityPercentage)}%`,
                    background: 'repeating-linear-gradient(45deg, transparent 0px, transparent 4px, #16a34a 4px, #16a34a 6px)',
                  }}
                />
              </div>
              
              {/* Legend */}
              <div className="mt-6 flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-3 bg-green-100 rounded border border-green-400"></div>
                  <span className="text-gray-700 text-lg font-medium">
                    £{remainingToEarnAmount.toLocaleString()}
                  </span>
                  <span className="text-gray-700 text-sm">to earn from diagnosed patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-3 rounded border border-green-600"
                    style={{
                      background: 'repeating-linear-gradient(45deg, transparent 0px, transparent 2px, #16a34a 2px, #16a34a 4px)',
                    }}
                  ></div>
                  <span className="text-gray-700 text-lg font-medium">
                    £{prevalenceOpportunityAmount.toLocaleString()}
                  </span>
                  <span className="text-gray-700 text-sm">from undiagnosed patients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estimated Value Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">

        {/* Current Value Section */}
        <div className="mb-3">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <h3 className="text-base font-semibold text-gray-700 mb-2">Current value</h3>
            <div className="text-xl font-bold text-gray-500">
              £{forecast.currentValue.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Potential Value Section */}
        <div className="mb-3">
          <h3 className="text-base font-semibold text-green-700 mb-2">Potential value</h3>
          <div className="grid grid-cols-2 gap-2">
            {/* Planner */}
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-sm text-gray-600 mb-0.5">Planner</div>
              <div className="text-3xl font-semibold text-green-600">
                £{forecast.plannerValue.toLocaleString()}
              </div>
            </div>

            {/* Suvera Clinic */}
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-0.5">Suvera Clinic</div>
              <div className="text-3xl font-semibold text-green-600">
                £{forecast.suveraValue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white px-3 py-1.5 rounded-md text-md font-medium hover:bg-blue-700 flex items-center justify-center">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
