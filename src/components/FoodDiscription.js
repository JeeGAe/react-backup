import React from 'react'
import "../styles/animation.css"
function FoodDiscription ({foodData, open}) {
    console.log(foodData)
    // 가게리스트의 상세정보보기 컴포넌트
    return (
        <>
        {foodData.length !== 0 &&
            <div className={`food-discription ${open}`}>
                <ul>
                    {/* 6개의 메뉴만 보이도록 하는 코드 */}
                    {foodData.MENU_KORN_NM.map( (data, index) => {
                        if(index <= 5) {
                            return (
                                <li>{data} / {foodData.MENU_AMT[index]}</li>
                            )
                        }
                    })}
                </ul>
            </div>
        }
        {foodData.length === 0 && <div className='foodErrorDiv'>데이터를 찾을 수 없습니다</div>}
        </>
    )
}

export default FoodDiscription