<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <div class="flex justify-between items-center mb-6 relative">
      <h3 class="text-xl font-semibold text-gray-900">Summary</h3>
      
      <!-- Condition Register Prevalence Card (Centered) - Only for Hypertension -->
      <div v-if="conditionData.showPrevalence" class="absolute left-1/2 transform -translate-x-1/2">
        <div class="bg-gray-50 rounded-md px-3 py-2 border border-gray-200">
          <div class="text-xs text-gray-600 mb-1">{{ conditionData.title }} Register Prevalence</div>
          <div class="flex items-baseline gap-3">
            <div>
              <span class="text-xs text-gray-500">Current:</span>
              <span class="text-sm font-bold text-gray-900 ml-1">10.33%</span>
            </div>
            <div>
              <span class="text-xs text-gray-500">Sub ICB:</span>
              <span class="text-sm font-bold text-gray-900 ml-1">14.17%</span>
              <span class="text-xs text-red-600 ml-1">(-3.84%)</span>
            </div>
            <div>
              <span class="text-xs text-gray-500">National:</span>
              <span class="text-sm font-bold text-gray-900 ml-1">14.8%</span>
              <span class="text-xs text-red-600 ml-1">(-4.47%)</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- View in Planner Button -->
      <button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
        View in Planner
      </button>
    </div>
    
    <!-- Legend - Bar Segments and Vertical Lines on same row -->
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <!-- Bar Segment Labels -->
      <div class="flex items-center">
        <div class="w-4 h-4 bg-green-600 rounded mr-2"></div>
        <span class="text-sm text-gray-700">Clinically complete</span>
      </div>
      <div class="flex items-center">
        <div class="w-4 h-4 bg-gray-300 rounded mr-2"></div>
        <span class="text-sm text-gray-700">Exception reported - invited</span>
      </div>
      <div class="flex items-center">
        <div class="w-4 h-4 bg-blue-600 rounded mr-2"></div>
        <span class="text-sm text-gray-700">Incomplete</span>
      </div>
      
      <!-- Vertical Lines Legend (in line with bar segment labels) -->
      <div class="flex items-center">
        <div class="w-4 h-4 border-l-2 border-dashed border-red-500 mr-2"></div>
        <span class="text-sm text-gray-700">Min achievement</span>
      </div>
      <div class="flex items-center">
        <div class="w-4 h-4 border-l-2 border-dashed border-purple-500 mr-2"></div>
        <span class="text-sm text-gray-700">Expected by today</span>
      </div>
      <div class="flex items-center">
        <div class="w-4 h-4 border-l-2 border-dashed border-green-500 mr-2"></div>
        <span class="text-sm text-gray-700">Max achievement</span>
      </div>
    </div>
    
    <!-- Stacked Bar Chart -->
    <div class="space-y-6">
      <!-- Dynamic Bars for each target -->
      <div v-for="target in conditionData.targetDetails" :key="target.code">
        <div class="flex items-center mb-2">
          <button 
            @click="toggleAccordion(target.code)"
            class="flex items-center text-sm font-medium text-gray-900 w-24 hover:text-blue-600 transition-colors"
          >
            <svg 
              class="w-4 h-4 mr-1 transition-transform"
              :class="{ 'rotate-90': expandedSections[target.code] }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            {{ target.code }}
          </button>
          <div class="flex-1 relative bg-gray-100 rounded overflow-visible cursor-pointer" style="padding-bottom: 30px;" @click="toggleAccordion(target.code)">
            <!-- Bar container -->
            <div class="relative h-8">
              <!-- Complete -->
              <div 
                class="absolute left-0 top-0 h-full bg-green-600 flex items-center justify-center" 
                :style="`width: ${getSummaryData(target.code).complete}%`"
              >
                <span class="text-xs font-semibold text-white">{{ getSummaryData(target.code).complete }}% ({{ getSummaryData(target.code).completePatients }})</span>
              </div>
              <!-- Exception reported - invited -->
              <div 
                class="absolute h-full bg-gray-300 flex items-center justify-center" 
                :style="`left: ${getSummaryData(target.code).complete}%; width: ${getSummaryData(target.code).exceptionInvited}%`"
              >
                <span class="text-xs font-semibold text-gray-700">{{ getSummaryData(target.code).exceptionInvited }}% ({{ getSummaryData(target.code).exceptionInvitedPatients }})</span>
              </div>
              <!-- Incomplete -->
              <div 
                class="absolute right-0 top-0 h-full bg-blue-600 flex items-center justify-center" 
                :style="`width: ${getSummaryData(target.code).incomplete}%`"
              >
                <span class="text-xs font-semibold text-white">{{ getSummaryData(target.code).incomplete }}% ({{ getSummaryData(target.code).incompletePatients }})</span>
              </div>
              
              <!-- Min Achievement Threshold - Red -->
              <div 
                class="absolute top-0 bottom-0 pointer-events-none z-10"
                :style="`left: ${target.minThreshold}%; width: 0;`"
              >
                <div class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-red-500"></div>
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-red-500 rotate-45"></div>
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-red-500 rotate-45"></div>
              </div>
              
              <!-- Max Achievement Threshold - Green -->
              <div 
                class="absolute top-0 bottom-0 pointer-events-none z-10"
                :style="`left: ${target.maxThreshold}%; width: 0;`"
              >
                <div class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-green-500"></div>
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-green-500 rotate-45"></div>
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-green-500 rotate-45"></div>
              </div>
              
              <!-- Expected by Today - Purple -->
              <div 
                class="absolute top-0 bottom-0 pointer-events-none z-10"
                :style="`left: ${getExpectedAchievementForTarget(target)}%; width: 0;`"
              >
                <div class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-purple-500"></div>
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-purple-500 rotate-45"></div>
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-purple-500 rotate-45"></div>
              </div>
            </div>
            
            <!-- X-axis for percentage complete -->
            <div class="absolute bottom-0 left-0 right-0" style="height: 30px;">
              <div class="relative w-full h-full">
                <template v-for="(percent, index) in [0, 20, 40, 60, 80, 100]" :key="index">
                  <div class="absolute flex flex-col items-center" :style="`left: ${percent}%; transform: translateX(-50%);`">
                    <div class="w-0.5 h-2 bg-gray-400 mb-1"></div>
                    <span class="text-xs text-gray-600 font-medium">{{ percent }}%</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Expanded Target Content -->
        <div v-show="expandedSections[target.code]" class="mt-6 -mx-6 -mb-6">
          <div class="bg-white border-t border-gray-200">
            <IndicatorsTargetCards :condition="condition" :target-code="target.code" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useIndicatorsData } from '../composables/useIndicatorsData'

