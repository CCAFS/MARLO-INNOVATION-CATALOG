<template>
  <div class="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-md mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Vue.js Composition API Example</h2>
    
    <div class="space-y-4">
      <!-- Counter Example -->
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-blue-800 mb-2">Counter with ref()</h3>
        <p class="text-gray-700 mb-3">Current count: <span class="font-bold text-blue-600">{{ count }}</span></p>
        <div class="space-x-2">
          <button 
            @click="increment"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Increment
          </button>
          <button 
            @click="decrement"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Decrement
          </button>
          <button 
            @click="reset"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Input Example -->
      <div class="bg-green-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-green-800 mb-2">Reactive Input with ref()</h3>
        <input 
          v-model="message"
          type="text"
          placeholder="Type something..."
          class="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <p class="text-gray-700">
          You typed: <span class="font-bold text-green-600">{{ message || 'Nothing yet...' }}</span>
        </p>
        <p class="text-sm text-gray-500 mt-2">
          Character count: {{ message.length }}
        </p>
      </div>

      <!-- Computed Example -->
      <div class="bg-purple-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-purple-800 mb-2">Computed Property</h3>
        <p class="text-gray-700">
          Double the count: <span class="font-bold text-purple-600">{{ doubleCount }}</span>
        </p>
        <p class="text-sm text-gray-500">
          This value is automatically computed based on the counter above
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive references using ref()
const count = ref(0)
const message = ref('')

// Functions to manipulate the reactive data
const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const reset = () => {
  count.value = 0
  message.value = ''
}

// Computed property that automatically updates when count changes
const doubleCount = computed(() => count.value * 2)
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
