<template>
  <div>
    <h1>Liste de film</h1>
  </div>
  <div class="film-container">
    <div class="card" v-for="film in films" :key="film.id">
      <div class="card__product-img">
        <img class="card__img" alt="product-image" :src="film.image" />
      </div>
      <div class="card__content">
        <p class="card__name">
          {{ film.title }} <span v-if="film.id">#{{ film.id }}</span>
        </p>
        <p class="card__description">{{ film.description }}</p>
        <p class="card__auteur">Auteur : {{ film.auteur }}</p>

        <div class="card__content-bottom">
          <div class="card_note">
            <p>{{ film.note }} / 10</p>
          </div>
        </div>
      </div>
      <div class="card__footer">
        <div>
          <button @click="deleteFilm(film.id)">Supprimer</button>
          <button @click="openModif()">
            {{ !editMode ? "Modifier" : "Fermer Modification" }}
          </button>

          <div v-if="editMode">
            <label>
              Titre du Film:
              <input v-model="filmUpdating.title" />
            </label>

            <label>
              Description:
              <textarea v-model="filmUpdating.description"></textarea>
            </label>

            <label>
              Auteur:
              <input v-model="filmUpdating.auteur" />
            </label>

            <label>
              Note:
              <input type="number" v-model="filmUpdating.note" />
            </label>

            <label>
              Image URL:
              <input v-model="filmUpdating.image" />
            </label>

            <button @click="updateFilm(film.id, film)">Modifier le Film</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import filmService from "../services/FilmService";
import Film from "../entities/Film";

export default {
  data() {
    return {
      films: [] as Film[],
      editMode: false as boolean,
      filmUpdating: {
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
    openModif() {
      this.editMode = !this.editMode;
    },
    refreshPage() {
      window.location.reload(); // true pour forcer le rechargement depuis le serveur
    },
    async loadFilms() {
      console.log(filmService.getAllFilm());
      this.films = await filmService.getAllFilm();
    },
    async updateFilm(filmId: number, film: Film) {
      console.log("call updateFilm");
      // Opération ternaire => (condition ? true : false) 
      // exemple : (1+1 == 2 ? console.log("resultat correct") : console.log("resultat incorrect"))
      // retourne resultat correct
      this.filmUpdating.title = (this.filmUpdating.title == "" ? film.title : this.filmUpdating.title);
      this.filmUpdating.description = (this.filmUpdating.description == "" ? film.description : this.filmUpdating.description);
      this.filmUpdating.auteur = (this.filmUpdating.auteur == "" ? film.auteur : this.filmUpdating.auteur);
      this.filmUpdating.note = (this.filmUpdating.note == 0 ? film.note : this.filmUpdating.note);
      this.filmUpdating.image = (this.filmUpdating.image == "" ? film.image : this.filmUpdating.image);

      await filmService.updateFilm(filmId, this.filmUpdating);
      this.editMode = false;
      this.refreshPage();
    },
    async deleteFilm(FilmId: number) {
      console.log(FilmId);
      await filmService.deleteFilm(FilmId);
      console.log(this.films);
      this.loadFilms();
      this.refreshPage(); 
    },
  },
};
</script>

<style scoped lang="scss">
button {
  background-color: #ff4500;
  color: #ffffff;
  padding: 10px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: red;
  padding: 12px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  background-color: white;
  color: #15263f;
  border: 1px solid grey;
  border-radius: 5px; 
  margin-bottom: 10px;
}
.icon {
  display: flex;
}

.film-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; 
  justify-content: space-around; 
  background: linear-gradient(to bottom, #2c3e50, #1a1a1a);

  .card {
    width: calc(
      33.33% - 16px
    ); 
    margin-bottom: 16px; 
  }

  @media screen and (max-width: 768px) {
    .card {
      width: calc(
        50% - 16px
      ); 
    }
  }

  @media screen and (max-width: 480px) {
    .card {
      width: 100%; 
    }
  }
}
.card {
  background-color: #1a1a1a;
  color: #ffffff;
  border-radius: 16px;
  padding: 24px;
  width: 327px;
  font-size: 1.5rem;
  box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0,3s ease-in-out;
  font-family: 'Arial', sans-serif;
  @media screen and (min-width: 768px) {
    font-size: 1.6rem;
    width: 350px;
    padding-bottom: 32px;
  }
  .card__product-img {
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    @mixin hoverOpacity {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.25s ease-out;
    }
  }

  card:hover {
    transform: scale(1.05);
  }
  .card__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    @media screen and (min-width: 768px) {
      gap: 16px;
      padding: 24px 0;
    }
    .card__name {
      color: white;
      font-size: 2.2rem;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: #00fff8;
      }
    }
    .card__description {
      font-size: 1.8rem;
      line-height: 2.6rem;
      font-weight: lighter;
    }
    .card__auteur {
      font-size: 1rem;
      line-height: 2.6rem;
      font-weight: lighter;
    }
    .card__content-bottom {
      display: flex;
      justify-content: space-between;
      padding-top: 4px;
      @media screen and (min-width: 768px) {
        padding-top: 6px;
      }
      > * {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
      }
      .card_note {
        color: #00fff8;
      }
    }
  }
  .card__footer {
    display: flex;
    align-items: center;
    border-top: 1px solid #2e405a;
    gap: 16px;
    padding-top: 10px;
    .card__avatar {
      display: flex;
      border-radius: 90px;
      border: 1px solid white;
      img {
        width: 33px;
      }
    }
    .card__autor--alt-color {
      color: white;
      cursor: pointer;
      &:hover {
        color: #00fff8;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.25s ease-out;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

</style>
