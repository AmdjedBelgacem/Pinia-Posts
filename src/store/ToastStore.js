import { defineStore } from "pinia";

export const useToastStore = defineStore({
  id: "toast",
  state: () => ({
    message: "",
    type: "",
    visible: false,
  }),
  actions: {
    showToast(message, type = "success") {
      this.message = message;
      this.type = type;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 3000);
    },
    hideToast() {
      this.visible = false;
    },
  },
});
