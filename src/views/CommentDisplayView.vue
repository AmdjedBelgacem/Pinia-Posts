<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-4 items-center">
      <div class="flex flex-col gap-1 w-full">
        <p class="flex items-center gap-5 font-bold">@{{ comment.name }}</p>
        <p
          class="bg-white w-full rounded-lg p-2 text-lg shadow-lg font-medium dark:bg-gray-800"
        >
          {{ comment.body }}
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
        @click="updateComment(comment.id), updateState = false"
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
  props: ["comment"],
  setup(props) {
    const { comment } = props;
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
    };
  },
};
</script>
