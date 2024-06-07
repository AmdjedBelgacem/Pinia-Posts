<template>
  <div class="flex flex-col lg:flex-row justify-center text-center p-2 lg:p-10 gap-4">
    <div class="flex flex-col items-center justify-around gap-4 lg:gap-0">
      <h1 class="text-5xl lg:text-7xl font-bold">404 Sayfa Bulunamadı!</h1>
      <p class="text-xl lg:text-4xl font-semibold">
        Arkadaş, web sitesinin yanlış tarafındasınız. Aşağıdaki düğmeye veya web
        sitesi logosuna tıklayarak yönlendirilebilirsiniz.
      </p>
      <router-link to="/posts" class="p-4 bg-blue-500 text-white rounded-lg"
        >Ana Sayfaya Yönlendir
      </router-link>
    </div>
    <img src="../assets/cat.png" alt="cat crying" class="rounded-full" />
  </div>
</template>

<script>
export default {};
</script>
