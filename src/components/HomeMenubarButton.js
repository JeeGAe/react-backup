import React from "react";
import '../styles/HomeMenubarButton.css'

function HomeMenubarButton({ toggleMenubar}) {
    return (
        <>
          <button onClick={toggleMenubar}>
                <div>
                    <img src="images/windows95.png" alt='window95-logo'></img>
                    <span>시작</span>
            </div>
          </button>
        </>
    )
}

export default HomeMenubarButton