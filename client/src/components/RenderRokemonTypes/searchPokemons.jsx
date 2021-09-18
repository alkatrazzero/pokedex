import {
  addToFavoritePokemon,
  removeFromFavoritePokemon,
  setCurrentPokemon
} from "../../store/pokemonsReduser";
import {Button, Modal, Tag} from "antd";
import {HeartOutlined, HeartTwoTone} from "@ant-design/icons";
import {POKEMON_CLASSNAMES} from "../../assets/types";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export const SearchPokemonsModal = () => {
  const dispatch = useDispatch()
  const [like, setLike] = useState(null)
  const follow = () => setLike(true)
  const unfollow = () => setLike(false)
  const [isModalVisible, setIsModalVisible] = useState(true);
  const targetPokemon = useSelector(state => state.pokemonsPage.currentPokemon)
  const favoritePokemons = useSelector(state => state.pokemonsPage.favoritePokemons)
  const setCurrentPokemonDispatch = () => dispatch(setCurrentPokemon(null))

  const handleOk = () => {
    setCurrentPokemonDispatch()
    unfollow(null)
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setCurrentPokemonDispatch()
    unfollow(null)
    setIsModalVisible(false);

  };
  const token = useSelector(state => state.auth.token)
  const addToFavoritePokemonDispatch = (favoritePokemon) => {
    return (
      dispatch(addToFavoritePokemon(favoritePokemon, token))
    )
  }
  const removeFromFavoritePokemonDispatch = (favoritePokemon) => dispatch((removeFromFavoritePokemon(favoritePokemon)))
  if (targetPokemon) {
    return (
      <Modal visible={isModalVisible} onOk={handleOk}
             onCancel={handleCancel}>
        <div className={"modal"}>
          <div>
            <p className={"modalName"}>{targetPokemon.name}</p>
            <p><img
              style={{width: 250}}
              src={targetPokemon.sprites.other.dream_world.front_default || targetPokemon.sprites.front_default}/></p>


            {favoritePokemons.some(e => e.name === targetPokemon.name) ? <Button onClick={() => {

                removeFromFavoritePokemonDispatch(targetPokemon)
                unfollow()
              }}
                                                                                 icon={<HeartTwoTone
                                                                                   twoToneColor="#eb2f96"/>}/> :
              <Button onClick={() => {

                addToFavoritePokemonDispatch(targetPokemon)
                follow()

              }}
                      icon={<HeartOutlined/>}/>}


            <p>{targetPokemon.types.map((t) =>
              <Tag key={t.id} style={{color: POKEMON_CLASSNAMES[t.type.name]}}>
                type: {t.type.name}</Tag>)}</p>
          </div>
          <div className={"modalSkillName"}>
            <p>SKILLS:{targetPokemon.abilities.map((ab) =>
              <div key={ab.id}> {ab.ability.name}</div>
            )}</p>

          </div>
          <div>
            <p>
              Base experience: {targetPokemon.base_experience}
            </p>
          </div>
        </div>

      </Modal>
    )
  }
}