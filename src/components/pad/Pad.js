import React, { useState } from'react';
import './Pad.css';
 
function Pad(props){
    const [on, setOn] = useState(false);

    return(
        <div >
            <button 
                className={"PadBox"} 
                style={{backgroundColor: props.color}}
                onClick={() => {
                    const newState = !on
                    setOn(newState)
                    props.onChange({
                        name: props.name,
                        url: props.url,
                        isOn: newState,
                    })
                }} 
                >
                    {props.name} {on ? '(on)': ''}
            </button>
        </div>
    );   
}
export default Pad;