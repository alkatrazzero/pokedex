import {POKEMON_CLASSNAMES} from "../../assets/types";
import {Button, Card, Modal, Tag} from "antd";
import {HeartTwoTone} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToFavoritePokemon, removeFromFavoritePokemon} from "../../store/pokemonsReduser";
import Meta from "antd/es/card/Meta";
import "../RenderPokemons/pokemons_styles.css"


export const AllPokemons = (props) => {


  useEffect(() => {
    document.title = "Pokemons"
  }, [])
  const dispatch = useDispatch()
  const [like, setLike] = useState(null)
  const follow = () => setLike(true)
  const unfollow = () => setLike(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [targetPokemon, setNewTargetPokemon] = useState()
  const showModal = (name) => {
    if (props.favoritePokemons.some(e => e.name === name)) {
      follow()
      setIsModalVisible(true);
    } else (
      setIsModalVisible(true),
        unfollow()
    )
  };
  const handleOk = () => {
    unfollow(null)
    setIsModalVisible(false);
  };
  const handleCancel = () => {
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
  return <div className={"pokemons"}>
    <div className={"pokemonsContainer"}>
      <div className={"allPokemons_row"}>

        {props.pokemons.map((p) => (
          <div className={"pokemonCard_container"}>
            <Card className={"pokemonCard"} onClick={() => {
              setNewTargetPokemon(p);
              showModal(p.name)
            }} size={"default"} hoverable cover={<img className={"pokemonCard_img"} alt={`${p.name}`}
                                                      src={p.sprites.other.dream_world.front_default || p.sprites.front_default}/>}
            >
              <div className={"pokemonCard_body"}>
                <Meta title={p.name.toUpperCase()} description={p.types.map((t) =>
                  <Tag key={t.id} style={{color: POKEMON_CLASSNAMES[t.type.name]}}>
                    {t.type.name}
                  </Tag>
                )}
                />
              </div>
            </Card>
          </div>
        ))}
        {targetPokemon &&
        <div className={"modalWindow"}>
          <Modal width={450} visible={isModalVisible} onOk={handleOk}
                 onCancel={handleCancel}>
            <div className={"modalContainer"}>
              <div className={"modalWindow_row"}>
                <div className={"modalWindow__info"}>
                  <div>
                    <div>{targetPokemon.name}</div>
                    {targetPokemon.types.map((t) =>
                      <Tag key={t.id} style={{color: POKEMON_CLASSNAMES[t.type.name]}}>
                        {t.type.name}</Tag>)}</div>
                  <div className={"modalWindow__info_img"}>
                    <img style={{width:150,height:150}}
                      src={targetPokemon.sprites.other.dream_world.front_default || targetPokemon.sprites.front_default}/>
                  </div>
                  <div className={"followUnfollow"}>
                    {like ? <Button onClick={() => {
                        removeFromFavoritePokemonDispatch(targetPokemon)
                        unfollow()
                        setIsModalVisible(false)
                      }} icon={<HeartTwoTone twoToneColor="#eb2f96"/>}/> :
                      <Button type="primary" onClick={() => {
                        addToFavoritePokemonDispatch(targetPokemon)
                        follow()
                      }}>
                        Follow </Button>}
                  </div>
                </div>
                <div className={"modalWindow__details"}>
                  <div>
                    <div>SKILLS:{targetPokemon.abilities.map((ab) =>
                      <div key={ab.id}> {ab.ability.name}</div>
                    )}</div>
                  </div>
                  <div>
                    <div>
                      Base experience: {targetPokemon.base_experience}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        }
      </div>
    </div>
  </div>
}