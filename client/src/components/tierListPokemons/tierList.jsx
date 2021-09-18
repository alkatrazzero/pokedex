import React, {useEffect} from 'react'
import {DragDropContext} from "react-beautiful-dnd";
import {reorderRows, reorder} from "./reorder";
import generate from "shortid";
import {useSelector} from "react-redux";
import {MyList} from "./myList";

const sId = generate();
const aId = generate();
const bId = generate();
const cId = generate();
const unrankedId = generate();


export const TierListPokemons = (props) => {

    useEffect(()=>{document.title = "Tier list"},[])
    const pokemonsIMG = useSelector(state => state.pokemonsPage.favoritePokemons.map(p => p.sprites.other.dream_world.front_default||p.sprites.front_default))


    const [rows, setRows] = React.useState([
        {id: sId, label: "s", urls: [],style:{color:"black",padding:18,marginTop:10,backgroundColor:"#ff7f7f",fontSize:20,border: "1px solid #17313a"}},
        {id: aId, label: "a", urls: [],style:{color:"black",padding:18,marginTop:10,backgroundColor:"#ffbf7f",fontSize:20,border: "1px solid #17313a"}},
        {id: bId, label: "b", urls: [],style:{color:"black",padding:18,marginTop:10,backgroundColor:"#ffdf7f",fontSize:20,border: "1px solid #17313a"}},
        {id: cId, label: "c", urls: [],style:{color:"black",padding:18,marginTop:10,backgroundColor:"#ffff7f",fontSize:20,border: "1px solid #17313a"}},
        {
            id: unrankedId,
            label: "d",
            urls: pokemonsIMG,
            style:{color:"black",padding:18,marginTop:10,backgroundColor:"#bfff7f",fontSize:20,border: "1px solid #17313a"}
        }
    ]);

    return <DragDropContext
        onDragEnd={({destination, source}) => {
            // // dropped outside the list
            if (!destination) {
                return;
            }

            setRows(reorderRows(rows, source, destination));
        }}
    >
        <div>
            {rows.map((row, i) => {
              return( <div>
                <MyList
                    onLabelChange={(newText) =>
                        setRows(
                            rows.map((x) =>
                                x.id === row.id ? {...row, label: newText} : x
                            )
                        )
                    }
                    onUp={() => setRows(reorder(rows, i, i - 1))}
                    onDown={() => setRows(reorder(rows, i, i + 1))}
                    internalScroll
                    key={row.id}
                    listId={row.id}
                    listType="CARD"
                    row={row}
                    color={row.color}
                /></div>
            )})}
        </div>
    </DragDropContext>

};
