const FilmService = require('../services/FilmService');

// Récupérer tous les films
exports.getAllFilms = (req, res) => {
  const films = FilmService.getAllFilms();
  res.json(films);
};

// Récupérer un film par son id
exports.getFilmById = (req, res) => {
  const filmId = parseInt(req.params.id);
  const film = FilmService.getFilmById(filmId);

  if (film) {
    res.json(film);
  } else {
    res.status(404).json({ error: 'Film not found' });
  }
};

// Créer un nouveau film
exports.createFilm = (req, res) => {
  const newFilmData = req.body;
  const newFilm = FilmService.createFilm(newFilmData);

  res.status(201).json(newFilm);
};

// Mettre à jour un film par son id
exports.updateFilm = (req, res) => {
  const filmId = parseInt(req.params.id);
  const updatedFilmData = req.body;

  const updated = FilmService.updateFilm(filmId, updatedFilmData);

  if (updated) {
    res.json({ success: true, message: 'Film updated successfully' });
  } else {
    res.status(404).json({ error: 'Film not found' });
  }
};

// Supprimer un film par son id
exports.deleteFilm = (req, res) => {
  const filmId = parseInt(req.params.id);
  const deleted = FilmService.deleteFilm(filmId);

  if (deleted) {
    res.json({ success: true, message: 'Film deleted successfully' });
  } else {
    res.status(404).json({ error: 'Film not found' });
  }
};
