import {collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {authService, dbService}  from "fbase";
import Sweet from "components/Sweet";

import SweetFactory from "components/SweetFactory";
import { onAuthStateChanged } from "firebase/auth";

export default function Home({userObj}){
    const [sweets, setSweets] = useState([]); // bring the swttes information
    const q = query(collection(dbService, "sweets"),orderBy("createdAt","desc"));
    useEffect(()=>{        
        onSnapshot(q, snapshot =>{
            const sweetArray = snapshot.docs.map((doc) => ({
                id : doc.id,
                ...doc.data(),
            }));

            setSweets(sweetArray);
            // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인. 변화발생 때 마다 console.log
        });

   
    },[])

    return (
        <div className="container">
            <SweetFactory userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
                {sweets.map((sweet)=> (
                    <Sweet sweetObj={sweet} 
                            key={sweet.id}      
                            isOwner = {sweet.createrId === userObj.uid}/>
                ))}
                
            </div>
        </div>
    )
}

