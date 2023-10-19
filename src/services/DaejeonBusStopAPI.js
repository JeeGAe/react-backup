import React, {useState, useEffect} from "react";

function DaejeonBusStopAPI() {
    const [daejeonBusStopApiData, setDaejeonBusStopApiData] = useState([])
    const API_KEY = process.env.REACT_APP_DaejeonBusStop_API_KEY
    console.log(API_KEY)
    useEffect( ()=> {
        fetch(`http://apis.data.go.kr/6300000/GetStatListService/getStatList?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&NODENM="은하수네거리"`)
        .then(res => res.json())
        .then(result => {
            console.log(result)
        })
    })
}

export default DaejeonBusStopAPI