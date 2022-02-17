import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService, dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

export default function Sweet({sweetObj, isOwner}){

    const [editing, setEditing] = useState(false);
    const [newSweet, setNewSweet] = useState(sweetObj.text);
    const onDeleteClick = async() =>{
        const ok = window.confirm("Are you sure you want to delete this sweet?");
        if(ok){
            await deleteDoc(doc(dbService, "sweets", `${sweetObj.id}`));
           if(sweetObj.fileUrl !== ""){
                deleteObject(ref(storageService, sweetObj.fileUrl));
           }
            
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


        updateDoc(doc(dbService, "sweets", `${sweetObj.id}`),{
            text : newSweet
        })

        setEditing(false);
    }
    return (
        <div className="sweet">
            {
                editing ? (
                <>
                    <form onSubmit={onSubmit} className="container sweetEdit"> 
                        <input 
                            value = {newSweet} 
                            type = "text"
                            placeholder="Edit your sweet"
                            onChange={onChange}
                            autoFocus
                            className="formInput"
                            required/>

                        <input type = "submit"
                               value="update sweet"
                               className="formBtn"/>
                    </form> 
                    <span onClick = {toggleEditing} className="formBtn cancelBtn">
                        cancel
                    </span>
                </>
                

                )
                :
                (
                <>
                    <h4 style={{padding : "10px 30px", fontSize : "16px"}}>{sweetObj.text}</h4>
                    {sweetObj.fileUrl && <img src = {sweetObj.fileUrl}/>}
                    {isOwner &&      
                    <div className="sweet__actions">
                        <span onClick={onDeleteClick}> <FontAwesomeIcon icon={faTrash} /> </span>
                        <span onClick={toggleEditing}> <FontAwesomeIcon icon={faPencilAlt} /></span>
                    </div>  
                    }
                </>
                )

                
            } 
        </div>
    )

}

