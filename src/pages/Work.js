import React, { useState } from "react";
import '../styles/Work.css'
import { Header, Footer, Workpad } from "../components";

function Work({userInfo}) {
  console.log(userInfo)
  return (
    <div className="work">
      <Header></Header>
      <Workpad></Workpad>
      <Footer userInfo={userInfo}></Footer>
    </div>
  )
}

export default Work