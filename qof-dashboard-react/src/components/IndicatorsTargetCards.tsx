import { useMemo } from 'react';
import { Eye, AlertTriangle } from 'lucide-react';
import { getSummaryData, getLastYearSummaryData, getFinancialYearProgress } from '../hooks/useIndicatorsData';
import { type ViewMode } from '../hooks/useForecastData';

interface IndicatorsTargetCardsProps {
  condition: string;
  targetCode: string;
  viewMode?: ViewMode;
}

// Hardcoded data for HYP008 November comparison
const HYP008_NOVEMBER_DATA = {
  registerSize: 934,
  clinicalCompletion: 485,
  invitedException: 103,
  notYetInvited: 346,
};

// Configuration for different indicators
const INDICATOR_CONFIG: Record<string, { minThreshold: number; maxThreshold: number; maxPoints: number }> = {
  HYP008: { minThreshold: 40, maxThreshold: 85, maxPoints: 38 },
  HYP009: { minThreshold: 40, maxThreshold: 85, maxPoints: 14 },
};

const REGISTER_SIZES: Record<string, number> = {
  HYP008: 683,
  HYP009: 234,
};

const ACTUAL_COMPLETIONS: Record<string, number> = {
  HYP008: 52,
  HYP009: 59,
};

const EXCEPTION_RATES: Record<string, number> = {
  HYP008: 8,
  HYP009: 4.9,
};

const MAX_ACHIEVEMENTS: Record<string, number> = {
  HYP008: 85,
  HYP009: 80,
};

function getChangeClass(change: number): string {
  if (change > 0) return 'text-green-600 font-semibold';
  if (change < 0) return 'text-red-600 font-semibold';
  return 'text-gray-600';
}

function getNotYetInvitedChangeClass(change: number): string {
  if (change < 0) return 'text-green-600 font-semibold';
  if (change > 0) return 'text-red-600 font-semibold';
  return 'text-gray-600';
}

