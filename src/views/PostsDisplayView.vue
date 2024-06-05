<template>
  <div class="flex flex-col gap-4">
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
      class="hover:bg-white border dark:hover:bg-gray-800 border-gray-950 dark:border-gray-200 rounded-lg p-1 font-semibold  shadow-lg w-full lg:w-1/4 text-center transition-colors ease-in-out duration-300"
    >
      gönderiyi genişlet
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PostDisplayView",
  props: ["post"],
  setup(props) {
    const { post } = props;
    return { post };
  },
};
</script>
