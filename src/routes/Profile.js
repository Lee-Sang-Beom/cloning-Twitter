import { authService, dbService } from "fbase";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/";


// 해당 페이지에는 로그아웃 버튼이 있음
export default function Profile({userObj, refreshUser}) {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
        refreshUser();
    }

    const getMySweets = async() => {
        const q = query(collection(dbService, "sweets")
        ,where("createrId", "==", `${userObj.uid}`)
        ,orderBy("createdAt","desc"));

        await getDocs(q);

    }
    useEffect(() => {
        getMySweets();
    },[]);

    const onSubmit = async(event) =>{
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
        }
        refreshUser();
    }

    const onChange = (event) => {
        setNewDisplayName(event.target.value);
    }
    return (
    <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input type="text"
                autoFocus 
                placeholder = "display name" 
                value = {newDisplayName} 
                onChange={onChange}
                className="formInput"/>

            <input type = "submit" 
                value = "update profile"
                className="formBtn"
                style={{
                    marginTop: 10,
                }}/>
        </form>
        <span onClick={onLogOutClick} className="formBtn cancelBtn logOut">
            Log Out
        </span>
    </div>
    
        

    
    )
}

