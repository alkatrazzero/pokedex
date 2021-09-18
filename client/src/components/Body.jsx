import React, {useState} from 'react'
import {Pagination} from "antd";
import s from "./Body.module.css"
import {Input} from 'antd';
import 'antd/dist/antd.css';
import PokemonTypes from "./RenderRokemonTypes/PokemonTypes";
import {ComponentCreator} from "./componentCreatoeHelper";
import {useSelector} from "react-redux";
import {pokemonSelector} from "../store/pokemonsSelector";
import {SearchPokemonsModal} from "./RenderRokemonTypes/searchPokemons";

const Body = (props) => {
  const favoritePokemons = useSelector(pokemonSelector)
  const {Search} = Input;
  const [valueString, setValue] = useState('')

  const onSearch = (value) => {
    if (value) {
      {
        props.getCurrentPokemon(value.toLowerCase())
        setValue('')
      }
    }
  }
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return <div>
    <div>
      <div>
        <div className={"filterSettings"}>
          <PokemonTypes getPokemonsByType={props.getPokemonsByType} pokemonTypes={props.pokemonTypes}/>
          <Search size={"small"} placeholder={"input search text"} onChange={onChange} onSearch={onSearch}
                  value={valueString}
                  style={{width: 200}}/>
        </div>

        {props.currentPokemon ? <SearchPokemonsModal/> :
          <div>
            <ComponentCreator favoritePokemons={favoritePokemons} pokemons={props.pokemons}/>
            <Pagination style={{marginTop: 20}} onShowSizeChange={(i, e) => props.onPageSizeChange(e)}
                        pageSize={props.pageSize}
                        current={props.currentPage} onChange={(page) => props.onPageChanged(page)}
                        defaultCurrent={1} size={"small"}
                        total={props.totalPokemons}/>
          </div>

        }
      </div>
    </div>
  </div>
}
export default Body;
