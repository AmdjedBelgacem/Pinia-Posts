import { defineStore } from "pinia";
import axios from "axios";

export const usePostsStore = defineStore("postsStore", {
  state: () => ({
    posts: [],
    comments: [],
    loading: false,
    search: "",
    updatePostState: false,
    deletePostState: false,
  }),
  getters: {
    filteredPosts(state) {
      return state.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(state.search.toLowerCase()) ||
          post.body.toLowerCase().includes(state.search.toLowerCase())
      );
    },
  },
  actions: {
    async fetchPosts() {
      if (!this.postsFetched) {
        this.loading = true;
        try {
          const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
          );
          this.posts = data;
          this.loading = false;
          this.postsFetched = true;
        } catch (error) {
          console.error("Error Occurred While Fetching Posts:", error);
          this.loading = false;
        }
      }
    },
    addPosts(post) {
      this.posts.unshift(post);
    },
    deletePosts(postId) {
      this.posts = this.posts.filter((post) => post.id !== postId);
    },
    updatePost(postId, updatedPost) {
      const index = this.posts.findIndex((post) => post.id === postId);
      this.posts[index].title = updatedPost.title;
      this.posts[index].body = updatedPost.body;
    },
  },
});
