<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Top Row: Logo, Navigation, User -->
        <div class="flex justify-between items-center h-14">
          <!-- Left side - Brand and Navigation -->
          <div class="flex items-center">
            <!-- Logo -->
            <div class="flex items-center mr-12">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-purple-600 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span class="text-lg font-bold text-gray-900">QOF Forecaster</span>
            </div>
            
            <!-- Navigation -->
            <nav class="hidden md:flex space-x-8">
              <NuxtLink to="/" class="text-gray-900 font-semibold border-b-2 border-blue-600 px-1 pb-3 text-sm flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Dashboard
              </NuxtLink>
              <NuxtLink to="/summary" class="text-gray-600 hover:text-gray-900 px-1 pb-3 text-sm font-medium flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Summary
              </NuxtLink>
              <NuxtLink to="/pricing" class="text-gray-600 hover:text-gray-900 px-1 pb-3 text-sm font-medium flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                Pricing
              </NuxtLink>
            </nav>
          </div>

          <!-- Right side - User -->
          <div class="flex items-center">
            <!-- User Avatar -->
            <div class="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full flex items-center cursor-pointer hover:bg-gray-200">
              <span class="text-sm font-medium mr-1">CG</span>
              <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Welcome Section -->
        <div class="mb-8 flex items-start justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Hello, Pilly 👋</h1>
            <div class="text-lg text-gray-600">{{ formattedDate }}</div>
          </div>
          <!-- Practice Information Card -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 px-5 py-4">
            <div class="grid grid-cols-2 gap-x-8 gap-y-3">
              <div class="flex items-center">
                <span class="text-xs font-medium text-gray-500 w-32">GP Practice Name:</span>
                <span class="text-sm font-normal text-gray-900">Maltings Surgery (E82031)</span>
              </div>
          <div class="flex items-center">
                <span class="text-xs font-medium text-gray-500 w-28">PCN Name:</span>
                <span class="text-sm font-normal text-gray-900">Abbey Health PCN (U06079)</span>
              </div>
              <div class="flex items-center">
                <span class="text-xs font-medium text-gray-500 w-32">ICB Name:</span>
                <span class="text-sm font-normal text-gray-900">NHS Hertfordshire and West Essex ICB (06N)</span>
              </div>
              <div class="flex items-center">
                <span class="text-xs font-medium text-gray-500 w-32">Patient List Size:</span>
                <span class="text-sm font-semibold text-gray-900">19,026</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Hero Section - Update based on selected condition -->
        <HeroSection :condition="expandedConditions.length > 0 ? expandedConditions[0] : null" />

        <!-- Clinical Domain Section -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Clinical Domain</h2>
        </div>

        <!-- Indicator Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <!-- Asthma -->
              <div 
                @click="toggleCondition('asthma')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded('asthma') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">Asthma</h4>
                  <span class="text-sm font-semibold text-gray-900">52%</span>
                  </div>
                </div>

              <!-- Hypertension -->
              <div 
                @click="toggleCondition('hypertension')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded('hypertension') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">Hypertension</h4>
                  <span class="text-sm font-semibold text-gray-900">29%</span>
                  </div>
                </div>

              <!-- Cholesterol -->
              <div 
                @click="toggleCondition('cholesterol')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded('cholesterol') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">Cholesterol</h4>
                  <span class="text-sm font-semibold text-gray-900">80%</span>
                  </div>
                </div>

              <!-- Diabetes -->
              <div 
                @click="toggleCondition('diabetes')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'diabetes') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">Diabetes</h4>
                  <span class="text-sm font-semibold text-gray-900">2%</span>
                </div>
                </div>

              <!-- COPD -->
              <div 
                @click="toggleCondition('copd')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'copd') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">COPD</h4>
                  <span class="text-sm font-semibold text-gray-900">45%</span>
                  </div>
                </div>

              <!-- Heart Failure -->
              <div 
                @click="toggleCondition('heart-failure')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'heart-failure') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">Heart Failure</h4>
                  <span class="text-sm font-semibold text-gray-900">38%</span>
                  </div>
                </div>

              <!-- Atrial Fibrillation -->
              <div 
                @click="toggleCondition('atrial-fibrillation')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'atrial-fibrillation') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">Atrial Fibrillation</h4>
                  <span class="text-sm font-semibold text-gray-900">61%</span>
                  </div>
                </div>

              <!-- Coronary Heart Disease -->
              <div 
                @click="toggleCondition('coronary-heart-disease')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'coronary-heart-disease') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">Coronary Heart Disease</h4>
                  <span class="text-sm font-semibold text-gray-900">67%</span>
                  </div>
                </div>

              <!-- Dementia -->
              <div 
                @click="toggleCondition('dementia')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'dementia') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">Dementia</h4>
                  <span class="text-sm font-semibold text-gray-900">34%</span>
                  </div>
                </div>

              <!-- Mental Health -->
              <div 
                @click="toggleCondition('mental-health')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'mental-health') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">Mental Health</h4>
                  <span class="text-sm font-semibold text-gray-900">56%</span>
                  </div>
                </div>

              <!-- NDH -->
              <div 
                @click="toggleCondition('ndh')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'ndh') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">NDH</h4>
                  <span class="text-sm font-semibold text-gray-900">42%</span>
                </div>
                </div>

              <!-- Stroke and TIA -->
              <div 
                @click="toggleCondition('stroke-tia')"
                :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'stroke-tia') ? 'border-blue-500' : 'border-gray-200']"
              >
                <div class="flex justify-between items-center">
                  <h4 class="text-xs font-medium text-gray-900">Stroke and TIA</h4>
                  <span class="text-sm font-semibold text-gray-900">48%</span>
                  </div>
                </div>

            </div>

        <!-- Public Health Domain Section -->
        <div class="mt-12 mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Public Health Domain</h2>
        </div>

        <!-- Public Health Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <!-- Blood Pressure -->
          <div 
            @click="toggleCondition('blood-pressure')"
            :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'blood-pressure') ? 'border-blue-500' : 'border-gray-200']"
          >
            <div class="flex justify-between items-center">
              <h4 class="text-xs font-medium text-gray-900">Blood Pressure</h4>
              <span class="text-sm font-semibold text-gray-900">58%</span>
              </div>
            </div>

          <!-- Smoking -->
          <div 
            @click="toggleCondition('smoking')"
            :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'smoking') ? 'border-blue-500' : 'border-gray-200']"
          >
            <div class="flex justify-between items-center">
              <h4 class="text-xs font-medium text-gray-900">Smoking</h4>
              <span class="text-sm font-semibold text-gray-900">72%</span>
              </div>
            </div>

          <!-- Vaccination and Immunisations -->
          <div 
            @click="toggleCondition('vaccination-immunisations')"
            :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'vaccination-immunisations') ? 'border-blue-500' : 'border-gray-200']"
          >
            <div class="flex justify-between items-center">
              <h4 class="text-xs font-medium text-gray-900">Vaccination and Immunisations</h4>
              <span class="text-sm font-semibold text-gray-900">85%</span>
              </div>
            </div>

          <!-- Cervical Screening -->
          <div 
            @click="toggleCondition('cervical-screening')"
            :class="['bg-white rounded-md shadow-sm border px-3 py-2 cursor-pointer hover:shadow-md transition-shadow', isConditionExpanded( 'cervical-screening') ? 'border-blue-500' : 'border-gray-200']"
          >
            <div class="flex justify-between items-center">
              <h4 class="text-xs font-medium text-gray-900">Cervical Screening</h4>
              <span class="text-sm font-semibold text-gray-900">64%</span>
            </div>
                </div>
              </div>

        <!-- Expanded Conditions Content -->
        <div v-if="expandedConditions.length > 0" class="mt-8">
          <!-- Check if we have conditions with targetDetails for merged summary -->
          <template v-if="hasConditionsWithTargetDetails">
            <IndicatorsMergedSummary :conditions="expandedConditions" />
          </template>
          
          <!-- Otherwise show individual condition content -->
          <template v-else>
            <div class="space-y-8">
              <IndicatorsContent 
                v-for="condition in expandedConditions" 
                :key="condition"
                :condition="condition" 
              />
            </div>
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const route = useRoute()

