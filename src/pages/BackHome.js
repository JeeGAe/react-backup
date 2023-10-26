import React, { useState, useEffect } from "react";
import { Header , Footer } from "../components";
import '../styles/BackHome.css';
// import mapApi from "../services/Map";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"


const { kakao } = window;

function BackHome({userInfo}){
    // const mapData = mapApi()
    // console.log(mapData)
    // useEffect( ()=> {
    //     const mapContainer = document.getElementById('map')
    //     if(kakao !== undefined) {
    //         console.log("check")
    //     }
    //     const mapOptions = {
    //         center : new kakao.maps.LatLng(36.349184947679255, 127.37775416701282) ,
    //         level: 3 ,
    //     }
    //     const map = new kakao.maps.Map(mapContainer, mapOptions)
    //     const position = [ 
    //         {
    //             title : "학원", 
    //             latlng: new kakao.maps.LatLng(36.349184947679255, 127.37775416701282),
    //             content : '<div class ="label"><span class="left"></span><span class="center">학원</span><span class="right"></span></div>',
    //         },
    //         {
    //             title : "음식점", 
    //             latlng: new kakao.maps.LatLng(36.35066068335347, 127.38128166077946),
    //             content : '<div class ="label"><span class="left"></span><span class="center">음식점</span><span class="right"></span></div>',
    //         },
    //     ]
    //     for( let i=0; i<position.length; i++) {
    //         const marker = new kakao.maps.Marker({
    //             map: map, // 마커를 표시할 지도
    //             position: position[i].latlng, // 마커를 표시할 위치
    //             title : position[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //             content : position[i].content
    //         })
    //         marker.setMap(map)
    //     }
    // },[])
    // const mapStyle = {
    //     width : "2000px",
    //     height : "2000px",
    // }
    const [userLocation, setUserLocation] = useState(null)
    const [nearStation, setNearStation] = useState([])
    const [openStataionInfo, setOpenStataionInfo] = useState(null)
    useEffect(() => {
        fetch('http://127.0.0.1:5300/api/backHome/getUserNearBusStation',{
            headers : {
                'Content-Type' : 'application/json'
            },
            credentials : 'include',
            cache : 'no-cache'
        })
        .then(res => res.json())
        // .then(res => new DOMParser().parseFromString(res, 'application/xml'))
        .then(res => {
            console.log(res);
            setNearStation(res.nearBusStation);
            setUserLocation(res.userLocation);
            // const { x, y } = res.data.document[0];
            // fetch(`http://127.0.0.1:5300/api/kakaomap/getCloseStation?tmX=${x}&tmY=${y}`, {
            //     method : 'GET',
            //     headers : {
            //         'Content-Type' : 'application/json'
            //     },
            //     credentials : 'include',
            //     cache : 'no-cache',
            // })
            // .then(res => res.json())
            // .then(res => {
            //     console.log(res);
            // })
        })
    },[])

    console.log()

    const scrollBusStationList = (_id) => {
        let index = 0;
        for(let station of nearStation){
            if(station._id === _id) break;
            index++;
        }
        const busStationScrollHeight = document.querySelector('.bus-station-list-container').scrollHeight;
        document.querySelector('.bus-station-list-container').scrollTo(0,busStationScrollHeight - (busStationScrollHeight / nearStation.length * (nearStation.length - index)));
    }

    const getBusStaionInfo = () => {
        fetch('http://127.0.0.1:3000/')
    }

    return(
       <>
            <Header></Header>
            {!userLocation && <h1>Loading...</h1>}
            {userLocation &&
            <div className="backHome-container">
                <Map
                center={{
                    lat: userLocation.y, 
                    lng: userLocation.x
                }}
                style={{
                    width : "70%",
                    height : "100%",
                    position : 'relative'
                }}
                level={4}
                >
                {nearStation.map((data, i) => (
                    <React.Fragment key={i}>
                    <MapMarker
                        position={{
                            lat : data['위도'],
                            lng : data['경도'],
                        }}
                        title={data['정류장명']}
                        clickable={true}
                        onClick={() => {
                            setOpenStataionInfo({...data});
                            scrollBusStationList(data._id);
                        }}
                    >
                        {openStataionInfo?._id == data._id &&
                        <span>{data['정류장명']}</span>
                        }
                    </MapMarker>
                    
                    </React.Fragment>
                ))}
            </Map>
            <div className="bus-station-container">
                <div className="bus-station-list-container">
                {nearStation.map(d => {
                    return(
                        <div key={d._id} className={`bus-station-list ${openStataionInfo?._id === d._id ? 'station-list-highlight' : ''}`} onClick={() => {setOpenStataionInfo({...d})}}>
                            <h4>{d['정류장명']}</h4>
                        </div>
                    )
                })}
                </div>
                <div>
                    {openStataionInfo &&
                        <div>
                            <h2>{openStataionInfo['정류장명']}</h2>
                        </div>
                    }
                </div>
                
            </div>
            </div>
            }
            <Footer userInfo={userInfo}></Footer>   
       </>
    )
}

export default BackHome