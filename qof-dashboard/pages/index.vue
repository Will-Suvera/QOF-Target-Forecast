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
        <!-- Welcome Section with Filter -->
        <div class="mb-8 flex items-start justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Hello, Pilly 👋</h1>
            <div class="text-lg text-gray-600">{{ formattedDate }}</div>
          </div>
          <!-- Filter Bar -->
          <div class="flex items-center">
            <button class="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-4">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              Filter
            </button>
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <label class="text-sm text-gray-700 mr-2">Practice:</label>
                <select class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option>The Medical Practice</option>
                  <option>Maltings Surgery</option>
                  <option>Summerfield Health Center</option>
                </select>
              </div>
              <div class="flex items-center">
                <label class="text-sm text-gray-700 mr-2">Target area:</label>
                <select class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option>All</option>
                  <option>Asthma</option>
                  <option>Hypertension</option>
                  <option>Cholesterol</option>
                  <option>Diabetes</option>
                  <option>COPD</option>
                  <option>Heart Failure</option>
                  <option>Atrial Fibrillation</option>
                  <option>Coronary Heart Disease</option>
                  <option>Dementia</option>
                  <option>Mental Health</option>
                  <option>NDH</option>
                  <option>Stroke and TIA</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Hero Section -->
        <HeroSection :condition="route.query.condition || null" />

        <!-- Clinical Domain Section -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Clinical Domain</h2>
        </div>

        <!-- Indicator Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Asthma -->
              <NuxtLink to="/indicators?condition=asthma" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">Asthma</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="asthma-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">52%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="flex items-center justify-center text-green-600 text-xs">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Up 3% from last week
                  </div>
                </div>
              </NuxtLink>

              <!-- Hypertension -->
              <NuxtLink to="/indicators?condition=hypertension" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">Hypertension</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="hypertension-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">29%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="flex items-center justify-center text-red-600 text-xs">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Down 1% from last week
                  </div>
                </div>
              </NuxtLink>

              <!-- Cholesterol -->
              <NuxtLink to="/indicators?condition=cholesterol" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">Cholesterol</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="cholesterol-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">80%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="flex items-center justify-center text-green-600 text-xs">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Up 25% from last week
                  </div>
                </div>
              </NuxtLink>

              <!-- Diabetes -->
              <NuxtLink to="/indicators?condition=diabetes" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">Diabetes</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="diabetes-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">2%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="text-gray-500 text-xs">No changes</div>
                </div>
              </NuxtLink>

              <!-- COPD -->
              <NuxtLink to="/indicators?condition=copd" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">COPD</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="copd-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">45%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="flex items-center justify-center text-green-600 text-xs">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Up 3% from last week
                  </div>
                </div>
              </NuxtLink>

              <!-- Heart Failure -->
              <NuxtLink to="/indicators?condition=heart-failure" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">Heart Failure</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="heart-failure-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">38%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="flex items-center justify-center text-green-600 text-xs">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Up 2% from last week
                  </div>
                </div>
              </NuxtLink>

              <!-- Atrial Fibrillation -->
              <NuxtLink to="/indicators?condition=atrial-fibrillation" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">Atrial Fibrillation</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="atrial-fibrillation-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">61%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="flex items-center justify-center text-green-600 text-xs">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Up 4% from last week
                  </div>
                </div>
              </NuxtLink>

              <!-- Coronary Heart Disease -->
              <NuxtLink to="/indicators?condition=coronary-heart-disease" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">Coronary Heart Disease</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="coronary-heart-disease-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">67%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="flex items-center justify-center text-green-600 text-xs">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Up 1% from last week
                  </div>
                </div>
              </NuxtLink>

              <!-- Dementia -->
              <NuxtLink to="/indicators?condition=dementia" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">Dementia</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="dementia-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">34%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="flex items-center justify-center text-red-600 text-xs">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Down 2% from last week
                  </div>
                </div>
              </NuxtLink>

              <!-- Mental Health -->
              <NuxtLink to="/indicators?condition=mental-health" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">Mental Health</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="mental-health-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">56%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="flex items-center justify-center text-green-600 text-xs">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Up 3% from last week
                  </div>
                </div>
              </NuxtLink>

              <!-- NDH -->
              <NuxtLink to="/indicators?condition=ndh" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">NDH</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="ndh-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">42%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="text-gray-500 text-xs">No changes</div>
                </div>
              </NuxtLink>

              <!-- Stroke and TIA -->
              <NuxtLink to="/indicators?condition=stroke-tia" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-semibold text-gray-900">Stroke and TIA</h4>
                  <span class="text-blue-600 text-xs">View</span>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="circular-progress" style="width: 80px; height: 80px;">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" class="background"></circle>
                      <circle cx="50" cy="50" r="35" class="progress gray" id="stroke-tia-progress"></circle>
                    </svg>
                    <div class="text">
                      <div class="text-lg font-bold text-gray-900">48%</div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-1">
                  <div class="flex items-center justify-center text-green-600 text-xs">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Up 2% from last week
                  </div>
                </div>
              </NuxtLink>

            </div>

        <!-- Public Health Domain Section -->
        <div class="mt-12 mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Public Health Domain</h2>
        </div>

        <!-- Public Health Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Blood Pressure -->
          <NuxtLink to="/indicators?condition=blood-pressure" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-sm font-semibold text-gray-900">Blood Pressure</h4>
              <span class="text-blue-600 text-xs">View</span>
            </div>
            <div class="flex justify-center mb-4">
              <div class="circular-progress" style="width: 80px; height: 80px;">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="35" class="background"></circle>
                  <circle cx="50" cy="50" r="35" class="progress gray" id="blood-pressure-progress"></circle>
                </svg>
                <div class="text">
                  <div class="text-lg font-bold text-gray-900">58%</div>
                </div>
              </div>
            </div>
            <div class="text-center pt-1">
              <div class="flex items-center justify-center text-green-600 text-xs">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                Up 2% from last week
              </div>
            </div>
          </NuxtLink>

          <!-- Smoking -->
          <NuxtLink to="/indicators?condition=smoking" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-sm font-semibold text-gray-900">Smoking</h4>
              <span class="text-blue-600 text-xs">View</span>
            </div>
            <div class="flex justify-center mb-4">
              <div class="circular-progress" style="width: 80px; height: 80px;">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="35" class="background"></circle>
                  <circle cx="50" cy="50" r="35" class="progress gray" id="smoking-progress"></circle>
                </svg>
                <div class="text">
                  <div class="text-lg font-bold text-gray-900">72%</div>
                </div>
              </div>
            </div>
            <div class="text-center pt-1">
              <div class="flex items-center justify-center text-green-600 text-xs">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                Up 4% from last week
              </div>
            </div>
          </NuxtLink>

          <!-- Vaccination and Immunisations -->
          <NuxtLink to="/indicators?condition=vaccination-immunisations" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-sm font-semibold text-gray-900">Vaccination and Immunisations</h4>
              <span class="text-blue-600 text-xs">View</span>
            </div>
            <div class="flex justify-center mb-4">
              <div class="circular-progress" style="width: 80px; height: 80px;">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="35" class="background"></circle>
                  <circle cx="50" cy="50" r="35" class="progress gray" id="vaccination-immunisations-progress"></circle>
                </svg>
                <div class="text">
                  <div class="text-lg font-bold text-gray-900">85%</div>
                </div>
              </div>
            </div>
            <div class="text-center pt-1">
              <div class="flex items-center justify-center text-green-600 text-xs">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                Up 1% from last week
              </div>
            </div>
          </NuxtLink>

          <!-- Cervical Screening -->
          <NuxtLink to="/indicators?condition=cervical-screening" class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 block hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-sm font-semibold text-gray-900">Cervical Screening</h4>
              <span class="text-blue-600 text-xs">View</span>
            </div>
            <div class="flex justify-center mb-4">
              <div class="circular-progress" style="width: 80px; height: 80px;">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="35" class="background"></circle>
                  <circle cx="50" cy="50" r="35" class="progress gray" id="cervical-screening-progress"></circle>
                </svg>
                <div class="text">
                  <div class="text-lg font-bold text-gray-900">64%</div>
                </div>
              </div>
            </div>
            <div class="text-center pt-1">
              <div class="flex items-center justify-center text-green-600 text-xs">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
                Up 3% from last week
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const route = useRoute()

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