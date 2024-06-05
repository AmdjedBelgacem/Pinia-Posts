<template>
    <transition name="fade">
      <div v-if="visible" class="fixed bottom-10 right-0 m-6 p-4 bg-green-500 text-gray-200 font-semibold rounded-lg shadow-lg transform translate-y-full opacity-0 transition-transform duration-500 ease-in-out" :class="{ 'bg-red-500': type === 'error', 'translate-y-0 opacity-100': visible }">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: ['message', 'type', 'visible'],
  };
  </script>
  
  <style scoped>
  .fade-enter-active,.fade-leave-active {
    transition-property: opacity;
    transition-timing-function: ease-in-out;
  }
  
  .fade-enter,.fade-leave-to {
    opacity: 0;
  }
  </style>
  