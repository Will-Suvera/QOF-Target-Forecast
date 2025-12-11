import { useState, useMemo, useEffect } from 'react';
import { getSummaryData, getFinancialYearProgress } from '../hooks/useIndicatorsData';
import { IndicatorsTargetCards } from './IndicatorsTargetCards';

interface IndicatorsHypertensionSummaryProps {
  condition: string;
}

interface TargetDetail {
  code: string;
  qofCode: string;
  minThreshold: number;
  maxThreshold: number;
  description: string;
}

interface ConditionData {
  title: string;
  targetDetails: TargetDetail[];
  showPrevalence: boolean;
}

const conditionDataMap: Record<string, ConditionData> = {
  hypertension: {
    title: 'Hypertension',
    targetDetails: [
      {
        code: 'HYP008',
        qofCode: 'QOF_HYP008',
        minThreshold: 40,
        maxThreshold: 85,
        description:
          'The percentage of patients aged 79 years or under with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 140/90 mmHg or less (or equivalent home blood pressure reading)',
      },
      {
        code: 'HYP009',
        qofCode: 'QOF_HYP009',
        minThreshold: 40,
        maxThreshold: 85,
        description:
          'The percentage of patients aged 80 years or over with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 150/90 mmHg or less (or equivalent home blood pressure reading)',
      },
    ],
    showPrevalence: true,
  },
  cholesterol: {
    title: 'Cholesterol',
    targetDetails: [
      {
        code: 'CHOL003',
        qofCode: 'QOF_CHOL003',
        minThreshold: 70,
        maxThreshold: 95,
        description: 'Cholesterol management target CHOL003',
      },
      {
        code: 'CHOL004',
        qofCode: 'QOF_CHOL004',
        minThreshold: 20,
        maxThreshold: 50,
        description: 'Cholesterol management target CHOL004',
      },
    ],
    showPrevalence: false,
  },
  asthma: {
    title: 'Asthma',
    targetDetails: [
      {
        code: 'AST007',
        qofCode: 'QOF_AST007',
        minThreshold: 45,
        maxThreshold: 70,
        description: 'Asthma management target AST007',
      },
      {
        code: 'AST012',
        qofCode: 'QOF_AST012',
        minThreshold: 45,
        maxThreshold: 80,
        description: 'Asthma management target AST012',
      },
    ],
    showPrevalence: false,
  },
  diabetes: {
    title: 'Diabetes',
    targetDetails: [
      { code: 'DM006', qofCode: 'QOF_DM006', minThreshold: 57, maxThreshold: 97, description: 'Diabetes management target DM006' },
      { code: 'DM012', qofCode: 'QOF_DM012', minThreshold: 50, maxThreshold: 90, description: 'Diabetes management target DM012' },
      { code: 'DM014', qofCode: 'QOF_DM014', minThreshold: 40, maxThreshold: 90, description: 'Diabetes management target DM014' },
      { code: 'DM020', qofCode: 'QOF_DM020', minThreshold: 37, maxThreshold: 75, description: 'Diabetes management target DM020' },
      { code: 'DM021', qofCode: 'QOF_DM021', minThreshold: 52, maxThreshold: 92, description: 'Diabetes management target DM021' },
      { code: 'DM034', qofCode: 'QOF_DM034', minThreshold: 50, maxThreshold: 90, description: 'Diabetes management target DM034' },
      { code: 'DM035', qofCode: 'QOF_DM035', minThreshold: 50, maxThreshold: 90, description: 'Diabetes management target DM035' },
      { code: 'DM036', qofCode: 'QOF_DM036', minThreshold: 38, maxThreshold: 90, description: 'Diabetes management target DM036' },
    ],
    showPrevalence: false,
  },
  copd: {
    title: 'COPD',
    targetDetails: [
      { code: 'COPD010', qofCode: 'QOF_COPD010', minThreshold: 50, maxThreshold: 90, description: 'COPD management target COPD010' },
    ],
    showPrevalence: false,
  },
  'heart-failure': {
    title: 'Heart Failure',
    targetDetails: [
      { code: 'HF003', qofCode: 'QOF_HF003', minThreshold: 60, maxThreshold: 92, description: 'Heart failure management target HF003' },
      { code: 'HF006', qofCode: 'QOF_HF006', minThreshold: 60, maxThreshold: 92, description: 'Heart failure management target HF006' },
      { code: 'HF007', qofCode: 'QOF_HF007', minThreshold: 50, maxThreshold: 90, description: 'Heart failure management target HF007' },
      { code: 'HF008', qofCode: 'QOF_HF008', minThreshold: 50, maxThreshold: 90, description: 'Heart failure management target HF008' },
    ],
    showPrevalence: false,
  },
  'atrial-fibrillation': {
    title: 'Atrial Fibrillation',
    targetDetails: [
      { code: 'AF006', qofCode: 'QOF_AF006', minThreshold: 40, maxThreshold: 90, description: 'Atrial fibrillation management target AF006' },
      { code: 'AF008', qofCode: 'QOF_AF008', minThreshold: 70, maxThreshold: 95, description: 'Atrial fibrillation management target AF008' },
    ],
    showPrevalence: false,
  },
  'coronary-heart-disease': {
    title: 'Coronary Heart Disease',
    targetDetails: [
      { code: 'CHD005', qofCode: 'QOF_CHD005', minThreshold: 56, maxThreshold: 96, description: 'Coronary heart disease management target CHD005' },
      { code: 'CHD015', qofCode: 'QOF_CHD015', minThreshold: 40, maxThreshold: 90, description: 'Coronary heart disease management target CHD015' },
      { code: 'CHD016', qofCode: 'QOF_CHD016', minThreshold: 46, maxThreshold: 90, description: 'Coronary heart disease management target CHD016' },
    ],
    showPrevalence: false,
  },
  dementia: {
    title: 'Dementia',
    targetDetails: [
      { code: 'DEM004', qofCode: 'QOF_DEM004', minThreshold: 35, maxThreshold: 70, description: 'Dementia care target DEM004' },
    ],
    showPrevalence: false,
  },
  'mental-health': {
    title: 'Mental Health',
    targetDetails: [
      { code: 'MH002', qofCode: 'QOF_MH002', minThreshold: 40, maxThreshold: 90, description: 'Mental health management target MH002' },
      { code: 'MH003', qofCode: 'QOF_MH003', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH003' },
      { code: 'MH006', qofCode: 'QOF_MH006', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH006' },
      { code: 'MH007', qofCode: 'QOF_MH007', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH007' },
      { code: 'MH011', qofCode: 'QOF_MH011', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH011' },
      { code: 'MH012', qofCode: 'QOF_MH012', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH012' },
    ],
    showPrevalence: false,
  },
  ndh: {
    title: 'NDH',
    targetDetails: [
      { code: 'NDH002', qofCode: 'QOF_NDH002', minThreshold: 50, maxThreshold: 90, description: 'Non-diabetic hyperglycaemia management target NDH002' },
    ],
    showPrevalence: false,
  },
  'stroke-tia': {
    title: 'Stroke and TIA',
    targetDetails: [
      { code: 'STIA007', qofCode: 'QOF_STIA007', minThreshold: 57, maxThreshold: 97, description: 'Stroke and TIA management target STIA007' },
      { code: 'STIA014', qofCode: 'QOF_STIA014', minThreshold: 40, maxThreshold: 90, description: 'Stroke and TIA management target STIA014' },
      { code: 'STIA015', qofCode: 'QOF_STIA015', minThreshold: 46, maxThreshold: 90, description: 'Stroke and TIA management target STIA015' },
    ],
    showPrevalence: false,
  },
};

export function IndicatorsHypertensionSummary({ condition }: IndicatorsHypertensionSummaryProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const conditionData = useMemo(() => {
    return conditionDataMap[condition] ?? conditionDataMap['hypertension'];
  }, [condition]);

  const yearProgress = useMemo(() => getFinancialYearProgress(), []);

  useEffect(() => {
    if (conditionData?.targetDetails) {
      const initialState: Record<string, boolean> = {};
      conditionData.targetDetails.forEach((t) => {
        initialState[t.code] = false;
      });
      setExpandedSections(initialState);
    }
  }, [conditionData]);

  const toggleAccordion = (code: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const getExpectedAchievementForTarget = (target: TargetDetail): number => {
    const maxThreshold = target.maxThreshold;
    return yearProgress * maxThreshold;
  };

  if (!conditionData?.targetDetails) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-6 relative">
        <h3 className="text-xl font-semibold text-gray-900">Summary</h3>

        {/* Condition Register Prevalence Card (Centered) - Only for Hypertension */}
        {conditionData.showPrevalence && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="bg-gray-50 rounded-md px-3 py-2 border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">{conditionData.title} Register Prevalence</div>
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

        {/* View in Planner Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

      {/* Legend - Bar Segments and Vertical Lines on same row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Bar Segment Labels */}
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

        {/* Vertical Lines Legend */}
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

      {/* Stacked Bar Chart */}
      <div className="space-y-6">
        {conditionData.targetDetails.map((target) => {
          const summaryData = getSummaryData(target.code);
          const expectedAchievement = getExpectedAchievementForTarget(target);

          return (
            <div key={target.code}>
              <div className="flex items-center mb-2">
                <button
                  onClick={() => {
                    toggleAccordion(target.code);
                  }}
                  className="flex items-center text-sm font-medium text-gray-900 w-24 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className={`w-4 h-4 mr-1 transition-transform ${expandedSections[target.code] === true ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {target.code}
                </button>
                <div
                  className="flex-1 relative bg-gray-100 rounded overflow-visible cursor-pointer"
                  style={{ paddingBottom: '30px' }}
                  onClick={() => {
                    toggleAccordion(target.code);
                  }}
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
                      style={{ width: `${String(summaryData.complete)}%` }}
                    >
                      <span className="text-xs font-semibold text-white">
                        {summaryData.complete}% ({summaryData.completePatients})
                      </span>
                    </div>
                    {/* Exception reported - invited */}
                    <div
                      className="absolute h-full bg-gray-300 flex items-center justify-center"
                      style={{
                        left: `${String(summaryData.complete)}%`,
                        width: `${String(summaryData.exceptionInvited)}%`,
                      }}
                    >
                      <span className="text-xs font-semibold text-gray-700">
                        {summaryData.exceptionInvited}% ({summaryData.exceptionInvitedPatients})
                      </span>
                    </div>
                    {/* Incomplete */}
                    <div
                      className="absolute right-0 top-0 h-full bg-blue-600 flex items-center justify-center"
                      style={{ width: `${String(summaryData.incomplete)}%` }}
                    >
                      <span className="text-xs font-semibold text-white">
                        {summaryData.incomplete}% ({summaryData.incompletePatients})
                      </span>
                    </div>

                    {/* Min Achievement Threshold - Red */}
                    <div
                      className="absolute top-0 bottom-0 pointer-events-none z-10"
                      style={{ left: `${String(target.minThreshold)}%`, width: 0 }}
                    >
                      <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-red-500" />
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-red-500 rotate-45" />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-red-500 rotate-45" />
                    </div>

                    {/* Max Achievement Threshold - Green */}
                    <div
                      className="absolute top-0 bottom-0 pointer-events-none z-10"
                      style={{ left: `${String(target.maxThreshold)}%`, width: 0 }}
                    >
                      <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-green-500" />
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-green-500 rotate-45" />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-green-500 rotate-45" />
                    </div>

                    {/* Expected by Today - Purple */}
                    <div
                      className="absolute top-0 bottom-0 pointer-events-none z-10"
                      style={{ left: `${String(expectedAchievement)}%`, width: 0 }}
                    >
                      <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-purple-500" />
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-purple-500 rotate-45" />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-purple-500 rotate-45" />
                    </div>
                  </div>

                  {/* X-axis for percentage complete */}
                  <div className="absolute bottom-0 left-0 right-0" style={{ height: '30px' }}>
                    <div className="relative w-full h-full">
                      {[0, 20, 40, 60, 80, 100].map((percent) => (
                        <div
                          key={percent}
                          className="absolute flex flex-col items-center"
                          style={{ left: `${String(percent)}%`, transform: 'translateX(-50%)' }}
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
              {expandedSections[target.code] === true && (
                <div className="mt-6 -mx-6 -mb-6">
                  <div className="bg-white border-t border-gray-200">
                    <IndicatorsTargetCards condition={condition} targetCode={target.code} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
