import React from "react";

function Dday() {
    const remainingSalaryDay = Math.ceil((new Date('2023-09-18').getTime() - Date.now())/1000/60/60/24);
    // console.log(remainingSalaryDay)
    return (
        <>
            {remainingSalaryDay > 0 ? <p>당신의 월급날이 {remainingSalaryDay} 일 남았어요</p>
            : <p>축하드립니다 오늘 월급날 이에요!!@!#~</p>}
            
        </>
    )
}

export default Dday