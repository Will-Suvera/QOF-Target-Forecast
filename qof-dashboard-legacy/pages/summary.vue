<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6">
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
              <a href="/" class="text-gray-600 hover:text-gray-900 px-1 pb-3 text-sm font-medium flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Dashboard
              </a>
              <a href="/summary" class="text-gray-900 font-semibold border-b-2 border-blue-600 px-1 pb-3 text-sm font-medium flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Summary
              </a>
              <a href="/pricing" class="text-gray-600 hover:text-gray-900 px-1 pb-3 text-sm font-medium flex items-center">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                Pricing
              </a>
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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Key Metrics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-sm">Q</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total QOF Points</p>
              <p class="text-2xl font-semibold text-gray-900">564</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 font-semibold text-sm">✓</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Completed Targets</p>
              <p class="text-2xl font-semibold text-gray-900">42</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span class="text-yellow-600 font-semibold text-sm">⏳</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">In Progress</p>
              <p class="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span class="text-red-600 font-semibold text-sm">⚠</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">At Risk</p>
              <p class="text-2xl font-semibold text-gray-900">4</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Overview Table -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">QOF Performance Overview</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QOF Target</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forecast</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="target in qofTargets" :key="target.code">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ target.code }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ target.patients.toLocaleString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ target.completion }}%</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ target.forecast.toLocaleString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm" :class="target.forecast >= target.target ? 'text-green-600' : 'text-red-600'">
                  {{ target.forecast >= target.target ? '+' : '' }}{{ target.forecast - target.target }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ target.target }}%</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ target.points }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusClass(target.status)"
                  >
                    {{ target.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// QOF targets data
const qofTargets = ref([
  { code: 'HYP001', patients: 1234, completion: 92, forecast: 1135, target: 1136, points: 15, status: 'On Track' },
  { code: 'HYP008', patients: 1234, completion: 29, forecast: 358, target: 1136, points: 15, status: 'At Risk' },
  { code: 'HYP009', patients: 1234, completion: 80, forecast: 987, target: 1136, points: 15, status: 'On Track' },
  { code: 'AF001', patients: 234, completion: 60, forecast: 140, target: 234, points: 15, status: 'On Track' },
  { code: 'AF006', patients: 234, completion: 45, forecast: 105, target: 234, points: 15, status: 'At Risk' },
  { code: 'AF008', patients: 234, completion: 70, forecast: 164, target: 234, points: 15, status: 'On Track' },
  { code: 'AST005', patients: 456, completion: 52, forecast: 237, target: 456, points: 15, status: 'At Risk' },
  { code: 'AST012', patients: 456, completion: 38, forecast: 173, target: 456, points: 15, status: 'At Risk' },
  { code: 'AST007', patients: 456, completion: 65, forecast: 296, target: 456, points: 15, status: 'On Track' },
  { code: 'AST008', patients: 456, completion: 42, forecast: 192, target: 456, points: 15, status: 'At Risk' },
  { code: 'CHD001', patients: 345, completion: 75, forecast: 259, target: 345, points: 15, status: 'On Track' },
  { code: 'CHD015', patients: 345, completion: 68, forecast: 235, target: 345, points: 15, status: 'On Track' },
  { code: 'CHD016', patients: 345, completion: 55, forecast: 190, target: 345, points: 15, status: 'At Risk' },
  { code: 'CHD005', patients: 345, completion: 80, forecast: 276, target: 345, points: 15, status: 'On Track' },
  { code: 'CHOLREG', patients: 1234, completion: 80, forecast: 987, target: 1234, points: 15, status: 'On Track' },
  { code: 'CHOL2REG', patients: 1234, completion: 75, forecast: 925, target: 1234, points: 15, status: 'On Track' },
  { code: 'CHOL003', patients: 1234, completion: 70, forecast: 864, target: 1234, points: 15, status: 'On Track' },
  { code: 'CHOL004', patients: 1234, completion: 65, forecast: 802, target: 1234, points: 15, status: 'On Track' },
  { code: 'COPD015', patients: 234, completion: 30, forecast: 70, target: 234, points: 15, status: 'At Risk' },
  { code: 'COPD014', patients: 234, completion: 25, forecast: 59, target: 234, points: 15, status: 'At Risk' },
  { code: 'COPD010', patients: 234, completion: 40, forecast: 94, target: 234, points: 15, status: 'At Risk' },
  { code: 'DEM001', patients: 123, completion: 10, forecast: 12, target: 123, points: 15, status: 'At Risk' },
  { code: 'DEM004', patients: 123, completion: 8, forecast: 10, target: 123, points: 15, status: 'At Risk' },
  { code: 'DM017', patients: 456, completion: 2, forecast: 9, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM014', patients: 456, completion: 5, forecast: 23, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM036', patients: 456, completion: 3, forecast: 14, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM034', patients: 456, completion: 4, forecast: 18, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM035', patients: 456, completion: 6, forecast: 27, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM006', patients: 456, completion: 7, forecast: 32, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM020', patients: 456, completion: 8, forecast: 36, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM021', patients: 456, completion: 9, forecast: 41, target: 456, points: 15, status: 'At Risk' },
  { code: 'DM012', patients: 456, completion: 10, forecast: 46, target: 456, points: 15, status: 'At Risk' },
  { code: 'HF1', patients: 89, completion: 20, forecast: 18, target: 89, points: 15, status: 'At Risk' },
  { code: 'HF2', patients: 89, completion: 15, forecast: 13, target: 89, points: 15, status: 'At Risk' },
  { code: 'HF008', patients: 89, completion: 25, forecast: 22, target: 89, points: 15, status: 'At Risk' },
  { code: 'HF003', patients: 89, completion: 18, forecast: 16, target: 89, points: 15, status: 'At Risk' },
  { code: 'HF006', patients: 89, completion: 22, forecast: 20, target: 89, points: 15, status: 'At Risk' },
  { code: 'HF007', patients: 89, completion: 28, forecast: 25, target: 89, points: 15, status: 'At Risk' },
  { code: 'MH1_REG', patients: 567, completion: 60, forecast: 340, target: 567, points: 15, status: 'On Track' },
  { code: 'MH2_REG', patients: 567, completion: 55, forecast: 312, target: 567, points: 15, status: 'On Track' },
  { code: 'MH001', patients: 567, completion: 45, forecast: 255, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH002', patients: 567, completion: 50, forecast: 284, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH003', patients: 567, completion: 40, forecast: 227, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH006', patients: 567, completion: 35, forecast: 198, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH007', patients: 567, completion: 42, forecast: 238, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH011', patients: 567, completion: 38, forecast: 215, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH012', patients: 567, completion: 33, forecast: 187, target: 567, points: 15, status: 'At Risk' },
  { code: 'MH021', patients: 567, completion: 48, forecast: 272, target: 567, points: 15, status: 'At Risk' },
  { code: 'NDH_Reg', patients: 234, completion: 20, forecast: 47, target: 234, points: 15, status: 'At Risk' },
  { code: 'NDH002', patients: 234, completion: 15, forecast: 35, target: 234, points: 15, status: 'At Risk' },
  { code: 'STIA001', patients: 123, completion: 10, forecast: 12, target: 123, points: 15, status: 'At Risk' },
  { code: 'STIA014', patients: 123, completion: 8, forecast: 10, target: 123, points: 15, status: 'At Risk' },
  { code: 'STIA015', patients: 123, completion: 12, forecast: 15, target: 123, points: 15, status: 'At Risk' },
  { code: 'STIA007', patients: 123, completion: 6, forecast: 7, target: 123, points: 15, status: 'At Risk' }
])

const getStatusClass = (status) => {
  switch (status) {
    case 'On Track':
      return 'bg-green-100 text-green-800'
    case 'At Risk':
      return 'bg-red-100 text-red-800'
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
