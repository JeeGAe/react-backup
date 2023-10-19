import React, { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"
import "../styles/CustomOverlayStyle.css"
const { kakao } = window // 자바스크립트 형태로 카카오 라이브러리 사용할 때 필요한 코드
function FoodKakaoMap({FoodList, mapState, searchFood, 
    loadState, selectMenu, selectRef, address}) {
    // 첫 페이지 로딩시 보여주는 초기데이터 및 위치정보가 들어있는 스테이트 값
    const [positions, setPositions] = useState([
        {   
            REST_NM : '대전 시청',
            LAT : 36.3503849976553,
            LOT : 127.384633005948
        }
    ])
    // 검색된 결과를 저장해놓는 스테이트 값
    const [searchPositions, setSearchPositions] = useState([])

    // 검색된 결과의 상태를 저장하는 스테이트 값
    const [check , setCheck] = useState(false)
    useEffect(()=> { // 검색된 결과에 따라 맵을 셋팅하기 위한 코드
        if(loadState === true) {
            setSearchPositions([searchFood])
            setCheck(true)
        }
    },[searchFood])
    useEffect(()=>  { // 가게 리스트를 저장하기 위한 코드
        if(mapState === true){
            const array = []
            if(FoodList.length !== 0 ) {
                for(let i=0; i<FoodList.length; i++) {
                    const data = {
                        REST_NM : FoodList[i].REST_NM ,
                        LAT : FoodList[i].LAT,
                        LOT : FoodList[i].LOT,
                        content : `<div className="customoverlay" key=${i}><a><span className="title">${FoodList[i].REST_NM}</span></a></div>`
                    }
                    array.push(data)
                }
            } else {
                array.push(address[0])
            }
            setPositions(array)
        }
    },[FoodList])
    // 오버레이 마커를 사용하기 위한 코드
    if(mapState === false) {
        return (
            <Map
                key={1}
                center={{
                    lat : positions[0].LAT ,
                    lng : positions[0].LOT
                }}
                style={{
                    width : "70%",
                    height : "990px",
                }}
                level={4}
            >   
                {check === false ? positions.map((position, index) => {  {/* 초기로딩시 보여줄 지도 및 마커 */}
                    return (
                        <>
                            <MapMarker
                                key={`foodList-${index}-${position.LAT},${position.LOT}`}
                                position={{
                                    lat : position.LAT ,
                                    lng : position.LOT
                                }}
                                image={{
                                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                                    size: {
                                        width: 24,
                                        height: 35
                                        },
                                    }}
                                title={position.REST_NM}
                            />
                            <CustomOverlayMap
                                key={`${position.LAT},${position.LOT}`}
                                position={{
                                    lat : position.LAT ,
                                    lng : position.LOT
                                }}>
                                <div className="customoverlay">
                                    <a>
                                        <span className="title">{position.REST_NM}</span>
                                    </a>
                                </div>
                            </CustomOverlayMap>
                        </>
                    )
                }) : 
                searchPositions[0].map( (searchPosition, index) => { // 검색된 결과를 보여주기위한 맵 및 마커
                    return(
                        <>
                            <MapMarker
                                key={`foodList-${index}-${searchPosition.LAT},${searchPosition.LOT}`}
                                position={{
                                    lat : searchPosition.LAT ,
                                    lng : searchPosition.LOT
                                }}
                                image={{
                                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                                    size: {
                                        width: 24,
                                        height: 35
                                        },
                                    }}
                                title={searchPosition.REST_NM}
                            />
                            <CustomOverlayMap
                                key={`${searchPosition.LAT},${searchPosition.LOT}`}
                                position={{
                                    lat : searchPosition.LAT ,
                                    lng : searchPosition.LOT
                                }}>
                                <div className="customoverlay" ref={selectRef} onClick={selectMenu} key={index}>
                                    <a>
                                        <span className="title">{searchPosition.REST_NM}</span>
                                    </a>
                                </div>
                            </CustomOverlayMap>
                        </>
                    )
                })
            }

            </Map>
        )
    } 
    else if(mapState === true){ // 메뉴 선택에 따른 리스트를 보여주기 위한 맵 및 마커
        return (
            <Map
                center={{
                    lat: address[0].LAT, 
                    lng: address[0].LOT
                }}
                style={{
                    width : "70%",
                    height : "990px",
                }}
                level={4}
                >
                {positions.map((data, index) => (
                    <MapMarker
                        key={`foodList-${index}-${data.LAT},${data.LOT}`}
                        position={{
                            lat : data.LAT,
                            lng : data.LOT,
                        }}
                        title={data.REST_NM}
                    >
                    </MapMarker>
                ))}
            </Map>
        )
    }
}

export default FoodKakaoMap

FoodKakaoMap.defaultProps = {

    mapState : false,
}