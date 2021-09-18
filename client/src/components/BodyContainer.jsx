import React, {useEffect} from 'react'
import {
  getCurrentPokemon,
  getPokemons,
  getPokemonTypes,
  setCurrentPage, setCurrentPokemon, setCurrentType, setPageSize
} from "../store/pokemonsReduser";
import Body from "./Body";
import {compose} from "redux";
import {connect} from "react-redux";

const BodyContainer = (props) => {
  useEffect(() => {
    props.getPokemonTypes()
    props.getPokemons(props.currentPage, props.pageSize)
  }, [props.pageSize,props.currentPage,props.currentType])
  const onPageSizeChange = (size) => {
    props.setPageSize(size)
  }
  const onPageChanged = (page) => {
    props.setCurrentPage(page)
  };
  const getPokemonsByType = (typeUrl) => {
    props.setCurrentType(typeUrl)
    props.setCurrentPage(1)
  }


  return <Body pageSize={props.pageSize} totalPokemons={props.totalPokemons}
               currentPage={props.currentPage} onPageChanged={onPageChanged}
               pokemons={props.pokemons} pokemonTypes={props.pokemonTypes}
               getPokemonsByType={getPokemonsByType}
               setCurreentPage={props.setCurrentPage} getCurrentPokemon={props.getCurrentPokemon}
               currentPokemon={props.currentPokemon} setCurrentPokemon={props.setCurrentPokemon}
              targetPokemon={props.targetPokemon}
               setPageSize={props.setPageSize} onPageSizeChange={onPageSizeChange}
  />
}
const mapStateToProps = (state) => {
  return {
    pageSize: state.pokemonsPage.pageSize,
    totalPokemons: state.pokemonsPage.pokemonsCount,
    currentPage: state.pokemonsPage.currentPage,
    pokemons: state.pokemonsPage.pokemons,
    pokemonTypes: state.pokemonsPage.types,
    currentPokemon: state.pokemonsPage.currentPokemon,
    currentType: state.pokemonsPage.currentType
  }
}
export default compose(connect(mapStateToProps, {
    getPokemons,
    setCurrentPage,
    getPokemonTypes,
    setCurrentType,
    getCurrentPokemon,
    setCurrentPokemon,
    setPageSize
  }),
)(BodyContainer);

