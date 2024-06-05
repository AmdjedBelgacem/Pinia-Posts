<template>
  <div class="w-full flex flex-col items-center gap-2">
    <form @submit.prevent="handleCommentAdd" class="w-full sm:w-10/12 xl:w-1/2">
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="3"
        v-model="commentsStore.comment"
        placeholder="Yorum Ekle..."
        class="p-2 rounded-lg w-full shadow-lg font-medium dark:bg-gray-600"
        required
      ></textarea>
      <button
        type="submit"
        class="p-2 w-full bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out shadow-lg rounded-lg text-gray-200 font-semibold"
      >
        Yorum Ekle
      </button>
    </form>
    <ul class="flex flex-col gap-5 w-full sm:w-10/12 xl:w-1/2">
      <li
        v-for="comment in commentsStore.filteredComments"
        :key="comment.id"
        class="bg-gray-100 p-4 rounded-lg w-full shadow-lg dark:bg-gray-600 flex flex-col gap-4"
      >
        <CommentDisplayViewVue :comment="comment" />
      </li>
      <li
        v-for="comment in comments"
        :key="comment.id"
        class="bg-gray-100 p-4 rounded-lg w-full shadow-lg dark:bg-gray-600 flex flex-col gap-4"
      >
        <CommentDisplayViewVue :comment="comment" />
      </li>
    </ul>
  </div>
</template>

<script>
import router from "@/router/routes";
import { useCommentsStore } from "@/store/CommentsStore";
import { useToastStore } from "@/store/ToastStore";
import ToastViewVue from "@/views/ToastView.vue";
import { computed } from "vue";
import CommentDisplayViewVue from "./CommentDisplayView.vue";

export default {
  name: "CommentsDisplayView",
  components: {
    ToastViewVue,
    CommentDisplayViewVue,
  },
  setup() {
    const routeId = router.history.current.params.id;
    const commentsStore = useCommentsStore();
    const toastStore = useToastStore();
    const comments = computed(() => commentsStore.comments);
    const isLoading = computed(() => commentsStore.loading);
    commentsStore.fetchComments(routeId);
    commentsStore.postId = routeId;
    const handleCommentAdd = () => {
      commentsStore.addComment(routeId, commentsStore.comment);
      toastStore.showToast("Yorum Başarıyla Eklendi!", "success");
    };

    return {
      commentsStore,
      toastStore,
      comments,
      isLoading,
      handleCommentAdd,
    };
  },
};
</script>
