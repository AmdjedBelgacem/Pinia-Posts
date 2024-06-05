import { defineStore } from "pinia";

export const useCommentsStore = defineStore("commentsStore", {
  state: () => ({
    comments: [],
    postId: null,
  }),
  getters: {
    filteredComments(state) {
      return state.comments.filter(
        (comment) => comment.postId === state.postId
      );
    },
  },
  actions: {
    addComment(comment) {
      this.comments.unshift(comment);
    },
    deleteComment(commentId) {
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId
      );
    },
    updateComment(commentId, updatedComment) {
      const index = this.comments.findIndex(comment => comment.id === commentId);
      this.comments[index].comment = updatedComment;
    },
  },
});
