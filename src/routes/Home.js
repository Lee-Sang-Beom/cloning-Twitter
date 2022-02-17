import {collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {dbService}  from "fbase";
import Sweet from "components/Sweet";

import SweetFactory from "components/SweetFactory";

export default function Home({userObj}){
    const [sweets, setSweets] = useState([]); // bring the swttes information

    useEffect(()=>{        
        onSnapshot(collection(dbService, "sweets"), snapshot =>{
            const sweetArray = snapshot.docs.map((doc) => ({
                id : doc.id,
                ...doc.data(),
            }));

            setSweets(sweetArray);
            // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인. 변화발생 때 마다 console.log
        })
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

