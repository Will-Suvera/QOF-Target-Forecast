import { useMemo, useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
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
  const [isCompressed, setIsCompressed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroTop = heroRef.current.getBoundingClientRect().top;
        const headerHeight = 56; // Approximate header height
        
        // Compress when hero would scroll past the header
        setIsCompressed(heroTop <= headerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div 
      ref={heroRef}
      className={`sticky top-14 z-20 transition-all duration-300 ease-in-out mb-8 ${
        isCompressed ? 'bg-white/95 backdrop-blur-sm shadow-md' : ''
      }`}
      style={{
        marginLeft: isCompressed ? '-1.5rem' : '0',
        marginRight: isCompressed ? '-1.5rem' : '0',
        paddingLeft: isCompressed ? '1.5rem' : '0',
        paddingRight: isCompressed ? '1.5rem' : '0',
      }}
    >
      {isCompressed ? (
        /* Compressed State */
        <div className="py-3 px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Key Metrics */}
            <div className="flex items-center gap-6 flex-1 min-w-0">
              {/* Points */}
              <div className="flex items-center gap-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-semibold text-blue-800">{pointsAchieved}</span>
                  <span className="text-xs text-blue-700">/ {maxPoints}</span>
                </div>
                <div className="w-16 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-800 rounded-full transition-all"
                    style={{ width: `${pointsPercentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">pts</span>
              </div>

              {/* Work Done */}
              <div className="flex items-center gap-2">
                <div className="flex items-baseline gap-1">
                  <span className={`text-lg font-semibold ${workDoneColors.text}`}>{forecast.current}%</span>
                </div>
                <div className={`w-16 h-2 ${workDoneColors.background} rounded-full overflow-hidden`}>
                  <div 
                    className={`h-full ${workDoneColors.bar} rounded-full transition-all`}
                    style={{ width: `${forecast.current}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">done</span>
              </div>

              {/* Earned */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-green-700">£{earnedSoFar.toLocaleString()}</span>
                <span className="text-xs text-gray-600">earned</span>
              </div>

              {/* Expand Icon */}
              <button 
                onClick={() => setIsCompressed(false)}
                className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Expand hero section"
              >
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Right: CTA Button */}
            <div className="flex-shrink-0">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                Save £8,000 today!
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Expanded State */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* QOF Forecast Card */}
      <div className="card-glass p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-1">
          Your forecast for this QOF year
        </h3>
        <p className="text-sm text-gray-600 leading-normal mb-6">
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
                    <span className="text-base font-semibold text-blue-800 leading-tight">
                      {pointsAchieved}
                    </span>
                    <span className="text-sm font-medium text-blue-800 leading-normal">points</span>
                  </div>
                  <span className="text-sm font-medium text-blue-800 leading-normal">out of {maxPoints}</span>
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
                  <span className={`text-base font-medium ${workDoneColors.text} leading-tight`}>{forecast.current}%</span>
                  <span className={`text-sm font-medium ${workDoneColors.text} leading-normal`}>work done so far</span>
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
                      className="text-sm text-gray-500 font-medium whitespace-nowrap absolute leading-normal"
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

                  <span className="text-base font-semibold text-green-700 leading-tight">
                    £{earnedSoFar.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-green-700 leading-normal">earned so far</span>
                </div>
                <span className="text-sm font-medium text-green-700 leading-normal">out of £{maxEarned.toLocaleString()}</span>
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
                  <span className="text-gray-700 text-base font-medium leading-tight">
                    £{remainingToEarnAmount.toLocaleString()}
                  </span>
                  <span className="text-gray-700 text-sm leading-normal">to earn from diagnosed patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-3 rounded border border-green-600"
                    style={{
                      background: 'repeating-linear-gradient(45deg, transparent 0px, transparent 2px, #16a34a 2px, #16a34a 4px)',
                    }}
                  ></div>
                  <span className="text-gray-700 text-base font-medium leading-tight">
                    £{prevalenceOpportunityAmount.toLocaleString()}
                  </span>
                  <span className="text-gray-700 text-sm leading-normal">from undiagnosed patients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Potential Cost Savings Card */}
      <div className="card-glass p-5">
        {/* Headline */}
        <h3 className="text-sm font-semibold text-gray-700 mb-4 leading-snug">Cost for completing QOF</h3>

        {/* First row: Original cost (strikethrough) + Suvera cost button */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl font-bold text-gray-500 line-through leading-tight">
            £70,000
          </div>
          
            <div className="text-3xl font-bold text-green-700 leading-tight">
              £62,000
            </div>
        </div>

        {/* Smaller section: Breakdown */}
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
          {/* Suvera cost alone */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 leading-normal">Suvera clinic cost</span>
            <span className="font-semibold text-gray-900 leading-normal">
              £72,000
            </span>
          </div>
          {/* Additional reduction from undiagnosed patients */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 leading-normal">Additional reduction (d.u. prevalence)</span>
            <span className="font-semibold text-green-600 leading-normal">
              -£10,000
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors">
          Save £8,000 today!
        </button>
      </div>
        </div>
      )}
    </div>
  );
}
