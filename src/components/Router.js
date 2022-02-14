import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

export default function Router({isLoggedIn, userObj}) {
   
    return(
        <BrowserRouter>
        {isLoggedIn && <Navigation/>}
            <Switch>
                {isLoggedIn ? 
                <>
                <Route exact path = "/">
                    <Home userObj = {userObj}/>
                </Route> 
                <Route exact path = "/profile">
                    <Profile />
                </Route> 
                </>
                : 
                <>
                <Route exact path = "/">
                    <Auth />
                </Route>
                </>

                }
            </Switch>
        </BrowserRouter>
    )
}