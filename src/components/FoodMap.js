import React, {useState, useEffect} from "react";
const { kakao } = window;

// 자바스크립트 카카오톡 맵 보여주기
function FoodMap({FoodList, mapState}) {
        useEffect( ()=> {
            const mapContainer = document.getElementById('map')
            const mapOptions = {
                center : new kakao.maps.LatLng(36.349184947679255, 127.37775416701282) ,
                level: 3 ,
            }
            const map = new kakao.maps.Map(mapContainer, mapOptions)
            if(mapState === false) {
                console.log(mapState)
                const position = [
                    {
                        title : '학원',
                        latlng : new kakao.maps.LatLng(36.349184947679255, 127.37775416701282) ,
                        content : <div class ="label"><span class="left"></span><span class="center">학원</span><span class="right"></span></div>,
                    },
                ]
                var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
                for( let i=0; i<position.length; i++) {
                    // 마커 이미지의 이미지 크기 입니다
                    var imageSize = new kakao.maps.Size(24, 35); 
                    
                    // 마커 이미지를 생성합니다    
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                    const marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: position[i].latlng, // 마커를 표시할 위치
                        title : position[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        content : position[i].content,
                        image : markerImage
                    })
                    marker.setMap(map)
                }
            } 
                console.log(mapState)
                const array = []
                if(FoodList.length !== 0 ) {
                    for(let i=0; i<FoodList.data.length; i++) {
                        const data = {
                            title : FoodList.data[i].REST_NM ,
                            latlng : new kakao.maps.LatLng(FoodList.data[i].LAT, FoodList.data[i].LOT),
                            content : `<div class ="label"><span class="left"></span><span class="center">${FoodList.data[i].REST_NM}</span><span class="right"></span></div>`,
                        }
                        array.push(data)
                    }
                    array.push({
                        title : '학원',
                        latlng : new kakao.maps.LatLng(36.349184947679255, 127.37775416701282) ,
                        content : <div class ="label"><span class="left"></span><span class="center">학원</span><span class="right"></span></div>,
                    })
                }
                console.log(array)
                const position = array
                for( let i=0; i<position.length; i++) {
                    const marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: position[i].latlng, // 마커를 표시할 위치
                        title : position[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        content : position[i].content
                    })
                    marker.setMap(map)
                }
        })
    const mapStyle = {
        width : "70%",
        height : "850px",
    }

    return (
        <div id="map" style={mapStyle}></div>
    )
}
export default FoodMap

FoodMap.defaultProps = {
    mapState : false,
}