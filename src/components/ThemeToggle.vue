<template>
  <div @click="toggleVisibility" class="absolute left-2 top-2">
    <button
      @click.stop="showOptions = !showOptions"
      class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg border-gray-950 dark:border-gray-200 border p-3"
    >
      <StarCrescent v-if="isDark" />
      <WhiteBalanceSunny v-else />
    </button>
    <transition name="fade">
      <div
        v-if="showOptions"
        class="flex flex-col gap-2 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-lg p-2 relative top-2 w-32 font-medium"
        ref="optionsDiv"
        @click.stop
      >
        <button
          @click="
            isDark && toggle();
            showOptions = false;
          "
          class="p-2 bg-white dark:bg-gray-950 shadow-lg rounded-lg"
        >
          Açık tema
        </button>
        <button
          @click="
            !isDark && toggle();
            showOptions = false;
          "
          class="p-2 bg-white dark:bg-gray-950 shadow-lg rounded-lg"
        >
          Koyu tema
        </button>
      </div>
    </transition>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import StarCrescent from "vue-material-design-icons/StarCrescent.vue";
import WhiteBalanceSunny from "vue-material-design-icons/WhiteBalanceSunny.vue";

export default {
  name: "ThemeToggle",
  components: {
    StarCrescent,
    WhiteBalanceSunny,
  },
  setup() {
    const isDark = useDark();
    const toggle = useToggle(isDark);
    const showOptions = ref(false);
    const optionsDiv = ref(null);

    const handleClickOutside = (event) => {
      if (optionsDiv.value && !optionsDiv.value.contains(event.target)) {
        showOptions.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    const toggleVisibility = (event) => {
      if (optionsDiv.value && optionsDiv.value.contains(event.target)) {
        event.stopPropagation();
      }
    };

    return { isDark, toggle, showOptions, optionsDiv, toggleVisibility };
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
