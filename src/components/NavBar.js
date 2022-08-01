import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserContext from "../services/UserContext";
import AuthNavbar from "./AuthNavbar";
import NotAuthNavbar from "./NotAuthNavbar";
import AuthService from "../services/auth.service";

const NavBar = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const logout = async()=>{
        await AuthService.logout()
        setCurrentUser(false)
    }

   if(currentUser){
    return <AuthNavbar logout={logout}/>
   }
   return <NotAuthNavbar/>
}

export default NavBar;