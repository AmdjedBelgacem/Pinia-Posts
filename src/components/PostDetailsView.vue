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
          class="shadow-lg px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold"
        >
          Güncelle
        </button>
        <button
          @click="postsStore.deletePostState = true"
          class="shadow-lg px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold text-gray-200"
        >
          Sil
        </button>
      </div>
    </div>
    <DeletePostView :id="post.id" />
    <UpdatePostView :post="post" />
    <form @submit.prevent="handleCommentAdd" class="w-full sm:w-10/12 xl:w-1/2">
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="3"
        v-model="comment"
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
        <div class="flex gap-4 items-center">
          <img
            :src="comment.image"
            alt="user image"
            class="w-20 h-20 rounded-full shadow-lg"
          />
          <div class="flex flex-col gap-1 p-1 w-full">
            <p class="flex items-center gap-5 font-bold">
              @{{ comment.name }}
              <span class="text-xs text-gray-500 font-base">{{
                comment.createdAt
              }}</span>
            </p>

            <p
              class="bg-white w-full rounded-lg p-2 text-lg shadow-lg font-medium dark:bg-gray-800"
            >
              {{ comment.comment }}
            </p>
          </div>
        </div>

        <div v-if="updateState" class="flex gap-2">
          <input
            v-model="editedComment"
            type="text"
            placeholder="Edit Comment"
            class="p-2 rounded-lg w-full shadow-lg font-medium dark:bg-gray-600"
          />
          <button
            @click="updateComment(comment.id), toggleInputVisibility"
            class="shadow-lg px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold"
          >
            Güncelle
          </button>
        </div>
        <div v-else class="w-full flex justify-end gap-4">
          <button
            @click="toggleInputVisibility"
            class="shadow-lg px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold"
          >
            Güncelle
          </button>
          <button
            @click="deleteComment(comment.id)"
            class="shadow-lg px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold text-gray-200"
          >
            Sil
          </button>
        </div>
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
import { usePostsStore } from "@/store/PostsStore";
import { useCommentsStore } from "@/store/CommentsStore";
import { ref, reactive } from "vue";
import { useToastStore } from "@/store/ToastStore";
import ToastViewVue from "@/views/ToastView.vue";
import UpdatePostView from "@/views/UpdatePostView.vue";
import DeletePostView from "@/views/DeletePostView.vue";

export default {
  props: ["id", "postSent"],
  components: {
    UpdatePostView,
    DeletePostView,
    ToastViewVue,
  },
  setup(props) {
    const { id, postSent } = props;
    const postsStore = usePostsStore();
    const toastStore = useToastStore();
    const commentsStore = useCommentsStore();
    const postData = reactive({ title: "", body: "" });
    const comment = ref("");
    const editedComment = ref("");
    const updateState = ref(false);
    commentsStore.postId = id;
    const handleCommentAdd = () => {
      commentsStore.addComment({
        postId: Number(id),
        id: Math.floor(Math.random() * 5000),
        name: "test user",
        image:
          "https://source.unsplash.com/random/200x200?sig=incrementingIdentifier",
        createdAt: new Date().toLocaleString(),
        comment: comment.value,
      });
      toastStore.showToast("Yorum Başarıyla Eklendi!", "success");
      comment.value = "";
    };
    const updateComment = (commentId) => {
      commentsStore.updateComment(commentId, editedComment.value);
      updateState.value = false;
      toastStore.showToast("Yorum Başarıyla Güncellendi!", "success");
    };
    const deleteComment = (commentId) => {
      commentsStore.deleteComment(commentId);
      toastStore.showToast("Yorum Başarıyla Silindi!", "success");
    };
    const toggleInputVisibility = () => {
      updateState.value = !updateState.value;
    };
    return {
      postsStore,
      commentsStore,
      handleCommentAdd,
      comment,
      post: postSent,
      updateComment,
      updateState,
      toggleInputVisibility,
      editedComment,
      postData,
      toastStore,
      deleteComment,
    };
  },
};
</script>
