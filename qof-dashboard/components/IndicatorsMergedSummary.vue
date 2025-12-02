<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <!-- Header with View in Planner Button -->
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-semibold text-gray-900">Summary</h3>
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
    
    <!-- Conditions with their target bars -->
    <div class="space-y-8">
      <div v-for="conditionInfo in conditionsWithTargets" :key="conditionInfo.condition">
        <!-- Condition Title -->
        <div class="mb-4">
          <h4 class="text-lg font-semibold text-gray-900">{{ conditionInfo.title }} targets</h4>
          
          <!-- Prevalence Card for Hypertension (if applicable) -->
          <div v-if="conditionInfo.showPrevalence" class="mt-3 mb-4">
            <div class="bg-gray-50 rounded-md px-3 py-2 border border-gray-200 inline-block">
              <div class="text-xs text-gray-600 mb-1">{{ conditionInfo.title }} Register Prevalence</div>
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
        </div>
        
        <!-- Target Bars for this condition -->
        <div class="space-y-6">
          <div v-for="target in conditionInfo.targetDetails" :key="target.code">
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
                <IndicatorsTargetCards :condition="conditionInfo.condition" :target-code="target.code" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useIndicatorsData } from '../composables/useIndicatorsData'

const props = defineProps({
  conditions: {
    type: Array,
    required: true
  }
})

const { expandedSections, toggleAccordion, initializeAccordionSections, getSummaryData, getFinancialYearProgress } = useIndicatorsData()

