<template>
  <div
    v-show="postsStore.deletePostState"
    class="w-screen h-screen fixed left-0 top-0 backdrop-blur-lg flex justify-center items-center"
  >
    <div
      class="bg-white p-4 w-full sm:w-10/12 xl:w-1/2 rounded-lg flex flex-col justify-around gap-2 shadow-lg"
    >
      <h1 class="text-3xl font-bold">
        Bu gönderiyi silmek istediğinize emin misiniz?
      </h1>
      <div class="flex justify-center gap-4">
        <button
          @click="postsStore.deletePostState = false"
          class="p-2 w-1/2 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-lg rounded-lg text-gray-200 font-semibold"
        >
          Cancel
        </button>
        <button
          @click="deletePost"
          class="p-2 w-1/2 bg-red-500 hover:bg-red-600 transition-colors duration-300 ease-in-out shadow-lg rounded-lg text-gray-200 font-semibold flex gap-2"
        >
          Sil
          <TrashCan />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { usePostsStore } from "@/store/PostsStore";
import { useToastStore } from "@/store/ToastStore";
import TrashCan from "vue-material-design-icons/TrashCan.vue";
import router from "@/router/routes";
export default {
  props: ["id"],
  components: {
    TrashCan
  },
  setup(props) {
    const { id } = props;
    const toastStore = useToastStore();
    const postsStore = usePostsStore();
    const deletePost = () => {
      postsStore.deletePost(id);
      toastStore.showToast("Gönderi Başarıyla Silindi!", "success");
      postsStore.deletePostState = false;
      router.push({ name: "Posts", path: "/posts" });
    };
    return { postsStore, deletePost, toastStore };
  },
};
</script>
