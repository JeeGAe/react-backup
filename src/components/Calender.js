import React, { useState, useEffect } from "react";

function Calendar() {
    const [selectDate, setSelectDate] = useState({ 
        year : new Date().getFullYear(), 
        month : new Date().getMonth()
    })

    const makeCalendar = (year, month) => {
        const firstDay = new Date(year,month,1).getDay(); // 1일의 요일을 저장(일요일은 0 ~ 토요일은 6 입니다.)
        // console.log(firstDay)
        const dateArray = []; // 달력의 일 을 담을 배열 생성
        let nextMonth = 0; // 배열에 일 을 푸쉬 할때 다음달 인지 확인 해주는 변수 (Date의 getDate 메소드는 달에 마지막 날을 넘어가면 다시 1이 됩니다 31일 까지인 달에 Date()에 32일을 넣으면 getDate 메소드는 1을 리턴 해줍니다.)
        let day = 1; // 배열에 담을 변수 입니다 1일의 1로 초기화 해줍니다.
        for(let i = 0; i < firstDay; i++){ // 일요일을 달에 첫날로 기준 삼아 1일의 요일까지는 -1로 배열을 채워줍니다. 나중에 달력에 빈 칸을 만들어주기 위함입니다.
            dateArray.push(-1)
        }
        while(nextMonth < 2){ // nextMonth는 getDate()값이 1일 때 증가하는데 1일에 한번 증가하고 이번 달 마지막날이 지나면 다시 getDate() 리턴 값이 1일 때 한번더 1증가하여 2가 되면 반목문이 끝납니다. 
            
            if(new Date(year,month,day).getDate() === 1) nextMonth++; // getDate() 리턴 값이 1일 때 nextMonth 값 증가 (1일과 달의 마지막 날이 지난 후 2번 증가)
            // console.log(day)
            // console.log(new Date(2023,8,day).getDate())
            // console.log(nextMonth)
            if(nextMonth < 2) dateArray.push(day); // 이번달이 라는게 맞을때 day값을 푸쉬해줍니다.
            day++; // day값을 1 증가시켜 다음 반복때 다음 날을 푸쉬해줍니다.
        }
        // console.log(dateArray)
        const weekCount = dateArray.length%7 !== 0 ? Math.floor(dateArray.length / 7) + 1 : dateArray.length / 7; // 해당 달이 주가 몇주까지 있는지 계산 후 변수에 넣습니다.
        const weekCountArray = new Array(weekCount).fill(1).map((a, i) => i); // map을 사용하기 위해 주의 수 만큼 배열을 넣어줍니다.

        return (
            <table>
                <thead>
                    <tr>
                        <th>S</th>
                        <th>M</th>
                        <th>T</th>
                        <th>W</th>
                        <th>T</th>
                        <th>F</th>
                        <th>S</th>
                    </tr>
                </thead>
                <tbody>
                    {weekCountArray.map((week, id) => {
                        const innerDate = [];
                        for(let i = 0; i < 7; i++){ // 1주일 씩 잘라서 새로운 배열에 담아줍니다.
                            innerDate.push(dateArray[i+(7*id)])
                        }
                        return (
                            <tr key={id}>{innerDate.map((d, index) => {
                                return (
                                    <td key={index}>{d === -1? '' : d}</td> // 1주일 씩 자른 배열을 td 태그에 하나씩 일 수를 채워 넣어줍니다.
                                )
                            })}</tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    useEffect(() => {
        // 오늘 날짜에 하이라이트 효과 적용
        if(selectDate.year === new Date().getFullYear() && selectDate.month === new Date().getMonth()){
            const td = document.querySelectorAll('.Calendar-container tbody tr td');

            td.forEach(td => {
                if(td.innerText == new Date().getDate()){
                    td.style.backgroundColor = 'blue';
                    td.style.color = '#fff';
                    td.style.fontWeight = 'bold';
                }
            })
        }else{
            // 다른 달로 넘어 갈때 효과 초기화
            const td = document.querySelectorAll('.Calendar-container tbody tr td');

            td.forEach(td => {
                    td.style.backgroundColor = '';
                    td.style.color = '';
                    td.style.fontWeight = '';
            })
        }
    },[selectDate])

    const decreaseMonth = () => {
        const year = selectDate.month <= 0 ? selectDate.year - 1 : selectDate.year;
        const month = selectDate.month <= 0 ? 11 : selectDate.month - 1;
        setSelectDate({ year, month })
    }

    const increaseMonth = () => {
        const year = selectDate.month >= 11 ? selectDate.year + 1 : selectDate.year;
        const month = selectDate.month >= 11 ? 0 : selectDate.month + 1;
        setSelectDate({ year, month })
    }

    return (
        <div className="Calendar-container">
            <div className="Calendar-select-container">
                <button onClick={decreaseMonth}className='Calendar-btn'>◀</button>
                <span>{`${selectDate.year}년 ${selectDate.month+1}월`}</span>
                <button onClick={increaseMonth} className='Calendar-btn'>▶</button>
            </div>
            {makeCalendar(selectDate.year, selectDate.month)}
        </div>
    )
}

export default Calendar