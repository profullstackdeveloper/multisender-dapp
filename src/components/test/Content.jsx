import React from 'react';
import ItemComp from './ItemComp';

export default function Content () {
    const [arrayBuffer, setArrayBuffer] = React.useState([]);
    const removeItem = (index) => {
        arrayBuffer.splice(index);
        console.log(arrayBuffer);
    }

    const addBuffer = () => {
        const newBuffer = [...arrayBuffer, <ItemComp key={arrayBuffer.length} index={arrayBuffer.length} removeItem={removeItem} />];
        setArrayBuffer(newBuffer); 
    }
    
    return (
        <div>
            <button type="button" onClick={() => addBuffer()}>Add</button>
            {
                arrayBuffer
            }
        </div>
    )
}