// Track which conditions are expanded (array to support multiple)
const expandedConditions = ref([])

// Toggle condition expansion (supports multiple)
const toggleCondition = (condition) => {
  const index = expandedConditions.value.indexOf(condition)
  if (index > -1) {
    // Remove if already expanded
    expandedConditions.value.splice(index, 1)
  } else {
    // Add if not expanded
    expandedConditions.value.push(condition)
  }
}

// Check if a condition is expanded
const isConditionExpanded = (condition) => {
  return expandedConditions.value.includes(condition)
}

// Condition data mapping to check for targetDetails
const conditionMap = {
  'hypertension': { targetDetails: true },
  'cholesterol': { targetDetails: true },
  'asthma': { targetDetails: true },
  'atrial-fibrillation': { targetDetails: true },
  'coronary-heart-disease': { targetDetails: true },
  'copd': { targetDetails: true },
  'heart-failure': { targetDetails: true },
  'diabetes': { targetDetails: true },
  'dementia': { targetDetails: true },
  'mental-health': { targetDetails: true },
  'ndh': { targetDetails: true },
  'stroke-tia': { targetDetails: true },
  'blood-pressure': { targetDetails: true },
  'smoking': { targetDetails: true },
  'vaccination-immunisations': { targetDetails: true },
  'cervical-screening': { targetDetails: true }
}

