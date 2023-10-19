import React, {useState, useEffect, useRef} from "react";
import "../styles/TvContainer.css"

function TvContainer({youTubeApiData}){
    const iframeStyle = {
        width: "100%" ,
        height: '100%' ,
        borderRadius: '20px',
        border : 'none',
    }
    const [slideIndex, setSlideIndex] = useState(0)
    const [slideStateIndex, setSlideStateIndex] = useState(false)
    const [videoSrc, setVideoSrc] = useState()
    const Timer = useRef(0)
    const youtubeContents = document.querySelectorAll('.youtube-content')
    useEffect( (e) => { // n초마다 슬라이드가 이동하는 코드
        const increaseIndex = (e) => {
            if(slideIndex >= 10) {
                setSlideIndex(0)
            } else {
                setSlideIndex(slideIndex + 1)
            }
        }
        const TimerID = setTimeout(increaseIndex,5000)
        Timer.current = TimerID
        return () => {
            clearTimeout(TimerID)
        }
        
    },[slideIndex])
    const slideStyle = { // 슬라이드 애니메이션
        transition: `${slideStateIndex ? "" : "all 1s ease-in-out"}`,
        transform: `translateX(${
            -1 * (1400 * slideIndex)
        }px)`,
    }
    const maxIndex = 10
    const prevMove = () => {
        if(slideIndex <= 0) {
            setSlideIndex(maxIndex)
        } else {
            setSlideIndex(slideIndex -1)
        }
    }
    const nextMove = () => {
        if(slideIndex >= maxIndex) {
            setSlideIndex(0)
        } else {
            setSlideIndex(slideIndex +1)
        }
    }

    const [loading, setLoading] = useState(false)
    const tvShow = (e) => { // 리스트를 누르면 윗상단에 있는 tv에 누른 리스트가 보여지는 함수
        setLoading(true)
        setVideoSrc(e.target.id)
    }

    useEffect(() => {
        const timeId = setTimeout( () => {
            setLoading(false)
        }, 500)
        return () => {
            clearTimeout(timeId)
        }
    },[videoSrc])

    const slideStop = () => {
        setSlideStateIndex(true)
        clearTimeout(Timer.current)
    }

    const slideStart = (e) => {
        setSlideStateIndex(false)
        if(slideIndex >= 10) {
            setSlideIndex(0)
        } else {
            setSlideIndex(slideIndex + 1)
        }
    }
    return(
        <>       
            <div className="TvContainer">
                <div className="Tv">
                    <div className='Tv-body-container' >
                        {/* {youTubeApiData.length !==0 && youTubeApiData.items.map( (youtube, index, id) => {
                            if(index === 0) {
                                return <iframe key={id} style={iframeStyle} src={`https://www.youtube.com/embed/${youtube.id.videoId}`}/>
                            }
                        })} */}
                        {!loading && <iframe style={iframeStyle} src={`https://www.youtube.com/embed/${videoSrc}`}/>}
                    </div>
                </div>
                <button className="preveBtn" onClick={prevMove}>
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                </button>
                <button className="nextBtn" onClick={nextMove}>
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </button>
                <div className="youtube-container" onMouseEnter={slideStop} onMouseLeave={slideStart}>
                    {youTubeApiData.length !==0 && youTubeApiData.items?.map( (youtube, id) => {
                        return (
                            <div key={id} className="youtube-content" style={slideStyle}>
                                <img src={youtube.snippet.thumbnails.medium.url} 
                                id={youtube.id.videoId} onClick={tvShow}/>
                                <div className="youtube-description">
                                    <span>{youtube.snippet.title}</span>
                                </div>
                            </div>
                        ) 
                    })}
                </div>
            </div>
       </>
    )
}

export default React.memo(TvContainer)