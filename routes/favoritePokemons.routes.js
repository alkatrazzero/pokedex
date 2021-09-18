const {Router} = require('express')
const FavoritePokemon = require('../models/favoritePokemon')
const router = Router()
const auth = require("../midleware/auth_midleware")

// /api
router.post(
  '/addFavorite', auth,
  async (req, res) => {
    try {
      const name = req.body.pokemon.name
      const base_experience = req.body.pokemon.base_experience
      const sprites = req.body.pokemon.sprites
      const types = req.body.pokemon.types
      const abilities = req.body.pokemon.abilities
      const favoritePokemon = new FavoritePokemon({
        name: name,
        base_experience: base_experience,
        sprites: sprites,
        types: types,
        abilities: abilities,
        owner: req.user.user_id
      })
      await favoritePokemon.save()
      res.status(200).json({favoritePokemon})

    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'something wrong'})
    }
  })
router.get(
  '/getFavoritePokemons', auth,
  async (req, res) => {
    try {

      const pokemons = await FavoritePokemon.find({owner: req.user.user_id})
      res.json({pokemons})
    } catch (e) {
      res.status(500).json({message: 'something wrong'})

    }
  }
)
router.delete(
  '/removeFavorite/:id',
  async (req, res) => {
    try {
      const pokemons = await FavoritePokemon.findByIdAndDelete(req.params.id)
      res.json({pokemons})
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'something wrong'})
    }
  })

module.exports = router