import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";
import {UpdateProfileForm} from "./updateProfileForm";
import avatar from "../../../assets/img/nullAvatar.png"
import {getRandomArrayElements} from "../../../assets/rundomValueFavoritePokemonsArr";
import {setFavoritePokemonsFeed} from "../../../store/pokemonsReduser";
import _ from "lodash";
import {uniqFavoritePokemonsFeed} from "../../../store/pokemonsSelector";

export const ProfileInfo = () => {
  const dispatch = useDispatch()
  const favoritePokemonsFeed = useSelector(uniqFavoritePokemonsFeed)
  const favoritePokemon = useSelector(state => state.pokemonsPage.favoritePokemons)
  const [randomPokemons, setRandomPokemons] = useState([])
  const lastFavoritePokemons = favoritePokemon[favoritePokemon.length - 1]

  useEffect(() => {
    if(lastFavoritePokemons){
    dispatch(setFavoritePokemonsFeed(lastFavoritePokemons))}
  }, [lastFavoritePokemons])

  useEffect(() => {
    setRandomPokemons(getRandomArrayElements(favoritePokemon, 6))
  }, [favoritePokemon])
  const [editProfile, setEditProfile] = useState(false)
  const profileInfo = useSelector(state => state.profilePage.profileInfo)
  return <div className={'wrapper'}>
    {editProfile ? <UpdateProfileForm setEditProfile={setEditProfile}/> : <div>
      {profileInfo.map(p =>
        <div className={"content"}>
          <div className={"profile"}>
            <div className={"container"}>
              <div className={"profile__row"}>
                <div className={"avatar_button_block"}>
                  <div className={"profile__avatar"}>
                    <img style={{width: 200}} src={avatar}/>
                  </div>
                  <div className={"profile__button"}>
                    <Button onClick={() => setEditProfile(true)}> Edit Profile</Button>
                  </div>
                </div>
                <div className={"profile_info"}>
                  <div>{p.name}</div>
                  <div>{p.age}</div>
                  <div>{p.aboutMe}</div>
                  <div>{p.email}</div>
                  <div>{p.instagram}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={"favoritePokemons"}>
            <div className={"favoritePokemonsCotainer"}>
              <div className={"favoritePokemons__row"}>
                <div className={"top6favoritePokemons"}>Favorite Pokemons
                  {randomPokemons.length > 1 ? randomPokemons.map((p) => (<div>
                      <img className={"top6favoritePokemons__image"}
                           src={p.sprites.other.dream_world.front_default || p.sprites.front_default}/></div>
                  )) : null}
                </div>
                <div className={"pokemonsfeed"}>
                  {favoritePokemonsFeed.map((p) => (
                    <div>Последний добавленный в избранные покемон: {p && p.name}
                      <img className={"top6favoritePokemons__image"}
                           src={p ? p.sprites.other.dream_world.front_default || p.sprites.front_default : null}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    }


  </div>
}