import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import { v4 } from "uuid";

export default function SweetFactory({userObj}){
    
    const [sweet, setSweet] = useState(""); // setting the swttes document
    const [imgFileString, setImgFileString] = useState("");

    const onSubmit = async(event) =>{
        event.preventDefault();
        if(sweet === "") {return}
        let fileUrl = "";

        if(imgFileString !== ""){
            const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(fileRef, imgFileString, 'data_url');
            fileUrl = await getDownloadURL(response.ref);
        }

        const sweetObj = {
            text : sweet, 
            createdAt : Date.now(),
            createrId : userObj.uid,
            fileUrl,
        }

        await addDoc(collection(dbService, "sweets"),sweetObj);

        setSweet("");
        setImgFileString("");
    }

    const onChange = (event) => {
        const {
             target : {value}
            } = event; //event로부터 event 안에있는 target의 value를 반환

        setSweet(value);
    }

    // img upload
    const onFileChange = (event) =>{
        const {target : {files}} = event; 
        const file = files[0]; 
        
        const reader = new FileReader(); 
        reader.onloadend = (finishedEvent) => { 
            const result = finishedEvent.currentTarget.result;
            setImgFileString(result);
        }
        reader.readAsDataURL(file);
    }

    const onClearPhotoClick = () => setImgFileString(""); // 위 onFileChange에서 들고온 result을 무효화

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120}
                    value = {sweet}
                    onChange = {onChange}
                    className="factoryInput__input"
                    />
                <input type="submit" value="Sweet" className="factoryInput__arrow"/>
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input 
            type="file" 
            accept="image/*" 
            onChange={onFileChange}
            id="attach-file"
            style={{
                opacity: 0,
              }}
            />
                
            
            {imgFileString && (
            <>
                <div className="factoryForm__attachment">
                    <img src={imgFileString} 
                    style={{
                        backgroundImage: imgFileString,
                    }}/>

                    <div className="factoryForm__clear" onClick={onClearPhotoClick}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            </>
            
            )
            }
        </form>
    )
}