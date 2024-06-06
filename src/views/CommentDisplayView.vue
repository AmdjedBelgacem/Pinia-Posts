<template>
  <div class="flex flex-col gap-2 animate-appear">
    <div class="flex flex-col w-full gap-4 items-start">
      <div class="flex gap-2 items-start">
        <img
          :src="
            'https://source.unsplash.com/random/?Cryptocurrency&' + randomNum
          "
          alt="cat image"
          class="w-10 h-10 rounded-full shadow-lg"
        />
        <p class="flex flex-col items-start font-bold">
          <span>@{{ comment.name }}</span
          ><span class="text-xs text-gray-400 font-base"
            >Birkaç an önce paylaşıldı</span
          >
        </p>
      </div>
      <p
        class="bg-white w-full rounded-lg p-2 text-lg shadow-lg font-medium dark:bg-gray-800"
      >
        {{ comment.body }}
      </p>
    </div>

    <div v-if="updateState" class="flex gap-2">
      <input
        v-model="editedComment"
        type="text"
        placeholder="Edit Comment"
        class="p-2 rounded-lg w-full shadow-lg font-medium dark:bg-gray-600"
      />
      <button
        @click="updateComment(comment.id), (updateState = false)"
        class="shadow-lg px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold flex gap-2"
      >
        Güncelle
        <PencilOutline />
      </button>
    </div>
    <div v-else class="w-full flex justify-end gap-4">
      <button
        @click="updateState = true"
        class="shadow-lg px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold flex gap-2"
      >
        Güncelle

        <PencilOutline />
      </button>
      <button
        @click="deleteComment(comment.id)"
        class="shadow-lg px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold text-gray-200 flex gap-2"
      >
        Sil
        <TrashCan />
      </button>
    </div>
  </div>
</template>

<script>
import PencilOutline from "vue-material-design-icons/PencilOutline.vue";
import { useCommentsStore } from "@/store/CommentsStore";
import { useToastStore } from "@/store/ToastStore";
import TrashCan from "vue-material-design-icons/TrashCan.vue";
import { ref } from "vue";
export default {
  components: {
    TrashCan,
    PencilOutline,
  },
  name: "CommentDisplayView",
  props: ["comment", "randomNum"],
  setup(props) {
    const { comment, randomNum } = props;
    const commentsStore = useCommentsStore();
    const updateState = ref(false);
    const editedComment = ref("");
    const toastStore = useToastStore();

    const deleteComment = (commentId) => {
      commentsStore.deleteComment(commentId);
      toastStore.showToast("Yorum Başarıyla Silindi!", "success");
    };

    const updateComment = (id) => {
      commentsStore.updateComment(id, editedComment.value);
      editedComment.value = "";
      toastStore.showToast("Yorum Başarıyla Güncellendi!", "success");
    };

    return {
      comment,
      commentsStore,
      deleteComment,
      updateComment,
      updateState,
      editedComment,
      randomNum,
    };
  },
};
</script>
