import React, {useEffect , useState, useRef} from "react";
import FoodDiscription from "./FoodDiscription"
function FoodSearchComponent({FoodList, selectMenu}) {
    console.log(FoodList)
    const [discriptionState , setDiscriptionState] = useState(null)
    const [discription, setDiscription] = useState([])

    useEffect( () => { // 선택된 마커에 해당하는 데이터에 리스트에 css를 입히는 코드
        const foodListContents = document.querySelectorAll('.foodlist-contents')
        foodListContents.forEach( (content) => {
            if(content.className === 'foodlist-contents active') {
                content.classList.remove('active')
            }
        })
        const foodListTitleH3 = document.querySelectorAll('.foodlist-title > h3')
        foodListTitleH3.forEach( (contents, index) => {
            if(contents.innerText === selectMenu) {
                contents.parentNode.parentNode.classList.add('active')
            }
        })
    },[selectMenu])

    const showDiscription = (e, list, index) => {  // 선택된 리스트에 상세정보가 나오는 코드
        console.log(e.target)
        setDiscription(list)
        setDiscriptionState(index)
        e.preventDefault()
    }
    return (
        <>
            <div className="foodlist-container">
                <div className="foodlist-container-box">
                    <div className="foodlist-container-boxBody">
                        <div className="foodlist-container-boxTitle">
                            {FoodList.length !==0 && FoodList[0].REST_NM !== '중심지' && FoodList.map((list, index) => {
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
                                        </div>
                                        {discriptionState === index ? 
                                            <FoodDiscription 
                                                key={list.SD_ID}
                                                foodData={discription}
                                                state={discriptionState}
                                                num={index}>
                                            </FoodDiscription> 
                                            : null
                                        }
                                    </div>
                                )
                            })}
                            {FoodList[0].REST_NM === '중심지' && <div className='foodErrorDiv'>데이터를 찾을 수 없습니다</div>}
                        </div>
                    </div>    
                </div>
            </div>
        </>
    )
}
export default FoodSearchComponent