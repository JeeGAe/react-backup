import React from "react";
import '../styles/LoungeButton.css'

function LoungeButton({onClick, children, className, disabled, ariaCurrent}){

    return(
        <>
            <button 
                onClick={onClick} 
                className={`pagenation-btn ${className}`} 
                disabled={disabled} 
                aria-current={ariaCurrent} 
                >
                {children}
            </button>
        </>
    )
}

export default LoungeButton