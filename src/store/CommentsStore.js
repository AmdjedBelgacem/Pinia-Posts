import { defineStore } from "pinia";
import axios from "axios";

export const useCommentsStore = defineStore("commentsStore", {
  state: () => ({
    comments: [],
    commentsNew: [],
    comment: "",
    loading: false,
    postId: null,
  }),
  getters: {
    filteredComments(state) {
      return state.commentsNew.filter(
        (comment) => comment.postId === state.postId
      );
    },
  },
  actions: {
    async fetchComments(postId) {
      this.loading = true;
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/comments?postId=" + postId
        );
        this.comments = data;
        this.loading = false;
      } catch (error) {
        console.error("Error Occurred While Fetching Comments:", error);
        this.loading = false;
      }
    },
    addComment(id, comment) {
      this.commentsNew.unshift({
        postId: Number(id),
        id: Math.floor(Math.random() * 5000),
        name: "test user",
        body: comment,
      });
      this.comment = "";
    },
    deleteComment(commentId) {
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId
      );
      this.commentsNew = this.commentsNew.filter(
        (comment) => comment.id !== commentId
      );
    },
    updateComment(commentId, updatedComment) {
      const commentIndex = this.comments.findIndex(
        (comment) => comment.id === commentId
      );
      const newCommentIndex = this.commentsNew.findIndex(
        (comment) => comment.id === commentId
      );
      if (commentIndex !== -1) {
        this.comments[commentIndex].body = updatedComment;
      }
      if (newCommentIndex !== -1) {
        this.commentsNew[newCommentIndex].body = updatedComment;
      }
    },
  },
});
