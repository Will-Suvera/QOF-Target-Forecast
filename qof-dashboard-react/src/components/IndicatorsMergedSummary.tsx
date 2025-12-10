import { useMemo, useEffect } from 'react';
import { useIndicatorsData, getSummaryData, getFinancialYearProgress } from '../hooks/useIndicatorsData';
import { conditionTargetMap, type TargetDetail } from '../data/targetMappings';
import { IndicatorsTargetCards } from './IndicatorsTargetCards';

interface IndicatorsMergedSummaryProps {
  conditions: string[];
}

const PERCENTAGE_MARKERS = [0, 20, 40, 60, 80, 100];

function ThresholdMarker({ position, color }: { position: number; color: string }) {
  return (
    <div
      className="absolute top-0 bottom-0 pointer-events-none z-10"
      style={{ left: `${String(position)}%`, width: 0 }}
    >
      <div
        className={`absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-${color}-500`}
      />
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-${color}-500 rotate-45`}
      />
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-${color}-500 rotate-45`}
      />
    </div>
  );
}

export function IndicatorsMergedSummary({ conditions }: IndicatorsMergedSummaryProps) {
  const { expandedSections, toggleAccordion, initializeAccordionSections } = useIndicatorsData();
  const yearProgress = useMemo(() => getFinancialYearProgress(), []);

  const conditionsWithTargets = useMemo(() => {
    return conditions
      .map((condition) => {
        const data = conditionTargetMap[condition];
        if (data?.targetDetails && data.targetDetails.length > 0) {
          return { condition, ...data };
        }
        return null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [conditions]);

  useEffect(() => {
    for (const conditionInfo of conditionsWithTargets) {
      if (conditionInfo.targetDetails) {
        const targetCodes = conditionInfo.targetDetails.map((t) => t.code);
        initializeAccordionSections(targetCodes);
      }
    }
  }, [conditionsWithTargets, initializeAccordionSections]);

  const getExpectedAchievementForTarget = (target: TargetDetail): number => {
    const maxThreshold = target.maxThreshold;
    return yearProgress * maxThreshold;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Summary</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View in Planner
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-600 rounded mr-2" />
          <span className="text-sm text-gray-700">Clinically complete</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 rounded mr-2" />
          <span className="text-sm text-gray-700">Exception reported - invited</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-600 rounded mr-2" />
          <span className="text-sm text-gray-700">Incomplete</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 border-l-2 border-dashed border-red-500 mr-2" />
          <span className="text-sm text-gray-700">Min achievement</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 border-l-2 border-dashed border-purple-500 mr-2" />
          <span className="text-sm text-gray-700">Expected by today</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 border-l-2 border-dashed border-green-500 mr-2" />
          <span className="text-sm text-gray-700">Max achievement</span>
        </div>
      </div>

      {/* Conditions with their target bars */}
      <div className="space-y-8">
        {conditionsWithTargets.map((conditionInfo) => (
          <div key={conditionInfo.condition}>
            {/* Condition Title */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {conditionInfo.title} targets
              </h4>

              {/* Prevalence Card for Hypertension */}
              {conditionInfo.showPrevalence && (
                <div className="mt-3 mb-4">
                  <div className="bg-gray-50 rounded-md px-3 py-2 border border-gray-200 inline-block">
                    <div className="text-xs text-gray-600 mb-1">
                      {conditionInfo.title} Register Prevalence
                    </div>
                    <div className="flex items-baseline gap-3">
                      <div>
                        <span className="text-xs text-gray-500">Current:</span>
                        <span className="text-sm font-bold text-gray-900 ml-1">10.33%</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Sub ICB:</span>
                        <span className="text-sm font-bold text-gray-900 ml-1">14.17%</span>
                        <span className="text-xs text-red-600 ml-1">(-3.84%)</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">National:</span>
                        <span className="text-sm font-bold text-gray-900 ml-1">14.8%</span>
                        <span className="text-xs text-red-600 ml-1">(-4.47%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Target Bars */}
            <div className="space-y-6">
              {conditionInfo.targetDetails.map((target) => {
                const summary = getSummaryData(target.code);
                const isExpanded = expandedSections[target.code] ?? false;
                const expectedAchievement = getExpectedAchievementForTarget(target);

                return (
                  <div key={target.code}>
                    <div className="flex items-center mb-2">
                      <button
                        onClick={() => { toggleAccordion(target.code); }}
                        className="flex items-center text-sm font-medium text-gray-900 w-24 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className={`w-4 h-4 mr-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {target.code}
                      </button>

                      <div
                        className="flex-1 relative bg-gray-100 rounded overflow-visible cursor-pointer"
                        style={{ paddingBottom: '30px' }}
                        onClick={() => { toggleAccordion(target.code); }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            toggleAccordion(target.code);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        {/* Bar container */}
                        <div className="relative h-8">
                          {/* Complete */}
                          <div
                            className="absolute left-0 top-0 h-full bg-green-600 flex items-center justify-center"
                            style={{ width: `${String(summary.complete)}%` }}
                          >
                            <span className="text-xs font-semibold text-white">
                              {summary.complete}% ({summary.completePatients})
                            </span>
                          </div>

                          {/* Exception reported - invited */}
                          <div
                            className="absolute h-full bg-gray-300 flex items-center justify-center"
                            style={{
                              left: `${String(summary.complete)}%`,
                              width: `${String(summary.exceptionInvited)}%`,
                            }}
                          >
                            <span className="text-xs font-semibold text-gray-700">
                              {summary.exceptionInvited}% ({summary.exceptionInvitedPatients})
                            </span>
                          </div>

                          {/* Incomplete */}
                          <div
                            className="absolute right-0 top-0 h-full bg-blue-600 flex items-center justify-center"
                            style={{ width: `${String(summary.incomplete)}%` }}
                          >
                            <span className="text-xs font-semibold text-white">
                              {summary.incomplete}% ({summary.incompletePatients})
                            </span>
                          </div>

                          {/* Min Achievement Threshold - Red */}
                          <ThresholdMarker position={target.minThreshold} color="red" />

                          {/* Max Achievement Threshold - Green */}
                          <ThresholdMarker position={target.maxThreshold} color="green" />

                          {/* Expected by Today - Purple */}
                          <ThresholdMarker position={expectedAchievement} color="purple" />
                        </div>

                        {/* X-axis */}
                        <div
                          className="absolute bottom-0 left-0 right-0"
                          style={{ height: '30px' }}
                        >
                          <div className="relative w-full h-full">
                            {PERCENTAGE_MARKERS.map((percent) => (
                              <div
                                key={percent}
                                className="absolute flex flex-col items-center"
                                style={{
                                  left: `${String(percent)}%`,
                                  transform: 'translateX(-50%)',
                                }}
                              >
                                <div className="w-0.5 h-2 bg-gray-400 mb-1" />
                                <span className="text-xs text-gray-600 font-medium">
                                  {percent}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Target Content */}
                    {isExpanded && (
                      <div className="mt-6 -mx-6 -mb-6">
                        <div className="bg-white border-t border-gray-200">
                          <IndicatorsTargetCards
                            condition={conditionInfo.condition}
                            targetCode={target.code}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
