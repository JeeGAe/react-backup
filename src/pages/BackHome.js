import React, { useState, useEffect } from "react";
import { Header , Footer } from "../components"
// import mapApi from "../services/Map";
import proj4 from "proj4";
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
    useEffect(() => {
        fetch('http://127.0.0.1:5300/api/kakaomap/getXY',{
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

    return(
       <>
            <Header></Header>
            <div id='map'></div>
            <Footer userInfo={userInfo}></Footer>   
       </>
    )
}

export default BackHome