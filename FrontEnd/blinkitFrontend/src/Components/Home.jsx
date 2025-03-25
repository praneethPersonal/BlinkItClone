import React, {  } from "react";
import HomeHeader from "./HomeHeader";
import HomeDiv from "./HomeBody";
export function Home({isLoggedIn,setShowLoginDialog,setIsLoggedIn,showLoginDialog}){
    
    return(
        <>
        <HomeHeader isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog} setIsLoggedIn={setIsLoggedIn} showLoginDialog={showLoginDialog}/> 
        <HomeDiv  /> 
        </>
    )
}

