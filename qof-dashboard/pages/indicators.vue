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
      <!-- Filters Section -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Practice</label>
            <select class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>All Practices</option>
              <option>Maltings Surgery</option>
              <option>Summerfield Health Center</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">QOF Period</label>
            <select class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>QOF 25/26</option>
              <option>QOF 24/25</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Indicator</label>
            <select class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>All Indicators</option>
              <option>QOF_HYP_008</option>
              <option>QOF_HYP_009</option>
            </select>
          </div>
        </div>
      </div>

      <!-- QOF Indicators -->
      <div class="space-y-8">
        <!-- QOF_HYP_008 -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">QOF_HYP_008</h3>
            <p class="text-sm text-gray-600">Hypertension: Blood pressure recorded in the preceding 12 months</p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- QOF 24/25 Chart -->
            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-4">QOF 24/25</h4>
              <div class="flex items-end space-x-4">
                <div class="flex-1">
                  <div class="progress-bar qof-24-25" style="height: 200px;">
                    <div class="bg-blue-500" style="height: 29%;"></div>
                    <div class="target-label target-label-40" data-tooltip="Minimum achievement threshold">40%</div>
                    <div class="target-label target-label-77" data-tooltip="Maximum achievement threshold">77%</div>
                  </div>
                  <p class="text-sm text-gray-600 mt-2 text-center">Maltings Surgery</p>
                </div>
              </div>
              <div class="mt-4 text-center">
                <p class="text-sm text-gray-600">Total Completion Percentage: 29%</p>
              </div>
            </div>

            <!-- QOF 25/26 Chart -->
            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-4">QOF 25/26</h4>
              <div class="flex items-end space-x-4">
                <div class="flex-1">
                  <div class="progress-bar" style="height: 200px;">
                    <div class="bg-blue-500" style="height: 35%;"></div>
                    <div class="target-label target-label-40" data-tooltip="Minimum achievement threshold">40%</div>
                    <div class="target-label target-label-85" data-tooltip="Maximum achievement threshold">85%</div>
                  </div>
                  <p class="text-sm text-gray-600 mt-2 text-center">Maltings Surgery</p>
                </div>
              </div>
              <div class="mt-4 text-center">
                <p class="text-sm text-gray-600">Total Completion Percentage: 35%</p>
              </div>
            </div>
          </div>
        </div>

        <!-- QOF_HYP_009 -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">QOF_HYP_009</h3>
            <p class="text-sm text-gray-600">Hypertension: Blood pressure recorded in the preceding 12 months</p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- QOF 24/25 Chart -->
            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-4">QOF 24/25</h4>
              <div class="flex items-end space-x-4">
                <div class="flex-1">
                  <div class="progress-bar qof-24-25 hyp009" style="height: 200px;">
                    <div class="bg-green-500" style="height: 80%;"></div>
                    <div class="target-label target-label-40" data-tooltip="Minimum achievement threshold">40%</div>
                    <div class="target-label target-label-80" data-tooltip="Maximum achievement threshold">80%</div>
                  </div>
                  <p class="text-sm text-gray-600 mt-2 text-center">Maltings Surgery</p>
                </div>
              </div>
              <div class="mt-4 text-center">
                <p class="text-sm text-gray-600">Total Completion Percentage: 80%</p>
              </div>
            </div>

            <!-- QOF 25/26 Chart -->
            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-4">QOF 25/26</h4>
              <div class="flex items-end space-x-4">
                <div class="flex-1">
                  <div class="progress-bar" style="height: 200px;">
                    <div class="bg-green-500" style="height: 85%;"></div>
                    <div class="target-label target-label-40" data-tooltip="Minimum achievement threshold">40%</div>
                    <div class="target-label target-label-85" data-tooltip="Maximum achievement threshold">85%</div>
                  </div>
                  <p class="text-sm text-gray-600 mt-2 text-center">Maltings Surgery</p>
                </div>
              </div>
              <div class="mt-4 text-center">
                <p class="text-sm text-gray-600">Total Completion Percentage: 85%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Tooltip functionality
onMounted(() => {
  const labels = document.querySelectorAll('.target-label[data-tooltip]')
  
  labels.forEach(label => {
    label.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect()
      const tooltip = document.createElement('div')
      tooltip.className = 'custom-tooltip'
      tooltip.textContent = this.getAttribute('data-tooltip')
      tooltip.style.cssText = `
        position: fixed;
        top: ${rect.top - 35}px;
        left: ${rect.left + rect.width / 2}px;
        transform: translateX(-50%);
        background: #1f2937;
        color: white;
        padding: 6px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 500;
        white-space: nowrap;
        z-index: 10000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        pointer-events: none;
      `
      document.body.appendChild(tooltip)
      this._tooltip = tooltip
    })
    
    label.addEventListener('mouseleave', function() {
      if (this._tooltip) {
        document.body.removeChild(this._tooltip)
        this._tooltip = null
      }
    })
  })
})
</script>
