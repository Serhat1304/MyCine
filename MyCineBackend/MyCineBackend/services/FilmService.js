const Film = require('../models/Film');
const db = require('../config/json/db.json');

class FilmService {

  // Récupérer tous les films
  static getAllFilms() {
    return db.films;
  }

  // Récupérer un film par son id
  static getFilmById(filmId) {
    const filmData = db.films.find(film => film.id === filmId);
    if (filmData) {
      return new Film(filmData.id, filmData.title, filmData.description, filmData.auteur, filmData.note, filmData.image);
    } else {
      console.log("Film non trouvé");
      return null; // Film non trouvé
    }
  }

  // Créer un nouveau film
  static createFilm(newFilmData) {
    const newFilm = new Film(newFilmData.id, newFilmData.title, newFilmData.description, newFilmData.auteur, newFilmData.note, newFilmData.image);
    db.films.push(newFilm);
    return newFilm;
  }

  // Mettre à jour un film par son id
  static updateFilm(filmId, updatedfilmData) {

    const filmIndex = db.films.findIndex(film => film.id === filmId);
    if (filmIndex !== -1) {
      db.films[filmIndex] = { ...db.films[filmIndex], ...updatedfilmData };
      return true; 
    } else {
      return false;
    }
  }

  // Supprimer un film par son id
  static deleteFilm(filmId) {
    const filmIndex = db.films.findIndex(film => film.id === filmId);
    if (filmIndex !== -1) {
      db.films.splice(filmIndex, 1);
      return true; 
    } else {
      return false;
    }
  }
}

module.exports = FilmService;
