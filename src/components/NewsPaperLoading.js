import React from "react";
import '../styles/NewsPaperLoading.css'

function NewsPaperLoading(){
    return(
        <>
            <div className="loading__frame">
                <iframe src="https://giphy.com/embed/r3xBH1FXWz0h55CVtj" width="480" height="480" frameBorder="0" className="giphy-embed"  allowFullScreen ></iframe>
                <h3>Loading...</h3>
            </div>
        </>
    )
}

export default NewsPaperLoading