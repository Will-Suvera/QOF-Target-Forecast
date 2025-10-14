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
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
// Any layout-specific logic can go here
</script>

<style>
@import '~/assets/css/main.css';
</style>
