<script setup lang="ts">
import Film from "./components/Film.vue";
import Header from "./components/Header.vue";
import AddFilm from "./components/AddFilm.vue";





</script>


<template>
  <header><Header /></header>

  <main>
      <AddFilm/>
    <div class="separator"></div>
    <Film />
    </main>
</template>

<style scoped>
main {
  padding: 60px;
}
.separator {
  height: 1px; 
  background-color: #ccc; 
  margin: 20px 0;
}
</style>
