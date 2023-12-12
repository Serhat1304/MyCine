<template>
  <div>
    <button @click="openAdd()">
      {{ !openAddForm ? "Ajouter un film" : "Fermer la fenetre" }}
    </button>
  </div>
  <div v-if="openAddForm">
    <h1>Ajouter un Film</h1>
    <form @submit.prevent="addFilm">
      <label>
        Titre du Film:
        <input v-model="newFilm.title" required />
      </label>

      <label>
        Description:
        <textarea v-model="newFilm.description" required></textarea>
      </label>

      <label>
        Auteur:
        <input v-model="newFilm.auteur" required />
      </label>

      <label>
        Note:
        <input type="number" v-model="newFilm.note" required />
      </label>

      <label>
        Image URL:
        <input v-model="newFilm.image" required />
      </label>

      <button type="submit">Ajouter le Film</button>
    </form>
  </div>
</template>

<script lang="ts">
import filmService from "../services/FilmService";
import Film from "../entities/Film";

export default {
  data() {
    return {
      films: [] as Film[],
      openAddForm: false as boolean,
      newFilm: {
        id: 0,
        title: "",
        description: "",
        auteur: "",
        note: 0,
        image: "",
      },
    };
  },
  mounted() {
    this.loadFilms();
  },
  methods: {
    openAdd() {
      this.openAddForm = !this.openAddForm;
    },
    refreshPage() {
      window.location.reload();
    },
    async loadFilms() {
      console.log(filmService.getAllFilm());
      this.films = await filmService.getAllFilm();
    },
    async addFilm() {
      this.newFilm.id = this.films.length + 1;
      let temp = filmService.createFilm(this.newFilm);
      console.log(temp);
      console.log("Nouveau film ajouté:", this.newFilm);

      this.newFilm = {
        id: 0,
        title: "",
        description: "",
        auteur: "",
        note: 0,
        image: "",
      };
      setTimeout(() => {
        this.refreshPage();
        console.log("attente...")
      }, 3000);
    },
  },
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0;
}

label {
  display: block;
  margin-bottom: 10px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  background-color: #15263f;
  color: white;
  border: 1px solid grey;
  border-radius: 5px;
  margin-bottom: 10px;
}

button {
  background-color: #15263f;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: green;
}
</style>
