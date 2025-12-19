import { useMemo, useState, useEffect, useRef } from 'react';
import { Expand } from 'lucide-react';
import { usePracticeData } from '../context/PracticeDataContext';
import { type TargetAreas, calculateAreaTotals, calculateAreaCosts } from '../extracts/dataService';
import { getFinancialYearProgress } from '../hooks/useIndicatorsData';

interface HeroSectionProps {
  selectedAreas: TargetAreas[];
}

export function HeroSection({ selectedAreas }: HeroSectionProps) {
  const { getAreaData, getTargetAreas } = usePracticeData();
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // If no areas selected, show data for ALL areas
  const areasToShow = useMemo(() => {
    if (selectedAreas.length === 0) {
      return getTargetAreas();
    }
    return selectedAreas;
  }, [selectedAreas, getTargetAreas]);

  // Aggregate totals across all selected areas
  const { pointsAchieved, maxPoints, workDonePercentage, earnedSoFar, maxEarned } = useMemo(() => {
    let totalCurrentPoints = 0;
    let totalMaxPoints = 0;
    let totalEarned = 0;
    let totalPotential = 0;
    let totalWorkDone = 0;
    let areaCount = 0;

    for (const areaKey of areasToShow) {
      const areaData = getAreaData(areaKey);
      if (areaData) {
        const totals = calculateAreaTotals(areaData);
        totalCurrentPoints += totals.totalCurrentPoints;
        totalMaxPoints += totals.totalMaxPoints;
        totalEarned += totals.totalEarned;
        totalPotential += totals.totalPotential;
        totalWorkDone += totals.avgWorkDone;
        areaCount++;
      }
    }

    return {
      pointsAchieved: Math.round(totalCurrentPoints * 10) / 10,
      maxPoints: totalMaxPoints,
      workDonePercentage: areaCount > 0 ? Math.round((totalWorkDone / areaCount) * 10) / 10 : 0,
      earnedSoFar: totalEarned,
      maxEarned: totalPotential,
    };
  }, [areasToShow, getAreaData]);

  // Aggregate costs across all selected areas
  const costData = useMemo(() => {
    let traditionalCost = 0;
    let suveraCost = 0;
    let prevalenceOpportunity = 0;

    for (const areaKey of areasToShow) {
      const areaData = getAreaData(areaKey);
      if (areaData) {
        const costs = calculateAreaCosts(areaData);
        traditionalCost += costs.traditionalCost;
        suveraCost += costs.suveraCost;
        prevalenceOpportunity += areaData.earningsByIncreasingPrevalence;
      }
    }

    return {
      traditionalCost,
      suveraCost,
      savings: traditionalCost - suveraCost,
      prevalenceOpportunity,
    };
  }, [areasToShow, getAreaData]);

  // Scroll detection - show floating bar when hero is out of view
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            // Show floating bar when hero top is above viewport (scrolled past)
            setShowFloatingBar(rect.top < -100);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const expectedWorkDonePercentage = useMemo(() => {
    const yearProgress = getFinancialYearProgress();
    return yearProgress * 100;
  }, []);

  // Calculate dynamic color based on performance relative to target
  const workDoneColors = useMemo(() => {
    const ratio = workDonePercentage / expectedWorkDonePercentage;
    if (ratio < 0.9) {
      return { bar: 'bg-red-600', text: 'text-red-600', background: 'bg-red-200' };
    }
    if (ratio < 1.0) {
      return { bar: 'bg-amber-700', text: 'text-amber-700', background: 'bg-amber-200' };
    }
    return { bar: 'bg-green-700', text: 'text-green-700', background: 'bg-green-200' };
  }, [workDonePercentage, expectedWorkDonePercentage]);

  const pointsPercentage = maxPoints > 0 ? (pointsAchieved / maxPoints) * 100 : 0;

  // Use actual amounts from data
  const prevalenceOpportunityAmount = costData.prevalenceOpportunity;
  const remainingToEarnAmount = maxEarned - earnedSoFar;

  // Total potential including prevalence opportunity for bar representation
  const totalPotentialWithPrevalence = maxEarned + prevalenceOpportunityAmount;

  // Calculate percentages based on total potential
  const earnedPercentage = totalPotentialWithPrevalence > 0 ? (earnedSoFar / totalPotentialWithPrevalence) * 100 : 0;
  const remainingToEarnPercentage = totalPotentialWithPrevalence > 0 ? (remainingToEarnAmount / totalPotentialWithPrevalence) * 100 : 0;
  const prevalenceOpportunityPercentage = totalPotentialWithPrevalence > 0 ? (prevalenceOpportunityAmount / totalPotentialWithPrevalence) * 100 : 0;

  // Build description text
  const areaDescription = useMemo(() => {
    if (selectedAreas.length === 0) {
      return 'all conditions';
    }
    const areaNames = areasToShow.map((key) => {
      const data = getAreaData(key);
      return data?.areaName ?? key;
    });
    return areaNames.join(' & ');
  }, [selectedAreas, areasToShow, getAreaData]);

  // Don't render if no data at all
  if (areasToShow.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Bar - shown as fixed overlay when hero is scrolled out of view */}
      {showFloatingBar && (
        <div className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-sm shadow-md rounded-lg py-3 px-4">
            <div className="flex items-center justify-between">
              {/* Toggle Icon */}
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                aria-label="Scroll to top"
              >
                <Expand className="w-4 h-4 text-gray-500" />
              </button>

              {/* Progress Bars */}
              <div className="flex items-center gap-4 flex-1 min-w-0 ml-4">
                {/* Points */}
                <div className="group relative flex items-center gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-semibold text-blue-800">{pointsAchieved}</span>
                    <span className="text-xs text-blue-700">/ {maxPoints}</span>
                  </div>
                  <div className="w-20 bg-blue-200 rounded-full h-2.5 overflow-hidden cursor-pointer">
                    <div
                      className="h-full bg-blue-800 rounded-full transition-all"
                      style={{ width: `${pointsPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">pts</span>
                  {/* Hover Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                    {Math.round(pointsPercentage)}% of maximum points
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                </div>

                {/* Work Done */}
                <div className="group relative flex items-center gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-base font-semibold ${workDoneColors.text}`}>{workDonePercentage}%</span>
                  </div>
                  <div className="relative">
                    <div className={`w-20 ${workDoneColors.background} rounded-full h-2.5 overflow-visible cursor-pointer`}>
                      <div
                        className={`h-full ${workDoneColors.bar} rounded-full transition-all`}
                        style={{ width: `${workDonePercentage}%` }}
                      />
                    </div>
                    {/* Arrow Indicator */}
                    <div
                      className="absolute z-10 pointer-events-none"
                      style={{
                        left: `${expectedWorkDonePercentage}%`,
                        top: '100%',
                        marginTop: '2px',
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <div
                        className="w-0 h-0"
                        style={{
                          borderLeft: '4px solid transparent',
                          borderRight: '4px solid transparent',
                          borderBottom: '6px solid #6b7280',
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">done</span>
                  {/* Hover Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                    Target for {new Date().toLocaleDateString('en-GB', { month: 'short' })}: {Math.round(expectedWorkDonePercentage * 10) / 10}%
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                </div>

                {/* Earned */}
                <div className="group relative flex items-center gap-2">
                  <span className="text-base font-semibold text-green-700">£{earnedSoFar.toLocaleString()}</span>
                  <div className="w-20 rounded-full h-2.5 overflow-hidden cursor-pointer flex">
                    <div
                      className="h-full bg-green-700 transition-all"
                      style={{ width: `${earnedPercentage}%` }}
                    />
                    <div
                      className="h-full bg-green-100"
                      style={{ width: `${remainingToEarnPercentage}%` }}
                    />
                    <div
                      className="h-full"
                      style={{
                        width: `${prevalenceOpportunityPercentage}%`,
                        background: 'repeating-linear-gradient(45deg, transparent 0px, transparent 2px, #16a34a 2px, #16a34a 3px)',
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">earned</span>
                  {/* Hover Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 min-w-max">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-2 bg-green-700 rounded-sm flex-shrink-0"></div>
                        <span>£{earnedSoFar.toLocaleString()} earned</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-2 bg-green-100 rounded-sm flex-shrink-0"></div>
                        <span>£{remainingToEarnAmount.toLocaleString()} missed QOF earnings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-2 rounded-sm flex-shrink-0" style={{
                          background: 'repeating-linear-gradient(45deg, transparent 0px, transparent 1px, #16a34a 1px, #16a34a 2px)'
                        }}></div>
                        <span>£{prevalenceOpportunityAmount.toLocaleString()} by increasing prevalence</span>
                      </div>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Save £{costData.savings.toLocaleString()} today!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Hero Section - always visible */}
      <div ref={heroRef} className="mb-8">
        {/* View Mode Toggle - no-op buttons for now */}
        <div className="flex gap-2 mb-4">
          <button
            className="px-4 py-2 text-sm font-medium rounded-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            This Year's Forecast
          </button>
          <button
            className="px-4 py-2 text-sm font-medium rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Last Year's Performance
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* QOF Forecast Card */}
          <div className="card-glass p-6 lg:col-span-2 relative">
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-3">
                  Your forecast for this QOF year
                </h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-normal mb-6">
              Showing potential QOF achievement for {areaDescription}.
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
                        style={{ width: `${pointsPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Work Done */}
                  <div>
                    <div className="flex items-baseline mb-2 gap-2">
                      <span className={`text-base font-medium ${workDoneColors.text} leading-tight`}>{workDonePercentage}%</span>
                      <span className={`text-sm font-medium ${workDoneColors.text} leading-normal`}>work done so far</span>
                    </div>
                    <div className="relative">
                      <div className={`${workDoneColors.background} w-full rounded-md h-3 relative overflow-visible`}>
                        <div
                          className={`${workDoneColors.bar} h-3 rounded-md`}
                          style={{ width: `${workDonePercentage}%` }}
                        />
                      </div>
                    </div>
                    {/* Arrow Indicator for Expected at Time of Year - positioned below the bar */}
                    <div className="relative" style={{ height: '30px' }}>
                      <div
                        className="absolute z-20 pointer-events-none"
                        style={{
                          left: `${expectedWorkDonePercentage}%`,
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


                {/* Earned - Partitioned into 3 sections */}
                <div>
                  <div className="flex items-baseline mb-2 justify-between">
                    <div className="flex items-baseline gap-2">

                      <span className="text-base font-semibold text-green-700 leading-tight">
                        £{earnedSoFar.toLocaleString()}
                      </span>
                      <span className="text-sm font-medium text-green-700 leading-normal">earned</span>
                    </div>
                    <span className="text-sm font-medium text-green-700 leading-normal">out of £{totalPotentialWithPrevalence.toLocaleString()}</span>
                  </div>
                  <div className="w-full rounded-md h-6 relative overflow-visible flex">
                    {/* Section 1: Earned so far (solid green) */}
                    <div
                      className="bg-green-700 h-6 rounded-l-md"
                      style={{ width: `${earnedPercentage}%` }}
                    />
                    {/* Section 2: Remaining to earn (lighter solid green) */}
                    <div
                      className="bg-green-100 h-6"
                      style={{ width: `${remainingToEarnPercentage}%` }}
                    />
                    {/* Section 3: Prevalence opportunity (green diagonal stripes with transparent background) */}
                    <div
                      className="h-6 rounded-r-md"
                      style={{
                        width: `${prevalenceOpportunityPercentage}%`,
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
                      <span className="text-gray-700 text-sm leading-normal">missed QOF earnings</span>
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
                      <span className="text-gray-700 text-sm leading-normal">by increasing prevalence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Analysis Card */}
          <div className="card-glass p-5">
            {/* Headline */}
            <h3 className="text-sm font-semibold text-gray-700 mb-4 leading-snug">
              Cost Analysis: Last Year
            </h3>

            {/* Large headline amounts */}
            <div className="flex items-center gap-2 mb-4">
              <div className="text-3xl font-bold text-red-600 leading-tight">
                £{costData.traditionalCost.toLocaleString()}
              </div>
              <span className="text-gray-400 text-xl">→</span>
              <div className="text-3xl font-bold text-green-600 leading-tight">
                £{(costData.suveraCost - prevalenceOpportunityAmount - remainingToEarnAmount).toLocaleString()}
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 leading-normal">Traditional cost (estimated)</span>
                <span className="font-semibold text-gray-900 leading-normal">
                  £{costData.traditionalCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 leading-normal">Suvera cost</span>
                <span className="leading-normal">
                  <span className="font-semibold text-gray-900">£{costData.suveraCost.toLocaleString()}</span>
                  <span className="font-semibold text-green-600"> (-£{costData.savings.toLocaleString()})</span>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 leading-normal">Increased earnings (prevalence)</span>
                <span className="font-semibold text-green-600 leading-normal">
                  -£{prevalenceOpportunityAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 leading-normal">Increased earnings (missed QOF)</span>
                <span className="font-semibold text-green-600 leading-normal">
                  -£{remainingToEarnAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Savings Display */}
            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xs text-gray-600 mb-1">How much you could have saved</div>
              <div className="text-2xl font-bold text-green-600">
                £{(costData.savings + prevalenceOpportunityAmount + remainingToEarnAmount).toLocaleString()}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors">
              See how to save this year
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
