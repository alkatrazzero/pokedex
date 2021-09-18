import React from "react";
import {Droppable, Draggable} from "react-beautiful-dnd";


export const MyList = ({listId, listType, row}) => {

const style= row.style
  return (

    <div style={{display: "flex", alignItems: "center", paddingRight: 200, paddingLeft: 200}}>
      <span style={style}>{row.label}</span>
      <Droppable
        droppableId={listId}
        type={listType}
        direction="horizontal"
        isCombineEnabled={false}
      >

        {(dropProvided) => (

          <div
            {...dropProvided.droppableProps}
            style={{
              flex: 1,
              display: "flex",
              backgroundColor: "white",
              marginTop: 10,
              minHeight: 67,
              overflowX: "auto",
              border: "1px solid #17313a"
            }}
            ref={dropProvided.innerRef}
          >
            {row.urls.map((url, index) => (
              <Draggable  key={url} draggableId={url} index={index}>
                {(dragProvided) => (
                  <div
                    {...dragProvided.dragHandleProps}
                    {...dragProvided.draggableProps}
                    ref={dragProvided.innerRef}
                  >
                    <img style={{width: 50 ,height:50}} src={url}/>
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};