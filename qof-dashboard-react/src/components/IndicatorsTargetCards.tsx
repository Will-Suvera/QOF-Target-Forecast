import { useMemo } from 'react';
import { type TargetData, calculateSummaryData } from '../extracts/dataService';

interface IndicatorsTargetCardsProps {
  targetCode: string;
  targetData: TargetData;
  earningsPerPoint: number;
}

export function IndicatorsTargetCards({ targetCode, targetData, earningsPerPoint }: IndicatorsTargetCardsProps) {
  const summaryData = useMemo(() => calculateSummaryData(targetData), [targetData]);

  // Patient counts from summary
  const completePatients = summaryData.completePatients;
  const exceptionPatients = summaryData.exceptionInvitedPatients;

  // Target register = denominator + exceptions (e.g., 1400 + 100 = 1500 for AST007)
  const targetRegister = targetData.denominator + exceptionPatients;

  // Incomplete = target register - complete - exceptions (so the 3 categories add up to target register)
  const incompletePatients = targetRegister - completePatients - exceptionPatients;

  // Percentages (calculated against target register)
  const clinicalCompletionPercent = (completePatients / targetRegister) * 100;
  const exceptionPercent = (exceptionPatients / targetRegister) * 100;

  // QOF Points calculations - use currentPoints from data model
  const maxPoints = targetData.maxPoints;
  const currentPoints = Math.round(targetData.currentPoints * 10) / 10;
  const unclaimedPoints = Math.round((maxPoints - currentPoints) * 10) / 10;
  const revenueAvailable = Math.round(maxPoints * earningsPerPoint);
  const revenueEarned = Math.round(currentPoints * earningsPerPoint);
  const missedIncome = Math.round(unclaimedPoints * earningsPerPoint);

  // Sub ICB and National averages from data service - Completion (complete/denominator)
  const subICBCompletionPercent = Math.round(targetData.subIcbAverageCompletionPercentage * 100 * 10) / 10;
  const nationalCompletionPercent = Math.round(targetData.nationalAverageCompletionPercentage * 100 * 10) / 10;
  // Sub ICB and National averages - Clinical Completion (complete/target register)
  const subICBClinicalCompletionPercent = Math.round(targetData.subIcbAverageClinicalCompletionPercentage * 100 * 10) / 10;
  const nationalClinicalCompletionPercent = Math.round(targetData.nationalAverageClinicalCompletionPercentage * 100 * 10) / 10;
  // Sub ICB and National averages - Exception Reporting
  const subICBExceptionPercent = Math.round(targetData.subIcbAverageExceptionPercentage * 100 * 10) / 10;
  const nationalExceptionPercent = Math.round(targetData.nationalAverageExceptionPercentage * 100 * 10) / 10;

  return (
    <div className="p-2">
      {/* Target Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">QOF_{targetCode}</h3>
        <p className="text-sm text-gray-600">{targetData.description}</p>
      </div>

      {/* Target Achievement Progress and Revenue Left on Table Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Target Achievement Progress - spans 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Target Achievement Progress</h4>

          {/* Row 1: Target Register (full width) */}
          <div className="mb-4">
            <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Target Register</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{targetRegister.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Total patients on register</div>
            </div>
          </div>

          {/* Row 2: Exception, Complete, Incomplete */}
          <div className="grid grid-cols-3 gap-4">
            {/* Exception Reported */}
            <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Exception Reported</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{exceptionPatients.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{Math.round((exceptionPatients / targetRegister) * 100 * 10) / 10}% of register</div>
            </div>

            {/* Complete */}
            <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Complete</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{completePatients.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{Math.round((completePatients / targetRegister) * 100 * 10) / 10}% of register</div>
            </div>

            {/* Incomplete */}
            <div className="bg-white/50 border border-gray-200 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Incomplete</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{incompletePatients.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{Math.round((incompletePatients / targetRegister) * 100 * 10) / 10}% of register</div>
            </div>
          </div>
        </div>

        {/* QOF Points */}
        <div className="card-glass p-6">
          <h4 className="text-base font-semibold text-gray-900 leading-tight mb-4">QOF Points</h4>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {currentPoints} / {maxPoints} points
          </div>
          <div className="text-sm text-gray-600 mb-6">earned</div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Revenue available:</span>
              <span className="text-lg font-semibold text-gray-900">
                £{revenueAvailable.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Revenue earned:</span>
              <span className="text-lg font-semibold text-green-600">
                £{revenueEarned.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-orange-800 mb-1">Missed Income:</div>
            <div className="text-2xl font-bold text-orange-600">
              £{missedIncome.toLocaleString()}
            </div>
            <div className="text-xs text-orange-700 mt-1">From unclaimed QOF points</div>
          </div>
        </div>
      </div>

      {/* Completion, Clinical Completion, and Exception Reporting Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion (complete/denominator) */}
        <div className="card-glass p-6">
          <h4 className="text-base font-semibold text-gray-900 leading-tight mb-1">Completion</h4>
          <p className="text-sm text-gray-600 mb-4">Complete / Denominator</p>

          <div className="space-y-3">
            {/* Practice */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Practice</span>
                <span className="text-sm font-semibold text-gray-900">
                  {Math.round(targetData.completionPercentage * 100 * 10) / 10}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-action h-5 rounded-full"
                  style={{ width: `${Math.min(targetData.completionPercentage * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Sub ICB Average */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Sub ICB Average</span>
                <span className="text-sm font-semibold text-gray-900">{subICBCompletionPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-indigo-400 h-5 rounded-full"
                  style={{ width: `${Math.min(subICBCompletionPercent, 100)}%` }}
                />
              </div>
            </div>

            {/* National Average */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">National Average</span>
                <span className="text-sm font-semibold text-gray-900">{nationalCompletionPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-purple-400 h-5 rounded-full"
                  style={{ width: `${Math.min(nationalCompletionPercent, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Completion (complete/targetRegister) */}
        <div className="card-glass p-6">
          <h4 className="text-base font-semibold text-gray-900 leading-tight mb-1">Clinical Completion</h4>
          <p className="text-sm text-gray-600 mb-4">Complete / Target Register</p>

          <div className="space-y-3">
            {/* Practice */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Practice</span>
                <span className="text-sm font-semibold text-gray-900">
                  {Math.round(clinicalCompletionPercent * 10) / 10}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-action h-5 rounded-full"
                  style={{ width: `${Math.min(clinicalCompletionPercent, 100)}%` }}
                />
              </div>
            </div>

            {/* Sub ICB Average */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Sub ICB Average</span>
                <span className="text-sm font-semibold text-gray-900">{subICBClinicalCompletionPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-indigo-400 h-5 rounded-full"
                  style={{ width: `${Math.min(subICBClinicalCompletionPercent, 100)}%` }}
                />
              </div>
            </div>

            {/* National Average */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">National Average</span>
                <span className="text-sm font-semibold text-gray-900">{nationalClinicalCompletionPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-purple-400 h-5 rounded-full"
                  style={{ width: `${Math.min(nationalClinicalCompletionPercent, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Exception Reporting */}
        <div className="card-glass p-6">
          <h4 className="text-base font-semibold text-gray-900 leading-tight mb-1">Exception Reporting</h4>
          <p className="text-sm text-gray-600 mb-4">Patients exception reported</p>

          <div className="space-y-3">
            {/* Practice */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Practice</span>
                <span className="text-sm font-semibold text-gray-900">
                  {Math.round(exceptionPercent * 10) / 10}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-green-500 h-5 rounded-full"
                  style={{ width: `${Math.min(exceptionPercent * 2, 100)}%` }}
                />
              </div>
            </div>

            {/* Sub ICB Average */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Sub ICB Average</span>
                <span className="text-sm font-semibold text-gray-900">{subICBExceptionPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-indigo-400 h-5 rounded-full"
                  style={{ width: `${Math.min(subICBExceptionPercent * 2, 100)}%` }}
                />
              </div>
            </div>

            {/* National Average */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">National Average</span>
                <span className="text-sm font-semibold text-gray-900">{nationalExceptionPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5">
                <div
                  className="bg-purple-400 h-5 rounded-full"
                  style={{ width: `${Math.min(nationalExceptionPercent * 2, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
