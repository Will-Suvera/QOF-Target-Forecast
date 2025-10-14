<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-blue-900 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Title -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span class="text-blue-900 font-bold text-lg">Y</span>
              </div>
              <div>
                <h1 class="text-xl font-bold">Suvera workload dashboard</h1>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="flex items-center space-x-8">
            <NuxtLink to="/" class="text-white hover:text-blue-200 transition-colors">
              Suvera workload dashboard
            </NuxtLink>
            <NuxtLink to="/summary" class="text-white hover:text-blue-200 transition-colors">
              Summary
            </NuxtLink>
            <NuxtLink to="/indicators" class="text-white hover:text-blue-200 transition-colors">
              QOF Indicators
            </NuxtLink>
            <div class="text-white hover:text-blue-200 transition-colors cursor-pointer">
              Referrals
            </div>
          </nav>

          <!-- User Avatar -->
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
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
              <div class="circular-progress">
                <svg width="120" height="120">
                  <circle cx="60" cy="60" r="45" class="background"></circle>
                  <circle cx="60" cy="60" r="45" class="progress green" style="stroke-dasharray: 283; stroke-dashoffset: 28;"></circle>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-lg font-semibold text-gray-700">90%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Clinical Domain Section -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Clinical Domain (437 Points)</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Asthma -->
              <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">Asthma</h4>
                    <p class="text-sm text-gray-500">AST</p>
                  </div>
                  <div class="circular-progress small">
                    <svg width="60" height="60">
                      <circle cx="30" cy="30" r="25" class="background"></circle>
                      <circle cx="30" cy="30" r="25" class="progress green" style="stroke-dasharray: 157; stroke-dashoffset: 75;"></circle>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="text-sm font-semibold text-gray-700">52%</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-600">Trend:</span>
                    <div class="flex items-center space-x-1">
                      <span class="text-green-600 text-sm font-medium">+5%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Hypertension -->
              <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">Hypertension</h4>
                    <p class="text-sm text-gray-500">HYP</p>
                  </div>
                  <div class="circular-progress small">
                    <svg width="60" height="60">
                      <circle cx="30" cy="30" r="25" class="background"></circle>
                      <circle cx="30" cy="30" r="25" class="progress orange" style="stroke-dasharray: 157; stroke-dashoffset: 111;"></circle>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="text-sm font-semibold text-gray-700">29%</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-600">Trend:</span>
                    <div class="flex items-center space-x-1">
                      <span class="text-red-600 text-sm font-medium">-2%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Cholesterol -->
              <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">Cholesterol</h4>
                    <p class="text-sm text-gray-500">CHOL</p>
                  </div>
                  <div class="circular-progress small">
                    <svg width="60" height="60">
                      <circle cx="30" cy="30" r="25" class="background"></circle>
                      <circle cx="30" cy="30" r="25" class="progress blue" style="stroke-dasharray: 157; stroke-dashoffset: 31;"></circle>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="text-sm font-semibold text-gray-700">80%</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-600">Trend:</span>
                    <div class="flex items-center space-x-1">
                      <span class="text-green-600 text-sm font-medium">+12%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Diabetes -->
              <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">Diabetes</h4>
                    <p class="text-sm text-gray-500">DM</p>
                  </div>
                  <div class="circular-progress small">
                    <svg width="60" height="60">
                      <circle cx="30" cy="30" r="25" class="background"></circle>
                      <circle cx="30" cy="30" r="25" class="progress red" style="stroke-dasharray: 157; stroke-dashoffset: 154;"></circle>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="text-sm font-semibold text-gray-700">2%</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-600">Trend:</span>
                    <div class="flex items-center space-x-1">
                      <span class="text-green-600 text-sm font-medium">+1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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