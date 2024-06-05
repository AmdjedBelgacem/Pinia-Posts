<template>
  <div class="flex flex-col justify-center items-center gap-6 p-2 mb-6 md:p-0">
    <h1 v-if="postsStore.loading">Loading...</h1>
    <div
      v-else
      class="bg-gray-100 p-4 rounded-lg w-full sm:w-10/12 xl:w-1/2 shadow-lg dark:bg-gray-600 flex flex-col gap-4"
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
      />
      <div class="w-full flex justify-end gap-4 mt-4">
        <button
          @click="postsStore.updatePostState = true"
          class="shadow-lg px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold flex gap-2"
        >
          Güncelle
          <PencilOutline />
        </button>
        <button
          @click="postsStore.deletePostState = true"
          class="shadow-lg px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold text-gray-200 flex gap-2"
        >
          
          Sil
          <TrashCan />
        </button>
      </div>
    </div>
    <DeletePostView :id="post.id" />
    <UpdatePostView :post="post" />
    <CommentsDisplayView />
  </div>
</template>

<script>
import PencilOutline from "vue-material-design-icons/PencilOutline.vue";
import router from "@/router/routes";
import { usePostsStore } from "@/store/PostsStore";
import { computed } from "vue";
import UpdatePostView from "@/views/UpdatePostView.vue";
import DeletePostView from "@/views/DeletePostView.vue";
import CommentsDisplayView from "@/views/CommentsDisplayView.vue";
import TrashCan from "vue-material-design-icons/TrashCan.vue";

export default {
  props: ["id", "postSent"],
  components: {
    UpdatePostView,
    DeletePostView,
    CommentsDisplayView,
    TrashCan,
    PencilOutline
  },
  setup(props) {
    const { postSent } = props;
    const routeId = router.history.current.params.id;
    const postsStore = usePostsStore();
    const displayedPost = computed(() => {
      return postSent ? postSent : postsStore.specificPost;
    });
    postsStore.fetchSpecificPost(routeId);

    return {
      postsStore,
      post: displayedPost,
    };
  },
};
</script>
