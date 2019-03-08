const express = require('express');
const cors = require('cors');

const games = require("../games/gamesModel");

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'running' });
  
});

server.get('/api/games', async (req, res) => {
  const gameList = await games.getAll();

  if (gameList) {
    res.status(200).json(gameList);
  } else {
    return res.status(500).json({ message: "could not get games at this time"})
  }
});

server.get('/api/games/:id', async (req, res) => {
  try {
    const game = await games.findById(req.params.id);
    if (game) {
      return res.status(200).json(game);
    } else {
      return res.status(404).json({ message: "game not found" })
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post('/api/games', async (req, res) => {
  try {
    const game = await games.insert(req.body);
    if (game) {
      return res.status(200).json(game)
    } else {
      return res.status(404).json({ message: "please provide a game"})
    }
  } catch (error) {
    return res.status(422).json({ message: "We could not add a game at this time" })
  }
});



module.exports = server