import '../styles/WorkpadSchedule.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect, useRef } from 'react';
import { json } from 'react-router-dom';



function WorkpadSchedule({ scheduleList, getScheduleToDB }) {
  // 등록할 시작날짜와 종료날짜 state
  // 초기값 변수
  const defaultDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1}-${new Date().getDate() < 10 ? '0' + (new Date().getDate()) : new Date().getDate()}`;

  const [selectedDate, setSelectedDate] = useState({
    start: defaultDate,
    end: defaultDate
  });

  // 시작날짜를 변경할지 종료날짜를 변경할지 여부
  const [dateSelectMode, setDateSelectMode] = useState(true);
  // 스케줄 등록 api 전송 함수
  const registerSchedule = (e) => {
    e.preventDefault();
    if (e.target.form[2].value.trim()) {
      fetch('http://127.0.0.1:5300/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials : 'include',
        body: JSON.stringify({
          start: new Date(e.target.form[0].value),
          end: new Date(e.target.form[1].value),
          title: e.target.form[2].value,
          description: e.target.form[3].value,
        })
      })
        .then(() => {
          // 초기화와 스케줄 다시 불러옴
          e.target.form[2].value = '';
          e.target.form[3].value = '';
          getScheduleToDB();
        })
    }
  }

  // 시작날짜, 종료날짜 설정
  const handleDateClick = (arg) => {
    // 달력 라이브러리에서 지원하는 파라미터
    const date = arg.dateStr;
    // dateSelectMode 가 true 인경우 시작날짜 변경 false는 종료날짜 변경
    if (dateSelectMode) {
      // 끝 날짜 보다 시작날짜가 늦지 않게 설정
      if (selectedDate.end >= date) {
        setSelectedDate({ ...selectedDate, start: date });
      }
    } else {
      // 시작 날짜 보다 끝날짜가 빠르지 않게 설정
      if (selectedDate.start <= date) {
        setSelectedDate({ ...selectedDate, end: date });
      }
    }
  }

  // 시작 날짜와 종료 날짜 선택 플래그
  const ChangeDateSelectMode = (e) => {
    if (e.target.id === 'selectDate-start') {
      setDateSelectMode(true);
    } else if (e.target.id === 'selectDate-end') {
      setDateSelectMode(false);
    }
  }

  const [detailEvent, setDetailEvent] = useState();
  // 스케줄 클릭시 이벤트
  const handleEventClick = (e) => {
    const eventId = e.event._def.extendedProps._id;
    // 클릭한 스케줄 조회
    fetch(`http://127.0.0.1:5300/api/schedule/${eventId}`, {
      method: 'GET',
      credentials : 'include',
    })
      .catch(e => console.log(e))
      .then(res => res.json())
      .then(res => setDetailEvent(res.schedule))
  }
  // 스케줄 삭제 함수
  const deleteEvent = () => {
    fetch(`http://127.0.0.1:5300/api/schedule/${detailEvent._id}`, {
      method: 'DELETE',
      credentials : 'include',
    })
      .then(() => {
        getScheduleToDB();
        setDetailEvent();
      })
  }
  // 스케줄 수정 
  const [modifyMode, setModifyMode] = useState(false);
  const [modifySchedule, setModifySchedule] = useState({
    title: '',
    description: ''
  })

  // 스케줄 수정 인풋 벨류 저장 함수
  const changeModifyInput = (e) => {
    switch (e.target.name) {
      case 'modify-title':
        setModifySchedule({ ...modifySchedule, title: e.target.value })
        break;
      case 'modify-description':
        setModifySchedule({ ...modifySchedule, description: e.target.value })
        break;
      default:
        return;
    }
  }
  // 수정 
  const modifyEvent = () => {
    if(modifyMode) {
      fetch(`http://127.0.0.1:5300/api/schedule/${detailEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials : 'include',
        body: JSON.stringify({
          title: modifySchedule.title,
          description: modifySchedule.description
        })
      })
        .catch(e => console.log(e))
        .then(res => res.json())
        .then((res) => {
          getScheduleToDB();
          setDetailEvent(res.schedule);
        })
    }
    setModifyMode(!modifyMode);
  }

  return (
    <>
      <div className='WorkpadSchedule-container'>
        {/* 달력 부분 */}
        <div className='WorkpadSchedule-calendar'>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={scheduleList}
            eventContent={renderEventContent}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
          // aspectRatio={2}
          />
        </div>
        {/* 스케줄 등록 부분 */}
        <div className="WorkpadSchedule-input-container">
          <form>
            <label htmlFor='selectDate-start'>시작날짜: </label><input name="selectDate-start" className={dateSelectMode? 'selectDate-foucs' : ''} id='selectDate-start' value={selectedDate.start} readOnly onClick={ChangeDateSelectMode} />
            <label htmlFor='selectDate-end'>종료날짜: </label><input name="selectDate-end" className={dateSelectMode? '': 'selectDate-foucs'} id='selectDate-end' value={selectedDate.end} readOnly onClick={ChangeDateSelectMode} />
            <label htmlFor='schedule-title'>title:</label><input name="schedule-title" id='schedule-title' />
            <label htmlFor='schedule-description'>description:</label><input type='text' name="schedule-description" id='schedule-description'/>
            <button onClick={registerSchedule}>스케줄 등록</button>
          </form>
        </div>
        {/* 스케줄 디테일 */}
        <div className='WorkpadSchedule-detail-container'>
          {detailEvent && (!modifyMode ?
            <>
              <h3>{detailEvent.title}</h3>
              <p>{detailEvent.description}</p>
              <div className='WorkpadSchedule-detail-button-container'>
              <button onClick={modifyEvent}>수정</button>
              <button onClick={deleteEvent}>삭제</button>
              </div>
              
            </>
            :
            <>
              <div className='WorkpadSchedule-modify-input-container'>
                <input type='text' defaultValue={detailEvent.title} name='modify-title' onChange={changeModifyInput} />
                <input type='text' defaultValue={detailEvent.description} name='modify-description' onChange={changeModifyInput}/>
              </div>
              <div className='WorkpadSchedule-detail-button-container'>
              <button onClick={modifyEvent} id={detailEvent._id}>수정</button>
              <button onClick={modifyEvent}>취소</button>
              </div>
            </>)}
        </div>
      </div>
    </>

  )
}

function renderEventContent(eventInfo) {
  return (
    <div style={{ textAlign: 'center' , cursor: 'pointer' }}>
      {/* <b>{eventInfo.timeText}</b> */}
      <i >{eventInfo.event.title}</i>
    </div>
  )
}


export default WorkpadSchedule;