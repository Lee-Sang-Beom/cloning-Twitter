import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user) =>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);// 만약 authservice가 바뀌면 우리가 받은 user를 setuserobj에 넣음
      }else{
        setIsLoggedIn(false);
      }
      setInit(true); // init이 false면 아래 AppRouter 숨김
    });
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn = {isLoggedIn} userObj = {userObj}/> : "Initializing.."}
      <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
  );
}

export default App;
