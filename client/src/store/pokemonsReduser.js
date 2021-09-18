import {pokemonsAPI} from "../api/api";
import _ from "lodash"
const SET_POKEMONS = "SET_POKEMONS"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
const SET_POKEMONS_URL = "SET_POKEMONS_URL"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TYPES = "SET_TYPES"
const SET_CURRENT_POKEMON = "SET_CURRENT_POKEMON"
const SET_CURRENT_TYPE = "SET_CURRENT_TYPE"
const SET_PAGE_SIZE="SET_PAGE_SIZE"
const SET_FAVORITE_POKEMON="SET_FAVORITE_POKEMON"
const DELETE_FAVORITE_POKEMON="DELETE_FAVORITE_POKEMON"
const SET_ALL_FAVORITE_POKEMONS="SET_ALL_FAVORITE_POKEMONS"
const SET_FAVORITE_POKEMON_FEED="SET_FAVORITE_POKEMON_FEED"
let initialState = {
  autorized:true,
  pokemons: [],
  pokemonsCount: null,
  pageSize: 56,
  currentPage: 1,
  types: [],
  currentType: null,
  currentPokemon: null,
  favoritePokemons:[],
  favoritePokemonsFeed:[]

};
const pokemonsReduser = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FAVORITE_POKEMON:
      const pokemonToRemove = action.favoritePokemon.name;
      return{
    ...state,favoritePokemons:state.favoritePokemons.filter((p) => p.name !== pokemonToRemove)
      }
    case SET_FAVORITE_POKEMON:
      return{
        ...state,favoritePokemons:state.favoritePokemons.concat([action.favoritePokemon])
      }
    case SET_ALL_FAVORITE_POKEMONS:
      return {
      ...state,favoritePokemons:action.pokemons
      }
    case SET_TOTAL_COUNT:
      return {
        ...state,
        pokemonsCount: action.count,
      };
    case SET_POKEMONS:
      return {
        ...state, pokemons: action.pokemons
      }
    case SET_POKEMONS_URL:
      return {
        ...state, pokemonsURL: action.url
      }
    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.page}
    case SET_TYPES:
      return {
        ...state, types: action.pokemonType
      }
    case SET_CURRENT_TYPE:
      return {
        ...state, currentType: action.currentType
      }
    case SET_CURRENT_POKEMON:
      return {
        ...state, currentPokemon: action.pokemon
      }
    case SET_PAGE_SIZE:
      return{
        ...state,pageSize: action.size
      }
    case SET_FAVORITE_POKEMON_FEED:
      return{
        ...state,favoritePokemonsFeed:state.favoritePokemonsFeed.concat([action.pokemon])
      }
    default:
      return state;
  }
}
export const currentPageSize = (size)=>{
  return {type:SET_PAGE_SIZE,size}
}
export const removeOndFavoritePokemon=(favoritePokemon)=>{
  return {type : DELETE_FAVORITE_POKEMON,favoritePokemon}
}
export const addNewFavoritePokemon=(favoritePokemon)=>{
  return {type: SET_FAVORITE_POKEMON,favoritePokemon}
}
export const setCurrentType = (currentType) => {
  return {type: SET_CURRENT_TYPE, currentType}
}
export const setTypes = (pokemonType) => {
  return {type: SET_TYPES, pokemonType}
}
export const setTotalPokemonsCount = (count) => {
  return {type: SET_TOTAL_COUNT, count}
}
export const setPokemons = (pokemons) => {
  return {type: SET_POKEMONS, pokemons}
}
export const setCurrentPage = (page) => {
  return {type: SET_CURRENT_PAGE, page}
}
export const setCurrentPokemon = (pokemon) => {
  return {type: SET_CURRENT_POKEMON, pokemon}
}
export const setAllFavoritePokemons=(pokemons)=>{
  return { type:SET_ALL_FAVORITE_POKEMONS,pokemons}
}
export const setFavoritePokemonsFeed=(pokemon)=>{
  return{ type:SET_FAVORITE_POKEMON_FEED,pokemon}
}

export const setPageSize =(size)=>{
  return (dispatch)=>{
    dispatch(currentPageSize(size))
  }
}
export const getAllFavoritePokemons=(token)=>{
  return async (dispatch)=>{
    let response = await pokemonsAPI.getFavoritePokemons(token)
    dispatch(setAllFavoritePokemons(response.data.pokemons))
  }
}
export const addToFavoritePokemon=(favoritePokemon,token)=>{
  return async (dispatch)=>{
    let response=await pokemonsAPI.setFavoritePokemon(favoritePokemon,token)
    dispatch(addNewFavoritePokemon(response.data.favoritePokemon))}
}


export const removeFromFavoritePokemon =(favoritePokemon)=>{
  return async (dispatch)=>{
   await pokemonsAPI.removeFavoritePokemon(favoritePokemon._id)
    dispatch(removeOndFavoritePokemon(favoritePokemon))
  }
}


export const getPokemonTypes = () => {
  return async (dispatch) => {
    let response = await pokemonsAPI.getPokemonTypes()
    dispatch(setTypes(response.results))
  }
}
export const getCurrentPokemon = (pokemon) => {
  return async (dispatch) => {
    let response = await pokemonsAPI.getPokemonByName(pokemon)
    dispatch(setCurrentPokemon(response))
  }
}
export const getPokemons = (page, pageSize) => {
  return async (dispatch, getState) => {
    const currentType = getState().pokemonsPage.currentType
    if (currentType) {
      const offset = (page - 1) * pageSize
      const responseArray = currentType.map((t) => pokemonsAPI.getPokemon(t))
      let response = await Promise.all(responseArray);
      let PokemonsArray =response.map((r)=>r.pokemon)
      const PokemonArr= _.flatten(PokemonsArray)
      const uniqPokemonsArr = _.uniqBy(PokemonArr,p=>p.pokemon.name)
      const promiseArray = uniqPokemonsArr.slice(offset, offset + pageSize).map((pokemon) => pokemonsAPI.getPokemon(pokemon.pokemon.url))
      const pokemonsArr = await Promise.all(promiseArray)
      dispatch(setTotalPokemonsCount(uniqPokemonsArr.length))
      dispatch(setPokemons(pokemonsArr))
    } else {
      let response = await pokemonsAPI.getPokemons(page, pageSize)
      const promiseArray = response.results.map((pokemon) => pokemonsAPI.getPokemon(pokemon.url))
      const pokemonsArr = await Promise.all(promiseArray)
      dispatch(setPokemons(pokemonsArr));
      dispatch(setTotalPokemonsCount(response.count));

    }
  }
}

export default pokemonsReduser;