const props = defineProps({
  condition: {
    type: String,
    required: true
  }
})

const { expandedSections, toggleAccordion, initializeAccordionSections, getExpectedAchievementForSummary, getSummaryData, getFinancialYearProgress } = useIndicatorsData()

// Condition data mapping - get from the same source as IndicatorsContent
const conditionMap = {
  'hypertension': {
    title: 'Hypertension',
    targetDetails: [
      { code: 'HYP008', minThreshold: 40, maxThreshold: 85 },
      { code: 'HYP009', minThreshold: 40, maxThreshold: 85 }
    ],
    showPrevalence: true
  },
  'cholesterol': {
    title: 'Cholesterol',
    targetDetails: [
      { code: 'CHOL003', minThreshold: 70, maxThreshold: 95 },
      { code: 'CHOL004', minThreshold: 20, maxThreshold: 50 }
    ],
    showPrevalence: false
  }
}

const conditionData = computed(() => {
  const baseData = conditionMap[props.condition]
  if (!baseData) return conditionMap['hypertension']
  
  // Get targetDetails from the full condition map if available
  // This ensures we have the full target details including descriptions
  const fullConditionMap = {
    'hypertension': {
      targetDetails: [
        { code: 'HYP008', qofCode: 'QOF_HYP008', minThreshold: 40, maxThreshold: 85, description: 'The percentage of patients aged 79 years or under with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 140/90 mmHg or less (or equivalent home blood pressure reading)' },
        { code: 'HYP009', qofCode: 'QOF_HYP009', minThreshold: 40, maxThreshold: 85, description: 'The percentage of patients aged 80 years or over with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 150/90 mmHg or less (or equivalent home blood pressure reading)' }
      ],
      showPrevalence: true
    },
    'cholesterol': {
      targetDetails: [
        { code: 'CHOL003', qofCode: 'QOF_CHOL003', minThreshold: 70, maxThreshold: 95, description: 'Cholesterol management target CHOL003' },
        { code: 'CHOL004', qofCode: 'QOF_CHOL004', minThreshold: 20, maxThreshold: 50, description: 'Cholesterol management target CHOL004' }
      ],
      showPrevalence: false
    }
  }
  
  return fullConditionMap[props.condition] || baseData
})

// Get expected achievement for a specific target
const getExpectedAchievementForTarget = (target) => {
  const yearProgress = getFinancialYearProgress()
  const maxThreshold = target.maxThreshold || 85
  return yearProgress * maxThreshold
}

// Initialize accordion sections when component mounts
onMounted(() => {
  if (conditionData.value.targetDetails) {
    const targetCodes = conditionData.value.targetDetails.map(t => t.code)
    initializeAccordionSections(targetCodes)
  }
})
</script>
