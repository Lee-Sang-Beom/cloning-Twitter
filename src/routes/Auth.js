import { authService } from "fbase";
import { 
    createUserWithEmailAndPassword, 
    getAuth, GithubAuthProvider,
    GoogleAuthProvider, 
    signInWithEmailAndPassword,
    signInWithPopup

} from "firebase/auth";
import React, { useState } from "react";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    async function onSubmit (event) {
        event.preventDefault();

        try{
            if(newAccount){
                // create Account
                const data = await createUserWithEmailAndPassword(authService, email, password);
                console.log(data);
            }
    
            else{
                //login
                const data = await signInWithEmailAndPassword(authService, email, password);
                console.log(data);
            }
        } catch(error){
            setError(error.message);
        }

    }

    const toggleAccount = () => setNewAccount(!newAccount);

    const onSocialClick = async(event) =>{
        const {
            target : {name}
        } = event;

        let provider;
        if(name === "google"){
            //google login
            provider = new GoogleAuthProvider();
        }else if(name === "github"){
            //google github
            provider = new GithubAuthProvider();
        }

        const data = await signInWithPopup(authService, provider);
        
    }
    return (
    <div>
        <form onSubmit = {onSubmit}>
            <input type="email" 
                   placeholder = "Email"
                   value = {email}
                   name = "email"
                   onChange = {(e)=>{setEmail(e.target.value)}}
                   required/>

            <input type="password" 
                   placeholder = "Password" 
                   value = {password} 
                   name = "password"
                   onChange = {(e)=>{setPassword(e.target.value)}}
                   required/>

            <input type="submit" value = {newAccount ? "Create Account" : "Log in"}/>
        </form>

        <button onClick = {toggleAccount}>
            {newAccount ? "Sign In" : "CreateAccount"}
        </button>

        <div>
            <button name = "google" onClick={onSocialClick}>Continue with Google</button>
            <button name = "github" onClick={onSocialClick}>Continue with Github</button>
        </div>

        {error}
    </div>
    )
}

