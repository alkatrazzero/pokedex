import React, {useEffect, useState} from 'react'
import {Checkbox, Tag} from 'antd';
import {POKEMON_CLASSNAMES} from "../../assets/types";
import {TreeSelect} from 'antd';

const PokemonTypes = (props) => {
  const treeData = []
  {props.pokemonTypes.map((type) => treeData.push({title: type.name, value: type.url,key:type.name}))}
  const {SHOW_PARENT} = TreeSelect;
  const [stateValue, setStateValue] = useState([])
    const onChange = value => {
      setStateValue(value)
      {
        value.length > 0 ? props.getPokemonsByType(value) : props.getPokemonsByType(null)
      }
    }
    const tProps = {
      treeData,
      value: stateValue,
      onChange: onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: 'Please select type',
      style: {
        width: '100%',
      },
    }
    return <div>
      <div style={{width:199}}>
        <TreeSelect style={{ width: '100%' }} size={"small"} {...tProps} />
      </div>
    </div>
  }
  export default PokemonTypes


// onChange = value => {
//   console.log('onChange ', value);
//   this.setState({ value });
// };

