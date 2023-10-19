import React from "react";
import '../styles/ScreenSaver.css'

// 화면 보호기 컴포넌트
function ScreenSaver({state}) {
    return (
        <>
            <div className={`screen-container ${state ? 'open' : 'close'}`}>
                <span> </span>
            </div>
        </>
    )
}
export default ScreenSaver