import Film from '../entities/Film';
import apiFilmService from '../api/apiFilmService';

export default {
  async getAllFilm() {
    const filmsData:Film[] = await apiFilmService.getAllFilms();
    return filmsData.map(filmData => new Film(filmData.id, filmData.title, filmData.description, filmData.auteur, filmData.note, filmData.image));
  },

  async getFilmById(filmId:number) {
    const filmData:Film = await apiFilmService.getFilmById(filmId);
    return filmData;
  },

  async createFilm(filmData:Film) {
    const createdFilmData = await apiFilmService.createFilm(filmData);
    return new Film(createdFilmData.id, createdFilmData.title, createdFilmData.description, createdFilmData.auteur,createdFilmData.note,createdFilmData.image);
  },

  async updateFilm(filmId:number,filmData:Film) {
    const updatedFilmData = await apiFilmService.updateFilm(filmId,filmData);
    return new Film(updatedFilmData.id, updatedFilmData.title, updatedFilmData.description, updatedFilmData.auteur,updatedFilmData.note,updatedFilmData.image);
  },

  async deleteFilm(filmId:number):Promise<void> {
    const deleteFilm = await apiFilmService.deleteFilm(filmId);
    console.log("this element is delete : "+ deleteFilm);
  }

};
