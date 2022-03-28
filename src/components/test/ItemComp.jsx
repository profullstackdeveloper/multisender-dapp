import React from 'react';

export default function ItemComp ({removeItem, index}) {
    const [content, setContent] = React.useState("");
    return (
        <div>
            <input style={{border: "1px solid lightBlue"}} value={content} onChange={(e) => setContent(e.target.value)}></input>
            <button type="button" onClick={() => removeItem(index)}>Remove</button>
        </div>
    )
}