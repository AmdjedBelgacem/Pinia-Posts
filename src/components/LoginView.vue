<template>
  <div class="flex justify-center items-center p-2 md:p-0 w-full">
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col h-96 bg-gray-100 dark:bg-gray-600 w-full sm:w-10/12 xl:w-1/2  rounded-lg shadow-lg justify-around p-4 "
    >
      <h1 class="text-center text-3xl font-bold">Giriş</h1>
      <label class="font-medium text-xl" for="email">e-posta</label>
      <input
        class="dark:bg-gray-800 rounded-lg p-3 hover:scale-[1.03] focus:scale-[1.03] shadow-lg"
        type="email"
        name="email"
        id="email"
        v-model="email"
        required
      />
      <label class="font-medium text-xl" for="password">şifre</label>
      <input
        class="dark:bg-gray-800 rounded-lg p-3 hover:scale-[1.03] focus:scale-[1.03] shadow-lg"
        type="password"
        name="password"
        id="password"
        v-model="password"
        required
      />
      <button
        type="submit"
        class="p-2 w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-lg rounded-lg text-gray-200 font-semibold"
      >
        Giriş
      </button>
    </form>
    <ToastViewVue
      :message="toastStore.message"
      :type="toastStore.type"
      :visible="toastStore.visible"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import router from "@/router/routes";
import { useToastStore } from "@/store/ToastStore";
import ToastViewVue from "@/views/ToastView.vue";
export default {
  name: "LoginView",
  components: {
    ToastViewVue,
  },
  setup() {
    const toastStore = useToastStore();
    const email = ref("");
    const password = ref("");
    const handleSubmit = () => {
      if (email.value === "test@test.com" && password.value === "test") {
        router.push({ name: "Posts", path: "/posts" });
        return;
      }
      toastStore.showToast("E-posta veya Şifre Hatalı!", "error");
    };
    return { email, password, handleSubmit, toastStore };
  },
};
</script>
