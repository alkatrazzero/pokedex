import axios from "axios";

const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});
export const profileInfoAPI = {
  updateProfileInfo(dataInfo, token) {
    return axios.post('/api/profile/profileInfo', dataInfo, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((res) => {
      return res.data.profileInfo
    })
  },
  getProfileInfo(token) {
    return axios.get(`api/profile/getProfileInfo`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((res)=>{
    return res.data.profileInfo
    })
  },
}

//api calls for autorization
export const authAPI = {
  register(authData) {
    return axios.post('/api/auth/register', authData).then((response) => {
      return response
    });
  },
  login(authData) {

    return axios.post('/api/auth/login', authData)

  }
}
//api calls for render pokemons
export const pokemonsAPI = {

  getFavoritePokemons(token) {
    return axios.get(`http://localhost:5000/api/favoritePokemons/getFavoritePokemons`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },

  setFavoritePokemon(pokemon, token) {
    return axios.post(`http://localhost:5000/api/favoritePokemons/addFavorite`, {pokemon,}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  removeFavoritePokemon(id) {
    return axios.delete(`http://localhost:5000/api/favoritePokemons/removeFavorite/${id}`, {})
  },


  getPokemons(currentPage = 1, pageSize = 10) {
    return instance.get(`pokemon/?limit=${pageSize}&offset=${(currentPage - 1) * pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  getPokemon(url) {
    return instance.get(url).then((response) => {
      return response.data;
    });
  },
  getPokemonTypes() {
    return instance.get('type').then((response) => {
      return response.data;
    });
  },
  getPokemonByName(name) {
    return instance.get(`pokemon/${name}`).then((response) => {
      return response.data
    })
  },


}
