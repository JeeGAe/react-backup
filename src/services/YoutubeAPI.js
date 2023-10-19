import React, {useState, useEffect} from "react";
function YoutubeAPI() {
    const [youTubeData , setYouTubeData] = useState([])
    const API_KEY = process.env.REACT_APP_Youtube_API_KEY;
    useEffect( ()=> {
        fetch(`https://www.googleapis.com/youtube/v3/search?&key=${API_KEY}&part=snippet&type=video&q=운동&maxResults=50`)
        .then( res => res.json())
        .then(response => {
            console.log(response)
            setYouTubeData(response)
        })
    },[])
    return youTubeData
}

export default YoutubeAPI