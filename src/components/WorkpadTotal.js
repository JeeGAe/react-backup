import '../styles/WorkpadTotal.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import WorkpadTodoList from './WorkpadTodoList';
import { useState } from 'react';

function WorkpadTotal({ scheduleList, todoList, deadlineTodos }){
  // 보여질 투두 리스트 탭(초기값 중요 투두)
  const [totalShowingTodoList ,setTotalShowingTodoList] = useState('select-primary');

  const selectTotalTodoList = (e) => {
    if(e.target.tagName === 'BUTTON'){
      setTotalShowingTodoList(`${e.target.id}`)
    }
  }

  // const today_midnight_getTime = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).getTime();


  return (
    <div className='WorkpadTotal-container'>
      {/* 캘린더 */}
      <div className='WorkpadTotal-calendar-container'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={scheduleList}
        eventContent={renderEventContent}
        />
      </div>
      {/* Todo 리스트 */}
      <div className='WorkpadTotal-todo-container'>
        <div className='WorkpadTotal-todo-select' onClick={selectTotalTodoList}>
          {/* 투두가 없는 탭은 비활성화 처리 */}
          <button id="select-primary" 
          className={`primary ${(todoList?.filter(todo => todo.primary).length === 0 && 'noTodo')}`} 
          disabled={todoList?.filter(todo => todo.primary).length === 0 ? true : false}>중요</button>
          <button id="select-routine" 
          className={`routine ${(todoList?.filter(todo => todo.routine).length === 0 && 'noTodo')}`} 
          disabled={todoList?.filter(todo => todo.routine).length === 0 ? true : false}>루틴</button>
          <button id="select-deadline" 
          className={`deadline ${(deadlineTodos?.length === 0 && 'noTodo')}`} 
          disabled={deadlineTodos?.length === 0 ? true : false}>기한</button>
          <button id="select-noDone" className={`noDone ${(todoList?.filter(todo => !todo.isDone).length === 0 && 'noTodo')}`} disabled={todoList?.filter(todo => !todo.isDone).length === 0 ? true : false}>할일</button>
        </div>
        {totalShowingTodoList === 'select-primary' && 
          <WorkpadTodoList 
            todos={todoList.filter(todo => todo.primary)} 
            todoType='primary'>
              중요 TODO</WorkpadTodoList>}
          
        {totalShowingTodoList === 'select-routine' && 
          <WorkpadTodoList 
            todos={todoList.filter(todo => todo.routine)} 
            todoType='routine'>
              루틴 TODO</WorkpadTodoList>}
        
        {totalShowingTodoList === 'select-deadline' && 
          <WorkpadTodoList 
            todos={deadlineTodos} 
            todoType='deadline'>
              기한 TODO</WorkpadTodoList>}
        
        {totalShowingTodoList === 'select-noDone' && 
          <WorkpadTodoList 
            todos={todoList.filter(todo => !todo.isDone)} 
            todoType='noDone'>
              아직 해야 할 TODO</WorkpadTodoList>}
      </div>
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <div style={{textAlign:'center'}}>
      {/* <b>{eventInfo.timeText}</b> */}
      <i >{eventInfo.event.title}</i>
    </div>
  )
}

export default WorkpadTotal;