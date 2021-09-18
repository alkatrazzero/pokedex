import _ from "lodash";

export const pokemonSelector=(state)=>{
    // return state.pokemonsPage.favoritePokemons
    const uniqPokemonsArr = _.uniqBy(state.pokemonsPage.favoritePokemons,p=>p.name)
return uniqPokemonsArr
}
export const uniqFavoritePokemonsFeed=(state)=>{
    const uniqPokemonsArr = _.uniqBy(state.pokemonsPage.favoritePokemonsFeed)
 return uniqPokemonsArr
}