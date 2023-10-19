import React, { useState, useEffect, useRef } from "react";
import { Header , Footer, FoodMenu, FoodSearch, FoodKeyword,
    FoodKakaoMap, FoodList, FoodSearchComponent} from "../components"
import '../styles/Food.css'
import axios from "axios";
const { kakao } = window

function Food({userInfo}){
    const [address, setAddress] = useState([])
    useEffect( () => {
        const geo = new kakao.maps.services.Geocoder();
        let startAddressIndex = userInfo.address.lastIndexOf('동')
        const address = userInfo.address.substr(0,startAddressIndex + 1)
        console.log(address)
        geo.addressSearch(address , function(result , status) {
            if(status === kakao.maps.services.Status.OK) {
                const LatLng = new kakao.maps.LatLng(result[0].y, result[0].x)
                setAddress([
                    {
                        REST_NM : '중심지',
                        LAT : LatLng.Ma,
                        LOT : LatLng.La,
                    }
                ])
            }
        })
    },[userInfo])
    // 전체 가게 리스트를 저장하기 위한 스테이트 값
    const [FoodListData, setFoodListData] = useState([])

    // 검색된 가게 리스트를 저장하기 위한 스테이트 값
    const [FoodSearchData, setFoodSearchData] = useState([])

    // 키워드에 따라 가게 리스트를 저장하기 위한 스테이트 값
    const [Foodkeyword, setFoodkeyword] = useState(null)

    // 맵 로딩을 위한 스테이트 값
    const [mapState, setMapState] = useState(false)

    // 키워드 선택에 따른 맵 로딩을 위한 스테이트 값
    const [loadState, setLoadState] = useState(false)

    // 메뉴 선택을 한 타이틀 값을 저장하기 위한 스테이트 값
    const [menuSelectTitle, setMenuSelectTitle] = useState(null)
    useEffect( ()=> { // 첫 로딩시 사용할 list 불러오기
        axios.post(`http://127.0.0.1:5300/food`, {
            address : userInfo.address
        })
        .then(res => {
            // console.log(res)
            setFoodListData(res.data.foodList)
        })
    },[])
    useEffect( (e) => { // 키보드 엔터를 누를시 검색되게 하는 코드
        document.addEventListener('keydown' , (event) => {
           if(event.keyCode === 13) {
                keywordSearch()
           }
        })
    },[FoodSearchData])

    const addActive = (e) => { // 메뉴를 누르면 해당하는 메뉴에 대한 데이터를 가져오기 위한 코드 및 css 입히기 위한 함수
        const activeLi = document.querySelectorAll('li')
        // 메뉴에 acitve 된 것에 대한 css를 초기화 하기 위한 코드
        activeLi.forEach((li) => {
            if(li.className === 'active') {
                li.classList.remove('active')
            }
        })
        const parentLI = e.target.parentNode
        if(e.target.tagName === 'SPAN' && e.target.className !== 'active') {
            parentLI.classList.add('active')
            const keywordContents = document.querySelectorAll('.food-keywordContents')
            keywordContents.forEach( (div) => {
                if(div.className === 'food-keywordContents active') {
                    div.classList.remove('active')
                }
            })
            const categoryKeyword = parentLI.children[1].innerText
            if(categoryKeyword === '카페') {
                const categoryKeywordupdate = '카페·디저트'
                axios.get(`http://127.0.0.1:5300/food/category/${categoryKeywordupdate}/${userInfo.address}`)
                .then(res => {
                    setFoodkeyword(categoryKeyword)
                    setFoodListData(res.data.categoryFoodList)
                    setLoadState(false)
                    setMapState(true)
                })
            } else {
                axios.get(`http://127.0.0.1:5300/food/category/${categoryKeyword}/${userInfo.address}`)
                .then(res => {
                    setFoodkeyword(categoryKeyword)
                    setFoodListData(res.data.categoryFoodList)
                    setLoadState(false)
                    setMapState(true)
                })
            }
        } else {
            parentLI.classList.remove('active')
        }
    }
    // 키워드에 따라 가게 데이터를 저장하기 위한 함수
    const keywordSearch = (e) => {
        const searchKeyword = document.querySelector('.keyword')
        if(searchKeyword.value !== null && searchKeyword.value !== '') {
            axios.get(`http://127.0.0.1:5300/food/search/${searchKeyword.value}/${userInfo.address}`)
            .then(res => {
                setFoodSearchData(res.data.searchFoodList)
                setLoadState(true)
                setMapState(false)
            })
            .catch(function(error) {
                if(error.response.data.code === 400) {
                    alert(error.response.data.message)
                }
            })
        } else {
            alert('다시 검색해 주세요!!')
        }
    }

    const hashTagSelect = (e) => { // 해쉬태그를 클릭시 해당하는 메뉴를 포함하는 식당 데이터를 찾아 저장하기 위한 함수
        const keyword = e.target.innerText
        console.log(keyword)
        axios.get(`http://127.0.0.1:5300/food/hashTag/type=${Foodkeyword}&tag=${keyword}/${userInfo.address}`)
        .then(res => {
            if(res.status === 200) {
                setFoodSearchData(res.data.hashTagFoodList)
                setLoadState(true)
                setMapState(false)
            } else if(res.status === 204) {
                setFoodSearchData(address)
                setLoadState(true)
                setMapState(false)
            }
        })
    }
    const customOverlayActive = (e, index) => { // 커스텀 오버레이 마커 선택을 위한 함수
        const markers = document.querySelectorAll('.title')
        const Active = e.target
        const activeTitle = e.target.innerText
        markers.forEach((marker) => {
            if(marker.className === 'title active') {
                marker.classList.remove('active')
            }
        })
        console.log(Active.className)
        if(Active.className !== 'title active') {
            Active.classList.add('active')
            setMenuSelectTitle(activeTitle)
        }
    }
    return(
       <>
        <Header></Header>
        <div className="food-container">
            <div className="food-contents">
                <h2>밥 먹자</h2>
                <div className="food-body">
                    <FoodMenu addActive={addActive}></FoodMenu>
                    <FoodKeyword keyword={Foodkeyword} hashTagSelect={hashTagSelect}></FoodKeyword>
                    <FoodSearch keywordSearch={keywordSearch}></FoodSearch>
                    {!loadState ? 
                    <FoodList FoodList={FoodListData} ></FoodList> :
                    <FoodSearchComponent FoodList={FoodSearchData} 
                    selectMenu={menuSelectTitle}></FoodSearchComponent>
                    }
                </div>
            </div>
            <FoodKakaoMap FoodList={FoodListData} searchFood={FoodSearchData} 
            mapState={mapState} loadState={loadState} selectMenu={customOverlayActive}
            address={address}></FoodKakaoMap>
        </div>
        <Footer userInfo={userInfo}></Footer>
       </>
    )
}

export default Food