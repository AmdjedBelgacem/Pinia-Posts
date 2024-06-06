<template>
  <div class="flex flex-col justify-center items-center gap-6 p-2 md:p-0">
    <input
      type="text"
      v-model="postsStore.search"
      placeholder="Gönderileri ara..."
      class="p-2 rounded-lg w-full sm:w-10/12 xl:w-1/2 shadow-lg font-medium dark:bg-gray-600 animate-appear"
    />
    <h1 class="text-2xl font-semibold animate-appear">Aklına Bir Şey Mi Geldi? Gönder!</h1>
    <form
      @submit.prevent="handleAddPost"
      class="flex flex-col gap-2 w-full sm:w-10/12 xl:w-1/2 animate-appear"
    >
      <input
        type="text"
        name="title"
        id="title"
        v-model="postsStore.post.title"
        placeholder="başlık..."
        class="p-2 rounded-lg w-full shadow-lg font-medium dark:bg-gray-600"
        required
      />
      <textarea
        name="post"
        id="post"
        cols="30"
        rows="10"
        v-model="postsStore.post.body"
        placeholder="bir şeyler gönder..."
        class="p-2 rounded-lg w-full shadow-lg font-medium dark:bg-gray-600"
        required
      ></textarea>
      <button
        type="submit"
        class="p-2 w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out shadow-lg rounded-lg text-gray-200 font-semibold"
      >
        gönderi
      </button>
    </form>
    <h1 v-if="isLoading">Loading ...</h1>
    <ul v-else class="flex flex-col gap-5 w-full sm:w-10/12 xl:w-1/2">
      <li
        v-for="post in postsStore.filteredPosts"
        :key="post.id"
        class="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg w-full shadow-lg dark:bg-gray-600 animate-appear"
      >
        <PostsDisplayView :post="post" />
      </li>
    </ul>
  </div>
</template>

<script>
import { usePostsStore } from "../store/PostsStore";
import { ref } from "vue";
import { computed } from "vue";
import PostsDisplayView from "@/views/PostsDisplayView.vue";
import { useToastStore } from "@/store/ToastStore";
export default {
  name: "PostsView",
  components: {
    PostsDisplayView,
  },
  setup() {
    const toastStore = useToastStore();
    const postsStore = usePostsStore();
    const search = ref("");
    const posts = computed(() => postsStore.posts);
    const isLoading = computed(() => postsStore.loading);
    postsStore.fetchPosts();
    const handleAddPost = () => {
      postsStore.addPost();
      toastStore.showToast("Gönderi Başarıyla Eklendi!", "Success");
    };
    return {
      posts,
      isLoading,
      postsStore,
      handleAddPost,
      search,
    };
  },
};
</script>
