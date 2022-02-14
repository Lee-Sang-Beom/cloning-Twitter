import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

export default function Sweet({sweetObj, isOwner}){

    const [editing, setEditing] = useState(false);
    const [newSweet, setNewSweet] = useState(sweetObj.text);
    const onDeleteClick = async() =>{
        const ok = window.confirm("Are you sure you want to delete this sweet?");
        if(ok){
            await deleteDoc(doc(dbService, "sweets", `${sweetObj.id}`));
        }
    }


    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) =>{
        const {
            target : {value}
        } = event;
        setNewSweet(value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(newSweet,sweetObj.text);

        updateDoc(doc(dbService, "sweets", `${sweetObj.id}`),{
            text : newSweet
        })

        setEditing(false);
    }
    return (
        <div>
            {
                editing ? (
                <>
                    <form onSubmit={onSubmit}> 
                        <input 
                        value = {newSweet} 
                        type = "text"
                        placeholder="Edit your sweet"
                        onChange={onChange}
                        required/>
                        <input type = "submit"
                               value="update sweet"/>
                    </form> 
                    <button onClick = {toggleEditing}>
                        cancel
                    </button>
                </>
                

                )
                :
                (
                <>
                    <h4>{sweetObj.text}</h4>
                    {isOwner &&      
                    <>
                        <button onClick={onDeleteClick}>Delete Sweet</button>
                        <button onClick={toggleEditing}>Edit Sweet</button>
                    </>  
                    }
                </>
                )

                
            } 
        </div>
    )

}