// Condition data mapping - get from IndicatorsContent
// This is a simplified version that matches the structure
const conditionMap = {
  'hypertension': {
    title: 'Hypertension',
    targetDetails: [
      { code: 'HYP008', qofCode: 'QOF_HYP008', minThreshold: 40, maxThreshold: 85, description: 'The percentage of patients aged 79 years or under with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 140/90 mmHg or less (or equivalent home blood pressure reading)' },
      { code: 'HYP009', qofCode: 'QOF_HYP009', minThreshold: 40, maxThreshold: 85, description: 'The percentage of patients aged 80 years or over with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 150/90 mmHg or less (or equivalent home blood pressure reading)' }
    ],
    showPrevalence: true
  },
  'cholesterol': {
    title: 'Cholesterol',
    targetDetails: [
      { code: 'CHOL003', qofCode: 'QOF_CHOL003', minThreshold: 70, maxThreshold: 95, description: 'Cholesterol management target CHOL003' },
      { code: 'CHOL004', qofCode: 'QOF_CHOL004', minThreshold: 20, maxThreshold: 50, description: 'Cholesterol management target CHOL004' }
    ],
    showPrevalence: false
  },
  'asthma': {
    title: 'Asthma',
    targetDetails: [
      { code: 'AST007', qofCode: 'QOF_AST007', minThreshold: 45, maxThreshold: 70, description: 'Asthma management target AST007' },
      { code: 'AST012', qofCode: 'QOF_AST012', minThreshold: 45, maxThreshold: 80, description: 'Asthma management target AST012' }
    ],
    showPrevalence: false
  },
  'atrial-fibrillation': {
    title: 'Atrial Fibrillation',
    targetDetails: [
      { code: 'AF006', qofCode: 'QOF_AF006', minThreshold: 40, maxThreshold: 90, description: 'Atrial fibrillation management target AF006' },
      { code: 'AF008', qofCode: 'QOF_AF008', minThreshold: 70, maxThreshold: 95, description: 'Atrial fibrillation management target AF008' }
    ],
    showPrevalence: false
  },
  'coronary-heart-disease': {
    title: 'Coronary Heart Disease',
    targetDetails: [
      { code: 'CHD005', qofCode: 'QOF_CHD005', minThreshold: 56, maxThreshold: 96, description: 'Coronary heart disease management target CHD005' },
      { code: 'CHD015', qofCode: 'QOF_CHD015', minThreshold: 40, maxThreshold: 90, description: 'Coronary heart disease management target CHD015' },
      { code: 'CHD016', qofCode: 'QOF_CHD016', minThreshold: 46, maxThreshold: 90, description: 'Coronary heart disease management target CHD016' }
    ],
    showPrevalence: false
  },
  'copd': {
    title: 'COPD',
    targetDetails: [
      { code: 'COPD010', qofCode: 'QOF_COPD010', minThreshold: 50, maxThreshold: 90, description: 'COPD management target COPD010' }
    ],
    showPrevalence: false
  },
  'heart-failure': {
    title: 'Heart Failure',
    targetDetails: [
      { code: 'HF003', qofCode: 'QOF_HF003', minThreshold: 60, maxThreshold: 92, description: 'Heart failure management target HF003' },
      { code: 'HF006', qofCode: 'QOF_HF006', minThreshold: 60, maxThreshold: 92, description: 'Heart failure management target HF006' },
      { code: 'HF007', qofCode: 'QOF_HF007', minThreshold: 50, maxThreshold: 90, description: 'Heart failure management target HF007' },
      { code: 'HF008', qofCode: 'QOF_HF008', minThreshold: 50, maxThreshold: 90, description: 'Heart failure management target HF008' }
    ],
    showPrevalence: false
  },
  'diabetes': {
    title: 'Diabetes',
    targetDetails: [
      { code: 'DM006', qofCode: 'QOF_DM006', minThreshold: 57, maxThreshold: 97, description: 'Diabetes management target DM006' },
      { code: 'DM012', qofCode: 'QOF_DM012', minThreshold: 50, maxThreshold: 90, description: 'Diabetes management target DM012' },
      { code: 'DM014', qofCode: 'QOF_DM014', minThreshold: 40, maxThreshold: 90, description: 'Diabetes management target DM014' },
      { code: 'DM020', qofCode: 'QOF_DM020', minThreshold: 37, maxThreshold: 75, description: 'Diabetes management target DM020' },
      { code: 'DM021', qofCode: 'QOF_DM021', minThreshold: 52, maxThreshold: 92, description: 'Diabetes management target DM021' },
      { code: 'DM034', qofCode: 'QOF_DM034', minThreshold: 50, maxThreshold: 90, description: 'Diabetes management target DM034' },
      { code: 'DM035', qofCode: 'QOF_DM035', minThreshold: 50, maxThreshold: 90, description: 'Diabetes management target DM035' },
      { code: 'DM036', qofCode: 'QOF_DM036', minThreshold: 38, maxThreshold: 90, description: 'Diabetes management target DM036' }
    ],
    showPrevalence: false
  },
  'dementia': {
    title: 'Dementia',
    targetDetails: [
      { code: 'DEM004', qofCode: 'QOF_DEM004', minThreshold: 35, maxThreshold: 70, description: 'Dementia care target DEM004' }
    ],
    showPrevalence: false
  },
  'mental-health': {
    title: 'Mental Health',
    targetDetails: [
      { code: 'MH002', qofCode: 'QOF_MH002', minThreshold: 40, maxThreshold: 90, description: 'Mental health management target MH002' },
      { code: 'MH003', qofCode: 'QOF_MH003', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH003' },
      { code: 'MH006', qofCode: 'QOF_MH006', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH006' },
      { code: 'MH007', qofCode: 'QOF_MH007', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH007' },
      { code: 'MH011', qofCode: 'QOF_MH011', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH011' },
      { code: 'MH012', qofCode: 'QOF_MH012', minThreshold: 50, maxThreshold: 90, description: 'Mental health management target MH012' }
    ],
    showPrevalence: false
  },
  'ndh': {
    title: 'NDH',
    targetDetails: [
      { code: 'NDH002', qofCode: 'QOF_NDH002', minThreshold: 50, maxThreshold: 90, description: 'Non-diabetic hyperglycaemia management target NDH002' }
    ],
    showPrevalence: false
  },
  'stroke-tia': {
    title: 'Stroke and TIA',
    targetDetails: [
      { code: 'STIA007', qofCode: 'QOF_STIA007', minThreshold: 57, maxThreshold: 97, description: 'Stroke and TIA management target STIA007' },
      { code: 'STIA014', qofCode: 'QOF_STIA014', minThreshold: 40, maxThreshold: 90, description: 'Stroke and TIA management target STIA014' },
      { code: 'STIA015', qofCode: 'QOF_STIA015', minThreshold: 46, maxThreshold: 90, description: 'Stroke and TIA management target STIA015' }
    ],
    showPrevalence: false
  },
  'blood-pressure': {
    title: 'Blood Pressure',
    targetDetails: [
      { code: 'BP002', qofCode: 'QOF_BP002', minThreshold: 50, maxThreshold: 90, description: 'Blood pressure management target BP002' }
    ],
    showPrevalence: false
  },
  'smoking': {
    title: 'Smoking',
    targetDetails: [
      { code: 'SMOK002', qofCode: 'QOF_SMOK002', minThreshold: 50, maxThreshold: 90, description: 'Smoking cessation target SMOK002' },
      { code: 'SMOK004', qofCode: 'QOF_SMOK004', minThreshold: 40, maxThreshold: 90, description: 'Smoking cessation target SMOK004' }
    ],
    showPrevalence: false
  },
  'vaccination-immunisations': {
    title: 'Vaccination and Immunisations',
    targetDetails: [
      { code: 'VI001', qofCode: 'QOF_VI001', minThreshold: 89, maxThreshold: 96, description: 'Vaccination and immunisations target VI001' },
      { code: 'VI002', qofCode: 'QOF_VI002', minThreshold: 86, maxThreshold: 96, description: 'Vaccination and immunisations target VI002' },
      { code: 'VI003', qofCode: 'QOF_VI003', minThreshold: 86, maxThreshold: 96, description: 'Vaccination and immunisations target VI003' },
      { code: 'VI004', qofCode: 'QOF_VI004', minThreshold: 57, maxThreshold: 97, description: 'Vaccination and immunisations target VI004' }
    ],
    showPrevalence: false
  },
  'cervical-screening': {
    title: 'Cervical Screening',
    targetDetails: [
      { code: 'CS005', qofCode: 'QOF_CS005', minThreshold: 45, maxThreshold: 80, description: 'Cervical screening target CS005' },
      { code: 'CS006', qofCode: 'QOF_CS006', minThreshold: 45, maxThreshold: 80, description: 'Cervical screening target CS006' }
    ],
    showPrevalence: false
  }
}

// Get conditions that have targetDetails
const conditionsWithTargets = computed(() => {
  return props.conditions
    .map(condition => {
      const data = conditionMap[condition]
      if (data && data.targetDetails && data.targetDetails.length > 0) {
        return {
          condition,
          ...data
        }
      }
      return null
    })
    .filter(Boolean)
})

// Get expected achievement for a specific target
const getExpectedAchievementForTarget = (target) => {
  const yearProgress = getFinancialYearProgress()
  const maxThreshold = target.maxThreshold || 85
  return yearProgress * maxThreshold
}

// Initialize accordion sections when component mounts
onMounted(() => {
  conditionsWithTargets.value.forEach(conditionInfo => {
    if (conditionInfo.targetDetails) {
      const targetCodes = conditionInfo.targetDetails.map(t => t.code)
      initializeAccordionSections(targetCodes)
    }
  })
})
</script>

