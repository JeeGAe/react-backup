import React, {useEffect, useState} from 'react'
import FoodKeywordData from '../FoodKeywordData'
import '../styles/FoodKeyword.css'
function FoodKeyword({keyword, hashTagSelect}) {

    // 선택된 메뉴 키워드를 저장하기 위한 스테이트 값
    const [keywordData, setKeywordData] = useState([])

    useEffect(() => { // 선택된 메뉴 키워드를 기준으로 임의의 추천해주는 해쉬태크를 보여주기 위한 코드
        FoodKeywordData.filter((data) => {
            if(data.title === keyword) {
                setKeywordData(data.keyword)
            }
        })
    },[keyword])

    const keywordActive = (e) => {
        const keywordContents = document.querySelectorAll('.food-keywordContents')
        keywordContents.forEach( (div) => {
            if(div.className === 'food-keywordContents active') {
                div.classList.remove('active')
            }
        })
        if(e.target.tagName === 'SPAN' && e.target.className !== 'active') {
            e.target.parentNode.classList.add('active')
        } else {
            e.target.parentNode.classList.remove('active')
        }
    } 
    
    return (
        <>
            <div className='food-keywordContainer' onClick={keywordActive}>
                {keywordData.map( (keyword, index) => {
                    return (
                        <div className='food-keywordContents' key={index} onClick={hashTagSelect}>
                            <span>{keyword}</span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default FoodKeyword