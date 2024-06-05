import { defineStore } from "pinia";
import axios from "axios";

export const usePostsStore = defineStore("postsStore", {
  state: () => ({
    posts: [],
    postsNew: [],
    specificPost: {},
    comments: [],
    loading: false,
    search: "",
    post: {
      title: "",
      body: "",
    },
    updatePostState: false,
    deletePostState: false,
    postsFetched: false,
  }),
  getters: {
    filteredPosts(state) {
      return [
        ...state.posts.filter(
          (post) =>
            post.title.toLowerCase().includes(state.search.toLowerCase()) ||
            post.body.toLowerCase().includes(state.search.toLowerCase())
        ),
        ...state.postsNew.filter(
          (post) =>
            post.title.toLowerCase().includes(state.search.toLowerCase()) ||
            post.body.toLowerCase().includes(state.search.toLowerCase())
        ),
      ];
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
    async fetchSpecificPost(postId) {
      this.loading = true;
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        this.specificPost = data;
        this.loading = false;
      } catch (error) {
        console.error("Error Occurred While Fetching Posts:", error);
        this.loading = false;
      }
    },

    /* Merhaba Efe Bey, Aslında yeni bir gönderiyi API üzerinden göndermek
    ve güncellenmiş veri setini almak için yeni bir GET isteği tetiklemek
    için asenkron bir fonksiyon yazardım. Ancak sorun şu ki, API'nin kısıtlamaları
    var ve birden fazla gönderi eklemenize izin vermiyor. Bu gönderiler herhangi 
    bir protokol ile kaybolur ve kalıcı olmaz*/

    addPost() {
      this.posts.unshift({
        ...this.post,
        id: Math.floor(Math.random() * 5000),
        userId: 2604,
      });
      this.post = {
        title: "",
        body: "",
      };
    },
    async deletePost(postId) {
      try {
        await axios.delete(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        this.posts = this.posts.filter((post) => post.id !== postId);
      } catch (error) {
        console.error("Error Occurred While Deleting Post:", error);
      }
    },
    updatePost(postId, updatedPost) {
      const index = this.posts.findIndex((post) => post.id === postId);
      this.posts[index].title = updatedPost.title;
      this.posts[index].body = updatedPost.body;
    },
  },
});
