<template>
  <div>
    <ThemeToggle /> 
    <router-link :to="{ name: 'Posts'}" class="flex justify-center items-center my-10">
      <img src="./assets/pinia-logo.svg" alt="logo" class="w-40 h-40 lg:w-60 lg:h-60">
      <h1 class="text-5xl lg:text-[5em] rotate-[-10deg] font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">Pinia Gönderileri</h1>
    </router-link>
    <router-view />
    <ToastViewVue
      :message="toastStore.message"
      :type="toastStore.type"
      :visible="toastStore.visible"
    />
  </div>
</template>

<script>
import ThemeToggle from "./components/ThemeToggle.vue";
import ToastViewVue from "@/views/ToastView.vue";
import { useToastStore } from "@/store/ToastStore";
export default {
  name: "App",
  components: {
    ThemeToggle,
    ToastViewVue
  },
  setup() {
    const toastStore = useToastStore();
    return { toastStore };
  },
};
</script>
