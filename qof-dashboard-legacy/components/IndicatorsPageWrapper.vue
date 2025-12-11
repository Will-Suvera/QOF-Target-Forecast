<template>
  <div>
    <!-- This component will dynamically load the indicators page content -->
    <!-- For now, we'll use a simpler approach: directly include the content -->
    <div v-if="condition">
      <!-- Hero Section -->
      <HeroSection :condition="condition" />
      
      <!-- The rest of the indicators page content will be loaded here -->
      <!-- Since the indicators page is very large, we'll use a simpler approach -->
      <div class="mt-6">
        <p class="text-gray-600">Loading indicators for {{ condition }}...</p>
        <NuxtLink :to="`/indicators?condition=${condition}`" class="text-blue-600 hover:text-blue-800 font-medium">
          View full indicators page →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  condition: {
    type: String,
    required: true
  }
})
</script>

