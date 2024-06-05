<template>
  <div class="flex flex-col justify-center items-center gap-6 p-2 md:p-0">
    <input
      type="text"
      v-model="postsStore.search"
      placeholder="Gönderileri ara..."
      class="p-2 rounded-lg w-full sm:w-10/12 xl:w-1/2 shadow-lg font-medium dark:bg-gray-600"
    />
    <h1 class="text-2xl font-semibold">Aklına Bir Şey Mi Geldi? Gönder!</h1>
    <form
      @submit.prevent="handleAddPost"
      class="flex flex-col gap-2 w-full sm:w-10/12 xl:w-1/2"
    >
      <input
        type="text"
        name="title"
        id="title"
        v-model="post.title"
        placeholder="başlık..."
        class="p-2 rounded-lg w-full shadow-lg font-medium dark:bg-gray-600"
        required
      />
      <textarea
        name="post"
        id="post"
        cols="30"
        rows="10"
        v-model="post.body"
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
        class="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg w-full shadow-lg dark:bg-gray-600"
      >
        <div class="flex gap-4">
          <img
            src="https://img.freepik.com/premium-photo/cat-diary-captivating-photos-kitten-lover_563241-2995.jpg"
            alt="cat image"
            class="w-16 h-16 rounded-full shadow-lg"
          />
          <div class="flex flex-col gap-1 p-1">
            <p><strong>Yazar:</strong> John Doe</p>
            <p>Az Önce</p>
          </div>
        </div>
        <h3
          class="bg-white w-full rounded-lg p-2 font-semibold text-xl shadow-lg dark:bg-gray-800"
        >
          <span class="font-bold">Title:</span> {{ post.title }}
        </h3>
        <p
          class="bg-white w-full rounded-lg p-2 text-lg shadow-lg font-medium dark:bg-gray-800"
        >
          {{ post.body }}
        </p>
        <img
          :src="'https://source.unsplash.com/random/?Cryptocurrency&' + post.id"
          alt="random image"
          width="1000"
          height="1000"
          class="h-96 w-full rounded-lg shadow-lg"
        /><router-link
          :to="{ name: 'PostDetails', params: { id: post.id, postSent: post } }"
          class="bg-lime-500 hover:bg-lime-600 rounded-lg p-1 font-semibold text-gray-200 shadow-lg w-full lg:w-1/4 text-center"
        >
        gönderiyi genişlet
        </router-link>
      </li>
    </ul>
    <ToastViewVue
      :message="toastStore.message"
      :type="toastStore.type"
      :visible="toastStore.visible"
    />
  </div>
</template>

<script>
import { usePostsStore } from "../store/PostsStore";
import { reactive, ref } from "vue";
import { computed } from "vue";
import { useToastStore } from "@/store/ToastStore";
import ToastViewVue from "@/views/ToastView.vue";
export default {
  components: {
    ToastViewVue,
  },
  setup() {
    const postsStore = usePostsStore();
    const toastStore = useToastStore();
    const post = reactive({ title: "", body: "" });
    const search = ref("");
    const posts = computed(() => postsStore.posts);
    const isLoading = computed(() => postsStore.loading);
    postsStore.fetchPosts();
    const handleAddPost = () => {
      postsStore.addPosts({
        ...post,
        id: Math.floor(Math.random() * 5000),
        userId: 2604,
      });
      toastStore.showToast("Gönderi Başarıyla Eklendi!", "Success");
      post.title = "";
      post.body = "";
    };

    return {
      posts,
      isLoading,
      post,
      postsStore,
      handleAddPost,
      search,
      toastStore,
    };
  },
};
</script>
