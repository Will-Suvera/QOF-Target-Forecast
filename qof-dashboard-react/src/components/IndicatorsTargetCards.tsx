import { useMemo } from 'react';
import { Eye } from 'lucide-react';
import { type TargetData, calculateSummaryData } from '../extracts/dataService';
import { getFinancialYearProgress } from '../hooks/useIndicatorsData';

interface IndicatorsTargetCardsProps {
  targetCode: string;
  targetData: TargetData;
}

export function IndicatorsTargetCards({ targetCode, targetData }: IndicatorsTargetCardsProps) {
  const summaryData = useMemo(() => calculateSummaryData(targetData), [targetData]);
  const yearProgress = useMemo(() => getFinancialYearProgress(), []);

  // Values from targetData
  const totalRegister = targetData.denominator;
  const maxThreshold = targetData.maxThreshold * 100;

  // Patient counts from summary
  const clinicalCompletionPatients = summaryData.completePatients;
  const exceptionPatients = summaryData.exceptionInvitedPatients;
  const remainingPatients = summaryData.incompletePatients;

  // Percentages
  const clinicalCompletionPercent = summaryData.complete;
  const exceptionPercent = summaryData.exceptionInvited;

  // Cost calculations from targetData
  const traditionalCost = targetData.traditionalCostForIncompletePatients;
  const suveraCost = targetData.suveraCostForIncompletePatients;
  const potentialSavings = traditionalCost - suveraCost;
  const savingsPercentage = traditionalCost > 0 ? Math.round((potentialSavings / traditionalCost) * 100) : 0;

  // Progress comparison helpers (using year progress for expected values)
  const expectedAtThisTime = Math.round(maxThreshold * yearProgress * 10) / 10;

  // Simulated "last year" and "Sub ICB" data for comparison bars
  // In a real app, this would come from the data service
  const lastYearCompletionPercent = Math.round(clinicalCompletionPercent * 0.85 * 10) / 10;
  const lastYearAtThisTimePercent = Math.round(lastYearCompletionPercent * yearProgress * 10) / 10;
  const subICBCompletionPercent = Math.round(clinicalCompletionPercent * 1.1 * 10) / 10;
  const subICBAtThisTimePercent = Math.round(subICBCompletionPercent * yearProgress * 10) / 10;

  const lastYearExceptionPercent = Math.round(exceptionPercent * 0.9 * 10) / 10;
  const lastYearExceptionAtThisTimePercent = Math.round(lastYearExceptionPercent * yearProgress * 10) / 10;
  const subICBExceptionPercent = Math.round(exceptionPercent * 0.95 * 10) / 10;
  const subICBExceptionAtThisTimePercent = Math.round(subICBExceptionPercent * yearProgress * 10) / 10;

  return (
    <div className="p-6">
      {/* Target Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">QOF_{targetCode}</h3>
          <p className="text-sm text-gray-600">{targetData.description}</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
          <Eye className="w-4 h-4 mr-2" />
          View in Planner
        </button>
      </div>

      {/* Target Achievement Progress - 4 Metric Cards */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Target Achievement Progress</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Register Size */}
          <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">{targetCode} Register Size</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{totalRegister.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total patients on register</div>
          </div>

          {/* Clinical Completion */}
          <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Clinical Completion</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{clinicalCompletionPatients.toLocaleString()}</div>
            <div className="text-xs text-gray-500">{Math.round(clinicalCompletionPercent * 10) / 10}% of register</div>
          </div>

          {/* Exception Reported */}
          <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Exception Reported</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{exceptionPatients.toLocaleString()}</div>
            <div className="text-xs text-gray-500">{Math.round(exceptionPercent * 10) / 10}% of register</div>
          </div>

          {/* Remaining / Incomplete */}
          <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Remaining</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{remainingPatients.toLocaleString()}</div>
            <div className="text-xs text-gray-500">{Math.round(summaryData.incomplete * 10) / 10}% of register</div>
          </div>
        </div>
      </div>

      {/* Clinical, Exception, and Resource Planning Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clinical Completion Analysis */}
        <div className="card-glass p-6">
          <h4 className="text-base font-semibold text-gray-900 leading-tight mb-1">Clinical Completion Analysis</h4>
          <p className="text-sm text-gray-600 mb-4">Patients clinically complete</p>

          <div className="space-y-3">
            {/* Current */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Current</span>
                <span className="text-sm font-semibold text-gray-900">
                  {clinicalCompletionPatients.toLocaleString()} ({Math.round(clinicalCompletionPercent * 10) / 10}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-blue-600 h-5 rounded-full"
                  style={{ width: `${Math.min(clinicalCompletionPercent, 100)}%` }}
                />
              </div>
            </div>

            {/* Expected by now */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Expected by now</span>
                <span className="text-sm font-semibold text-gray-900">{expectedAtThisTime}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-purple-500 h-5 rounded-full"
                  style={{ width: `${Math.min(expectedAtThisTime, 100)}%` }}
                />
              </div>
            </div>

            {/* Max Threshold */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Max Threshold</span>
                <span className="text-sm font-semibold text-gray-900">{maxThreshold}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-green-500 h-5 rounded-full"
                  style={{ width: `${Math.min(maxThreshold, 100)}%` }}
                />
              </div>
            </div>

            {/* Last Year at this time */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Last Year at this time</span>
                <span className="text-sm font-semibold text-gray-900">{lastYearAtThisTimePercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-gray-400 h-5 rounded-full"
                  style={{ width: `${Math.min(lastYearAtThisTimePercent, 100)}%` }}
                />
              </div>
            </div>

            {/* Sub ICB at this time */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Sub ICB at this time</span>
                <span className="text-sm font-semibold text-gray-900">{subICBAtThisTimePercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-indigo-400 h-5 rounded-full"
                  style={{ width: `${Math.min(subICBAtThisTimePercent, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Exception Reporting Analysis */}
        <div className="card-glass p-6">
          <h4 className="text-base font-semibold text-gray-900 leading-tight mb-1">Exception Reporting Analysis</h4>
          <p className="text-sm text-gray-600 mb-4">Patients exception reported</p>

          <div className="space-y-3">
            {/* Current */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Current</span>
                <span className="text-sm font-semibold text-gray-900">
                  {exceptionPatients.toLocaleString()} ({Math.round(exceptionPercent * 10) / 10}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-green-500 h-5 rounded-full"
                  style={{ width: `${Math.min(exceptionPercent * 2, 100)}%` }}
                />
              </div>
            </div>

            {/* Last Year at this time */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Last Year at this time</span>
                <span className="text-sm font-semibold text-gray-900">{lastYearExceptionAtThisTimePercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-gray-400 h-5 rounded-full"
                  style={{ width: `${Math.min(lastYearExceptionAtThisTimePercent * 2, 100)}%` }}
                />
              </div>
            </div>

            {/* Last Year Total */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Last Year Total</span>
                <span className="text-sm font-semibold text-gray-900">{lastYearExceptionPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-gray-400 h-5 rounded-full"
                  style={{ width: `${Math.min(lastYearExceptionPercent * 2, 100)}%` }}
                />
              </div>
            </div>

            {/* Sub ICB at this time */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Sub ICB at this time</span>
                <span className="text-sm font-semibold text-gray-900">{subICBExceptionAtThisTimePercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-indigo-400 h-5 rounded-full"
                  style={{ width: `${Math.min(subICBExceptionAtThisTimePercent * 2, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resource Planning */}
        <div className="card-glass p-6">
          <h4 className="text-base font-semibold text-gray-900 leading-tight mb-4">Resource Planning</h4>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {remainingPatients.toLocaleString()} appointments
          </div>
          <div className="text-sm text-gray-600 mb-6">needed to reach 100% clinical completion</div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Traditional Cost:</span>
              <span className="text-lg font-semibold text-gray-900">
                £{traditionalCost.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Suvera Cost:</span>
              <span className="text-lg font-semibold text-green-600">
                £{suveraCost.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-green-800 mb-1">Potential Savings:</div>
            <div className="text-2xl font-bold text-green-600">
              £{potentialSavings.toLocaleString()}
            </div>
            <div className="text-xs text-green-700 mt-1">
              Save {savingsPercentage}% with Suvera virtual clinic
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
