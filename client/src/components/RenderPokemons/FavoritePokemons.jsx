import React, {useEffect} from 'react'
import "../Body.module.css"
import 'antd/dist/antd.css';
import { useSelector} from "react-redux";
import {ComponentCreator} from "../componentCreatoeHelper";
import {pokemonSelector} from "../../store/pokemonsSelector";

export const FavoritePokemons = (props) => {

  useEffect(() => {
    document.title = "Favorite Pokemons"
  }, [])
  const favoritePokemon = useSelector(pokemonSelector)
  const Pokemons = favoritePokemon
  return (<div>
    <ComponentCreator favoritePokemons={Pokemons} pokemons={favoritePokemon}/>
  </div>)
}
