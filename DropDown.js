import React from "react";

function DropDownButton(props){
    const {states, setState} = props

    return(
        <div >
            <select style = {{borderRadius: "10px", color: "red", height: '30px', maxWidth: "110px"}} value = {states.selection} onChange={(e)=>{
                const selected = e.target.value;
                setState(selected) 
            }}>
            {
                states.options.map((opt) => (<option> {opt} </option>))
            }
            </select>   
        </div>
    )
}
export default DropDownButton;