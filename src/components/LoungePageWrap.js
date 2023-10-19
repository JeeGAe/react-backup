import React from 'react';
import '../styles/LoungePageWrap.css'

function LoungePageWrap({children}){

    return(
        <>
            <div className="pagenation__wrap">
                {children}
            </div>
        </>
    )
}

export default LoungePageWrap