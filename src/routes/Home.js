import { addDoc, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService }  from "fbase";
import { query } from "firebase/database";

export default function Home({userObj}){

    const [sweet, setSweet] = useState(""); // setting the swttes document
    const [sweets, setSweets] = useState([]); // bring the swttes information

    const getSweets = async() => {
        const dbsweets = await getDocs(collection(dbService, "sweets"));
        dbsweets.forEach(document => {
            const sweetObj = {
                ...document.data(), // 데이터의 내용물을 가져와 풀어놓음
                id : document.id, // 맵할당시, key부여하기 위한 용도
                
            };
            setSweets((prev) => [sweetObj, ...prev]);
        });
    }

    useEffect(()=>{
        getSweets(); 
        // 컴포넌트가 마운트 될때마다 getSweets 호출
        
        onSnapshot(collection(dbService, "sweets"),snapshot =>{
            console.log("something happened"); 
            // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인. 변화발생 때 마다 console.log
        })
    },[])

    const onSubmit = async(event) =>{
        event.preventDefault();
        
        await addDoc(collection(dbService, "sweets"),{ // collection = sweets
            text : sweet, // sweet는 document의 key가 될 것임
            createdAt : Date.now(),
            createrId : userObj.uid,
        });

        setSweet("");
    }

    const onChange = (event) => {
        const {
             target : {value}
            } = event; //event로부터 event 안에있는 target의 value를 반환

        setSweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120}
                value = {sweet}
                onChange = {onChange}
                />
                <input type="submit" value="Sweet"/>
            </form>
            <div>
                {sweets.map((sweet)=> (
                    <div key = {sweet.id}>
                        <h4>{sweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

