const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');

// Récupérer tous les films
router.get('/films', filmController.getAllFilms);

// Récupérer un film par son id
router.get('/films/:id', filmController.getFilmById);

// Créer un nouveau film
router.post('/films', filmController.createFilm);

// Mettre à jour un film par son id
router.put('/films/:id', filmController.updateFilm);

// Supprimer un film par son id
router.delete('/films/:id', filmController.deleteFilm);

module.exports = router;
