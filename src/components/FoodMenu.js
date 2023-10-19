import React, {useState} from "react";
import FoodMenuData from "../FoodMenuData";
import '../styles/FoodMenu.css'

// 메뉴 보여주기 위한 컴포넌트
function FoodMenu({addActive}) {
    const menuActive = (e) => {
        const activeSpan = document.querySelectorAll('li > span')
        const parentLI = e.target.parentNode
        console.log(parentLI)
        if(e.target.tagName === 'SPAN' && parentLI.className === '') {
            parentLI.classList.add('active')
        } else {
            parentLI.classList.remove('active')
        }
        // activeSpan.forEach( (span) => {
        //     console.log(span.parentNode)
        // })
    }
    return (
        <>
            <div className="foodMenu-taplist">
                <ul>
                    {FoodMenuData.map ( (data, index) => {
                        return (
                            <div key={index}>
                                <li>
                                    <span className="material-symbols-outlined" onClick={addActive}>
                                        {data.iconTitle}
                                    </span>
                                    <span onClick={addActive}>
                                        {data.title}
                                    </span>
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
export default FoodMenu