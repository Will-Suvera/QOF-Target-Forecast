import { useState, useMemo, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { usePracticeData } from '../context/PracticeDataContext';
import { type TargetAreas, calculateSummaryData } from '../extracts/dataService';
import { getFinancialYearProgress } from '../hooks/useIndicatorsData';
import { IndicatorsTargetCards } from './IndicatorsTargetCards';

interface IndicatorsMergedSummaryProps {
  expandedAreas: TargetAreas[];
}

export function IndicatorsMergedSummary({ expandedAreas }: IndicatorsMergedSummaryProps) {
  const { getAreaData, getAllTargetsForArea } = usePracticeData();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const yearProgress = useMemo(() => getFinancialYearProgress(), []);

  // Initialize accordion state for all targets
  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    for (const area of expandedAreas) {
      const targets = getAllTargetsForArea(area);
      for (const { code } of targets) {
        if (!(code in expandedSections)) {
          initialState[code] = false;
        }
      }
    }
    if (Object.keys(initialState).length > 0) {
      setExpandedSections((prev) => ({ ...prev, ...initialState }));
    }
  }, [expandedAreas, getAllTargetsForArea, expandedSections]);

  const toggleAccordion = (code: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  if (expandedAreas.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* Header - Not in a card */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">Summary</h3>
        <button className="bg-action text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-action-hover flex items-center">
          <Eye className="w-4 h-4 mr-2" />
          View in Planner
        </button>
      </div>

      {/* Shared Legend - Not in a card */}
      <div id="summary-legend" className="flex flex-wrap items-center gap-4 mb-6 px-4 py-2 bg-glass border border-gray-200 rounded-full">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-600 rounded mr-2" />
          <span className="text-sm text-gray-700">Clinically complete</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 rounded mr-2" />
          <span className="text-sm text-gray-700">Exception reported - invited</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-action rounded mr-2" />
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

      {/* All Areas - Each in its own card */}
      <div className="space-y-6">
        {expandedAreas.map((areaKey) => {
          const areaData = getAreaData(areaKey);
          const targets = getAllTargetsForArea(areaKey);

          if (!areaData || targets.length === 0) {
            return null;
          }

          return (
            <div key={areaKey} className="card-glass p-6">
              {/* Area Title */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 leading-tight">
                  {areaData.areaName}
                </h4>

                {/* Prevalence Section */}
                <h5 className="text-sm font-semibold text-gray-700 mt-4 mb-2">Prevalence</h5>
                <div className="mb-4">
                  <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Practice</div>
                        <div className="text-sm font-bold text-gray-900">{(areaData.prevalence * 100).toFixed(2)}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">National Average</div>
                        <div className="text-sm font-bold text-gray-900">{(areaData.nationalAveragePrevalence * 100).toFixed(2)}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Sub ICB Top Quartile</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-bold text-gray-900">{(areaData.subIcbTopQuartilePrevalence * 100).toFixed(2)}%</span>
                          <span className={`text-xs font-medium ${areaData.subIcbTopQuartilePrevalence > areaData.prevalence ? 'text-red-600' : 'text-green-600'}`}>
                            {areaData.prevalence > 0 ? Math.abs(((areaData.subIcbTopQuartilePrevalence - areaData.prevalence) / areaData.prevalence) * 100).toFixed(0) : 0}% {areaData.subIcbTopQuartilePrevalence > areaData.prevalence ? 'higher' : 'lower'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Missed income from low prevalence</div>
                        <div className="text-sm font-bold text-orange-600">£{areaData.earningsByIncreasingPrevalence.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resource Planning Section */}
                <h5 className="text-sm font-semibold text-gray-700 mt-4 mb-2">Resource Planning</h5>
                <div className="mb-4">
                  <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Patients on register</div>
                        <div className="text-sm font-bold text-gray-900">{areaData.listSize.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Avg appts per patient</div>
                        <div className="text-sm font-bold text-gray-900">{areaData.avgAppointmentsPerPatient}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Traditional cost</div>
                        <div className="text-sm font-bold text-gray-900">£{(areaData.listSize * areaData.traditionalCostPerPatient).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Suvera cost</div>
                        <div className="text-sm font-bold text-gray-900">£{(areaData.listSize * areaData.suveraCostPerPatient).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Potential savings</div>
                        <div className="text-sm font-bold text-green-600">£{(areaData.listSize * (areaData.traditionalCostPerPatient - areaData.suveraCostPerPatient)).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Targets Section */}
              <h5 className="text-sm font-semibold text-gray-700 mb-3">Targets</h5>
              <div className="space-y-4">
                {targets.map(({ code, data: targetData }) => {
                  const summaryData = calculateSummaryData(targetData);
                  const minThreshold = targetData.minThreshold * 100;
                  const maxThreshold = targetData.maxThreshold * 100;
                  const expectedAchievement = yearProgress * maxThreshold;
                  const isExpanded = expandedSections[code] ?? false;

                  return (
                    <div key={code} className="card-glass p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => { toggleAccordion(code); }}>
                      {/* Clickable Header */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleAccordion(code); }}
                        className="w-full flex items-center justify-between mb-3 group"
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${code}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 bg-[#E6EBF2] border border-gray-200 rounded-md px-2 py-1">{code}</span>
                          <span className="text-xs text-gray-500">({targetData.description})</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isExpanded ? (
                            <EyeOff className="w-4 h-4 text-gray-500 group-hover:text-action transition-colors" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-500 group-hover:text-action transition-colors" />
                          )}
                          <span className="text-sm text-gray-500 group-hover:text-action transition-colors">
                            {isExpanded ? 'Hide details' : 'View details'}
                          </span>
                        </div>
                      </button>

                      <div
                        className="relative rounded overflow-visible"
                        style={{ paddingBottom: '30px' }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            toggleAccordion(code);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${code}`}
                      >
                          {/* Bar container */}
                          <div className="relative h-8 rounded-md overflow-hidden">
                            {/* Complete */}
                            <div
                              className="absolute left-0 top-0 h-full bg-green-600 flex items-center justify-center rounded-l-md"
                              style={{ width: `${summaryData.complete}%` }}
                            >
                              <span className="text-xs font-semibold text-white">
                                {Math.round(summaryData.complete * 10) / 10}% ({summaryData.completePatients})
                              </span>
                            </div>

                            {/* Exception reported - invited */}
                            <div
                              className="absolute h-full bg-gray-300 flex items-center justify-center"
                              style={{
                                left: `${summaryData.complete}%`,
                                width: `${summaryData.exceptionInvited}%`,
                              }}
                            >
                              <span className="text-xs font-semibold text-gray-700">
                                {Math.round(summaryData.exceptionInvited * 10) / 10}% ({summaryData.exceptionInvitedPatients})
                              </span>
                            </div>

                            {/* Incomplete */}
                            <div
                              className="absolute right-0 top-0 h-full bg-action flex items-center justify-center rounded-r-md"
                              style={{ width: `${summaryData.incomplete}%` }}
                            >
                              <span className="text-xs font-semibold text-white">
                                {Math.round(summaryData.incomplete * 10) / 10}% ({summaryData.incompletePatients})
                              </span>
                            </div>

                            {/* Min Achievement Threshold - Red */}
                            <div
                              className="absolute top-0 bottom-0 pointer-events-none z-10"
                              style={{ left: `${minThreshold}%`, width: 0 }}
                            >
                              <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-red-500" />
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-red-500 rotate-45" />
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-red-500 rotate-45" />
                            </div>

                            {/* Max Achievement Threshold - Green */}
                            <div
                              className="absolute top-0 bottom-0 pointer-events-none z-10"
                              style={{ left: `${maxThreshold}%`, width: 0 }}
                            >
                              <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-green-500" />
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-green-500 rotate-45" />
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-green-500 rotate-45" />
                            </div>

                            {/* Expected by Today - Purple */}
                            <div
                              className="absolute top-0 bottom-0 pointer-events-none z-10"
                              style={{ left: `${expectedAchievement}%`, width: 0 }}
                            >
                              <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-purple-500" />
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-purple-500 rotate-45" />
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-purple-500 rotate-45" />
                            </div>
                          </div>

                          {/* X-axis */}
                          <div className="absolute bottom-0 left-0 right-0" style={{ height: '30px' }}>
                            <div className="relative w-full h-full">
                              {[0, 20, 40, 60, 80, 100].map((percent) => {
                                const isFirst = percent === 0;
                                const isLast = percent === 100;
                                return (
                                  <div
                                    key={percent}
                                    className={`absolute flex flex-col ${isFirst ? 'items-start' : isLast ? 'items-end' : 'items-center'}`}
                                    style={{
                                      ...(isFirst ? { left: 0 } :
                                        isLast ? { right: 0 } :
                                        { left: `${percent}%`, transform: 'translateX(-50%)' })
                                    }}
                                  >
                                    <div className="w-0.5 h-2 bg-white mb-1" />
                                    <span className="text-xs text-gray-600 font-medium">{percent}%</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                      {/* Expanded Target Content */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <IndicatorsTargetCards targetCode={code} targetData={targetData} earningsPerPoint={areaData.earningsPerPoint} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
