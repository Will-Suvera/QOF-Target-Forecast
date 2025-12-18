import { useState, useMemo, useEffect } from 'react';
import { Eye, ChevronRight } from 'lucide-react';
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
    <div className="card-glass p-6 mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">Summary</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
          <Eye className="w-4 h-4 mr-2" />
          View in Planner
        </button>
      </div>

      {/* Shared Legend */}
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

      {/* All Areas and their targets */}
      <div className="space-y-8">
        {expandedAreas.map((areaKey) => {
          const areaData = getAreaData(areaKey);
          const targets = getAllTargetsForArea(areaKey);

          if (!areaData || targets.length === 0) {
            return null;
          }

          return (
            <div key={areaKey}>
              {/* Area Title */}
              <div className="mb-4">
                <h4 className="text-base font-semibold text-gray-900 leading-tight">
                  {areaData.areaName}
                </h4>

                {/* Prevalence Card */}
                <div className="mt-3 mb-4">
                  <div className="bg-gray-50 rounded-md px-3 py-2 border border-gray-200 inline-block">
                    <div className="text-xs text-gray-600 mb-1">
                      {areaData.areaName} Register Prevalence
                    </div>
                    <div className="flex items-baseline gap-3">
                      <div>
                        <span className="text-xs text-gray-500">Current:</span>
                        <span className="text-sm font-bold text-gray-900 ml-1">
                          {(areaData.prevalence * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Sub ICB:</span>
                        <span className="text-sm font-bold text-gray-900 ml-1">
                          {(areaData.subIcbTopQuartilePrevalence * 100).toFixed(2)}%
                        </span>
                        <span className={`text-xs ml-1 ${areaData.prevalence < areaData.subIcbTopQuartilePrevalence ? 'text-red-600' : 'text-green-600'}`}>
                          ({((areaData.prevalence - areaData.subIcbTopQuartilePrevalence) * 100).toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Bars */}
              <div className="space-y-6">
                {targets.map(({ code, data: targetData }) => {
                  const summaryData = calculateSummaryData(targetData);
                  const minThreshold = targetData.minThreshold * 100;
                  const maxThreshold = targetData.maxThreshold * 100;
                  const expectedAchievement = yearProgress * maxThreshold;
                  const isExpanded = expandedSections[code] ?? false;

                  return (
                    <div key={code}>
                      <div className="flex items-center mb-2">
                        <button
                          onClick={() => { toggleAccordion(code); }}
                          className="flex items-center text-sm font-medium text-gray-900 w-24 hover:text-blue-600 transition-colors"
                        >
                          <ChevronRight
                            className={`w-4 h-4 mr-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                          />
                          {code}
                        </button>

                        <div
                          className="flex-1 relative bg-gray-100 rounded overflow-visible cursor-pointer"
                          style={{ paddingBottom: '30px' }}
                          onClick={() => { toggleAccordion(code); }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              toggleAccordion(code);
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
                              className="absolute right-0 top-0 h-full bg-blue-600 flex items-center justify-center"
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
                              {[0, 20, 40, 60, 80, 100].map((percent) => (
                                <div
                                  key={percent}
                                  className="absolute flex flex-col items-center"
                                  style={{ left: `${percent}%`, transform: 'translateX(-50%)' }}
                                >
                                  <div className="w-0.5 h-2 bg-gray-400 mb-1" />
                                  <span className="text-xs text-gray-600 font-medium">{percent}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Target Content */}
                      {isExpanded && (
                        <div className="mt-6 -mx-6 -mb-6">
                          <div className="bg-white/50 border-t border-glass">
                            <IndicatorsTargetCards targetCode={code} targetData={targetData} />
                          </div>
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
