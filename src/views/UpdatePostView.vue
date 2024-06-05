<template>
  <div
    v-show="postsStore.updatePostState"
    class="w-screen h-screen fixed left-0 top-0 backdrop-blur-lg"
  >
    <form
      @submit.prevent="updatePost(post.id, postData)"
      class="flex flex-col gap-2 w-full sm:w-10/12 xl:w-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-lg p-4"
    >
      <input
        type="text"
        name="title"
        id="title"
        v-model="postData.title"
        placeholder="Başlık"
        class="p-2 rounded-lg w-full shadow-lg font-medium dark:bg-gray-600"
        required
      />
      <textarea
        name="post"
        id="post"
        cols="30"
        rows="10"
        v-model="postData.body"
        placeholder="Bir Seyler Gönder..."
        class="p-2 rounded-lg w-full shadow-lg font-medium dark:bg-gray-600"
        required
      ></textarea>
      <div class="w-full flex gap-2">
        <button
          @click.prevent="postsStore.updatePostState = false"
          class="p-2 w-1/2 bg-red-500 hover:bg-red-600 transition-colors duration-300 ease-in-out shadow-lg rounded-lg text-gray-200 font-semibold"
        >
          Iptal
        </button>
        <button
          type="submit"
          class="p-2 w-1/2 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-lg rounded-lg text-gray-200 font-semibold"
        >
          Gönderiyi Güncelle
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { usePostsStore } from "@/store/PostsStore";
import { reactive } from "vue";
import { useToastStore } from "@/store/ToastStore";
import ToastViewVue from "@/views/ToastView.vue";
export default {
  props: ["post", "updatePostState"],
  components: {
    ToastViewVue,
  },
  setup(props) {
    const { post } = props;
    const toastStore = useToastStore();
    const postsStore = usePostsStore();
    const postData = reactive({
      title: "",
      body: "",
    });
    const updatePost = (id, postData) => {
      postsStore.updatePost(id, postData);
      postsStore.updatePostState = false;
      toastStore.showToast("Gönderi Başarıyla Güncellendi!", "success");
    };
    return { postsStore, postData, post, toastStore, updatePost };
  },
};
</script>
