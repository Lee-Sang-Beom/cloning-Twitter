import { addDoc, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService, storageService }  from "fbase";
import Sweet from "components/Sweet";
import { v4 } from "uuid";
import { ref, uploadString } from "firebase/storage";

export default function Home({userObj}){
    const [sweet, setSweet] = useState(""); // setting the swttes document
    const [sweets, setSweets] = useState([]); // bring the swttes information
    const [imgFileString, setImgFileString] = useState();

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

    const onSubmit = async(event) =>{
        event.preventDefault();
        

        const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
        /* Cloud Storage에 파일을 업로드하려면 
           우선 파일 이름을 포함하여 파일의 전체 경로를 가리키는 참조를 만듭니다.
        (파일에 대한 reference를 만듬.)

        폴더를 만듬. ${userobj.uid} > 유저 아이디를 이용하여 폴더이름 생성
        사진에 이름을 줌. > v4()는 랜덤으로 특별한 식별자를 랜덤 생성 */

        const response = await uploadString(fileRef, imgFileString, 'data_url');
        /*
         uploadString() 메서드를 사용하여 원시 문자열, base64, base64url 
         또는 data_url로 인코딩된 문자열을 Cloud Storage에 추가할 수 있습니다.

         1. 앞서만든 파일 이름을 포함한 파일의 전체경로를 가리킬 수 있는 참조 변수
         2. 데이터 (파일 스트링)
         3. 데이터 포맷 (format) >> 'data_url' >> readAsDataURL한것을 여기서 사용하는 거임
        */
        
        console.log(response);
        // await addDoc(collection(dbService, "sweets"),{ // collection = sweets
        //     text : sweet, // sweet는 document의 key가 될 것임
        //     createdAt : Date.now(),
        //     createrId : userObj.uid,
        // });

        setSweet("");
    }

    const onChange = (event) => {
        const {
             target : {value}
            } = event; //event로부터 event 안에있는 target의 value를 반환

        setSweet(value);
    }

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

    const onClearPhotoClick = () => setImgFileString(null); // 위 onFileChange에서 들고온 result을 무효화

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
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Sweet"/>
            </form>
            {imgFileString && (
            <>
                <div>
                    <img src = {imgFileString} width = "150px" height="150px"/>
                    <button onClick={onClearPhotoClick}> cancel </button>
                </div>
            </>
            )
            }
            <div>
                {sweets.map((sweet)=> (
                    <Sweet sweetObj={sweet} 
                            key={sweet.id}      
                            isOwner = {sweet.createrId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}

