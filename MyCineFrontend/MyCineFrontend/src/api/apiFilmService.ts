import type Film from '@/entities/Film';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export default {
  async getAllFilms():Promise<Film[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/films`);
      return response.data;
    } catch (error) {
      console.error('Error fetching films :', error);
      throw error;
    }
  },

  async getFilmById(filmId:number):Promise<Film> {
    try {
      const response = await axios.get(`${API_BASE_URL}/films/${filmId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching film :', error);
      throw error;
    }
  },

  async createFilm(filmData:Film):Promise<Film> {
    try {
      const response = await axios.post(`${API_BASE_URL}/films`, filmData);
      return response.data;
    } catch (error) {
      console.error('Create api error :', error);
      throw error;
    }
  },

  async updateFilm(filmId:number,updatedFilmData:Film):Promise<Film> {
    try {
      const response = await axios.put(`${API_BASE_URL}/films/${filmId}`, updatedFilmData);
      return response.data;
    } catch (error) {
      console.error('Update api error :', error);
      throw error;
    }
  },

  async deleteFilm(filmId:number):Promise<Film> {
    try {
      const response = await axios.delete(`${API_BASE_URL}/films/${filmId}`);
      return response.data;
    } catch (error) {
      console.error('Delete api error :', error);
      throw error;
    }
  }

};
