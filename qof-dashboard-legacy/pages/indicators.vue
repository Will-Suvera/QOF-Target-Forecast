<template>
  <div class="min-h-screen bg-gray-50">
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

      <!-- Hero Section - Forecast and Estimated Value -->
      <HeroSection :condition="route.query.condition || null" />

      <!-- Condition Targets Header -->
      <div class="mb-6">
        <div class="mb-3">
          <NuxtLink to="/" class="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Dashboard
          </NuxtLink>
                </div>
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold text-gray-900">{{ conditionData.title }} targets</h2>
          <div class="flex items-center gap-4">
            <!-- Toggle for Previous Year Comparison -->
            <label class="flex items-center gap-2 cursor-pointer">
              <span class="text-sm text-gray-700">Show previous year comparison</span>
              <div class="relative">
                <input 
                  type="checkbox" 
                  v-model="showPreviousYear" 
                  class="sr-only"
                />
                <div 
                  class="w-11 h-6 rounded-full transition-colors duration-200"
                  :class="showPreviousYear ? 'bg-blue-600' : 'bg-gray-300'"
                >
                  <div 
                    class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 shadow-sm"
                    :class="showPreviousYear ? 'transform translate-x-5' : ''"
                  ></div>
                </div>
              </div>
            </label>
          <select class="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option v-for="target in conditionData.targets" :key="target.code">{{ target.name }}</option>
          </select>
                </div>
                </div>
              </div>
              
      <!-- Summary Section for Hypertension -->
      <template v-if="conditionData.title === 'Hypertension'">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div class="flex justify-between items-center mb-6 relative">
            <h3 class="text-xl font-semibold text-gray-900">Summary</h3>
            
            <!-- Hypertension Register Prevalence Card (Centered) -->
            <div class="absolute left-1/2 transform -translate-x-1/2">
              <div class="bg-gray-50 rounded-md px-3 py-2 border border-gray-200">
                <div class="text-xs text-gray-600 mb-1">Hypertension Register Prevalence</div>
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
            
            <!-- View in Planner Button -->
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
              <span class="text-sm text-gray-700">Min achievement (40%)</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 border-l-2 border-dashed border-purple-500 mr-2"></div>
              <span class="text-sm text-gray-700">Expected by today</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 border-l-2 border-dashed border-green-500 mr-2"></div>
              <span class="text-sm text-gray-700">Max achievement (85%)</span>
            </div>
          </div>
          
          <!-- Stacked Bar Chart -->
      <div class="space-y-6">
            <!-- HYP008 Bar -->
            <div>
              <div class="flex items-center mb-2">
                <button 
                  @click="toggleAccordion('HYP008')"
                  class="flex items-center text-sm font-medium text-gray-900 w-24 hover:text-blue-600 transition-colors"
                >
                  <svg 
                    class="w-4 h-4 mr-1 transition-transform"
                    :class="{ 'rotate-90': expandedSections.HYP008 }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  HYP008
                </button>
                <div class="flex-1 relative bg-gray-100 rounded overflow-visible cursor-pointer" style="padding-bottom: 30px;" @click="toggleAccordion('HYP008')">
                  <!-- Bar container -->
                  <div class="relative h-8">
                    <!-- Complete -->
                    <div 
                      class="absolute left-0 top-0 h-full bg-green-600 flex items-center justify-center" 
                      :style="`width: ${getSummaryData('HYP008').complete}%`"
                    >
                      <span class="text-xs font-semibold text-white">{{ getSummaryData('HYP008').complete }}% ({{ getSummaryData('HYP008').completePatients }})</span>
                    </div>
                    <!-- Exception reported - invited -->
                    <div 
                      class="absolute h-full bg-gray-300 flex items-center justify-center" 
                      :style="`left: ${getSummaryData('HYP008').complete}%; width: ${getSummaryData('HYP008').exceptionInvited}%`"
                    >
                      <span class="text-xs font-semibold text-gray-700">{{ getSummaryData('HYP008').exceptionInvited }}% ({{ getSummaryData('HYP008').exceptionInvitedPatients }})</span>
                    </div>
                    <!-- Incomplete -->
                    <div 
                      class="absolute right-0 top-0 h-full bg-blue-600 flex items-center justify-center" 
                      :style="`width: ${getSummaryData('HYP008').incomplete}%`"
                    >
                      <span class="text-xs font-semibold text-white">{{ getSummaryData('HYP008').incomplete }}% ({{ getSummaryData('HYP008').incompletePatients }})</span>
                    </div>
                    
                    <!-- Min Achievement Threshold (40%) - Red -->
                    <div 
                      class="absolute top-0 bottom-0 pointer-events-none z-10"
                      style="left: 40%; width: 0;"
                    >
                      <div class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-red-500"></div>
                      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-red-500 rotate-45"></div>
                      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-red-500 rotate-45"></div>
                    </div>
                    
                    <!-- Max Achievement Threshold (85%) - Green -->
                    <div 
                      class="absolute top-0 bottom-0 pointer-events-none z-10"
                      style="left: 85%; width: 0;"
                    >
                      <div class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-green-500"></div>
                      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-green-500 rotate-45"></div>
                      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-green-500 rotate-45"></div>
                    </div>
                    
                    <!-- Expected by Today - Purple -->
                    <div 
                      class="absolute top-0 bottom-0 pointer-events-none z-10"
                      :style="`left: ${getExpectedAchievementForSummary()}%; width: 0;`"
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
              
              <!-- Expanded HYP008 Content -->
              <div v-show="expandedSections.HYP008" class="mt-6 -mx-6 -mb-6">
                <div class="bg-white border-t border-gray-200">
                  <div 
                    v-for="(target, index) in targetCards.filter(t => t.code === 'HYP008' || t.qofCode === 'QOF_HYP008')" 
                    :key="`inline-${target.qofCode || target.code}`"
                    class="p-6"
                  >
                    <!-- Reuse the same target card structure -->
        <div class="mb-6">
              <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ target.qofCode || conditionData.qofCode }}</h3>
              <p class="text-sm text-gray-600">{{ target.description || conditionData.description }}</p>
                </div>
        </div>
        <!-- Target Achievement Progress and Revenue Row (Row 1) -->
                    <template v-if="(target.code === 'HYP008' || target.qofCode === 'QOF_HYP008')">
                      <!-- Copy the full target card content from the main section (lines 361-650+) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- Target Achievement Progress (takes 2 columns) -->
            <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Target Achievement Progress</h4>
              
              <!-- 4 Sections Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- HYP008 Register Size -->
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                  <div class="text-sm font-medium text-gray-700 mb-2">HYP008 Register Size</div>
                  <div class="text-2xl font-bold text-gray-900 mb-3">{{ getHYP008RegisterSize() }}</div>
                  <div class="text-xs text-gray-600">
                    <div class="flex items-center justify-between mb-1">
                      <span>Nov 1st:</span>
                      <span>{{ getHYP008RegisterSizePrevious() }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span>Change:</span>
                      <span :class="getChangeClass(getHYP008RegisterSizeChange())">
                        {{ getHYP008RegisterSizeChange() > 0 ? '+' : '' }}{{ getHYP008RegisterSizeChange() }} ({{ getHYP008RegisterSizeChangePercent() > 0 ? '+' : '' }}{{ getHYP008RegisterSizeChangePercent() }}%)
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Clinical Completion Number -->
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                  <div class="text-sm font-medium text-gray-700 mb-2">Clinical Completion Number</div>
                  <div class="text-2xl font-bold text-gray-900 mb-3">{{ getClinicalCompletionNumber(target) }}</div>
                  <div class="text-xs text-gray-600">
                    <div class="flex items-center justify-between mb-1">
                      <span>Nov 1st:</span>
                      <span>{{ getClinicalCompletionNumberPrevious(target) }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span>Change:</span>
                      <span :class="getChangeClass(getClinicalCompletionNumberChange(target))">
                        {{ getClinicalCompletionNumberChange(target) > 0 ? '+' : '' }}{{ getClinicalCompletionNumberChange(target) }} ({{ getClinicalCompletionNumberChangePercent(target) > 0 ? '+' : '' }}{{ getClinicalCompletionNumberChangePercent(target) }}%)
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Invited Exception Reporting Number -->
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                  <div class="text-sm font-medium text-gray-700 mb-2">Invited Exception Reporting Number</div>
                  <div class="text-2xl font-bold text-gray-900 mb-3">{{ getInvitedExceptionNumber(target) }}</div>
                  <div class="text-xs text-gray-600">
                    <div class="flex items-center justify-between mb-1">
                      <span>Nov 1st:</span>
                      <span>{{ getInvitedExceptionNumberPrevious(target) }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span>Change:</span>
                      <span :class="getChangeClass(getInvitedExceptionNumberChange(target))">
                        {{ getInvitedExceptionNumberChange(target) > 0 ? '+' : '' }}{{ getInvitedExceptionNumberChange(target) }} ({{ getInvitedExceptionNumberChangePercent(target) > 0 ? '+' : '' }}{{ getInvitedExceptionNumberChangePercent(target) }}%)
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Not Yet Invited Number -->
                <div class="bg-white border border-gray-200 rounded-lg p-4">
                  <div class="text-sm font-medium text-gray-700 mb-2">Not Yet Invited Number</div>
                  <div class="text-2xl font-bold text-gray-900 mb-3">{{ getNotYetInvitedNumber(target) }}</div>
                  <div class="text-xs text-gray-600">
                    <div class="flex items-center justify-between mb-1">
                      <span>Nov 1st:</span>
                      <span>{{ getNotYetInvitedNumberPrevious(target) }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span>Change:</span>
                      <span :class="getNotYetInvitedChangeClass(getNotYetInvitedNumberChange(target))">
                        {{ getNotYetInvitedNumberChange(target) > 0 ? '+' : '' }}{{ getNotYetInvitedNumberChange(target) }} ({{ getNotYetInvitedNumberChangePercent(target) > 0 ? '+' : '' }}{{ getNotYetInvitedNumberChangePercent(target) }}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                        <!-- Revenue Left on Table (takes 1 column) -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <h4 class="text-lg font-semibold text-gray-900 mb-4">Revenue Left on Table</h4>
                          <div class="text-4xl font-bold text-gray-900 mb-4">£{{ getRevenueLeftOnTable(target).toLocaleString() }}</div>
                          <div class="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                            <div class="flex items-start">
                              <svg class="w-5 h-5 text-orange-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                              </svg>
                              <div>
                                <div class="text-sm font-medium text-orange-800">{{ getUnclaimedPoints(target) }} unclaimed QOF points from {{ getRemainingPatients(target) }} patients</div>
                              </div>
                            </div>
                          </div>
                          <div class="grid grid-cols-2 gap-3">
                            <div class="bg-white border border-gray-200 rounded-lg p-3">
                              <div class="text-xs text-gray-600 mb-1">Unclaimed Points</div>
                              <div class="text-xl font-bold text-gray-900">{{ getUnclaimedPoints(target) }}</div>
                            </div>
                            <div class="bg-white border border-gray-200 rounded-lg p-3">
                              <div class="text-xs text-gray-600 mb-1">Patients Remaining</div>
                              <div class="text-xl font-bold text-gray-900">{{ getRemainingPatients(target) }}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Clinical, Exception, and Resource Planning Row (Row 2) -->
                      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <!-- Clinical Completion Analysis -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <h4 class="text-lg font-semibold text-gray-900 mb-1">Clinical Completion Analysis</h4>
                          <p class="text-sm text-gray-600 mb-4">Patients clinically complete</p>
                          
                          <div class="space-y-3 mb-4">
                            <!-- Current -->
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Current</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getClinicalCompletionNumber(target) }} (54.4%)</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2" style="width: 54.4%;">
                                </div>
                              </div>
                            </div>
                            
                            <!-- Last Year at this time of year -->
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Last Year at this time of year</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getLastYearClinicalAtThisTime(target) }} ({{ getLastYearClinicalAtThisTimePercent(target) }}%)</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getLastYearClinicalAtThisTimePercent(target)}%`">
                                </div>
                              </div>
                            </div>
                            
                            <!-- Last Year Total -->
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Last Year Total</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getLastYearClinicalTotal(target) }} (62.52%)</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: 62.52%`">
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Sub ICB Comparison Bars -->
                          <div class="space-y-3 mb-4">
                            <!-- Sub ICB Completion at this time of year -->
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Sub ICB Completion at this time of year</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getSubICBClinicalCompletionAtThisTime(target) }}%</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBClinicalCompletionAtThisTime(target)}%`">
                                </div>
                              </div>
                            </div>
                            
                            <!-- Sub ICB Total Completion -->
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Sub ICB Total Completion</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getSubICBClinicalCompletionAverage(target) }}%</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBClinicalCompletionAverage(target)}%`">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Exception Reporting Analysis -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <h4 class="text-lg font-semibold text-gray-900 mb-1">Exception Reporting Analysis</h4>
                          <p class="text-sm text-gray-600 mb-4">Patients exception reported</p>
                          
                          <div class="space-y-3 mb-4">
                            <!-- Current -->
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Current</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getInvitedExceptionNumber(target) }} ({{ getSummaryData('HYP008').exceptionInvited }}%)</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSummaryData('HYP008').exceptionInvited}%`">
                                </div>
                              </div>
                            </div>
                            
                            <!-- Last Year at this time of year -->
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Last Year at this time of year</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getLastYearExceptionAtThisTime(target) }} ({{ getLastYearExceptionAtThisTimePercent(target) }}%)</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getLastYearExceptionAtThisTimePercent(target)}%`">
                                </div>
                              </div>
                            </div>
                            
                            <!-- Last Year Total -->
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Last Year Total</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getLastYearExceptionTotal(target) }} (19.72%)</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: 19.72%`">
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Sub ICB Comparison Bars -->
                          <div class="space-y-3 mb-4">
                            <!-- Sub ICB Exception Reporting at this time of year -->
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Sub ICB Exception Reporting at this time of year</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getSubICBExceptionReportingAtThisTime(target) }}%</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBExceptionReportingAtThisTime(target)}%`">
                                </div>
                              </div>
                            </div>
                            
                            <!-- Sub ICB Total Exception Reporting -->
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Sub ICB Total Exception Reporting</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getSubICBExceptionReportingAverage(target) }}%</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBExceptionReportingAverage(target)}%`">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Resource Planning -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <h4 class="text-lg font-semibold text-gray-900 mb-4">Resource Planning</h4>
                          <div class="text-3xl font-bold text-gray-900 mb-2">{{ getRemainingPatients(target).toLocaleString() }} appointments</div>
                          <div class="text-sm text-gray-600 mb-6">needed to reach 100% clinical completion</div>
                          
                          <div class="space-y-3 mb-4">
                            <div class="flex justify-between items-center">
                              <span class="text-sm text-gray-600">Traditional Cost:</span>
                              <span class="text-lg font-semibold text-gray-900">£{{ getTraditionalCost(target).toLocaleString() }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                              <span class="text-sm text-gray-600">Suvera Cost ★:</span>
                              <span class="text-lg font-semibold text-green-600">£{{ getSuveraCost(target).toLocaleString() }}</span>
                            </div>
                          </div>
                          
                          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div class="text-sm font-semibold text-green-800 mb-1">Potential Savings:</div>
                            <div class="text-2xl font-bold text-green-600">£{{ getPotentialSavings(target).toLocaleString() }}</div>
                            <div class="text-xs text-green-700 mt-1">Save {{ getSavingsPercentage(target) }}% with Suvera virtual clinic</div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- HYP009 Bar -->
            <div>
              <div class="flex items-center mb-2">
                <button 
                  @click="toggleAccordion('HYP009')"
                  class="flex items-center text-sm font-medium text-gray-900 w-24 hover:text-blue-600 transition-colors"
                >
                  <svg 
                    class="w-4 h-4 mr-1 transition-transform"
                    :class="{ 'rotate-90': expandedSections.HYP009 }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  HYP009
                </button>
                <div class="flex-1 relative bg-gray-100 rounded overflow-visible cursor-pointer" style="padding-bottom: 30px;" @click="toggleAccordion('HYP009')">
                  <!-- Bar container -->
                  <div class="relative h-8">
                    <!-- Complete -->
                    <div 
                      class="absolute left-0 top-0 h-full bg-green-600 flex items-center justify-center" 
                      :style="`width: ${getSummaryData('HYP009').complete}%`"
                    >
                      <span class="text-xs font-semibold text-white">{{ getSummaryData('HYP009').complete }}% ({{ getSummaryData('HYP009').completePatients }})</span>
                    </div>
                    <!-- Exception reported - invited -->
                    <div 
                      class="absolute h-full bg-gray-300 flex items-center justify-center" 
                      :style="`left: ${getSummaryData('HYP009').complete}%; width: ${getSummaryData('HYP009').exceptionInvited}%`"
                    >
                      <span class="text-xs font-semibold text-gray-700">{{ getSummaryData('HYP009').exceptionInvited }}% ({{ getSummaryData('HYP009').exceptionInvitedPatients }})</span>
                    </div>
                    <!-- Incomplete -->
                    <div 
                      class="absolute right-0 top-0 h-full bg-blue-600 flex items-center justify-center" 
                      :style="`width: ${getSummaryData('HYP009').incomplete}%`"
                    >
                      <span class="text-xs font-semibold text-white">{{ getSummaryData('HYP009').incomplete }}% ({{ getSummaryData('HYP009').incompletePatients }})</span>
            </div>
            
                    <!-- Min Achievement Threshold (40%) - Red -->
                    <div 
                      class="absolute top-0 bottom-0 pointer-events-none z-10"
                      style="left: 40%; width: 0;"
                    >
                      <div class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-red-500"></div>
                      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-red-500 rotate-45"></div>
                      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-red-500 rotate-45"></div>
              </div>
                    
                    <!-- Max Achievement Threshold (85%) - Green -->
                    <div 
                      class="absolute top-0 bottom-0 pointer-events-none z-10"
                      style="left: 85%; width: 0;"
                    >
                      <div class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 border-l-2 border-dashed border-green-500"></div>
                      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-green-500 rotate-45"></div>
                      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-green-500 rotate-45"></div>
                    </div>
                    
                    <!-- Expected by Today - Purple -->
                    <div 
                      class="absolute top-0 bottom-0 pointer-events-none z-10"
                      :style="`left: ${getExpectedAchievementForSummary()}%; width: 0;`"
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
                    
              <!-- Expanded HYP009 Content -->
              <div v-show="expandedSections.HYP009" class="mt-6 -mx-6 -mb-6">
                <div class="bg-white border-t border-gray-200">
                  <div 
                    v-for="(target, index) in targetCards.filter(t => t.code === 'HYP009' || t.qofCode === 'QOF_HYP009')" 
                    :key="`inline-${target.qofCode || target.code}`"
                    class="p-6"
        >
        <div class="flex justify-between items-start mb-6">
              <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ target.qofCode || conditionData.qofCode }}</h3>
              <p class="text-sm text-gray-600">{{ target.description || conditionData.description }}</p>
                </div>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            View in Planner
          </button>
        </div>
        <!-- Target Achievement Progress and Revenue Row (Row 1) -->
                    <template v-if="(target.code === 'HYP009' || target.qofCode === 'QOF_HYP009')">
                      <!-- Same full content structure as HYP008 - the template from lines 249-548 applies here too -->
                      <!-- The content is identical, just using different target data -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- Target Achievement Progress (takes 2 columns) -->
            <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Target Achievement Progress</h4>
              
              <div class="flex flex-col lg:flex-row items-start gap-6">
                <!-- Left: Donut Chart -->
                <div class="flex items-center flex-shrink-0">
                  <div class="relative w-32 h-32">
                    <svg class="transform -rotate-90 w-32 h-32">
                      <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" stroke-width="12"></circle>
                      <circle 
                        cx="64" 
                        cy="64" 
                        r="56" 
                        fill="none" 
                        stroke="#3b82f6" 
                        stroke-width="12"
                        :stroke-dasharray="`${(getTargetProgress(target) / 100) * 351.86} 351.86`"
                        stroke-linecap="round"
                      ></circle>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="text-center">
                        <div class="text-2xl font-bold text-gray-900">{{ Math.round(getTargetProgress(target)) }}%</div>
                        <div class="text-xs text-gray-600">of target</div>
                                    <div class="text-xs font-semibold text-blue-600 mt-1">{{ getQOFPoints(target) }} / {{ getMaxQOFPoints(target) }} points</div>
                      </div>
                </div>
              </div>
            </div>
            
                            <!-- Target Breakdown -->
                <div class="flex-1">
                              <div class="grid grid-cols-3 gap-3 mt-4">
                                <div class="bg-white border border-gray-200 rounded-lg p-3">
                                  <div class="flex items-center gap-2 mb-1">
                                    <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span class="text-xs font-medium text-gray-700">Clinical</span>
                                  </div>
                                  <div class="text-lg font-bold text-gray-900">{{ getClinicalCompletionPatients(target).toLocaleString() }}</div>
                                  <div class="text-xs text-gray-600">{{ Math.round((getClinicalCompletionPatients(target) / getPatientNumbers(target, getActualCompletion(target)).totalRegister) * 100 * 10) / 10 }}% of target</div>
                                </div>
                                <div class="bg-white border border-gray-200 rounded-lg p-3">
                                  <div class="flex items-center gap-2 mb-1">
                                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span class="text-xs font-medium text-gray-700">Exception</span>
                                  </div>
                                  <div class="text-lg font-bold text-gray-900">{{ getExceptionReportingPatients(target).toLocaleString() }}</div>
                                  <div class="text-xs text-gray-600">{{ Math.round((getExceptionReportingPatients(target) / getPatientNumbers(target, getActualCompletion(target)).totalRegister) * 100 * 10) / 10 }}% of target</div>
                                </div>
                                <div class="bg-white border border-gray-200 rounded-lg p-3">
                                  <div class="flex items-center gap-2 mb-1">
                                    <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span class="text-xs font-medium text-gray-700">Remaining</span>
                                  </div>
                                  <div class="text-lg font-bold text-gray-900">{{ (getPatientNumbers(target, getActualCompletion(target)).totalRegister - getClinicalCompletionPatients(target) - getExceptionReportingPatients(target)).toLocaleString() }}</div>
                                  <div class="text-xs text-gray-600">{{ Math.round(((getPatientNumbers(target, getActualCompletion(target)).totalRegister - getClinicalCompletionPatients(target) - getExceptionReportingPatients(target)) / getPatientNumbers(target, getActualCompletion(target)).totalRegister) * 100 * 10) / 10 }}% to go</div>
                                </div>
                              </div>
                            </div>
                          </div>
            </div>
            
                        <!-- Revenue Left on Table -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <h4 class="text-lg font-semibold text-gray-900 mb-4">Revenue Left on Table</h4>
                          <div class="text-4xl font-bold text-gray-900 mb-4">£{{ getRevenueLeftOnTable(target).toLocaleString() }}</div>
                          <div class="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                            <div class="flex items-start">
                              <svg class="w-5 h-5 text-orange-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                              </svg>
                              <div>
                                <div class="text-sm font-medium text-orange-800">{{ getUnclaimedPoints(target) }} unclaimed QOF points from {{ getRemainingPatients(target) }} patients</div>
                              </div>
                            </div>
                          </div>
                          <div class="grid grid-cols-2 gap-3">
                            <div class="bg-white border border-gray-200 rounded-lg p-3">
                              <div class="text-xs text-gray-600 mb-1">Unclaimed Points</div>
                              <div class="text-xl font-bold text-gray-900">{{ getUnclaimedPoints(target) }}</div>
                            </div>
                            <div class="bg-white border border-gray-200 rounded-lg p-3">
                              <div class="text-xs text-gray-600 mb-1">Patients Remaining</div>
                              <div class="text-xl font-bold text-gray-900">{{ getRemainingPatients(target) }}</div>
                            </div>
                          </div>
                        </div>
              </div>
                    
                      <!-- Clinical, Exception, and Resource Planning Row (Row 2) -->
                      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <!-- Clinical Completion Analysis -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <h4 class="text-lg font-semibold text-gray-900 mb-1">Clinical Completion Analysis</h4>
                          <p class="text-sm text-gray-600 mb-4">Patients clinically complete</p>
                          <div class="space-y-3">
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Current</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getClinicalCompletionPatients(target).toLocaleString() }}</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getClinicalCompletionPatients(target) / Math.max(getExpectedClinical(target), getLastYearClinical(target), getClinicalCompletionPatients(target))) * 100, 100)}%`"></div>
                              </div>
                            </div>
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Expected</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getExpectedClinical(target).toLocaleString() }}</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getExpectedClinical(target) / Math.max(getExpectedClinical(target), getLastYearClinical(target), getClinicalCompletionPatients(target))) * 100, 100)}%`"></div>
                              </div>
                            </div>
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Last Year</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getLastYearClinical(target).toLocaleString() }}</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getLastYearClinical(target) / Math.max(getExpectedClinical(target), getLastYearClinical(target), getClinicalCompletionPatients(target))) * 100, 100)}%`"></div>
                              </div>
                            </div>
                          </div>
            </div>
                    
                        <!-- Exception Reporting Analysis -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <h4 class="text-lg font-semibold text-gray-900 mb-1">Exception Reporting Analysis</h4>
                          <p class="text-sm text-gray-600 mb-4">Patients exception reported</p>
                          <div class="space-y-3 mb-4">
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Current</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getExceptionReportingPatients(target).toLocaleString() }}</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getExceptionReportingPatients(target) / Math.max(getExpectedException(target), getLastYearException(target), getExceptionReportingPatients(target))) * 100, 100)}%`"></div>
                              </div>
                            </div>
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Expected</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getExpectedException(target).toLocaleString() }}</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getExpectedException(target) / Math.max(getExpectedException(target), getLastYearException(target), getExceptionReportingPatients(target))) * 100, 100)}%`"></div>
                              </div>
                            </div>
                            <div>
                              <div class="flex justify-between items-center mb-1">
                                <span class="text-sm font-medium text-gray-700">Last Year</span>
                                <span class="text-sm font-semibold text-gray-900">{{ getLastYearException(target).toLocaleString() }}</span>
                              </div>
                              <div class="w-full bg-gray-200 rounded-full h-6">
                                <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getLastYearException(target) / Math.max(getExpectedException(target), getLastYearException(target), getExceptionReportingPatients(target))) * 100, 100)}%`"></div>
                              </div>
                            </div>
                          </div>
                          <div class="bg-white border border-gray-200 rounded-lg p-3">
                            <div class="flex justify-between items-center">
                              <span class="text-sm text-gray-600">Your exception rate:</span>
                              <span class="text-sm font-semibold text-gray-900">{{ getExceptionRate(target) }}%</span>
                            </div>
                            <div class="flex justify-between items-center mt-2">
                              <span class="text-sm text-gray-600">ICB Avg:</span>
                              <span class="text-sm font-semibold text-green-600 flex items-center">
                                {{ getSubICBAverage(target) }}%
                                <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>

                        <!-- Resource Planning -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <h4 class="text-lg font-semibold text-gray-900 mb-4">Resource Planning</h4>
                          <div class="text-3xl font-bold text-gray-900 mb-2">{{ getRemainingPatients(target).toLocaleString() }} appointments</div>
                          <div class="text-sm text-gray-600 mb-6">needed to reach 100% clinical completion</div>
                          <div class="space-y-3 mb-4">
                            <div class="flex justify-between items-center">
                              <span class="text-sm text-gray-600">Traditional Cost:</span>
                              <span class="text-lg font-semibold text-gray-900">£{{ getTraditionalCost(target).toLocaleString() }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                              <span class="text-sm text-gray-600">Suvera Cost ★:</span>
                              <span class="text-lg font-semibold text-green-600">£{{ getSuveraCost(target).toLocaleString() }}</span>
                            </div>
                          </div>
                          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div class="text-sm font-semibold text-green-800 mb-1">Potential Savings:</div>
                            <div class="text-2xl font-bold text-green-600">£{{ getPotentialSavings(target).toLocaleString() }}</div>
                            <div class="text-xs text-green-700 mt-1">Save {{ getSavingsPercentage(target) }}% with Suvera virtual clinic</div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
              
      <!-- QOF Target Cards -->
      <div class="space-y-6">
        <div 
          v-for="(target, index) in targetCards" 
          :key="target.qofCode || target.code"
          v-show="shouldShowTarget(target)"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
        <div class="flex justify-between items-start mb-6">
              <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ target.qofCode || conditionData.qofCode }}</h3>
              <p class="text-sm text-gray-600">{{ target.description || conditionData.description }}</p>
          </div>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            View in Planner
          </button>
        </div>

        <!-- Target Achievement Progress and Revenue Row (Row 1) -->
        <template v-if="(target.code === 'HYP008' || target.qofCode === 'QOF_HYP008' || target.code === 'HYP009' || target.qofCode === 'QOF_HYP009')">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- Target Achievement Progress (takes 2 columns) -->
            <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Target Achievement Progress</h4>
              
              <div class="flex flex-col lg:flex-row items-start gap-6">
                <!-- Left: Donut Chart -->
                <div class="flex items-center flex-shrink-0">
                  <!-- Donut Chart -->
                  <div class="relative w-32 h-32">
                    <svg class="transform -rotate-90 w-32 h-32">
                      <!-- Background circle -->
                      <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" stroke-width="12"></circle>
                      <!-- Progress circle -->
                      <circle 
                        cx="64" 
                        cy="64" 
                        r="56" 
                        fill="none" 
                        stroke="#3b82f6" 
                        stroke-width="12"
                        :stroke-dasharray="`${(getTargetProgress(target) / 100) * 351.86} 351.86`"
                        stroke-linecap="round"
                      ></circle>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="text-center">
                        <div class="text-2xl font-bold text-gray-900">{{ Math.round(getTargetProgress(target)) }}%</div>
                        <div class="text-xs text-gray-600">of target</div>
                      </div>
                </div>
              </div>
            </div>
            
                <!-- Target Breakdown (next to circle) -->
                <div class="flex-1">
                  <!-- Breakdown Cards -->
                  <div class="grid grid-cols-3 gap-3 mt-4">
                    <!-- Clinical Card -->
                    <div class="bg-white border border-gray-200 rounded-lg p-3">
                      <div class="flex items-center gap-2 mb-1">
                        <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span class="text-xs font-medium text-gray-700">Clinical</span>
            </div>
                      <div class="text-lg font-bold text-gray-900">{{ getClinicalCompletionPatients(target).toLocaleString() }}</div>
                      <div class="text-xs text-gray-600">{{ Math.round((getClinicalCompletionPatients(target) / getPatientNumbers(target, getActualCompletion(target)).totalRegister) * 100 * 10) / 10 }}% of target</div>
            </div>
            
                    <!-- Exception Card -->
                    <div class="bg-white border border-gray-200 rounded-lg p-3">
                      <div class="flex items-center gap-2 mb-1">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="text-xs font-medium text-gray-700">Exception</span>
            </div>
                      <div class="text-lg font-bold text-gray-900">{{ getExceptionReportingPatients(target).toLocaleString() }}</div>
                      <div class="text-xs text-gray-600">{{ Math.round((getExceptionReportingPatients(target) / getPatientNumbers(target, getActualCompletion(target)).totalRegister) * 100 * 10) / 10 }}% of target</div>
          </div>
          
                    <!-- Remaining Card -->
                    <div class="bg-white border border-gray-200 rounded-lg p-3">
                      <div class="flex items-center gap-2 mb-1">
                        <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span class="text-xs font-medium text-gray-700">Remaining</span>
                      </div>
                      <div class="text-lg font-bold text-gray-900">{{ (getPatientNumbers(target, getActualCompletion(target)).totalRegister - getClinicalCompletionPatients(target) - getExceptionReportingPatients(target)).toLocaleString() }}</div>
                      <div class="text-xs text-gray-600">{{ Math.round(((getPatientNumbers(target, getActualCompletion(target)).totalRegister - getClinicalCompletionPatients(target) - getExceptionReportingPatients(target)) / getPatientNumbers(target, getActualCompletion(target)).totalRegister) * 100 * 10) / 10 }}% to go</div>
                    </div>
                  </div>
                </div>
        </div>
      </div>

            <!-- Revenue Left on Table (takes 1 column, same width as Resource Planning) -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Revenue Left on Table</h4>
              <div class="text-4xl font-bold text-gray-900 mb-4">£{{ getRevenueLeftOnTable(target).toLocaleString() }}</div>
              <div class="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-orange-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
                  <div>
                    <div class="text-sm font-medium text-orange-800">{{ getUnclaimedPoints(target) }} unclaimed QOF points from {{ getRemainingPatients(target) }} patients</div>
        </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-white border border-gray-200 rounded-lg p-3">
                  <div class="text-xs text-gray-600 mb-1">Unclaimed Points</div>
                  <div class="text-xl font-bold text-gray-900">{{ getUnclaimedPoints(target) }}</div>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-3">
                  <div class="text-xs text-gray-600 mb-1">Patients Remaining</div>
                  <div class="text-xl font-bold text-gray-900">{{ getRemainingPatients(target) }}</div>
                </div>
              </div>
        </div>
      </div>

          <!-- Clinical, Exception, and Resource Planning Row (Row 2) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- Clinical Completion Analysis -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-1">Clinical Completion Analysis</h4>
              <p class="text-sm text-gray-600 mb-4">Patients clinically complete</p>
              
              <template v-if="target.code === 'HYP008' || target.qofCode === 'QOF_HYP008'">
                <div class="space-y-3 mb-4">
                  <!-- Current -->
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Current</span>
                      <span class="text-sm font-semibold text-gray-900">{{ getClinicalCompletionNumber(target) }} (54.4%)</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                      <div class="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2" style="width: 54.4%;">
                      </div>
                    </div>
                  </div>
                  
                  <!-- Last Year at this time of year -->
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Last Year at this time of year</span>
                      <span class="text-sm font-semibold text-gray-900">{{ getLastYearClinicalAtThisTime(target) }} ({{ getLastYearClinicalAtThisTimePercent(target) }}%)</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                      <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getLastYearClinicalAtThisTimePercent(target)}%`">
                      </div>
                    </div>
                  </div>
                  
                  <!-- Last Year Total -->
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Last Year Total</span>
                      <span class="text-sm font-semibold text-gray-900">{{ getLastYearClinicalTotal(target) }} (62.52%)</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                      <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: 62.52%`">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Sub ICB Comparison Bars -->
                <div class="space-y-3 mb-4">
                  <!-- Sub ICB Completion at this time of year -->
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Sub ICB Completion at this time of year</span>
                      <span class="text-sm font-semibold text-gray-900">{{ getSubICBClinicalCompletionAtThisTime(target) }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                      <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBClinicalCompletionAtThisTime(target)}%`">
                      </div>
                    </div>
                  </div>
                  
                  <!-- Sub ICB Total Completion -->
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Sub ICB Total Completion</span>
                      <span class="text-sm font-semibold text-gray-900">{{ getSubICBClinicalCompletionAverage(target) }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                      <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBClinicalCompletionAverage(target)}%`">
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              
              <template v-else>
                <!-- Original layout for other targets -->
              <div class="space-y-3">
                <!-- Current -->
          <div>
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-sm font-medium text-gray-700">Current</span>
                    <span class="text-sm font-semibold text-gray-900">{{ getClinicalCompletionPatients(target).toLocaleString() }}</span>
          </div>
                  <div class="w-full bg-gray-200 rounded-full h-6">
                    <div class="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getClinicalCompletionPatients(target) / Math.max(getExpectedClinical(target), getLastYearClinical(target), getClinicalCompletionPatients(target))) * 100, 100)}%`">
                    </div>
                  </div>
        </div>

                <!-- Expected -->
          <div>
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-sm font-medium text-gray-700">Expected</span>
                    <span class="text-sm font-semibold text-gray-900">{{ getExpectedClinical(target).toLocaleString() }}</span>
                </div>
                  <div class="w-full bg-gray-200 rounded-full h-6">
                    <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getExpectedClinical(target) / Math.max(getExpectedClinical(target), getLastYearClinical(target), getClinicalCompletionPatients(target))) * 100, 100)}%`">
                  </div>
                </div>
              </div>
              
                <!-- Last Year -->
              <div>
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-sm font-medium text-gray-700">Last Year</span>
                    <span class="text-sm font-semibold text-gray-900">{{ getLastYearClinical(target).toLocaleString() }}</span>
                </div>
                  <div class="w-full bg-gray-200 rounded-full h-6">
                    <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getLastYearClinical(target) / Math.max(getExpectedClinical(target), getLastYearClinical(target), getClinicalCompletionPatients(target))) * 100, 100)}%`">
                  </div>
                </div>
              </div>
            </div>
              </template>
          </div>

            <!-- Exception Reporting Analysis -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-1">Exception Reporting Analysis</h4>
              <p class="text-sm text-gray-600 mb-4">Patients exception reported</p>
              
              <template v-if="target.code === 'HYP008' || target.qofCode === 'QOF_HYP008'">
                <div class="space-y-3 mb-4">
                  <!-- Current -->
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Current</span>
                      <span class="text-sm font-semibold text-gray-900">{{ getInvitedExceptionNumber(target) }} ({{ getSummaryData('HYP008').exceptionInvited }}%)</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                      <div class="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSummaryData('HYP008').exceptionInvited}%`">
                      </div>
                    </div>
                  </div>
                  
                  <!-- Last Year at this time of year -->
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Last Year at this time of year</span>
                      <span class="text-sm font-semibold text-gray-900">{{ getLastYearExceptionAtThisTime(target) }} ({{ getLastYearExceptionAtThisTimePercent(target) }}%)</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                      <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getLastYearExceptionAtThisTimePercent(target)}%`">
                      </div>
                    </div>
                  </div>
                  
                  <!-- Last Year Total -->
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Last Year Total</span>
                      <span class="text-sm font-semibold text-gray-900">{{ getLastYearExceptionTotal(target) }} (19.72%)</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                      <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: 19.72%`">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Sub ICB Comparison Bars -->
                <div class="space-y-3 mb-4">
                  <!-- Sub ICB Exception Reporting at this time of year -->
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Sub ICB Exception Reporting at this time of year</span>
                      <span class="text-sm font-semibold text-gray-900">{{ getSubICBExceptionReportingAtThisTime(target) }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                      <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBExceptionReportingAtThisTime(target)}%`">
                      </div>
                    </div>
                  </div>
                  
                  <!-- Sub ICB Total Exception Reporting -->
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-700">Sub ICB Total Exception Reporting</span>
                      <span class="text-sm font-semibold text-gray-900">{{ getSubICBExceptionReportingAverage(target) }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-6">
                      <div class="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${getSubICBExceptionReportingAverage(target)}%`">
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              
              <template v-else>
                <!-- Original layout for other targets -->
              <div class="space-y-3 mb-4">
                <!-- Current -->
          <div>
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-sm font-medium text-gray-700">Current</span>
                    <span class="text-sm font-semibold text-gray-900">{{ getExceptionReportingPatients(target).toLocaleString() }}</span>
                </div>
                  <div class="w-full bg-gray-200 rounded-full h-6">
                    <div class="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getExceptionReportingPatients(target) / Math.max(getExpectedException(target), getLastYearException(target), getExceptionReportingPatients(target))) * 100, 100)}%`">
                  </div>
                </div>
              </div>
              
                <!-- Expected -->
              <div>
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-sm font-medium text-gray-700">Expected</span>
                    <span class="text-sm font-semibold text-gray-900">{{ getExpectedException(target).toLocaleString() }}</span>
                </div>
                  <div class="w-full bg-gray-200 rounded-full h-6">
                    <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getExpectedException(target) / Math.max(getExpectedException(target), getLastYearException(target), getExceptionReportingPatients(target))) * 100, 100)}%`">
                  </div>
                </div>
              </div>
                
                <!-- Last Year -->
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-sm font-medium text-gray-700">Last Year</span>
                    <span class="text-sm font-semibold text-gray-900">{{ getLastYearException(target).toLocaleString() }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-6">
                    <div class="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2" :style="`width: ${Math.min((getLastYearException(target) / Math.max(getExpectedException(target), getLastYearException(target), getExceptionReportingPatients(target))) * 100, 100)}%`">
                    </div>
                  </div>
            </div>
          </div>

              <!-- Exception Rate Comparison -->
              <div class="bg-white border border-gray-200 rounded-lg p-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Your exception rate:</span>
                  <span class="text-sm font-semibold text-gray-900">{{ getExceptionRate(target) }}%</span>
                </div>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-sm text-gray-600">ICB Avg:</span>
                  <span class="text-sm font-semibold text-green-600 flex items-center">
                    {{ getSubICBAverage(target) }}%
                    <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                  </div>
                </div>
              </template>
              </div>
              
            <!-- Resource Planning -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Resource Planning
              </h4>
              <div class="text-3xl font-bold text-gray-900 mb-2">{{ getAppointmentsNeeded(target) }} appointments</div>
              <div class="text-sm text-gray-600 mb-6">needed to reach 100% clinical completion</div>
              
              <div class="space-y-3 mb-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Traditional Cost:</span>
                  <span class="text-lg font-semibold text-gray-900">£{{ getTraditionalCost(target).toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 flex items-center">
                    Suvera Cost
                    <svg class="w-4 h-4 ml-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </span>
                  <span class="text-lg font-semibold text-gray-900">£{{ getSuveraCost(target).toLocaleString() }}</span>
                  </div>
                </div>
              
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700">Potential Savings:</span>
                  <span class="text-2xl font-bold text-green-700">£{{ getPotentialSavings(target).toLocaleString() }}</span>
              </div>
                <div class="text-xs text-gray-600">Save {{ getSavingsPercentage(target) }}% with Suvera virtual clinic</div>
            </div>
          </div>
        </div>
        </template>
      </div>
    </div>
    </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const route = useRoute()

// Toggle state for showing previous year comparison
const showPreviousYear = ref(true)

// Accordion state for summary section
const expandedSections = ref({
  HYP008: false,
  HYP009: false
})

// Toggle accordion section
const toggleAccordion = (section) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

// Check if target should be shown (only for hypertension, based on accordion state)
const shouldShowTarget = (target) => {
  // For non-hypertension conditions, always show
  if (conditionData.value.title !== 'Hypertension') {
    return true
  }
  
  // For hypertension, hide from main section if shown in summary accordion
  const targetCode = target.code || target.qofCode
  if (targetCode === 'HYP008' || targetCode === 'QOF_HYP008') {
    return false // Always hide from main section, show in accordion
  }
  if (targetCode === 'HYP009' || targetCode === 'QOF_HYP009') {
    return false // Always hide from main section, show in accordion
  }
  
  return true
}

// Get target by code
const getTargetByCode = (code) => {
  return targetCards.value.find(t => t.code === code || t.qofCode === `QOF_${code}`)
}

// Condition data mapping
const conditionMap = {
  'asthma': {
    title: 'Asthma',
    qofCode: 'QOF_AST0077',
    description: 'Asthma review including control score, number of exacerbations, inhaler technique and written plan (Asthma)',
    targets: [
      { code: 'AST007', name: 'Targets AST007' },
      { code: 'AST012', name: 'Targets AST012' }
    ],
    targetDetails: [
      {
        code: 'AST007',
        qofCode: 'QOF_AST007',
        description: 'Asthma management target AST007',
        minThreshold: 45,
        maxThreshold: 70,
        maxPoints: 20,
        currentPoints: 20,
        totalCompletion: 76
      },
      {
        code: 'AST012',
        qofCode: 'QOF_AST012',
        description: 'Asthma management target AST012',
        minThreshold: 45,
        maxThreshold: 80,
        maxPoints: 15,
        currentPoints: 15,
        totalCompletion: 88
      }
    ]
  },
  'hypertension': {
    title: 'Hypertension',
    qofCode: 'QOF_HYP001',
    description: 'Hypertension management including blood pressure monitoring and medication review',
    targets: [
      { code: 'HYP008', name: 'Targets HYP008' },
      { code: 'HYP009', name: 'Targets HYP009' }
    ],
    targetDetails: [
      {
        code: 'HYP008',
        qofCode: 'QOF_HYP008',
        description: 'The percentage of patients aged 79 years or under with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 140/90 mmHg or less (or equivalent home blood pressure reading)',
        minThreshold: 40,
        maxThreshold: 85,
        maxPoints: 38,
        currentPoints: 26.19,
        totalCompletion: 71
      },
      {
        code: 'HYP009',
        qofCode: 'QOF_HYP009',
        description: 'The percentage of patients aged 80 years or over with hypertension in whom the last blood pressure reading (measured in the preceding 12 months) is 150/90 mmHg or less (or equivalent home blood pressure reading)',
        minThreshold: 40,
        maxThreshold: 85,
        maxPoints: 14,
        currentPoints: 10.2,
        totalCompletion: 73
      }
    ]
  },
  'cholesterol': {
    title: 'Cholesterol',
    qofCode: 'QOF_CHL001',
    description: 'Cholesterol management including lipid profile monitoring and statin therapy',
    targets: [
      { code: 'CHOL003', name: 'Targets CHOL003' },
      { code: 'CHOL004', name: 'Targets CHOL004' }
    ],
    targetDetails: [
      {
        code: 'CHOL003',
        qofCode: 'QOF_CHOL003',
        description: 'Cholesterol management target CHOL003',
        minThreshold: 70,
        maxThreshold: 95,
        maxPoints: 38,
        currentPoints: 14.15,
        totalCompletion: 79
      },
      {
        code: 'CHOL004',
        qofCode: 'QOF_CHOL004',
        description: 'Cholesterol management target CHOL004',
        minThreshold: 20,
        maxThreshold: 50,
        maxPoints: 44,
        currentPoints: 44,
        totalCompletion: 57
      }
    ]
  },
  'diabetes': {
    title: 'Diabetes',
    qofCode: 'QOF_DIA001',
    description: 'Diabetes management including HbA1c monitoring, foot care, and eye screening',
    targets: [
      { code: 'DM006', name: 'Targets DM006' },
      { code: 'DM012', name: 'Targets DM012' },
      { code: 'DM014', name: 'Targets DM014' },
      { code: 'DM020', name: 'Targets DM020' },
      { code: 'DM021', name: 'Targets DM021' },
      { code: 'DM034', name: 'Targets DM034' },
      { code: 'DM035', name: 'Targets DM035' },
      { code: 'DM036', name: 'Targets DM036' }
    ],
    targetDetails: [
      {
        code: 'DM006',
        qofCode: 'QOF_DM006',
        description: 'Diabetes management target DM006',
        minThreshold: 57,
        maxThreshold: 97,
        maxPoints: 3,
        currentPoints: 1.41,
        totalCompletion: 76
      },
      {
        code: 'DM012',
        qofCode: 'QOF_DM012',
        description: 'Diabetes management target DM012',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 4,
        currentPoints: 1.03,
        totalCompletion: 60
      },
      {
        code: 'DM014',
        qofCode: 'QOF_DM014',
        description: 'Diabetes management target DM014',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 11,
        currentPoints: 11,
        totalCompletion: 100
      },
      {
        code: 'DM020',
        qofCode: 'QOF_DM020',
        description: 'Diabetes management target DM020',
        minThreshold: 37,
        maxThreshold: 75,
        maxPoints: 17,
        currentPoints: 8.59,
        totalCompletion: 55
      },
      {
        code: 'DM021',
        qofCode: 'QOF_DM021',
        description: 'Diabetes management target DM021',
        minThreshold: 52,
        maxThreshold: 92,
        maxPoints: 10,
        currentPoints: 5.75,
        totalCompletion: 75
      },
      {
        code: 'DM034',
        qofCode: 'QOF_DM034',
        description: 'Diabetes management target DM034',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 4,
        currentPoints: 2.31,
        totalCompletion: 73
      },
      {
        code: 'DM035',
        qofCode: 'QOF_DM035',
        description: 'Diabetes management target DM035',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 2,
        currentPoints: 1.84,
        totalCompletion: 87
      },
      {
        code: 'DM036',
        qofCode: 'QOF_DM036',
        description: 'Diabetes management target DM036',
        minThreshold: 38,
        maxThreshold: 90,
        maxPoints: 27,
        currentPoints: 18.3,
        totalCompletion: 73
      }
    ]
  },
  'copd': {
    title: 'COPD',
    qofCode: 'QOF_COPD001',
    description: 'COPD management including spirometry, smoking cessation, and inhaler technique',
    targets: [
      { code: 'COPD010', name: 'Targets COPD010' }
    ],
    targetDetails: [
      {
        code: 'COPD010',
        qofCode: 'QOF_COPD010',
        description: 'COPD management target COPD010',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 9,
        currentPoints: 4.94,
        totalCompletion: 72
      }
    ]
  },
  'heart-failure': {
    title: 'Heart Failure',
    qofCode: 'QOF_HF001',
    description: 'Heart failure management including echocardiography, medication review, and symptom monitoring',
    targets: [
      { code: 'HF003', name: 'Targets HF003' },
      { code: 'HF006', name: 'Targets HF006' },
      { code: 'HF007', name: 'Targets HF007' },
      { code: 'HF008', name: 'Targets HF008' }
    ],
    targetDetails: [
      {
        code: 'HF003',
        qofCode: 'QOF_HF003',
        description: 'Heart failure management target HF003',
        minThreshold: 60,
        maxThreshold: 92,
        maxPoints: 6,
        currentPoints: 3.28,
        totalCompletion: 78
      },
      {
        code: 'HF006',
        qofCode: 'QOF_HF006',
        description: 'Heart failure management target HF006',
        minThreshold: 60,
        maxThreshold: 92,
        maxPoints: 6,
        currentPoints: 3.47,
        totalCompletion: 78
      },
      {
        code: 'HF007',
        qofCode: 'QOF_HF007',
        description: 'Heart failure management target HF007',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 7,
        currentPoints: 1.18,
        totalCompletion: 57
      },
      {
        code: 'HF008',
        qofCode: 'QOF_HF008',
        description: 'Heart failure management target HF008',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 6,
        currentPoints: 6,
        totalCompletion: 91
      }
    ]
  },
  'atrial-fibrillation': {
    title: 'Atrial Fibrillation',
    qofCode: 'QOF_AF001',
    description: 'Atrial fibrillation management including anticoagulation therapy and stroke risk assessment',
    targets: [
      { code: 'AF006', name: 'Targets AF006' },
      { code: 'AF008', name: 'Targets AF008' }
    ],
    targetDetails: [
      {
        code: 'AF006',
        qofCode: 'QOF_AF006',
        description: 'Atrial fibrillation management target AF006',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 12,
        currentPoints: 12,
        totalCompletion: 98
      },
      {
        code: 'AF008',
        qofCode: 'QOF_AF008',
        description: 'Atrial fibrillation management target AF008',
        minThreshold: 70,
        maxThreshold: 95,
        maxPoints: 12,
        currentPoints: 11.4,
        totalCompletion: 94
      }
    ]
  },
  'coronary-heart-disease': {
    title: 'Coronary Heart Disease',
    qofCode: 'QOF_CHD001',
    description: 'Coronary heart disease management including lipid control, blood pressure monitoring, and medication review',
    targets: [
      { code: 'CHD005', name: 'Targets CHD005' },
      { code: 'CHD015', name: 'Targets CHD015' },
      { code: 'CHD016', name: 'Targets CHD016' }
    ],
    targetDetails: [
      {
        code: 'CHD005',
        qofCode: 'QOF_CHD005',
        description: 'Coronary heart disease management target CHD005',
        minThreshold: 56,
        maxThreshold: 96,
        maxPoints: 7,
        currentPoints: 5.07,
        totalCompletion: 85
      },
      {
        code: 'CHD015',
        qofCode: 'QOF_CHD015',
        description: 'Coronary heart disease management target CHD015',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 33,
        currentPoints: 14.68,
        totalCompletion: 62
      },
      {
        code: 'CHD016',
        qofCode: 'QOF_CHD016',
        description: 'Coronary heart disease management target CHD016',
        minThreshold: 46,
        maxThreshold: 90,
        maxPoints: 14,
        currentPoints: 9.23,
        totalCompletion: 75
      }
    ]
  },
  'dementia': {
    title: 'Dementia',
    qofCode: 'QOF_DEM001',
    description: 'Dementia care including cognitive assessment, medication review, and carer support',
    targets: [
      { code: 'DEM004', name: 'Targets DEM004' }
    ],
    targetDetails: [
      {
        code: 'DEM004',
        qofCode: 'QOF_DEM004',
        description: 'Dementia care target DEM004',
        minThreshold: 35,
        maxThreshold: 70,
        maxPoints: 14,
        currentPoints: 0,
        totalCompletion: 0
      }
    ]
  },
  'mental-health': {
    title: 'Mental Health',
    qofCode: 'QOF_MH001',
    description: 'Mental health management including depression screening, medication review, and care planning',
    targets: [
      { code: 'MH002', name: 'Targets MH002' },
      { code: 'MH003', name: 'Targets MH003' },
      { code: 'MH006', name: 'Targets MH006' },
      { code: 'MH007', name: 'Targets MH007' },
      { code: 'MH011', name: 'Targets MH011' },
      { code: 'MH012', name: 'Targets MH012' }
    ],
    targetDetails: [
      {
        code: 'MH002',
        qofCode: 'QOF_MH002',
        description: 'Mental health management target MH002',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 5,
        currentPoints: 0.04,
        totalCompletion: 40
      },
      {
        code: 'MH003',
        qofCode: 'QOF_MH003',
        description: 'Mental health management target MH003',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 3,
        currentPoints: 0.39,
        totalCompletion: 55
      },
      {
        code: 'MH006',
        qofCode: 'QOF_MH006',
        description: 'Mental health management target MH006',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 3,
        currentPoints: 0,
        totalCompletion: 48
      },
      {
        code: 'MH007',
        qofCode: 'QOF_MH007',
        description: 'Mental health management target MH007',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 3,
        currentPoints: 0.23,
        totalCompletion: 53
      },
      {
        code: 'MH011',
        qofCode: 'QOF_MH011',
        description: 'Mental health management target MH011',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 7,
        currentPoints: 1.75,
        totalCompletion: 60
      },
      {
        code: 'MH012',
        qofCode: 'QOF_MH012',
        description: 'Mental health management target MH012',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 7,
        currentPoints: 1.19,
        totalCompletion: 57
      }
    ]
  },
  'ndh': {
    title: 'NDH',
    qofCode: 'QOF_NDH001',
    description: 'Non-diabetic hyperglycaemia management including lifestyle interventions and monitoring',
    targets: [
      { code: 'NDH002', name: 'Targets NDH002' }
    ],
    targetDetails: [
      {
        code: 'NDH002',
        qofCode: 'QOF_NDH002',
        description: 'Non-diabetic hyperglycaemia management target NDH002',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 18,
        currentPoints: 15.28,
        totalCompletion: 84
      }
    ]
  },
  'stroke-tia': {
    title: 'Stroke and TIA',
    qofCode: 'QOF_STK001',
    description: 'Stroke and TIA management including anticoagulation, blood pressure control, and secondary prevention',
    targets: [
      { code: 'STIA007', name: 'Targets STIA007' },
      { code: 'STIA014', name: 'Targets STIA014' },
      { code: 'STIA015', name: 'Targets STIA015' }
    ],
    targetDetails: [
      {
        code: 'STIA007',
        qofCode: 'QOF_STIA007',
        description: 'Stroke and TIA management target STIA007',
        minThreshold: 57,
        maxThreshold: 97,
        maxPoints: 4,
        currentPoints: 3.11,
        totalCompletion: 88
      },
      {
        code: 'STIA014',
        qofCode: 'QOF_STIA014',
        description: 'Stroke and TIA management target STIA014',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 8,
        currentPoints: 3.17,
        totalCompletion: 60
      },
      {
        code: 'STIA015',
        qofCode: 'QOF_STIA015',
        description: 'Stroke and TIA management target STIA015',
        minThreshold: 46,
        maxThreshold: 90,
        maxPoints: 6,
        currentPoints: 4.4,
        totalCompletion: 78
      }
    ]
  },
  'blood-pressure': {
    title: 'Blood Pressure',
    qofCode: 'QOF_BP001',
    description: 'Blood pressure monitoring and management including hypertension screening and control',
    targets: [
      { code: 'BP002', name: 'Targets BP002' }
    ],
    targetDetails: [
      {
        code: 'BP002',
        qofCode: 'QOF_BP002',
        description: 'Blood pressure management target BP002',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 15,
        currentPoints: 0,
        totalCompletion: 0
      }
    ]
  },
  'smoking': {
    title: 'Smoking',
    qofCode: 'QOF_SMK001',
    description: 'Smoking cessation support including advice, referrals, and follow-up care',
    targets: [
      { code: 'SMOK002', name: 'Targets SMOK002' },
      { code: 'SMOK004', name: 'Targets SMOK004' }
    ],
    targetDetails: [
      {
        code: 'SMOK002',
        qofCode: 'QOF_SMOK002',
        description: 'Smoking cessation target SMOK002',
        minThreshold: 50,
        maxThreshold: 90,
        maxPoints: 25,
        currentPoints: 0,
        totalCompletion: 0
      },
      {
        code: 'SMOK004',
        qofCode: 'QOF_SMOK004',
        description: 'Smoking cessation target SMOK004',
        minThreshold: 40,
        maxThreshold: 90,
        maxPoints: 12,
        currentPoints: 0,
        totalCompletion: 0
      }
    ]
  },
  'vaccination-immunisations': {
    title: 'Vaccination and Immunisations',
    qofCode: 'QOF_VAC001',
    description: 'Vaccination and immunisation coverage including flu, COVID-19, and routine childhood vaccinations',
    targets: [
      { code: 'VI001', name: 'Targets VI001' },
      { code: 'VI002', name: 'Targets VI002' },
      { code: 'VI003', name: 'Targets VI003' },
      { code: 'VI004', name: 'Targets VI004' }
    ],
    targetDetails: [
      {
        code: 'VI001',
        qofCode: 'QOF_VI001',
        description: 'Vaccination and immunisations target VI001',
        minThreshold: 89,
        maxThreshold: 96,
        maxPoints: 18,
        currentPoints: 0,
        totalCompletion: 0
      },
      {
        code: 'VI002',
        qofCode: 'QOF_VI002',
        description: 'Vaccination and immunisations target VI002',
        minThreshold: 86,
        maxThreshold: 96,
        maxPoints: 18,
        currentPoints: 0,
        totalCompletion: 0
      },
      {
        code: 'VI003',
        qofCode: 'QOF_VI003',
        description: 'Vaccination and immunisations target VI003',
        minThreshold: 86,
        maxThreshold: 96,
        maxPoints: 18,
        currentPoints: 0,
        totalCompletion: 0
      },
      {
        code: 'VI004',
        qofCode: 'QOF_VI004',
        description: 'Vaccination and immunisations target VI004',
        minThreshold: 57,
        maxThreshold: 97,
        maxPoints: 10,
        currentPoints: 0,
        totalCompletion: 0
      }
    ]
  },
  'cervical-screening': {
    title: 'Cervical Screening',
    qofCode: 'QOF_CS001',
    description: 'Cervical screening coverage including invitations, uptake, and follow-up care',
    targets: [
      { code: 'CS005', name: 'Targets CS005' },
      { code: 'CS006', name: 'Targets CS006' }
    ],
    targetDetails: [
      {
        code: 'CS005',
        qofCode: 'QOF_CS005',
        description: 'Cervical screening target CS005',
        minThreshold: 45,
        maxThreshold: 80,
        maxPoints: 7,
        currentPoints: 0,
        totalCompletion: 0
      },
      {
        code: 'CS006',
        qofCode: 'QOF_CS006',
        description: 'Cervical screening target CS006',
        minThreshold: 45,
        maxThreshold: 80,
        maxPoints: 4,
        currentPoints: 0,
        totalCompletion: 0
      }
    ]
  }
}

const conditionData = computed(() => {
  const condition = route.query.condition || 'asthma'
  return conditionMap[condition] || conditionMap['asthma']
})

const targetCards = computed(() => {
  // For hypertension, show multiple target cards (HYP008 and HYP009)
  if (conditionData.value.targetDetails && conditionData.value.targetDetails.length > 0) {
    return conditionData.value.targetDetails
  }
  // For other conditions, show single card with default data
  return [{
    qofCode: conditionData.value.qofCode,
    description: conditionData.value.description
  }]
})

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

// Function to get "until target" text based on target and current achievement
const getUntilTargetText = (target, currentAchievement) => {
  // Maximum achievement targets by code
  const maxAchievements = {
    'HYP008': 85,
    'QOF_HYP008': 85,
    'HYP009': 80,
    'QOF_HYP009': 80
  }
  
  const targetCode = target.code || target.qofCode
  const maxAchievement = maxAchievements[targetCode]
  
  if (maxAchievement) {
    const untilTarget = maxAchievement - currentAchievement
    if (untilTarget > 0) {
      return `${untilTarget.toFixed(1)}% until achieving target`
    } else {
      return `Target achieved`
    }
  }
  
  // Default fallback
  return 'X% until target'
}

// Function to get "behind/ahead of expected" text
const getExpectedComparisonText = (target, currentAchievement) => {
  const expectedAchievement = getExpectedAchievement(target)
  
  if (!expectedAchievement) {
    return ''
  }
  
  const difference = expectedAchievement - currentAchievement
  
  if (Math.abs(difference) < 0.1) {
    return 'On track with expected'
  } else if (difference > 0) {
    return `${difference.toFixed(1)}% behind expected`
  } else {
    return `${Math.abs(difference).toFixed(1)}% ahead of expected`
  }
}

// Function to get the CSS class for expected comparison text
const getExpectedComparisonClass = (target, currentAchievement) => {
  const expectedAchievement = getExpectedAchievement(target)
  
  if (!expectedAchievement) {
    return 'text-sm text-gray-600'
  }
  
  const difference = expectedAchievement - currentAchievement
  
  if (Math.abs(difference) < 0.1) {
    return 'text-sm text-gray-600'
  } else if (difference > 0) {
    return 'text-sm text-red-600 font-medium'
  } else {
    return 'text-sm text-green-600 font-medium'
  }
}

// Function to get the arrow icon for expected comparison
const getExpectedComparisonIcon = (target, currentAchievement) => {
  const expectedAchievement = getExpectedAchievement(target)
  
  if (!expectedAchievement) {
    return ''
  }
  
  const difference = expectedAchievement - currentAchievement
  
  if (Math.abs(difference) < 0.1) {
    return ''
  } else if (difference > 0) {
    // Behind expected = bad = red down arrow
    return '<svg class="w-3 h-3 mr-1 inline" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>'
  } else {
    // Ahead of expected = good = green up arrow
    return '<svg class="w-3 h-3 mr-1 inline" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>'
  }
}

// Function to get "above/below target" text for QOF 23/24 based on target and current achievement
const getAboveTargetText = (target, currentAchievement) => {
  // Maximum achievement targets for QOF 23/24 by code
  const maxAchievements23_24 = {
    'HYP008': 77,
    'QOF_HYP008': 77,
    'HYP009': 80,
    'QOF_HYP009': 80
  }
  
  // Minimum achievement targets by code
  const minAchievements = {
    'HYP008': 40,
    'QOF_HYP008': 40,
    'HYP009': 40,
    'QOF_HYP009': 40
  }
  
  const targetCode = target.code || target.qofCode
  const maxAchievement = maxAchievements23_24[targetCode]
  const minAchievement = minAchievements[targetCode]
  
  if (maxAchievement) {
    const diffFromMax = maxAchievement - currentAchievement
    const diffFromMin = currentAchievement - minAchievement
    
    if (currentAchievement >= maxAchievement) {
      return `↑ Target achieved`
    } else if (diffFromMax > 0) {
      return `${diffFromMax.toFixed(1)}% below maximum`
    } else if (diffFromMin > 0) {
      return `↑ ${diffFromMin.toFixed(1)}% above minimum`
    } else {
      return `${Math.abs(diffFromMin).toFixed(1)}% below minimum`
    }
  }
  
  // Default fallback
  return '↑ X% above target'
}

// Function to get the CSS class for the above/below target text
const getAboveTargetClass = (target, currentAchievement) => {
  const targetCode = target.code || target.qofCode
  const maxAchievements23_24 = {
    'HYP008': 77,
    'QOF_HYP008': 77,
    'HYP009': 80,
    'QOF_HYP009': 80
  }
  const minAchievements = {
    'HYP008': 40,
    'QOF_HYP008': 40,
    'HYP009': 40,
    'QOF_HYP009': 40
  }
  
  const maxAchievement = maxAchievements23_24[targetCode]
  const minAchievement = minAchievements[targetCode]
  
  if (maxAchievement) {
    if (currentAchievement >= maxAchievement) {
      return 'text-sm text-green-600 font-medium'
    } else if (currentAchievement >= minAchievement) {
      return 'text-sm text-gray-600'
    } else {
      return 'text-sm text-red-600 font-medium'
    }
  }
  
  return 'text-sm text-green-600 font-medium'
}

// Helper function to calculate financial year progress (0 to 1)
const getFinancialYearProgress = () => {
  // Financial year runs from April 1 to March 31
  const today = new Date()
  const currentYear = today.getFullYear()
  
  // Determine which financial year we're in
  // If month is Jan-Mar, we're in the financial year that started the previous April
  // If month is Apr-Dec, we're in the financial year that started this April
  let financialYearStart
  if (today.getMonth() < 3) { // Jan (0), Feb (1), Mar (2)
    financialYearStart = new Date(currentYear - 1, 3, 1) // April 1 of previous year
  } else {
    financialYearStart = new Date(currentYear, 3, 1) // April 1 of current year
  }
  
  // Calculate days from financial year start to today
  const daysElapsed = Math.floor((today - financialYearStart) / (1000 * 60 * 60 * 24))
  
  // Total days in a year (365, or 366 for leap years)
  const daysInYear = ((financialYearStart.getFullYear() % 4 === 0 && financialYearStart.getFullYear() % 100 !== 0) || 
                       (financialYearStart.getFullYear() % 400 === 0)) ? 366 : 365
  
  // Calculate percentage of year elapsed
  return daysElapsed / daysInYear
}

// Function to calculate expected achievement by today based on financial year progress
const getExpectedAchievement = (target) => {
  // Maximum achievement targets for QOF 24/25 by code
  const maxAchievements24_25 = {
    'HYP008': 85,
    'QOF_HYP008': 85,
    'HYP009': 80,
    'QOF_HYP009': 80
  }
  
  const targetCode = target.code || target.qofCode
  const maxAchievement = maxAchievements24_25[targetCode]
  
  if (!maxAchievement) {
    return 0
  }
  
  const yearProgress = getFinancialYearProgress()
  
  // Expected achievement = year progress * max achievement
  return yearProgress * maxAchievement
}

// Function to calculate forecasted exception reporting based on financial year progress
const getForecastedExceptionReporting = (target) => {
  // Exception reporting targets for QOF 24/25 by code
  const exceptionTargets = {
    'HYP008': 12.75,
    'QOF_HYP008': 12.75,
    'HYP009': 4.9,
    'QOF_HYP009': 4.9
  }
  
  const targetCode = target.code || target.qofCode
  const exceptionTarget = exceptionTargets[targetCode]
  
  if (!exceptionTarget) {
    return 0
  }
  
  const yearProgress = getFinancialYearProgress()
  
  // Forecasted exception reporting = year progress * exception target
  return yearProgress * exceptionTarget
}

// Function to get Sub ICB Average exception reporting
const getSubICBAverage = (target) => {
  const subICBAverages = {
    'HYP008': 12.5,
    'QOF_HYP008': 12.5,
    'HYP009': 4.9, // Add HYP009 value if available
    'QOF_HYP009': 4.9
  }
  
  const targetCode = target.code || target.qofCode
  return subICBAverages[targetCode] || 0
}

// Helper function to calculate clinical completion percentage
// Clinical completion = 92% of completed patients
// Exception reporting = 8% of completed patients
const getClinicalCompletion = (target) => {
  const registerSizes = {
    'HYP008': 683,
    'QOF_HYP008': 683,
    'HYP009': 234,
    'QOF_HYP009': 234
  }
  
  const actualCompletions = {
    'HYP008': 52,
    'QOF_HYP008': 52,
    'HYP009': 59,
    'QOF_HYP009': 59
  }
  
  const clinicalCompletionRates = {
    'HYP008': 92,
    'QOF_HYP008': 92,
    'HYP009': 95.1, // 100% - 4.9% exceptions
    'QOF_HYP009': 95.1
  }
  
  const targetCode = target.code || target.qofCode
  const totalRegister = registerSizes[targetCode] || 683
  const completionPercent = actualCompletions[targetCode] || 52
  const clinicalRate = clinicalCompletionRates[targetCode] || 92
  
  // Calculate completed patients (from completion percentage)
  const completed = Math.round((completionPercent / 100) * totalRegister)
  
  // Clinical completion patients = 92% of completed patients
  const clinicalCompleted = Math.round((clinicalRate / 100) * completed)
  
  // Clinical completion percentage = (clinical completed / total register) * 100
  const clinicalCompletionPercent = (clinicalCompleted / totalRegister) * 100
  
  return Math.round(clinicalCompletionPercent * 10) / 10 // Round to 1 decimal
}

// Helper function to get exception reporting patients (8% of completed patients)
const getExceptionReportingPatients = (target) => {
  const registerSizes = {
    'HYP008': 683,
    'QOF_HYP008': 683,
    'HYP009': 234,
    'QOF_HYP009': 234
  }
  
  const actualCompletions = {
    'HYP008': 52,
    'QOF_HYP008': 52,
    'HYP009': 59,
    'QOF_HYP009': 59
  }
  
  const exceptionRates = {
    'HYP008': 8,
    'QOF_HYP008': 8,
    'HYP009': 4.9,
    'QOF_HYP009': 4.9
  }
  
  const targetCode = target.code || target.qofCode
  const totalRegister = registerSizes[targetCode] || 683
  const completionPercent = actualCompletions[targetCode] || 52
  const exceptionRate = exceptionRates[targetCode] || 8
  
  // Calculate completed patients
  const completed = Math.round((completionPercent / 100) * totalRegister)
  
  // Exception reporting patients = 8% of completed patients
  return Math.round((exceptionRate / 100) * completed)
}

// Helper function to get actual completion percentage for a target
// For Completion percentage column: HYP008 = 52%, HYP009 = 59%
// For other columns, we'll use proportional values based on the completion percentage
const getActualCompletion = (target, columnType = 'completion') => {
  const actualCompletions = {
    'HYP008': 52,
    'QOF_HYP008': 52,
    'HYP009': 59,
    'QOF_HYP009': 59
  }
  const targetCode = target.code || target.qofCode
  const baseCompletion = actualCompletions[targetCode] || 0
  
  if (columnType === 'completion') {
    return baseCompletion
  } else if (columnType === 'clinical') {
    // For Clinical, calculate based on eligible patients (excluding exceptions)
    return getClinicalCompletion(target)
  } else {
    // For Exceptions, use actual exception reporting rates
    const exceptionRates = {
      'HYP008': 8,
      'QOF_HYP008': 8,
      'HYP009': 4.9,
      'QOF_HYP009': 4.9
    }
    return exceptionRates[targetCode] || 25.1
  }
}

// Helper function to get max achievement for a target
const getMaxAchievement = (target) => {
  const maxAchievements24_25 = {
    'HYP008': 85,
    'QOF_HYP008': 85,
    'HYP009': 80,
    'QOF_HYP009': 80
  }
  const targetCode = target.code || target.qofCode
  return maxAchievements24_25[targetCode] || 85
}

// Helper function to get minimum achievement for a target
const getMinAchievementForTarget = (target) => {
  const minAchievements = {
    'HYP008': 40,
    'QOF_HYP008': 40,
    'HYP009': 40,
    'QOF_HYP009': 40
  }
  const targetCode = target.code || target.qofCode
  return minAchievements[targetCode] || 40
}

// Helper function to get clinical completion patients (92% of completed)
const getClinicalCompletionPatients = (target) => {
  const completed = getPatientNumbers(target, getActualCompletion(target)).completed
  return Math.round(0.92 * completed)
}

// Helper function to get total completion percentage (clinically complete + exception reported)
const getTotalCompletion = (target) => {
  const targetCode = target.code || target.qofCode
  if (targetCode === 'HYP008' || targetCode === 'QOF_HYP008') {
    // HYP008: 54.4% (complete) + 12.9% (exception invited) = 67.3%
    return 67.3
  } else if (targetCode === 'HYP009' || targetCode === 'QOF_HYP009') {
    // HYP009: 67% (complete) + 4.8% (exception invited) = 71.8%
    return 71.8
  }
  // Fallback to target progress for other targets
  return getTargetProgress(target)
}

// Helper function to calculate target progress percentage
const getTargetProgress = (target) => {
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const clinicalCompleted = getClinicalCompletionPatients(target)
  const exceptionPatients = getExceptionReportingPatients(target)
  const totalCompleted = clinicalCompleted + exceptionPatients
  
  // Target is based on max achievement
  const maxAchievement = getMaxAchievement(target)
  const targetPatients = Math.round((maxAchievement / 100) * totalRegister)
  
  if (targetPatients === 0) return 0
  
  return (totalCompleted / targetPatients) * 100
}

// Helper function to get remaining patients
const getRemainingPatients = (target) => {
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const clinicalCompleted = getClinicalCompletionPatients(target)
  const exceptionPatients = getExceptionReportingPatients(target)
  return totalRegister - clinicalCompleted - exceptionPatients
}

// Helper function to calculate QOF points based on achievement percentage
// Points are calculated on a sliding scale: 40% = 1 point, 85% = max points
const getQOFPoints = (target) => {
  // Indicator configuration: minThreshold, maxThreshold, maxPoints
  const indicatorConfig = {
    'HYP008': { minThreshold: 40, maxThreshold: 85, maxPoints: 38 },
    'QOF_HYP008': { minThreshold: 40, maxThreshold: 85, maxPoints: 38 },
    'HYP009': { minThreshold: 40, maxThreshold: 85, maxPoints: 14 },
    'QOF_HYP009': { minThreshold: 40, maxThreshold: 85, maxPoints: 14 }
  }
  
  const targetCode = target.code || target.qofCode
  const config = indicatorConfig[targetCode]
  
  if (!config) {
    return 0
  }
  
  // Get current achievement percentage
  const achievement = getTargetProgress(target)
  
  // If below minimum threshold, return 0 points
  if (achievement < config.minThreshold) {
    return 0
  }
  
  // If at or above maximum threshold, return max points
  if (achievement >= config.maxThreshold) {
    return config.maxPoints
  }
  
  // Linear interpolation between minThreshold (1 point) and maxThreshold (maxPoints)
  // Formula: points = 1 + (achievement - minThreshold) / (maxThreshold - minThreshold) * (maxPoints - 1)
  const points = 1 + ((achievement - config.minThreshold) / (config.maxThreshold - config.minThreshold)) * (config.maxPoints - 1)
  
  return Math.round(points * 10) / 10 // Round to 1 decimal place
}

// Helper function to get maximum QOF points available for a target
const getMaxQOFPoints = (target) => {
  const indicatorConfig = {
    'HYP008': { maxPoints: 38 },
    'QOF_HYP008': { maxPoints: 38 },
    'HYP009': { maxPoints: 14 },
    'QOF_HYP009': { maxPoints: 14 }
  }
  
  const targetCode = target.code || target.qofCode
  return indicatorConfig[targetCode]?.maxPoints || 0
}

// Helper function to calculate unclaimed QOF points
const getUnclaimedPoints = (target) => {
  const maxPoints = getMaxQOFPoints(target)
  const currentPoints = getQOFPoints(target)
  return Math.max(0, maxPoints - currentPoints)
}

// Helper function to calculate revenue left on table
const getRevenueLeftOnTable = (target) => {
  const unclaimedPoints = getUnclaimedPoints(target)
  // Rough estimate: £200 per QOF point (adjust as needed)
  return unclaimedPoints * 200
}

// Helper function to calculate appointments needed
const getAppointmentsNeeded = (target) => {
  const remaining = getRemainingPatients(target)
  // Estimate: 1 appointment per remaining patient
  return remaining
}

// Helper function to calculate traditional cost
const getTraditionalCost = (target) => {
  const appointments = getAppointmentsNeeded(target)
  // £45 per appointment
  return appointments * 45
}

// Helper function to calculate Suvera cost
const getSuveraCost = (target) => {
  const appointments = getAppointmentsNeeded(target)
  // £28 per appointment
  return appointments * 28
}

// Helper function to calculate potential savings
const getPotentialSavings = (target) => {
  return getTraditionalCost(target) - getSuveraCost(target)
}

// Helper function to calculate savings percentage
const getSavingsPercentage = (target) => {
  const traditional = getTraditionalCost(target)
  if (traditional === 0) return 0
  return Math.round((getPotentialSavings(target) / traditional) * 100)
}

// Helper function to get expected clinical completion
const getExpectedClinical = (target) => {
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const yearProgress = getFinancialYearProgress()
  const maxAchievement = getMaxAchievement(target)
  const expectedPercent = yearProgress * maxAchievement
  // Expected clinical = expected percent * register * 0.92 (92% of completed are clinical)
  return Math.round((expectedPercent / 100) * totalRegister * 0.92)
}

// Helper function to get last year clinical completion
const getLastYearClinical = (target) => {
  // For HYP008, last year was 54.9% clinical completion
  const lastYearPercentages = {
    'HYP008': 54.9,
    'QOF_HYP008': 54.9,
    'HYP009': 50, // Example value
    'QOF_HYP009': 50
  }
  const targetCode = target.code || target.qofCode
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const lastYearPercent = lastYearPercentages[targetCode] || 50
  return Math.round((lastYearPercent / 100) * totalRegister)
}

// Helper function to get expected exception reporting
const getExpectedException = (target) => {
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const yearProgress = getFinancialYearProgress()
  const forecastedException = getForecastedExceptionReporting(target)
  // Expected exception patients = forecasted exception % * register
  return Math.round((forecastedException / 100) * totalRegister)
}

// Helper function to get last year exception reporting
const getLastYearException = (target) => {
  // For HYP008, last year was 24.7% exception
  const lastYearExceptionPercentages = {
    'HYP008': 24.7,
    'QOF_HYP008': 24.7,
    'HYP009': 20, // Example value
    'QOF_HYP009': 20
  }
  const targetCode = target.code || target.qofCode
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const lastYearPercent = lastYearExceptionPercentages[targetCode] || 20
  return Math.round((lastYearPercent / 100) * totalRegister)
}

// Helper function to calculate exception rate
const getExceptionRate = (target) => {
  const totalRegister = getPatientNumbers(target, getActualCompletion(target)).totalRegister
  const exceptionPatients = getExceptionReportingPatients(target)
  if (totalRegister === 0) return 0
  return Math.round((exceptionPatients / totalRegister) * 100 * 10) / 10
}

// Function to calculate patient numbers based on target and current achievement
const getPatientNumbers = (target, currentAchievement) => {
  // Maximum achievement targets for QOF 24/25 by code
  const maxAchievements24_25 = {
    'HYP008': 85,
    'QOF_HYP008': 85,
    'HYP009': 80,
    'QOF_HYP009': 80
  }
  
  // Actual register sizes for Maltings Surgery
  const registerSizes = {
    'HYP008': 683,
    'QOF_HYP008': 683,
    'HYP009': 234,
    'QOF_HYP009': 234
  }
  
  // Actual completion percentages for Maltings Surgery (Completion percentage column)
  const actualCompletions = {
    'HYP008': 52,
    'QOF_HYP008': 52,
    'HYP009': 59,
    'QOF_HYP009': 59
  }
  
  const targetCode = target.code || target.qofCode
  const maxAchievement = maxAchievements24_25[targetCode] || 85
  const totalRegister = registerSizes[targetCode] || 1000
  
  // Use actual completion percentage if available, otherwise use passed currentAchievement
  const actualCompletion = actualCompletions[targetCode] || currentAchievement
  
  // Use actual completion percentage for calculations
  const completed = Math.round((actualCompletion / 100) * totalRegister)
  const remaining = totalRegister - completed
  
  // Calculate patients needed to reach max achievement
  const targetForMax = Math.round((maxAchievement / 100) * totalRegister)
  const requiredForMax = Math.max(0, targetForMax - completed)
  
  return {
    totalRegister,
    completed,
    remaining,
    requiredForMax
  }
}

// Function to calculate patient numbers for specific columns (Clinical, Exceptions)
// Uses the same register size but different completion percentages
const getPatientNumbersForColumn = (target, currentAchievement, columnType) => {
  // Maximum achievement targets for QOF 24/25 by code
  const maxAchievements24_25 = {
    'HYP008': 85,
    'QOF_HYP008': 85,
    'HYP009': 80,
    'QOF_HYP009': 80
  }
  
  // Actual register sizes for Maltings Surgery (same register for all columns)
  const registerSizes = {
    'HYP008': 683,
    'QOF_HYP008': 683,
    'HYP009': 234,
    'QOF_HYP009': 234
  }
  
  const targetCode = target.code || target.qofCode
  const maxAchievement = maxAchievements24_25[targetCode] || 85
  const totalRegister = registerSizes[targetCode] || 1000
  
  // Calculate based on the provided completion percentage for this column
  const completed = Math.round((currentAchievement / 100) * totalRegister)
  const remaining = totalRegister - completed
  
  // Calculate patients needed to reach max achievement
  const targetForMax = Math.round((maxAchievement / 100) * totalRegister)
  const requiredForMax = Math.max(0, targetForMax - completed)
  
  return {
    totalRegister,
    completed,
    remaining,
    requiredForMax
  }
}

// Helper function to get summary data for hypertension summary chart
// Calculate expected achievement for summary bars (both HYP008 and HYP009 have 85% max)
const getExpectedAchievementForSummary = () => {
  const yearProgress = getFinancialYearProgress()
  const maxAchievement = 85 // Both HYP008 and HYP009 have 85% max achievement
  // Expected achievement = year progress * max achievement
  return yearProgress * maxAchievement
}

const getSummaryData = (targetCode) => {
  // Total register sizes
  const totalRegisters = {
    'HYP008': 951,
    'HYP009': 333
  }
  
  // Direct data for HYP008 and HYP009
  // HYP008: Total completion 67.3%, Clinical 54.4%, Exception Invited 12.9%
  // Exception Clinical = Total - Clinical - Invited = 67.3 - 54.4 - 12.9 = 0%
  // Incomplete = 100 - 67.3 = 32.7%
  // HYP009: Total completion 71.8%, Clinical 67%, Exception Invited 4.8%
  // Incomplete = 100 - 71.8 = 28.2%
  const summaryData = {
    'HYP008': {
      complete: 54.4,
      incomplete: 32.7,
      exceptionInvited: 12.9,
      exceptionClinical: 0,
      totalRegister: 951
    },
    'HYP009': {
      complete: 67,
      incomplete: 28.2,
      exceptionInvited: 4.8,
      exceptionClinical: 0,
      totalRegister: 333
    }
  }
  
  const data = summaryData[targetCode] || {
    complete: 0,
    incomplete: 0,
    exceptionInvited: 0,
    exceptionClinical: 0,
    totalRegister: 0
  }
  
  // Calculate patient numbers
  const totalRegister = data.totalRegister || totalRegisters[targetCode] || 0
  return {
    ...data,
    completePatients: Math.round((data.complete / 100) * totalRegister),
    incompletePatients: Math.round((data.incomplete / 100) * totalRegister),
    exceptionInvitedPatients: Math.round((data.exceptionInvited / 100) * totalRegister),
    exceptionClinicalPatients: Math.round((data.exceptionClinical / 100) * totalRegister)
  }
}

// Helper functions for Target Achievement Progress section
// November 1st data (previous month comparison)
const getHYP008NovemberData = () => {
  return {
    registerSize: 940, // Example: Nov 1st register size
    clinicalCompletion: 500, // Example: Nov 1st clinical completion
    invitedException: 110, // Example: Nov 1st invited exception
    notYetInvited: 330 // Example: Nov 1st not yet invited
  }
}

// HYP008 Register Size
const getHYP008RegisterSize = () => {
  return getSummaryData('HYP008').totalRegister
}

const getHYP008RegisterSizePrevious = () => {
  return getHYP008NovemberData().registerSize
}

const getHYP008RegisterSizeChange = () => {
  return getHYP008RegisterSize() - getHYP008RegisterSizePrevious()
}

const getHYP008RegisterSizeChangePercent = () => {
  const previous = getHYP008RegisterSizePrevious()
  if (previous === 0) return 0
  return Math.round((getHYP008RegisterSizeChange() / previous) * 100 * 10) / 10
}

// Clinical Completion Number
const getClinicalCompletionNumber = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getSummaryData('HYP008').completePatients
  }
  return 0
}

const getClinicalCompletionNumberPrevious = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getHYP008NovemberData().clinicalCompletion
  }
  return 0
}

const getClinicalCompletionNumberChange = (target) => {
  return getClinicalCompletionNumber(target) - getClinicalCompletionNumberPrevious(target)
}

const getClinicalCompletionNumberChangePercent = (target) => {
  const previous = getClinicalCompletionNumberPrevious(target)
  if (previous === 0) return 0
  return Math.round((getClinicalCompletionNumberChange(target) / previous) * 100 * 10) / 10
}

// Invited Exception Reporting Number
const getInvitedExceptionNumber = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getSummaryData('HYP008').exceptionInvitedPatients
  }
  return 0
}

const getInvitedExceptionNumberPrevious = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getHYP008NovemberData().invitedException
  }
  return 0
}

const getInvitedExceptionNumberChange = (target) => {
  return getInvitedExceptionNumber(target) - getInvitedExceptionNumberPrevious(target)
}

const getInvitedExceptionNumberChangePercent = (target) => {
  const previous = getInvitedExceptionNumberPrevious(target)
  if (previous === 0) return 0
  return Math.round((getInvitedExceptionNumberChange(target) / previous) * 100 * 10) / 10
}

// Not Yet Invited Number
const getNotYetInvitedNumber = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getSummaryData('HYP008').incompletePatients
  }
  return 0
}

const getNotYetInvitedNumberPrevious = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getHYP008NovemberData().notYetInvited
  }
  return 0
}

const getNotYetInvitedNumberChange = (target) => {
  return getNotYetInvitedNumber(target) - getNotYetInvitedNumberPrevious(target)
}

const getNotYetInvitedNumberChangePercent = (target) => {
  const previous = getNotYetInvitedNumberPrevious(target)
  if (previous === 0) return 0
  return Math.round((getNotYetInvitedNumberChange(target) / previous) * 100 * 10) / 10
}

// Helper to get CSS class for change (green for positive, red for negative)
const getChangeClass = (change) => {
  if (change > 0) return 'text-green-600 font-semibold'
  if (change < 0) return 'text-red-600 font-semibold'
  return 'text-gray-600'
}

// Helper for "Not Yet Invited" change class (reductions are positive/green)
const getNotYetInvitedChangeClass = (change) => {
  if (change < 0) return 'text-green-600 font-semibold' // Reduction is good
  if (change > 0) return 'text-red-600 font-semibold' // Increase is bad
  return 'text-gray-600'
}

// Clinical Completion Analysis helper functions
const getLastYearClinicalAtThisTime = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    // Calculate based on financial year progress and last year total (62.52%)
    const yearProgress = getFinancialYearProgress()
    const lastYearTotalPercent = 62.52
    const registerSize = getHYP008RegisterSize() // 951
    const lastYearTotalPatients = Math.round((lastYearTotalPercent / 100) * registerSize)
    // At this time of year = year progress * last year total
    return Math.round(yearProgress * lastYearTotalPatients)
  }
  return 0
}

const getLastYearClinicalTotal = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    // Last year completion was 62.52%
    const lastYearPercent = 62.52
    const registerSize = getHYP008RegisterSize() // 951
    return Math.round((lastYearPercent / 100) * registerSize)
  }
  return 0
}

// Get last year clinical at this time as percentage
const getLastYearClinicalAtThisTimePercent = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const yearProgress = getFinancialYearProgress()
    const lastYearTotalPercent = 62.52
    // At this time of year = year progress * last year total percentage
    return Math.round(yearProgress * lastYearTotalPercent * 100) / 100
  }
  return 0
}

const getClinicalCompletionThisTimeOfYear = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return getClinicalCompletionNumber(target)
  }
  return 0
}

const getSubICBClinicalCompletionAverage = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return 68.06 // Last year Sub ICB Completion was 68.06%
  }
  return 0
}

// Calculate Sub ICB completion at this time of year (same calculation as December/expected by today)
const getSubICBClinicalCompletionAtThisTime = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const yearProgress = getFinancialYearProgress()
    const endOfYearValue = 68.06 // Last year Sub ICB Completion was 68.06%
    // Calculate based on financial year progress (same as expected by today calculation)
    return Math.round(yearProgress * endOfYearValue * 100) / 100
  }
  return 0
}

// Exception Reporting Analysis helper functions
const getLastYearExceptionAtThisTime = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    // Calculate based on financial year progress and last year total (19.72%)
    const yearProgress = getFinancialYearProgress()
    const lastYearTotalPercent = 19.72
    const registerSize = getHYP008RegisterSize() // 951
    const lastYearTotalPatients = Math.round((lastYearTotalPercent / 100) * registerSize)
    // At this time of year = year progress * last year total
    return Math.round(yearProgress * lastYearTotalPatients)
  }
  return 0
}

const getLastYearExceptionTotal = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    // Last year exception reporting was 19.72%
    const lastYearPercent = 19.72
    const registerSize = getHYP008RegisterSize() // 951
    return Math.round((lastYearPercent / 100) * registerSize)
  }
  return 0
}

// Get last year exception at this time as percentage
const getLastYearExceptionAtThisTimePercent = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const yearProgress = getFinancialYearProgress()
    const lastYearTotalPercent = 19.72
    // At this time of year = year progress * last year total percentage
    return Math.round(yearProgress * lastYearTotalPercent * 100) / 100
  }
  return 0
}

const getSubICBExceptionReportingAverage = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    return 12.75 // Last year Sub ICB exception reporting was 12.75%
  }
  return 0
}

// Calculate Sub ICB exception reporting at this time of year (same calculation as December/expected by today)
const getSubICBExceptionReportingAtThisTime = (target) => {
  if (target.code === 'HYP008' || target.qofCode === 'QOF_HYP008') {
    const yearProgress = getFinancialYearProgress()
    const endOfYearValue = 12.75 // Last year Sub ICB exception reporting was 12.75%
    // Calculate based on financial year progress (same as expected by today calculation)
    return Math.round(yearProgress * endOfYearValue * 100) / 100
  }
  return 0
}
</script>
