import React, {useState, useRef, useEffect} from "react";
import axios from 'axios'
import FoodDiscription from "./FoodDiscription"
import '../styles/FoodList.css'
function FoodList ({FoodList}) {
    // 선택된 가게의 상태를 저장하기 위한 스테이트 값
    const [discriptionState , setDiscriptionState] = useState(null)

    // 선택된 가게의 정보를 저장하기 위한 스테이트 값
    const [discription, setDiscription] = useState([])

    // 상세정보보기의 css를 사용하기 위한 스테이트 값 
    const [open , setOpen] = useState('')

    const showDiscription = (e, list, index) => { // 클릭시 선택된 가게의 데이터를 셋팅하기 위한 함수
            setDiscription(list)
            setDiscriptionState(index)
            setOpen('open')
    }
    console.log(FoodList)
    // 가게 리스트를 보여주기 위한 코드
    return (
        <>
        <div className="foodlist-container">
            <div className="foodlist-container-box">
                <div className="foodlist-container-boxBody">
                    <div className="foodlist-container-boxTitle">
                        {FoodList.length !==0 && FoodList.map( (list, index) => {
                            return (
                                <div key={list.REST_ID} className='foodlist-contents' 
                                onClick={(e) => showDiscription(e, list, index)}>
                                    <div className="foodlist-title">
                                        <h3>{list.REST_NM}</h3>
                                        <span>{list.TOB_INFO}</span>
                                    </div>
                                    <div className="foodlist-body">
                                        <div className="foodlist-adress">
                                            <span className="material-symbols-outlined">
                                                location_on
                                            </span>
                                            <span>{list.ADDR}</span>
                                        </div>
                                        <div className="foodlist-time">
                                            <span className="material-symbols-outlined">
                                                Schedule
                                            </span>
                                            <span>{list.OPEN_HR_INFO}</span>
                                        </div>
                                        <div className="foodlist-call">
                                            <span className="material-symbols-outlined">
                                                deskphone
                                            </span>
                                            <span>{list.TELNO}</span>
                                        </div>
                                    </div>
                                    {/* 선택한 가게의 데이터 상세정보를 보여주기위한 코드 */}
                                    {discriptionState === index ? 
                                        <FoodDiscription 
                                            key={list.SD_ID}
                                            foodData={discription}
                                            state={discriptionState}
                                            num={index}
                                            open={open}>
                                        </FoodDiscription> 
                                        : null
                                    }
                                </div>
                                ) 
                            })
                        }
                        {FoodList.length ===0 && <div className="foodErrorDiv">데이터를 찾을 수 없습니다</div>}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default FoodList