export function IndicatorsTargetCards({ condition: _condition, targetCode, viewMode = 'forecast' }: IndicatorsTargetCardsProps) {
  const summaryData = useMemo(() => {
    return viewMode === 'lastYear' 
      ? getLastYearSummaryData(targetCode)
      : getSummaryData(targetCode);
  }, [targetCode, viewMode]);
  const yearProgress = useMemo(() => getFinancialYearProgress(), []);

  // Helper calculations
  const getHYP008RegisterSize = () => summaryData.totalRegister;
  const getHYP008RegisterSizePrevious = () => HYP008_NOVEMBER_DATA.registerSize;
  const getHYP008RegisterSizeChange = () => getHYP008RegisterSize() - getHYP008RegisterSizePrevious();
  const getHYP008RegisterSizeChangePercent = () => {
    const previous = getHYP008RegisterSizePrevious();
    if (previous === 0) return 0;
    return Math.round((getHYP008RegisterSizeChange() / previous) * 100 * 10) / 10;
  };

  const getClinicalCompletionNumber = () => summaryData.completePatients;
  const getClinicalCompletionNumberPrevious = () =>
    targetCode === 'HYP008' ? HYP008_NOVEMBER_DATA.clinicalCompletion : 0;
  const getClinicalCompletionNumberChange = () =>
    getClinicalCompletionNumber() - getClinicalCompletionNumberPrevious();
  const getClinicalCompletionNumberChangePercent = () => {
    const previous = getClinicalCompletionNumberPrevious();
    if (previous === 0) return 0;
    return Math.round((getClinicalCompletionNumberChange() / previous) * 100 * 10) / 10;
  };

  const getInvitedExceptionNumber = () => summaryData.exceptionInvitedPatients;
  const getInvitedExceptionNumberPrevious = () =>
    targetCode === 'HYP008' ? HYP008_NOVEMBER_DATA.invitedException : 0;
  const getInvitedExceptionNumberChange = () =>
    getInvitedExceptionNumber() - getInvitedExceptionNumberPrevious();
  const getInvitedExceptionNumberChangePercent = () => {
    const previous = getInvitedExceptionNumberPrevious();
    if (previous === 0) return 0;
    return Math.round((getInvitedExceptionNumberChange() / previous) * 100 * 10) / 10;
  };

  const getNotYetInvitedNumber = () => summaryData.incompletePatients;
  const getNotYetInvitedNumberPrevious = () =>
    targetCode === 'HYP008' ? HYP008_NOVEMBER_DATA.notYetInvited : 0;
  const getNotYetInvitedNumberChange = () =>
    getNotYetInvitedNumber() - getNotYetInvitedNumberPrevious();
  const getNotYetInvitedNumberChangePercent = () => {
    const previous = getNotYetInvitedNumberPrevious();
    if (previous === 0) return 0;
    return Math.round((getNotYetInvitedNumberChange() / previous) * 100 * 10) / 10;
  };

  const getPatientNumbers = () => {
    const totalRegister = REGISTER_SIZES[targetCode] ?? 1000;
    const actualCompletion = ACTUAL_COMPLETIONS[targetCode] ?? 0;
    const completed = Math.round((actualCompletion / 100) * totalRegister);
    const remaining = totalRegister - completed;
    const maxAchievement = MAX_ACHIEVEMENTS[targetCode] ?? 85;
    const targetForMax = Math.round((maxAchievement / 100) * totalRegister);
    const requiredForMax = Math.max(0, targetForMax - completed);
    return { totalRegister, completed, remaining, requiredForMax };
  };

  const getClinicalCompletionPatients = () => {
    const { completed } = getPatientNumbers();
    return Math.round(0.92 * completed);
  };

  const getExceptionReportingPatients = () => {
    const totalRegister = REGISTER_SIZES[targetCode] ?? 683;
    const completionPercent = ACTUAL_COMPLETIONS[targetCode] ?? 52;
    const exceptionRate = EXCEPTION_RATES[targetCode] ?? 8;
    const completed = Math.round((completionPercent / 100) * totalRegister);
    return Math.round((exceptionRate / 100) * completed);
  };

  const getTargetProgress = () => {
    const { totalRegister } = getPatientNumbers();
    const clinicalCompleted = getClinicalCompletionPatients();
    const exceptionPatients = getExceptionReportingPatients();
    const totalCompleted = clinicalCompleted + exceptionPatients;
    const maxAchievement = MAX_ACHIEVEMENTS[targetCode] ?? 85;
    const targetPatients = Math.round((maxAchievement / 100) * totalRegister);
    if (targetPatients === 0) return 0;
    return (totalCompleted / targetPatients) * 100;
  };

  const getRemainingPatients = () => {
    const { totalRegister } = getPatientNumbers();
    const clinicalCompleted = getClinicalCompletionPatients();
    const exceptionPatients = getExceptionReportingPatients();
    return totalRegister - clinicalCompleted - exceptionPatients;
  };

  const getQOFPoints = () => {
    const config = INDICATOR_CONFIG[targetCode];
    if (!config) return 0;
    const achievement = getTargetProgress();
    if (achievement < config.minThreshold) return 0;
    if (achievement >= config.maxThreshold) return config.maxPoints;
    const points =
      1 +
      ((achievement - config.minThreshold) / (config.maxThreshold - config.minThreshold)) *
        (config.maxPoints - 1);
    return Math.round(points * 10) / 10;
  };

  const getMaxQOFPoints = () => INDICATOR_CONFIG[targetCode]?.maxPoints ?? 0;
  const getUnclaimedPoints = () => Math.max(0, getMaxQOFPoints() - getQOFPoints());
  const getRevenueLeftOnTable = () => getUnclaimedPoints() * 200;
  const getTraditionalCost = () => getRemainingPatients() * 45;
  const getSuveraCost = () => getRemainingPatients() * 28;
  const getPotentialSavings = () => getTraditionalCost() - getSuveraCost();
  const getSavingsPercentage = () => {
    const traditional = getTraditionalCost();
    if (traditional === 0) return 0;
    return Math.round((getPotentialSavings() / traditional) * 100);
  };

  const getLastYearClinicalAtThisTimePercent = () => {
    if (targetCode === 'HYP008') {
      const lastYearTotalPercent = 62.52;
      return Math.round(yearProgress * lastYearTotalPercent * 100) / 100;
    }
    return 0;
  };

  const getLastYearClinicalAtThisTime = () => {
    if (targetCode === 'HYP008') {
      const lastYearTotalPercent = 62.52;
      const registerSize = getHYP008RegisterSize();
      const lastYearTotalPatients = Math.round((lastYearTotalPercent / 100) * registerSize);
      return Math.round(yearProgress * lastYearTotalPatients);
    }
    return 0;
  };

  const getLastYearClinicalTotal = () => {
    if (targetCode === 'HYP008') {
      const lastYearPercent = 62.52;
      const registerSize = getHYP008RegisterSize();
      return Math.round((lastYearPercent / 100) * registerSize);
    }
    return 0;
  };

  const getSubICBClinicalCompletionAverage = () => (targetCode === 'HYP008' ? 68.06 : 0);
  const getSubICBClinicalCompletionAtThisTime = () => {
    if (targetCode === 'HYP008') {
      return Math.round(yearProgress * 68.06 * 100) / 100;
    }
    return 0;
  };

  // Exception Reporting helpers for HYP008
  const getLastYearExceptionAtThisTimePercent = () => {
    if (targetCode === 'HYP008') {
      const lastYearTotalPercent = 19.72;
      return Math.round(yearProgress * lastYearTotalPercent * 100) / 100;
    }
    return 0;
  };

  const getLastYearExceptionAtThisTime = () => {
    if (targetCode === 'HYP008') {
      const lastYearTotalPercent = 19.72;
      const registerSize = getHYP008RegisterSize();
      const lastYearTotalPatients = Math.round((lastYearTotalPercent / 100) * registerSize);
      return Math.round(yearProgress * lastYearTotalPatients);
    }
    return 0;
  };

  const getLastYearExceptionTotal = () => {
    if (targetCode === 'HYP008') {
      const lastYearPercent = 19.72;
      const registerSize = getHYP008RegisterSize();
      return Math.round((lastYearPercent / 100) * registerSize);
    }
    return 0;
  };

  const getSubICBExceptionReportingAtThisTime = () => {
    if (targetCode === 'HYP008') {
      return Math.round(yearProgress * 12.75 * 100) / 100;
    }
    return 0;
  };

  const getSubICBExceptionReportingAverage = () => (targetCode === 'HYP008' ? 12.75 : 0);

  const targetProgress = getTargetProgress();
  const { totalRegister } = getPatientNumbers();

  return (
    <div className="p-6">
      {/* Target Header */}
      {targetCode === 'HYP008' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">QOF_HYP008</h3>
          <p className="text-sm text-gray-600">
            The percentage of patients aged 79 years or under with hypertension in whom the last
            blood pressure reading (measured in the preceding 12 months) is 140/90 mmHg or less (or
            equivalent home blood pressure reading)
          </p>
        </div>
      )}

      {targetCode === 'HYP009' && (
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">QOF_HYP009</h3>
            <p className="text-sm text-gray-600">
              The percentage of patients aged 80 years or over with hypertension in whom the last
              blood pressure reading (measured in the preceding 12 months) is 150/90 mmHg or less
              (or equivalent home blood pressure reading)
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            View in Planner
          </button>
        </div>
      )}

      {/* Target Achievement Progress and Revenue Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Target Achievement Progress */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Target Achievement Progress</h4>

          {targetCode === 'HYP008' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* HYP008 Register Size */}
              <div className="bg-white/50 border border-glass rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">HYP008 Register Size</div>
                <div className="text-2xl font-bold text-gray-900 mb-3">{getHYP008RegisterSize()}</div>
                <div className="text-xs text-gray-600">
                  <div className="flex items-center justify-between mb-1">
                    <span>Nov 1st:</span>
                    <span>{getHYP008RegisterSizePrevious()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Change:</span>
                    <span className={getChangeClass(getHYP008RegisterSizeChange())}>
                      {getHYP008RegisterSizeChange() > 0 ? '+' : ''}
                      {getHYP008RegisterSizeChange()} ({getHYP008RegisterSizeChangePercent() > 0 ? '+' : ''}
                      {getHYP008RegisterSizeChangePercent()}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Clinical Completion Number */}
              <div className="bg-white/50 border border-glass rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Clinical Completion Number</div>
                <div className="text-2xl font-bold text-gray-900 mb-3">{getClinicalCompletionNumber()}</div>
                <div className="text-xs text-gray-600">
                  <div className="flex items-center justify-between mb-1">
                    <span>Nov 1st:</span>
                    <span>{getClinicalCompletionNumberPrevious()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Change:</span>
                    <span className={getChangeClass(getClinicalCompletionNumberChange())}>
                      {getClinicalCompletionNumberChange() > 0 ? '+' : ''}
                      {getClinicalCompletionNumberChange()} (
                      {getClinicalCompletionNumberChangePercent() > 0 ? '+' : ''}
                      {getClinicalCompletionNumberChangePercent()}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Invited Exception Reporting Number */}
              <div className="bg-white/50 border border-glass rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Invited Exception Reporting Number
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">{getInvitedExceptionNumber()}</div>
                <div className="text-xs text-gray-600">
                  <div className="flex items-center justify-between mb-1">
                    <span>Nov 1st:</span>
                    <span>{getInvitedExceptionNumberPrevious()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Change:</span>
                    <span className={getChangeClass(getInvitedExceptionNumberChange())}>
                      {getInvitedExceptionNumberChange() > 0 ? '+' : ''}
                      {getInvitedExceptionNumberChange()} (
                      {getInvitedExceptionNumberChangePercent() > 0 ? '+' : ''}
                      {getInvitedExceptionNumberChangePercent()}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Not Yet Invited Number */}
              <div className="bg-white/50 border border-glass rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Not Yet Invited Number</div>
                <div className="text-2xl font-bold text-gray-900 mb-3">{getNotYetInvitedNumber()}</div>
                <div className="text-xs text-gray-600">
                  <div className="flex items-center justify-between mb-1">
                    <span>Nov 1st:</span>
                    <span>{getNotYetInvitedNumberPrevious()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Change:</span>
                    <span className={getNotYetInvitedChangeClass(getNotYetInvitedNumberChange())}>
                      {getNotYetInvitedNumberChange() > 0 ? '+' : ''}
                      {getNotYetInvitedNumberChange()} (
                      {getNotYetInvitedNumberChangePercent() > 0 ? '+' : ''}
                      {getNotYetInvitedNumberChangePercent()}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {targetCode === 'HYP009' && (
            <div className="flex flex-col lg:flex-row items-start gap-6">
              {/* Donut Chart */}
              <div className="flex items-center flex-shrink-0">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      strokeDasharray={`${(targetProgress / 100) * 351.86} 351.86`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round(targetProgress)}%
                      </div>
                      <div className="text-xs text-gray-600">of target</div>
                      <div className="text-xs font-semibold text-blue-600 mt-1">
                        {getQOFPoints()} / {getMaxQOFPoints()} points
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Breakdown */}
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="text-xs font-medium text-gray-700">Clinical</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {getClinicalCompletionPatients().toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">
                      {Math.round((getClinicalCompletionPatients() / totalRegister) * 100 * 10) / 10}%
                      of target
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs font-medium text-gray-700">Exception</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {getExceptionReportingPatients().toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">
                      {Math.round((getExceptionReportingPatients() / totalRegister) * 100 * 10) / 10}%
                      of target
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <span className="text-xs font-medium text-gray-700">Remaining</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {getRemainingPatients().toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">
                      {Math.round((getRemainingPatients() / totalRegister) * 100 * 10) / 10}% to go
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Revenue Left on Table */}
        <div className="card-glass p-6">
          <h4 className="text-base font-semibold text-gray-900 leading-tight mb-4">Revenue Left on Table</h4>
          <div className="text-4xl font-bold text-gray-900 mb-4">
            £{getRevenueLeftOnTable().toLocaleString()}
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-orange-800">
                  {getUnclaimedPoints()} unclaimed QOF points from {getRemainingPatients()} patients
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/50 border border-glass rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">Unclaimed Points</div>
              <div className="text-xl font-bold text-gray-900">{getUnclaimedPoints()}</div>
            </div>
            <div className="bg-white/50 border border-glass rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">Patients Remaining</div>
              <div className="text-xl font-bold text-gray-900">{getRemainingPatients()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical, Exception, and Resource Planning Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Clinical Completion Analysis */}
        <div className="card-glass p-6">
          <h4 className="text-base font-semibold text-gray-900 leading-tight mb-1">Clinical Completion Analysis</h4>
          <p className="text-sm text-gray-600 mb-4">Patients clinically complete</p>

          {targetCode === 'HYP008' && (
            <>
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Current</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getClinicalCompletionNumber()} (54.4%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div className="bg-blue-600 h-6 rounded-full" style={{ width: '54.4%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Last Year at this time of year
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getLastYearClinicalAtThisTime()} ({getLastYearClinicalAtThisTimePercent()}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-gray-400 h-6 rounded-full"
                      style={{ width: `${String(getLastYearClinicalAtThisTimePercent())}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Last Year Total</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getLastYearClinicalTotal()} (62.52%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div className="bg-gray-400 h-6 rounded-full" style={{ width: '62.52%' }} />
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Sub ICB Completion at this time of year
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getSubICBClinicalCompletionAtThisTime()}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-purple-500 h-6 rounded-full"
                      style={{ width: `${String(getSubICBClinicalCompletionAtThisTime())}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Sub ICB Total Completion</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getSubICBClinicalCompletionAverage()}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-purple-500 h-6 rounded-full"
                      style={{ width: `${String(getSubICBClinicalCompletionAverage())}%` }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Exception Reporting Analysis */}
        <div className="card-glass p-6">
          <h4 className="text-base font-semibold text-gray-900 leading-tight mb-1">Exception Reporting Analysis</h4>
          <p className="text-sm text-gray-600 mb-4">Patients exception reported</p>

          {targetCode === 'HYP008' && (
            <>
              <div className="space-y-3 mb-4">
                {/* Current */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Current</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getInvitedExceptionNumber()} ({summaryData.exceptionInvited}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-green-500 h-6 rounded-full"
                      style={{ width: `${String(summaryData.exceptionInvited)}%` }}
                    />
                  </div>
                </div>

                {/* Last Year at this time of year */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Last Year at this time of year</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getLastYearExceptionAtThisTime()} ({getLastYearExceptionAtThisTimePercent()}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-gray-400 h-6 rounded-full"
                      style={{ width: `${String(getLastYearExceptionAtThisTimePercent())}%` }}
                    />
                  </div>
                </div>

                {/* Last Year Total */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Last Year Total</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getLastYearExceptionTotal()} (19.72%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div className="bg-gray-400 h-6 rounded-full" style={{ width: '19.72%' }} />
                  </div>
                </div>
              </div>

              {/* Sub ICB Comparison Bars */}
              <div className="space-y-3 mb-4">
                {/* Sub ICB Exception Reporting at this time of year */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Sub ICB Exception Reporting at this time of year
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getSubICBExceptionReportingAtThisTime()}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-purple-500 h-6 rounded-full"
                      style={{ width: `${String(getSubICBExceptionReportingAtThisTime())}%` }}
                    />
                  </div>
                </div>

                {/* Sub ICB Total Exception Reporting */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Sub ICB Total Exception Reporting</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getSubICBExceptionReportingAverage()}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-purple-500 h-6 rounded-full"
                      style={{ width: `${String(getSubICBExceptionReportingAverage())}%` }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {targetCode !== 'HYP008' && (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Current</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {getExceptionReportingPatients().toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-green-500 h-6 rounded-full"
                    style={{
                      width: `${String(Math.min((getExceptionReportingPatients() / totalRegister) * 100, 100))}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resource Planning */}
        <div className="card-glass p-6">
          <h4 className="text-base font-semibold text-gray-900 leading-tight mb-4">Resource Planning</h4>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {getRemainingPatients().toLocaleString()} appointments
          </div>
          <div className="text-sm text-gray-600 mb-6">needed to reach 100% clinical completion</div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Traditional Cost:</span>
              <span className="text-lg font-semibold text-gray-900">
                £{getTraditionalCost().toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Suvera Cost ★:</span>
              <span className="text-lg font-semibold text-green-600">
                £{getSuveraCost().toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-green-800 mb-1">Potential Savings:</div>
            <div className="text-2xl font-bold text-green-600">
              £{getPotentialSavings().toLocaleString()}
            </div>
            <div className="text-xs text-green-700 mt-1">
              Save {getSavingsPercentage()}% with Suvera virtual clinic
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
