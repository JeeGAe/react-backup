import React, { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"
const { kakao } = window

function MapAddressSearch() {
    const [address, setAddress] = useState([])
    useEffect( () => {
        const geo = new kakao.maps.services.Geocoder();
        geo.addressSearch('대전광역시 서구 둔산로 100' , function(result , status) {
            if(status === kakao.maps.services.Status.OK) {
                const LatLng = new kakao.maps.LatLng(result[0].y, result[0].x)
                setAddress([
                    {
                        REST_NM : '현재 위치',
                        LAT : LatLng.Ma,
                        LOT : LatLng.La,
                    }
                ])
            }
        })
    },[])

    return address
}
export default MapAddressSearch