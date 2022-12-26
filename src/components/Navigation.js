import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function Navigation( {userObj} ){
    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                {/* chat */}
                <li>
                    <Link to="/" style={{ marginRight: 10 }}>
                        <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
                    </Link>
                </li>
                {/* profile */}
                <li>
                    <Link to = "/profile" style={{
                                                marginLeft: 10,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                fontSize: 12,
                                            }}> 
                        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" style={{marginBottom : 10}}/>
                        
                        {userObj?.displayName?.length ? userObj.displayName : ""}'s Profile 
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

