const express = require('express');

 let games = require('./data/games');

 const server = express();

 server.use(express.json());

 server.get('/games', (req, res) => {
  res.status(200).json(games);
});

 server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ error: 'Please provide a title and a genre' });
  } else {
    const uniqueCheck = games.filter(game => game.title === title);
    if (uniqueCheck.length === 0) {
      games.push(req.body);
      res.status(201).json({ title, genre, releaseYear });
    } else {
      res.status(405).json({ error: 'A game with the same name already exists' });
    }
  }
});

 server.get('/games-db-reset', (req, res) => {
  games = [];
  res.status(200).json({ message: 'Congrats - you erased the database!' });
});

 module.exports = server;