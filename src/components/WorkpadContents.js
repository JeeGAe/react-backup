import React, { useState, useEffect } from "react";
import { WorkpadTotal, WorkpadSchedule, WorkpadTodo } from './'

function WorkpadContents({ workpadTabState }){
  // 달력에 표시될 스케줄 리스트 state
  const [scheduleList, setScheduleList] = useState([]);
  
  const getScheduleToDB = () => {
    fetch('http://127.0.0.1:5300/api/schedule', {
      method: 'GET',
      credentials : 'include',
    })
      .catch(e => console.log(e))
      .then(res => res.json())
      .then(res => {
        if(res.code === 200)
        setScheduleList(res.scheduleList)
      })
  }
  // 전체 투두 리스트 조회
  const [todoList, setTodoList] = useState({ todos : [], doneTodos : [] });

  const getTodoToDB = () => {
    fetch('http://127.0.0.1:5300/api/todo', {
      method : 'GET',
      credentials : 'include',
    })
    .catch(e => console.log(e))
    .then(res => res.json())
    .then(res => {
      if(res.code === 200)
      console.log(res.todos,res.doneTodos)
      setTodoList({ todos : res.todos, doneTodos : res.doneTodos })
    })
  }

  useEffect(() => {
    getScheduleToDB();
    getTodoToDB();
  }, []);

  // 오늘의 자정 Date 오브젝트
  const today_midnight_getTime = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).getTime();
  // 기한 투두 정렬
  const deadlineTodos = todoList.todos?.filter(todo => todo.deadline).map(todo => {
    // 설정 한 기간과 오늘 날짜를 빼고 하루의 ms로 나누어 남은 기간이 며칠 인지 계산
    const restTime = Math.floor((new Date(todo.deadline).getTime() - today_midnight_getTime) / 86400000);
    // 기간이 지난 todo는 맨 밑 정렬(기간이 지난건 음수 이므로 -10을 곱해서 최대 설정 기한이 7보다 크게함)
    return { ...todo, rest : restTime < 0 ? restTime*(-10) : restTime };
  }).sort((a, b) => a.rest - b.rest);

  // 상위 컴포넌트에서 누른 탭 메뉴 별(prop)로 렌더링
  switch(workpadTabState){
    case 'total':
      return (
        <WorkpadTotal scheduleList={scheduleList} todoList={todoList.todos} deadlineTodos={deadlineTodos}></WorkpadTotal>
      )
    case 'schedule':
      return (
        <WorkpadSchedule scheduleList={scheduleList} getScheduleToDB={getScheduleToDB}></WorkpadSchedule>
      )
    case 'todo':
      return (
        <WorkpadTodo todoList={todoList.todos} doneTodos={todoList.doneTodos} getTodoToDB={getTodoToDB} deadlineTodos={deadlineTodos}></WorkpadTodo>
      )
    default:
      return
  }
}

export default WorkpadContents;