<template>
  <div class="circular-progress" :class="{ 'small': size === 60 }">
    <svg :width="size" :height="size">
      <circle
        :cx="size/2"
        :cy="size/2"
        :r="radius"
        class="background"
      />
      <circle
        :cx="size/2"
        :cy="size/2"
        :r="radius"
        class="progress"
        :class="colorClass"
        :style="circleStyle"
      />
    </svg>
    <div class="absolute inset-0 flex items-center justify-center">
      <span class="text-lg font-semibold text-gray-700">{{ percentage }}%</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    default: 120
  },
  color: {
    type: String,
    default: 'blue'
  }
})

const radius = computed(() => props.size === 60 ? 25 : 45)
const circumference = computed(() => 2 * Math.PI * radius.value)

const colorClass = computed(() => {
  const colorMap = {
    green: 'green',
    orange: 'orange',
    blue: 'blue',
    red: 'red',
    pink: 'pink',
    purple: 'purple',
    cyan: 'cyan',
    yellow: 'yellow',
    indigo: 'indigo',
    teal: 'teal',
    emerald: 'emerald',
    lime: 'lime',
    amber: 'amber'
  }
  return colorMap[props.color] || 'blue'
})

const circleStyle = computed(() => {
  const offset = circumference.value - (props.percentage / 100) * circumference.value
  return {
    strokeDasharray: circumference.value,
    strokeDashoffset: offset
  }
})

// Animate on mount
onMounted(() => {
  setTimeout(() => {
    const circle = document.querySelector('.progress')
    if (circle) {
      circle.style.transition = 'stroke-dashoffset 0.5s ease-in-out'
    }
  }, 100)
})
</script>