// Check if we should show merged summary (multiple conditions selected and at least one has targetDetails)
const hasConditionsWithTargetDetails = computed(() => {
  if (expandedConditions.value.length < 2) return false
  return expandedConditions.value.some(condition => {
    return conditionMap[condition] && conditionMap[condition].targetDetails
  })
})

// Get condition title
const getConditionTitle = (condition) => {
  const titles = {
    'asthma': 'Asthma',
    'hypertension': 'Hypertension',
    'cholesterol': 'Cholesterol',
    'diabetes': 'Diabetes',
    'copd': 'COPD',
    'heart-failure': 'Heart Failure',
    'atrial-fibrillation': 'Atrial Fibrillation',
    'coronary-heart-disease': 'Coronary Heart Disease',
    'dementia': 'Dementia',
    'mental-health': 'Mental Health',
    'ndh': 'NDH',
    'stroke-tia': 'Stroke and TIA',
    'blood-pressure': 'Blood Pressure',
    'smoking': 'Smoking',
    'vaccination-immunisations': 'Vaccination and Immunisations',
    'cervical-screening': 'Cervical Screening'
  }
  return titles[condition] || condition
}

// Reactive data
const formattedDate = computed(() => {
  const now = new Date()
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return `Today is ${now.toLocaleDateString('en-US', options)}`
})

// Calculate current date and week range
onMounted(() => {
  animateProgress()
})

const animateProgress = () => {
  const progressData = {
    'asthma-progress': 52,
    'hypertension-progress': 29,
    'cholesterol-progress': 80,
    'diabetes-progress': 2,
    'copd-progress': 45,
    'heart-failure-progress': 38,
    'atrial-fibrillation-progress': 61,
    'coronary-heart-disease-progress': 67,
    'dementia-progress': 34,
    'mental-health-progress': 56,
    'ndh-progress': 42,
    'stroke-tia-progress': 48,
    'blood-pressure-progress': 58,
    'smoking-progress': 72,
    'vaccination-immunisations-progress': 85,
    'cervical-screening-progress': 64
  }

  // Use nextTick to ensure DOM is ready
  setTimeout(() => {
    Object.entries(progressData).forEach(([id, percentage]) => {
      const element = document.getElementById(id)
      if (element) {
        const radius = 35
        const circumference = 2 * Math.PI * radius
        const offset = circumference - (percentage / 100) * circumference
        element.style.strokeDashoffset = offset
      }
    })
  }, 100)
}
</script>