import React from "react";
import { Header , Footer, NewsPaper } from "../components"

function News({userInfo}){
    return(
       <>
         <Header></Header>  
         <NewsPaper></NewsPaper>
         <Footer userInfo={userInfo}></Footer>
       </>
    )
}

export default News