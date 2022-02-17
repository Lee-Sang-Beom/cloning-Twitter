import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { updateProfile } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user) =>{
      if(user){
        setIsLoggedIn(true);
        // setUserObj(user);
        setUserObj({ // userobj를 설정할때 엄청많은 전체를 설정하는게 아니라 변경될 것 같은 부분만 수정
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => updateProfile(args),
          // arg를 이용해 리턴값으로 진짜 user.updateprofile을 보내줌. 단, 
        })
      }else{
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true); // init이 false면 아래 AppRouter 숨김
    });
  }, [])

  const refreshUser=() =>{
    const user = authService.currentUser;
    
    //1. 우리가 원하는 firebase의 특정부분만을 가져와서 react에게 줄수있음
    
    setUserObj({ // userobj를 설정할때 엄청많은 전체를 설정하는게 아니라 변경될 것 같은 부분만 수정
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => updateProfile(args),
      // arg를 이용해 리턴값으로 진짜 user.updateprofile을 보내줌. 단, 
    })

  /*
    2. setUserObj(Object.assign({},user));*/
    

    // setNewName(user.displayName); // 강제로 바꾸면서 재렌더링
  }
  return (
    <>
      {init ? <AppRouter 
                  isLoggedIn = {isLoggedIn} 
                  userObj = {userObj}
                  refreshUser = {refreshUser}/> : "Initializing.."}
      {/* <footer>&copy; {new Date().getFullYear()} Switter</footer> */}
    </>
  );
}

export default App;
