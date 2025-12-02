<template>
  <div class="p-6">
    <!-- Target Header -->
    <div class="mb-6" v-if="props.targetCode === 'HYP008'">
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">QOF_HYP008</h3>
        <p class="text-sm text-gray-600">The percentage of patients aged 79 years or under with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 140/90 mmHg or less (or equivalent home blood pressure reading)</p>
      </div>
    </div>
    
    <div class="flex justify-between items-start mb-6" v-if="props.targetCode === 'HYP009'">
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">QOF_HYP009</h3>
        <p class="text-sm text-gray-600">The percentage of patients aged 80 years or over with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 150/90 mmHg or less (or equivalent home blood pressure reading)</p>
      </div>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
        View in Planner
      </button>
    </div>

    <!-- Target Achievement Progress and Revenue Row (Row 1) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Target Achievement Progress (takes 2 columns) -->
      <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Target Achievement Progress</h4>
        
        <!-- HYP008: 4 Sections Grid -->
        <template v-if="props.targetCode === 'HYP008'">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- HYP008 Register Size -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="text-sm font-medium text-gray-700 mb-2">HYP008 Register Size</div>
              <div class="text-2xl font-bold text-gray-900 mb-3">{{ getHYP008RegisterSize() }}</div>
              <div class="text-xs text-gray-600">
                <div class="flex items-center justify-between mb-1">
                  <span>Nov 1st:</span>
                  <span>{{ getHYP008RegisterSizePrevious() }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Change:</span>
                  <span :class="getChangeClass(getHYP008RegisterSizeChange())">
                    {{ getHYP008RegisterSizeChange() > 0 ? '+' : '' }}{{ getHYP008RegisterSizeChange() }} ({{ getHYP008RegisterSizeChangePercent() > 0 ? '+' : '' }}{{ getHYP008RegisterSizeChangePercent() }}%)
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Clinical Completion Number -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="text-sm font-medium text-gray-700 mb-2">Clinical Completion Number</div>
              <div class="text-2xl font-bold text-gray-900 mb-3">{{ getClinicalCompletionNumber(target) }}</div>
              <div class="text-xs text-gray-600">
                <div class="flex items-center justify-between mb-1">
                  <span>Nov 1st:</span>
                  <span>{{ getClinicalCompletionNumberPrevious(target) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Change:</span>
                  <span :class="getChangeClass(getClinicalCompletionNumberChange(target))">
                    {{ getClinicalCompletionNumberChange(target) > 0 ? '+' : '' }}{{ getClinicalCompletionNumberChange(target) }} ({{ getClinicalCompletionNumberChangePercent(target) > 0 ? '+' : '' }}{{ getClinicalCompletionNumberChangePercent(target) }}%)
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Invited Exception Reporting Number -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="text-sm font-medium text-gray-700 mb-2">Invited Exception Reporting Number</div>
              <div class="text-2xl font-bold text-gray-900 mb-3">{{ getInvitedExceptionNumber(target) }}</div>
              <div class="text-xs text-gray-600">
                <div class="flex items-center justify-between mb-1">
                  <span>Nov 1st:</span>
                  <span>{{ getInvitedExceptionNumberPrevious(target) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Change:</span>
                  <span :class="getChangeClass(getInvitedExceptionNumberChange(target))">
                    {{ getInvitedExceptionNumberChange(target) > 0 ? '+' : '' }}{{ getInvitedExceptionNumberChange(target) }} ({{ getInvitedExceptionNumberChangePercent(target) > 0 ? '+' : '' }}{{ getInvitedExceptionNumberChangePercent(target) }}%)
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Not Yet Invited Number -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="text-sm font-medium text-gray-700 mb-2">Not Yet Invited Number</div>
              <div class="text-2xl font-bold text-gray-900 mb-3">{{ getNotYetInvitedNumber(target) }}</div>
              <div class="text-xs text-gray-600">
                <div class="flex items-center justify-between mb-1">
                  <span>Nov 1st:</span>
                  <span>{{ getNotYetInvitedNumberPrevious(target) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Change:</span>
                  <span :class="getNotYetInvitedChangeClass(getNotYetInvitedNumberChange(target))">
                    {{ getNotYetInvitedNumberChange(target) > 0 ? '+' : '' }}{{ getNotYetInvitedNumberChange(target) }} ({{ getNotYetInvitedNumberChangePercent(target) > 0 ? '+' : '' }}{{ getNotYetInvitedNumberChangePercent(target) }}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
        
        <!-- HYP009: Donut Chart Layout -->
        <template v-if="props.targetCode === 'HYP009'">
          <div class="flex flex-col lg:flex-row items-start gap-6">
            <!-- Left: Donut Chart -->
            <div class="flex items-center flex-shrink-0">
              <div class="relative w-32 h-32">
                <svg class="transform -rotate-90 w-32 h-32">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" stroke-width="12"></circle>
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="56" 
                    fill="none" 
                    stroke="#3b82f6" 
                    stroke-width="12"
                    :stroke-dasharray="`${(getTargetProgress(target) / 100) * 351.86} 351.86`"
                    stroke-linecap="round"
                  ></circle>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-gray-900">{{ Math.round(getTargetProgress(target)) }}%</div>
                    <div class="text-xs text-gray-600">of target</div>
                    <div class="text-xs font-semibold text-blue-600 mt-1">{{ getQOFPoints(target) }} / {{ getMaxQOFPoints(target) }} points</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Target Breakdown -->
            <div class="flex-1">
              <div class="grid grid-cols-3 gap-3 mt-4">
                <div class="bg-white border border-gray-200 rounded-lg p-3">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span class="text-xs font-medium text-gray-700">Clinical</span>
                  </div>
                  <div class="text-lg font-bold text-gray-900">{{ getClinicalCompletionPatients(target).toLocaleString() }}</div>
                  <div class="text-xs text-gray-600">{{ Math.round((getClinicalCompletionPatients(target) / getPatientNumbers(target, getActualCompletion(target)).totalRegister) * 100 * 10) / 10 }}% of target</div>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-3">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span class="text-xs font-medium text-gray-700">Exception</span>
                  </div>
                  <div class="text-lg font-bold text-gray-900">{{ getExceptionReportingPatients(target).toLocaleString() }}</div>
                  <div class="text-xs text-gray-600">{{ Math.round((getExceptionReportingPatients(target) / getPatientNumbers(target, getActualCompletion(target)).totalRegister) * 100 * 10) / 10 }}% of target</div>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-3">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span class="text-xs font-medium text-gray-700">Remaining</span>
                  </div>
                  <div class="text-lg font-bold text-gray-900">{{ (getPatientNumbers(target, getActualCompletion(target)).totalRegister - getClinicalCompletionPatients(target) - getExceptionReportingPatients(target)).toLocaleString() }}</div>
                  <div class="text-xs text-gray-600">{{ Math.round(((getPatientNumbers(target, getActualCompletion(target)).totalRegister - getClinicalCompletionPatients(target) - getExceptionReportingPatients(target)) / getPatientNumbers(target, getActualCompletion(target)).totalRegister) * 100 * 10) / 10 }}% to go</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Revenue Left on Table (takes 1 column) -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Revenue Left on Table</h4>
        <div class="text-4xl font-bold text-gray-900 mb-4">£{{ getRevenueLeftOnTable(target).toLocaleString() }}</div>
        <div class="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-orange-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <div class="text-sm font-medium text-orange-800">{{ getUnclaimedPoints(target) }} unclaimed QOF points from {{ getRemainingPatients(target) }} patients</div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white border border-gray-200 rounded-lg p-3">
            <div class="text-xs text-gray-600 mb-1">Unclaimed Points</div>
            <div class="text-xl font-bold text-gray-900">{{ getUnclaimedPoints(target) }}</div>
          </div>
          <div class="bg-white border border-gray-200 rounded-lg p-3">
            <div class="text-xs text-gray-600 mb-1">Patients Remaining</div>
            <div class="text-xl font-bold text-gray-900">{{ getRemainingPatients(target) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Clinical, Exception, and Resource Planning Row (Row 2) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Clinical Completion Analysis -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-1">Clinical Completion Analysis</h4>
        <p class="text-sm text-gray-600 mb-4">Patients clinically complete</p>
        
        <!-- HYP008 Layout -->
        <template v-if="props.targetCode === 'HYP008'">
          <div class="space-y-3 mb-4">
            <!-- Current -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Current</span>
                <span class="text-sm font-semibold text-gray-900">{{ getClinicalCompletionNumber(target) }} (54.4%)</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2" style="width: 54.4%;">
                </div>
              </div>
            </div>
            
            <!-- Last Year at this time of year -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Last Year at this time of year</span>
                <span class="text-sm font-semibold text-gray-900">{{ getLastYearClinicalAtThisTime(target) }} ({{ getLastYearClinicalAtThisTimePercent(target) }}%)</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getLastYearClinicalAtThisTimePercent(target)}%`">
                </div>
              </div>
            </div>
            
            <!-- Last Year Total -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Last Year Total</span>
                <span class="text-sm font-semibold text-gray-900">{{ getLastYearClinicalTotal(target) }} (62.52%)</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: 62.52%`">
                </div>
              </div>
            </div>
          </div>

          <!-- Sub ICB Comparison Bars -->
          <div class="space-y-3 mb-4">
            <!-- Sub ICB Completion at this time of year -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Sub ICB Completion at this time of year</span>
                <span class="text-sm font-semibold text-gray-900">{{ getSubICBClinicalCompletionAtThisTime(target) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBClinicalCompletionAtThisTime(target)}%`">
                </div>
              </div>
            </div>
            
            <!-- Sub ICB Total Completion -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Sub ICB Total Completion</span>
                <span class="text-sm font-semibold text-gray-900">{{ getSubICBClinicalCompletionAverage(target) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBClinicalCompletionAverage(target)}%`">
                </div>
              </div>
            </div>
          </div>
        </template>
        
        <!-- HYP009 Layout -->
        <template v-if="props.targetCode === 'HYP009'">
          <div class="space-y-3">
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Current</span>
                <span class="text-sm font-semibold text-gray-900">{{ getClinicalCompletionPatients(target).toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getClinicalCompletionPatients(target) / Math.max(getExpectedClinical(target), getLastYearClinical(target), getClinicalCompletionPatients(target))) * 100, 100)}%`"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Expected</span>
                <span class="text-sm font-semibold text-gray-900">{{ getExpectedClinical(target).toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getExpectedClinical(target) / Math.max(getExpectedClinical(target), getLastYearClinical(target), getClinicalCompletionPatients(target))) * 100, 100)}%`"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Last Year</span>
                <span class="text-sm font-semibold text-gray-900">{{ getLastYearClinical(target).toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getLastYearClinical(target) / Math.max(getExpectedClinical(target), getLastYearClinical(target), getClinicalCompletionPatients(target))) * 100, 100)}%`"></div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Exception Reporting Analysis -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-1">Exception Reporting Analysis</h4>
        <p class="text-sm text-gray-600 mb-4">Patients exception reported</p>
        
        <!-- HYP008 Layout -->
        <template v-if="props.targetCode === 'HYP008'">
          <div class="space-y-3 mb-4">
            <!-- Current -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Current</span>
                <span class="text-sm font-semibold text-gray-900">{{ getInvitedExceptionNumber(target) }} ({{ getSummaryData('HYP008').exceptionInvited }}%)</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSummaryData('HYP008').exceptionInvited}%`">
                </div>
              </div>
            </div>
            
            <!-- Last Year at this time of year -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Last Year at this time of year</span>
                <span class="text-sm font-semibold text-gray-900">{{ getLastYearExceptionAtThisTime(target) }} ({{ getLastYearExceptionAtThisTimePercent(target) }}%)</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getLastYearExceptionAtThisTimePercent(target)}%`">
                </div>
              </div>
            </div>
            
            <!-- Last Year Total -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Last Year Total</span>
                <span class="text-sm font-semibold text-gray-900">{{ getLastYearExceptionTotal(target) }} (19.72%)</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: 19.72%`">
                </div>
              </div>
            </div>
          </div>

          <!-- Sub ICB Comparison Bars -->
          <div class="space-y-3 mb-4">
            <!-- Sub ICB Exception Reporting at this time of year -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Sub ICB Exception Reporting at this time of year</span>
                <span class="text-sm font-semibold text-gray-900">{{ getSubICBExceptionReportingAtThisTime(target) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBExceptionReportingAtThisTime(target)}%`">
                </div>
              </div>
            </div>
            
            <!-- Sub ICB Total Exception Reporting -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Sub ICB Total Exception Reporting</span>
                <span class="text-sm font-semibold text-gray-900">{{ getSubICBExceptionReportingAverage(target) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBExceptionReportingAverage(target)}%`">
                </div>
              </div>
            </div>
          </div>
        </template>
        
        <!-- HYP009 Layout -->
        <template v-if="props.targetCode === 'HYP009'">
          <div class="space-y-3 mb-4">
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Current</span>
                <span class="text-sm font-semibold text-gray-900">{{ getExceptionReportingPatients(target).toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getExceptionReportingPatients(target) / Math.max(getExpectedException(target), getLastYearException(target), getExceptionReportingPatients(target))) * 100, 100)}%`"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Expected</span>
                <span class="text-sm font-semibold text-gray-900">{{ getExpectedException(target).toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getExpectedException(target) / Math.max(getExpectedException(target), getLastYearException(target), getExceptionReportingPatients(target))) * 100, 100)}%`"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Last Year</span>
                <span class="text-sm font-semibold text-gray-900">{{ getLastYearException(target).toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6">
                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getLastYearException(target) / Math.max(getExpectedException(target), getLastYearException(target), getExceptionReportingPatients(target))) * 100, 100)}%`"></div>
              </div>
            </div>
          </div>
          <div class="bg-white border border-gray-200 rounded-lg p-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Your exception rate:</span>
              <span class="text-sm font-semibold text-gray-900">{{ getExceptionRate(target) }}%</span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-sm text-gray-600">ICB Avg:</span>
              <span class="text-sm font-semibold text-green-600 flex items-center">
                {{ getSubICBAverage(target) }}%
                <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </span>
            </div>
          </div>
        </template>
      </div>

      <!-- Resource Planning -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Resource Planning</h4>
        <div class="text-3xl font-bold text-gray-900 mb-2">{{ getRemainingPatients(target).toLocaleString() }} appointments</div>
        <div class="text-sm text-gray-600 mb-6">needed to reach 100% clinical completion</div>
        
        <div class="space-y-3 mb-4">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Traditional Cost:</span>
            <span class="text-lg font-semibold text-gray-900">£{{ getTraditionalCost(target).toLocaleString() }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Suvera Cost ★:</span>
            <span class="text-lg font-semibold text-green-600">£{{ getSuveraCost(target).toLocaleString() }}</span>
          </div>
        </div>
        
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="text-sm font-semibold text-green-800 mb-1">Potential Savings:</div>
          <div class="text-2xl font-bold text-green-600">£{{ getPotentialSavings(target).toLocaleString() }}</div>
          <div class="text-xs text-green-700 mt-1">Save {{ getSavingsPercentage(target) }}% with Suvera virtual clinic</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIndicatorsData } from '../composables/useIndicatorsData'

const props = defineProps({
  condition: {
    type: String,
    required: true
  },
  targetCode: {
    type: String,
    required: true
  }
})

const { getSummaryData, getFinancialYearProgress } = useIndicatorsData()

// Create target object based on targetCode
const target = computed(() => ({
  code: props.targetCode,
  qofCode: `QOF_${props.targetCode}`
}))

// Helper functions for Target Achievement Progress section
const getHYP008NovemberData = () => {
  return {
    registerSize: 940,
    clinicalCompletion: 500,
    invitedException: 110,
    notYetInvited: 330
  }
}

const getHYP008RegisterSize = () => {
  return getSummaryData('HYP008').totalRegister
}

const getHYP008RegisterSizePrevious = () => {
  return getHYP008NovemberData().registerSize
}

const getHYP008RegisterSizeChange = () => {
  return getHYP008RegisterSize() - getHYP008RegisterSizePrevious()
}

const getHYP008RegisterSizeChangePercent = () => {
  const previous = getHYP008RegisterSizePrevious()
  if (previous === 0) return 0
  return Math.round((getHYP008RegisterSizeChange() / previous) * 100 * 10) / 10
}

const getClinicalCompletionNumber = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getSummaryData('HYP008').completePatients
  }
  if (target.code === 'HYP009' || target.qofCode === 'QOF_HYP009') {
    return getSummaryData('HYP009').completePatients
  }
  return 0
}

const getClinicalCompletionNumberPrevious = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getHYP008NovemberData().clinicalCompletion
  }
  return 0
}

const getClinicalCompletionNumberChange = (target) => {
  return getClinicalCompletionNumber(target) - getClinicalCompletionNumberPrevious(target)
}

const getClinicalCompletionNumberChangePercent = (target) => {
  const previous = getClinicalCompletionNumberPrevious(target)
  if (previous === 0) return 0
  return Math.round((getClinicalCompletionNumberChange(target) / previous) * 100 * 10) / 10
}

const getInvitedExceptionNumber = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getSummaryData('HYP008').exceptionInvitedPatients
  }
  if (target.code === 'HYP009' || target.qofCode === 'QOF_HYP009') {
    return getSummaryData('HYP009').exceptionInvitedPatients
  }
  return 0
}

const getInvitedExceptionNumberPrevious = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getHYP008NovemberData().invitedException
  }
  return 0
}

const getInvitedExceptionNumberChange = (target) => {
  return getInvitedExceptionNumber(target) - getInvitedExceptionNumberPrevious(target)
}

const getInvitedExceptionNumberChangePercent = (target) => {
  const previous = getInvitedExceptionNumberPrevious(target)
  if (previous === 0) return 0
  return Math.round((getInvitedExceptionNumberChange(target) / previous) * 100 * 10) / 10
}

const getNotYetInvitedNumber = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getSummaryData('HYP008').incompletePatients
  }
  if (target.code === 'HYP009' || target.qofCode === 'QOF_HYP009') {
    return getSummaryData('HYP009').incompletePatients
  }
  return 0
}

const getNotYetInvitedNumberPrevious = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getHYP008NovemberData().notYetInvited
  }
  return 0
}

const getNotYetInvitedNumberChange = (target) => {
  return getNotYetInvitedNumber(target) - getNotYetInvitedNumberPrevious(target)
}

const getNotYetInvitedNumberChangePercent = (target) => {
  const previous = getNotYetInvitedNumberPrevious(target)
  if (previous === 0) return 0
  return Math.round((getNotYetInvitedNumberChange(target) / previous) * 100 * 10) / 10
}

const getChangeClass = (change) => {
  if (change > 0) return 'text-green-600 font-semibold'
  if (change < 0) return 'text-red-600 font-semibold'
  return 'text-gray-600'
}

const getNotYetInvitedChangeClass = (change) => {
  if (change < 0) return 'text-green-600 font-semibold'
  if (change > 0) return 'text-red-600 font-semibold'
  return 'text-gray-600'
}

// Helper functions for calculations
const getActualCompletion = (target) => {
  const actualCompletions = {
    'HYP008': 52,
    'QOF_HYP008': 52,
    'HYP009': 59,
    'QOF_HYP009': 59
  }
  const targetCode = target.code || target.qofCode
  return actualCompletions[targetCode] || 0
}

const getMaxAchievement = (target) => {
  const maxAchievements24_25 = {
    'HYP008': 85,
    'QOF_HYP008': 85,
    'HYP009': 80,
    'QOF_HYP009': 80
  }
  const targetCode = target.code || target.qofCode
  return maxAchievements24_25[targetCode] || 85
}

const getPatientNumbers = (target, currentAchievement) => {
  const registerSizes = {
    'HYP008': 683,
    'QOF_HYP008': 683,
    'HYP009': 234,
    'QOF_HYP009': 234
  }
  const actualCompletions = {
    'HYP008': 52,
    'QOF_HYP008': 52,
    'HYP009': 59,
    'QOF_HYP009': 59
  }
  const targetCode = target.code || target.qofCode
  const totalRegister = registerSizes[targetCode] || 1000
  const actualCompletion = actualCompletions[targetCode] || currentAchievement
  const completed = Math.round((actualCompletion / 100) * totalRegister)
  const remaining = totalRegister - completed
  const maxAchievement = getMaxAchievement(target)
  const targetForMax = Math.round((maxAchievement / 100) * totalRegister)
  const requiredForMax = Math.max(0, targetForMax - completed)
  return {
    totalRegister,
    completed,
    remaining,
    requiredForMax
  }
}

const getClinicalCompletionPatients = (target) => {
  const completed = getPatientNumbers(target, getActualCompletion(target)).completed
  return Math.round(0.92 * completed)
}

const getExceptionReportingPatients = (target) => {
  const registerSizes = {
    'HYP008': 683,
    'QOF_HYP008': 683,
    'HYP009': 234,
    'QOF_HYP009': 234
  }
  const actualCompletions = {
    'HYP008': 52,
    'QOF_HYP008': 52,
    'HYP009': 59,
    'QOF_HYP009': 59
  }
  const exceptionRates = {
    'HYP008': 8,
    'QOF_HYP008': 8,
    'HYP009': 4.9,
    'QOF_HYP009': 4.9
  }
  const targetCode = target.code || target.qofCode
  const totalRegister = registerSizes[targetCode] || 683
  const completionPercent = actualCompletions[targetCode] || 52
  const exceptionRate = exceptionRates[targetCode] || 8
  const completed = Math.round((completionPercent / 100) * totalRegister)
  return Math.round((exceptionRate / 100) * completed)
}

const getTargetProgress = (target) => {
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const clinicalCompleted = getClinicalCompletionPatients(target)
  const exceptionPatients = getExceptionReportingPatients(target)
  const totalCompleted = clinicalCompleted + exceptionPatients
  const maxAchievement = getMaxAchievement(target)
  const targetPatients = Math.round((maxAchievement / 100) * totalRegister)
  if (targetPatients === 0) return 0
  return (totalCompleted / targetPatients) * 100
}

const getRemainingPatients = (target) => {
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const clinicalCompleted = getClinicalCompletionPatients(target)
  const exceptionPatients = getExceptionReportingPatients(target)
  return totalRegister - clinicalCompleted - exceptionPatients
}

const getQOFPoints = (target) => {
  const indicatorConfig = {
    'HYP008': { minThreshold: 40, maxThreshold: 85, maxPoints: 38 },
    'QOF_HYP008': { minThreshold: 40, maxThreshold: 85, maxPoints: 38 },
    'HYP009': { minThreshold: 40, maxThreshold: 85, maxPoints: 14 },
    'QOF_HYP009': { minThreshold: 40, maxThreshold: 85, maxPoints: 14 }
  }
  const targetCode = target.code || target.qofCode
  const config = indicatorConfig[targetCode]
  if (!config) return 0
  const achievement = getTargetProgress(target)
  if (achievement < config.minThreshold) return 0
  if (achievement >= config.maxThreshold) return config.maxPoints
  const points = 1 + ((achievement - config.minThreshold) / (config.maxThreshold - config.minThreshold)) * (config.maxPoints - 1)
  return Math.round(points * 10) / 10
}

const getMaxQOFPoints = (target) => {
  const indicatorConfig = {
    'HYP008': { maxPoints: 38 },
    'QOF_HYP008': { maxPoints: 38 },
    'HYP009': { maxPoints: 14 },
    'QOF_HYP009': { maxPoints: 14 }
  }
  const targetCode = target.code || target.qofCode
  return indicatorConfig[targetCode]?.maxPoints || 0
}

const getUnclaimedPoints = (target) => {
  const maxPoints = getMaxQOFPoints(target)
  const currentPoints = getQOFPoints(target)
  return Math.max(0, maxPoints - currentPoints)
}

const getRevenueLeftOnTable = (target) => {
  const unclaimedPoints = getUnclaimedPoints(target)
  return unclaimedPoints * 200
}

const getTraditionalCost = (target) => {
  return getRemainingPatients(target) * 45
}

const getSuveraCost = (target) => {
  return getRemainingPatients(target) * 28
}

const getPotentialSavings = (target) => {
  return getTraditionalCost(target) - getSuveraCost(target)
}

const getSavingsPercentage = (target) => {
  const traditional = getTraditionalCost(target)
  if (traditional === 0) return 0
  return Math.round((getPotentialSavings(target) / traditional) * 100)
}

const getExpectedClinical = (target) => {
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const yearProgress = getFinancialYearProgress()
  const maxAchievement = getMaxAchievement(target)
  const expectedPercent = yearProgress * maxAchievement
  return Math.round((expectedPercent / 100) * totalRegister * 0.92)
}

const getLastYearClinical = (target) => {
  const lastYearPercentages = {
    'HYP008': 54.9,
    'QOF_HYP008': 54.9,
    'HYP009': 50,
    'QOF_HYP009': 50
  }
  const targetCode = target.code || target.qofCode
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const lastYearPercent = lastYearPercentages[targetCode] || 50
  return Math.round((lastYearPercent / 100) * totalRegister)
}

const getExpectedException = (target) => {
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const yearProgress = getFinancialYearProgress()
  const exceptionTargets = {
    'HYP008': 12.75,
    'QOF_HYP008': 12.75,
    'HYP009': 4.9,
    'QOF_HYP009': 4.9
  }
  const targetCode = target.code || target.qofCode
  const exceptionTarget = exceptionTargets[targetCode] || 0
  const forecastedException = yearProgress * exceptionTarget
  return Math.round((forecastedException / 100) * totalRegister)
}

const getLastYearException = (target) => {
  const lastYearExceptionPercentages = {
    'HYP008': 24.7,
    'QOF_HYP008': 24.7,
    'HYP009': 20,
    'QOF_HYP009': 20
  }
  const targetCode = target.code || target.qofCode
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const lastYearPercent = lastYearExceptionPercentages[targetCode] || 20
  return Math.round((lastYearPercent / 100) * totalRegister)
}

const getExceptionRate = (target) => {
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const exceptionPatients = getExceptionReportingPatients(target)
  if (totalRegister === 0) return 0
  return Math.round((exceptionPatients / totalRegister) * 100 * 10) / 10
}

const getSubICBAverage = (target) => {
  const subICBAverages = {
    'HYP008': 12.5,
    'QOF_HYP008': 12.5,
    'HYP009': 4.9,
    'QOF_HYP009': 4.9
  }
  const targetCode = target.code || target.qofCode
  return subICBAverages[targetCode] || 0
}

const getLastYearClinicalAtThisTime = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const yearProgress = getFinancialYearProgress()
    const lastYearTotalPercent = 62.52
    const registerSize = getHYP008RegisterSize()
    const lastYearTotalPatients = Math.round((lastYearTotalPercent / 100) * registerSize)
    return Math.round(yearProgress * lastYearTotalPatients)
  }
  return 0
}

const getLastYearClinicalTotal = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const lastYearPercent = 62.52
    const registerSize = getHYP008RegisterSize()
    return Math.round((lastYearPercent / 100) * registerSize)
  }
  return 0
}

const getLastYearClinicalAtThisTimePercent = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const yearProgress = getFinancialYearProgress()
    const lastYearTotalPercent = 62.52
    return Math.round(yearProgress * lastYearTotalPercent * 100) / 100
  }
  return 0
}

const getSubICBClinicalCompletionAverage = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return 68.06
  }
  return 0
}

const getSubICBClinicalCompletionAtThisTime = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const yearProgress = getFinancialYearProgress()
    const endOfYearValue = 68.06
    return Math.round(yearProgress * endOfYearValue * 100) / 100
  }
  return 0
}

const getLastYearExceptionAtThisTime = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const yearProgress = getFinancialYearProgress()
    const lastYearTotalPercent = 19.72
    const registerSize = getHYP008RegisterSize()
    const lastYearTotalPatients = Math.round((lastYearTotalPercent / 100) * registerSize)
    return Math.round(yearProgress * lastYearTotalPatients)
  }
  return 0
}

const getLastYearExceptionTotal = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const lastYearPercent = 19.72
    const registerSize = getHYP008RegisterSize()
    return Math.round((lastYearPercent / 100) * registerSize)
  }
  return 0
}

const getLastYearExceptionAtThisTimePercent = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const yearProgress = getFinancialYearProgress()
    const lastYearTotalPercent = 19.72
    return Math.round(yearProgress * lastYearTotalPercent * 100) / 100
  }
  return 0
}

const getSubICBExceptionReportingAverage = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return 12.75
  }
  return 0
}

const getSubICBExceptionReportingAtThisTime = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const yearProgress = getFinancialYearProgress()
    const endOfYearValue = 12.75
    return Math.round(yearProgress * endOfYearValue * 100) / 100
  }
  return 0
}
</script>
