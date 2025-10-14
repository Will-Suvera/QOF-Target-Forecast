<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Welcome Section -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center space-x-4 mb-4 sm:mb-0">
          <h2 class="text-2xl font-bold text-gray-900">Hello, Clara</h2>
          <span class="text-gray-500">{{ currentDate }}</span>
          <span class="text-gray-500">{{ weekRange }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Left Sidebar - Filters -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
          
          <!-- Practice Filter -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Practice</label>
            <select class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>All Practices</option>
              <option>Maltings Surgery</option>
              <option>Summerfield Health Center</option>
            </select>
          </div>

          <!-- Date Range Filter -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Custom range</option>
            </select>
          </div>

          <!-- QOF Period Filter -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">QOF Period</label>
            <select class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>QOF 25/26</option>
              <option>QOF 24/25</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="lg:col-span-3">
        <!-- QOF Points Overview -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">QOF Points</h3>
            <span class="text-2xl font-bold text-blue-600">564</span>
          </div>
          <div class="flex items-center justify-center">
            <CircularGauge :percentage="90" :size="120" color="blue" />
          </div>
        </div>

        <!-- Clinical Domain Section -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Clinical Domain (437 Points)</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Asthma -->
            <ConditionCard
              title="Asthma"
              code="AST"
              percentage="52"
              trend="+5%"
              trend-direction="up"
              color="green"
            />
            
            <!-- Hypertension -->
            <ConditionCard
              title="Hypertension"
              code="HYP"
              percentage="29"
              trend="-2%"
              trend-direction="down"
              color="orange"
            />
            
            <!-- Cholesterol -->
            <ConditionCard
              title="Cholesterol"
              code="CHOL"
              percentage="80"
              trend="+12%"
              trend-direction="up"
              color="blue"
            />
            
            <!-- Diabetes -->
            <ConditionCard
              title="Diabetes"
              code="DM"
              percentage="2"
              trend="+1%"
              trend-direction="up"
              color="red"
            />
            
            <!-- Atrial Fibrillation -->
            <ConditionCard
              title="Atrial Fibrillation"
              code="AF"
              percentage="60"
              trend="+8%"
              trend-direction="up"
              color="pink"
            />
            
            <!-- Coronary Heart Disease -->
            <ConditionCard
              title="Coronary Heart Disease"
              code="CHD"
              percentage="40"
              trend="-3%"
              trend-direction="down"
              color="purple"
            />
            
            <!-- Heart Failure -->
            <ConditionCard
              title="Heart Failure"
              code="HF"
              percentage="20"
              trend="+2%"
              trend-direction="up"
              color="cyan"
            />
            
            <!-- Stroke and TIA -->
            <ConditionCard
              title="Stroke and TIA"
              code="STIA"
              percentage="10"
              trend="+1%"
              trend-direction="up"
              color="yellow"
            />
            
            <!-- Diabetes Mellitus -->
            <ConditionCard
              title="Diabetes Mellitus"
              code="DM"
              percentage="2"
              trend="+1%"
              trend-direction="up"
              color="indigo"
            />
            
            <!-- COPD -->
            <ConditionCard
              title="COPD"
              code="COPD"
              percentage="30"
              trend="+5%"
              trend-direction="up"
              color="teal"
            />
            
            <!-- Dementia -->
            <ConditionCard
              title="Dementia"
              code="DEM"
              percentage="10"
              trend="+2%"
              trend-direction="up"
              color="emerald"
            />
            
            <!-- Mental Health -->
            <ConditionCard
              title="Mental Health"
              code="MDH"
              percentage="60"
              trend="+10%"
              trend-direction="up"
              color="lime"
            />
            
            <!-- Non-Diabetic Hyperglycaemia -->
            <ConditionCard
              title="Non-Diabetic Hyperglycaemia"
              code="NDH"
              percentage="20"
              trend="+3%"
              trend-direction="up"
              color="amber"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const currentDate = ref('')
const weekRange = ref('')

// Calculate current date and week range
onMounted(() => {
  const now = new Date()
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  currentDate.value = now.toLocaleDateString('en-GB', options)
  
  // Calculate current week (Monday to Friday)
  const startOfWeek = new Date(now)
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
  startOfWeek.setDate(diff)
  
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 4) // Friday
  
  const formatDate = (date) => {
    return date.getDate().toString().padStart(2, '0') + ' ' + 
           date.toLocaleDateString('en-GB', { month: 'short' })
  }
  
  weekRange.value = `w/c ${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`
})
</script>
