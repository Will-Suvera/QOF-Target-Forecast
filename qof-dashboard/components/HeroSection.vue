<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <!-- QOF Forecast Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">Your forecast for this QOF year</h3>
      <p class="text-sm text-gray-600 mb-6">Showing potential QOF achievement, based on recalling method.</p>
      
      <!-- Progress Bars Container -->
      <div class="relative" style="min-height: 200px; padding-top: 40px; padding-bottom: 50px;">
        <!-- Expected at Time of Year Label - Above the graph -->
        <div class="absolute top-0 left-0 right-0 z-10 pointer-events-none" style="height: 30px;">
          <div class="relative w-full">
            <!-- Label on the left, with max width to prevent overlap -->
            <span class="absolute left-0 text-sm text-purple-600 font-semibold whitespace-nowrap" :style="`max-width: calc(${expectedWorkDonePercentage}% - 60px); overflow: hidden; text-overflow: ellipsis;`">Expected at time of year</span>
            <!-- Percentage aligned with expected mark, with clear spacing -->
            <span class="absolute text-sm text-purple-600 font-semibold whitespace-nowrap" :style="`left: ${expectedWorkDonePercentage}%; margin-left: 16px;`">{{ Math.round(expectedWorkDonePercentage * 10) / 10 }}%</span>
          </div>
        </div>
        
        <!-- Expected at Time of Year Vertical Line -->
        <div class="absolute z-10 pointer-events-none" :style="`left: ${expectedWorkDonePercentage}%; top: 30px; bottom: 50px;`">
          <!-- Vertical dashed line -->
          <div class="absolute left-0 top-0 bottom-0 border-l-2 border-dashed border-purple-500" style="transform: translateX(-50%);"></div>
          <!-- Top diamond marker -->
          <div class="absolute left-0 top-0 w-2 h-2 bg-purple-500" style="transform: translateX(-50%) translateY(-4px) rotate(45deg);"></div>
          <!-- Bottom diamond marker -->
          <div class="absolute left-0 bottom-0 w-2 h-2 bg-purple-500" style="transform: translateX(-50%) translateY(4px) rotate(45deg);"></div>
        </div>
        
        <!-- Progress Bars -->
        <div class="space-y-4 relative z-0">
          <!-- Work Done -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700">Work Done</span>
              <span class="text-sm font-semibold text-gray-900">{{ forecast.current }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-6 relative overflow-visible">
              <div class="bg-amber-700 h-6 rounded-full" :style="`width: ${forecast.current}%`"></div>
            </div>
          </div>
          
          <!-- Points achieved -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700">Points achieved</span>
              <span class="text-sm font-semibold text-gray-900">{{ pointsAchieved }} out of {{ maxPoints }} points</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-6 relative overflow-visible">
              <div class="bg-blue-800 h-6 rounded-full" :style="`width: ${(pointsAchieved / maxPoints) * 100}%`"></div>
            </div>
          </div>
        </div>
        
        <!-- X-axis with all 12 months - Close to bottom of progress bars -->
        <div class="absolute bottom-0 left-0 right-0 z-10 pointer-events-none" style="height: 50px; padding-top: 8px;">
          <div class="relative w-full flex justify-between items-start" style="padding-left: 0; padding-right: 0;">
            <template v-for="(month, index) in months" :key="index">
              <div class="flex flex-col items-center" style="flex: 1;">
                <span class="text-xs text-gray-600 font-medium">{{ month }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Estimated Value Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">Estimated value</h3>
      <p class="text-sm text-gray-600 mb-6">How much you could gain in returns.</p>
      
      <div class="grid grid-cols-3 gap-4 mb-6">
        <!-- Current -->
        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">Current</div>
          <div class="text-2xl font-bold text-gray-500">£{{ forecast.currentValue.toLocaleString() }}</div>
        </div>
        
        <!-- Planner -->
        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">Planner</div>
          <div class="text-2xl font-bold text-green-600">£{{ forecast.plannerValue.toLocaleString() }}</div>
        </div>
        
        <!-- Suvera Clinic -->
        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">Suvera Clinic</div>
          <div class="text-2xl font-bold text-green-600">£{{ forecast.suveraValue.toLocaleString() }}</div>
        </div>
      </div>
      
      <button class="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center justify-center">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        View pricing breakdown
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  condition: {
    type: String,
    default: null
  }
})

const { getForecastData } = useForecastData()

