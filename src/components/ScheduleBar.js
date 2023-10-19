import React, { useEffect, useState } from "react";
import { Time, Calender, Dday, Todo } from "../components"
// import Time from "./Time";
// import Calender from "./Calender";
// import Dday from "./Dday";
// import Todo from "./Todo";
import '../styles/ScheduleBar.css'

function ScheduleBar() {
    const [toggleOpenDetail, setToggleOpenDetail] = useState(false);

    // useEffect(() => {
    //     if(toggleOpenDetail)
    //     window.addEventListener('click',(e) => {
    //         console.log(e.target)
    //         setToggleOpenDetail(false);
    //     })
    // },[toggleOpenDetail])

    const handleTimeClick = (e) => {
        e.stopPropagation();
        setToggleOpenDetail(!toggleOpenDetail);
    }
    return (
        <>
            <Time handleTimeClick={handleTimeClick}></Time>
            {toggleOpenDetail ? 
            <div className="ScheduleBar-detail-container">
                <Dday></Dday>
                <Todo></Todo>
                <Calender></Calender>
            </div>
            :<></>}
        </>
    )
}

export default ScheduleBar