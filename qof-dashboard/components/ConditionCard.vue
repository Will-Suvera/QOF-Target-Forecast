<template>
  <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h4 class="text-lg font-semibold text-gray-900">{{ title }}</h4>
        <p class="text-sm text-gray-500">{{ code }}</p>
      </div>
      <CircularGauge 
        :percentage="parseInt(percentage)" 
        :size="60" 
        :color="color" 
      />
    </div>
    
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-600">Trend:</span>
        <div class="flex items-center space-x-1">
          <ChevronUpIcon 
            v-if="trendDirection === 'up'" 
            class="w-4 h-4 text-green-500" 
          />
          <ChevronDownIcon 
            v-else 
            class="w-4 h-4 text-red-500" 
          />
          <span 
            :class="trendDirection === 'up' ? 'text-green-600' : 'text-red-600'"
            class="text-sm font-medium"
          >
            {{ trend }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

defineProps({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  percentage: {
    type: String,
    required: true
  },
  trend: {
    type: String,
    required: true
  },
  trendDirection: {
    type: String,
    required: true,
    validator: (value) => ['up', 'down'].includes(value)
  },
  color: {
    type: String,
    default: 'blue'
  }
})
</script>
