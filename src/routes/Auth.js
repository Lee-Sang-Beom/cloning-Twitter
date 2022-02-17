import AuthForm from "components/AuthForm";
import { authService } from "fbase";
import { 
    GithubAuthProvider,
    GoogleAuthProvider, 
    signInWithPopup

} from "firebase/auth";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export default function Auth() {
 
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

        await signInWithPopup(authService, provider);
        
    }
    return (
    <div className="authContainer">
        <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="5x"
            style={{ marginBottom: 20 }}
        />
        <h1 style={{ marginBottom: 40, fontSize : 30}}>Switter</h1>
        <AuthForm/>

        <div className="authBtns">
            <button name = "google" onClick={onSocialClick} className="authBtn">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
            <button name = "github" onClick={onSocialClick} className="authBtn">Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
        </div>

    </div>
    )
}

