<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <!-- QOF Forecast Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">Your forecast for this QOF year</h3>
      <p class="text-sm text-gray-600 mb-6">Showing potential QOF achievement, based on recalling method.</p>
      
      <!-- Progress Bars Container -->
      <div class="relative" style="min-height: 200px; padding-bottom: 50px;">
        <!-- Progress Bars -->
        <div class="space-y-4 relative z-0 mb-8">
          <!-- Current -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700">Current</span>
              <span class="text-sm font-semibold text-gray-900">{{ forecast.current }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-6 relative overflow-visible">
              <div class="bg-amber-700 h-6 rounded-full" :style="`width: ${forecast.current}%`"></div>
            </div>
          </div>
          
          <!-- With Planner -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700">With Planner</span>
              <span class="text-sm font-semibold text-gray-900">{{ forecast.withPlanner }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-6 relative overflow-visible">
              <div class="bg-blue-800 h-6 rounded-full" :style="`width: ${forecast.withPlanner}%`"></div>
            </div>
          </div>
          
          <!-- With Suvera Clinic -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700">With Suvera Clinic</span>
              <span class="text-sm font-semibold text-gray-900">{{ forecast.withSuvera }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-6 relative overflow-visible">
              <div class="bg-green-600 h-6 rounded-full" :style="`width: ${forecast.withSuvera}%`"></div>
            </div>
          </div>
        </div>
        
        <!-- Minimum QOF Achievement Vertical Line -->
        <div class="absolute z-10 pointer-events-none" :style="`left: ${forecast.minAchievement}%; top: 0; bottom: 50px;`">
          <!-- Vertical dashed line -->
          <div class="absolute left-0 top-0 bottom-0 border-l-2 border-dashed border-red-500" style="transform: translateX(-50%);"></div>
          <!-- Top diamond marker -->
          <div class="absolute left-0 top-0 w-2 h-2 bg-red-500" style="transform: translateX(-50%) translateY(-4px) rotate(45deg);"></div>
          <!-- Bottom diamond marker -->
          <div class="absolute left-0 bottom-0 w-2 h-2 bg-red-500" style="transform: translateX(-50%) translateY(4px) rotate(45deg);"></div>
        </div>
        
        <!-- Minimum QOF Achievement Label at Bottom -->
        <div class="absolute bottom-0 left-0 right-0 z-10 pointer-events-none" style="height: 50px; padding-top: 12px;">
          <div class="relative w-full">
            <!-- Label on the left, with max width to prevent overlap -->
            <span class="absolute left-0 text-sm text-red-600 font-semibold whitespace-nowrap" :style="`max-width: calc(${forecast.minAchievement}% - 60px); overflow: hidden; text-overflow: ellipsis;`">Minimum QOF achievement</span>
            <!-- Percentage aligned with minAchievement mark, with clear spacing -->
            <span class="absolute text-sm text-red-600 font-semibold whitespace-nowrap" :style="`left: ${forecast.minAchievement}%; margin-left: 16px;`">{{ forecast.minAchievement }}%</span>
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
  return getForecastData(props.condition)
})
</script>