const forecast = computed(() => {
  const data = getForecastData(props.condition)
  
  // For hypertension, calculate "Work Done" as average of (Complete + Exception invited) for HYP008 and HYP009
  if (props.condition === 'hypertension') {
    const hyp008Data = getSummaryData('HYP008')
    const hyp009Data = getSummaryData('HYP009')
    
    // Work Done = (Complete + Exception invited) for each, then average
    const hyp008WorkDone = hyp008Data.complete + hyp008Data.exceptionInvited
    const hyp009WorkDone = hyp009Data.complete + hyp009Data.exceptionInvited
    const averageWorkDone = (hyp008WorkDone + hyp009WorkDone) / 2
    
    return {
      ...data,
      current: Math.round(averageWorkDone * 10) / 10 // Round to 1 decimal
    }
  }
  
  return data
})

// Calculate points achieved - for hypertension, use actual QOF points calculation
const pointsAchieved = computed(() => {
  // For hypertension, calculate points from HYP008 and HYP009
  if (props.condition === 'hypertension') {
    return getHypertensionPoints()
  }
  // For other conditions, use the old calculation
  return Math.round((forecast.value.withPlanner / 100) * 564)
})

// Maximum points available - for hypertension it's 38 + 14 = 52
const maxPoints = computed(() => {
  if (props.condition === 'hypertension') {
    return 52 // 38 (HYP008) + 14 (HYP009)
  }
  return 564
})

// Calculate hypertension points based on achievement percentages
const getHypertensionPoints = () => {
  // Get achievement percentages for HYP008 and HYP009
  // Using the summary data which shows current achievement
  const hyp008Data = getSummaryData('HYP008')
  const hyp009Data = getSummaryData('HYP009')
  
  // Calculate achievement percentage for each
  // HYP008: complete + exceptionClinical + exceptionInvited = total achievement
  const hyp008Achievement = hyp008Data.complete + hyp008Data.exceptionClinical + hyp008Data.exceptionInvited
  const hyp009Achievement = hyp009Data.complete + hyp009Data.exceptionClinical + hyp009Data.exceptionInvited
  
  // Calculate points for each indicator
  const hyp008Points = calculateQOFPoints(hyp008Achievement, 40, 85, 38)
  const hyp009Points = calculateQOFPoints(hyp009Achievement, 40, 85, 14)
  
  return Math.round((hyp008Points + hyp009Points) * 10) / 10
}

// Helper function to calculate QOF points based on achievement percentage
const calculateQOFPoints = (achievement, minThreshold, maxThreshold, maxPoints) => {
  if (achievement < minThreshold) {
    return 0
  }
  if (achievement >= maxThreshold) {
    return maxPoints
  }
  // Linear interpolation
  const points = 1 + ((achievement - minThreshold) / (maxThreshold - minThreshold)) * (maxPoints - 1)
  return points
}

// Get summary data for hypertension indicators
// HYP008: Total completion 67.3%, Clinical 54.4%, Exception Invited 12.9%
// HYP009: Total completion 71.8%, Clinical 67%, Exception Invited 4.8%
const getSummaryData = (targetCode) => {
  const summaryData = {
    'HYP008': {
      complete: 54.4,
      incomplete: 32.7,
      exceptionInvited: 12.9,
      exceptionClinical: 0
    },
    'HYP009': {
      complete: 67,
      incomplete: 28.2,
      exceptionInvited: 4.8,
      exceptionClinical: 0
    }
  }
  return summaryData[targetCode] || { complete: 0, incomplete: 0, exceptionInvited: 0, exceptionClinical: 0 }
}

// Calculate financial year progress (0 to 1)
// Financial year runs from April 1 to March 31
const getFinancialYearProgress = () => {
  const today = new Date()
  const currentYear = today.getFullYear()
  
  // Determine which financial year we're in
  // If month is Jan-Mar, we're in the financial year that started the previous April
  // If month is Apr-Dec, we're in the financial year that started this April
  let financialYearStart
  if (today.getMonth() < 3) { // Jan (0), Feb (1), Mar (2)
    financialYearStart = new Date(currentYear - 1, 3, 1) // April 1 of previous year
  } else {
    financialYearStart = new Date(currentYear, 3, 1) // April 1 of current year
  }
  
  // Calculate days from financial year start to today
  const daysElapsed = Math.floor((today - financialYearStart) / (1000 * 60 * 60 * 24))
  
  // Total days in a year (365, or 366 for leap years)
  const daysInYear = ((financialYearStart.getFullYear() % 4 === 0 && financialYearStart.getFullYear() % 100 !== 0) || 
                       (financialYearStart.getFullYear() % 400 === 0)) ? 366 : 365
  
  // Calculate percentage of year elapsed
  return daysElapsed / daysInYear
}

// Calculate expected work done percentage based on time of year
// This assumes work should be done proportionally throughout the year
const expectedWorkDonePercentage = computed(() => {
  const yearProgress = getFinancialYearProgress()
  // Expected work done = year progress * 100%
  // This gives us what percentage of work should be done by now
  return yearProgress * 100
})

// Months for the x-axis (Apr 2025 - Mar 2026)
const months = [
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar'
]
</script>

