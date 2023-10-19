import { useState } from 'react';
import '../styles/WorkpadTodo.css';
import WorkpadTodoSetting from './WorkpadTodoSetting';
import WorkpadTodoList from './WorkpadTodoList';

function WorkpadTodo({ todoList, doneTodos, getTodoToDB, deadlineTodos }){
  // 등록 할 투두
  const [newTodo, setNewTodo] = useState({
    title : '',
  })

  // 인풋 체크 박스에 하나만 체크되게 하고 체크된 내용을 state값에 저장
  const handleCheck = (e) => {
    const name = e.target.name;
    const { title } = newTodo;
    setNewTodo({ title, [name] : name? !newTodo[name] : true }); // 삼항으로 안하면 체크 한번더 누르면 체크 해제가 안됨
  }

  // 기한 투두 날짜 설정
  const selectDeadline = (e) => {
    setNewTodo({ ...newTodo, deadline : newTodo?.isDeadline ? e.target.value : null });
  }

  // 오늘의 자정 시간을 저장(기한 todo에서 시간을 제외하기 위함)
  const today_midnight_getTime = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).getTime();

  const registerTodo = (e) => {
    e.preventDefault();
    if(e.target.form[0].value.trim()){
      fetch('http://127.0.0.1:5300/api/todo',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        credentials : 'include',
        body : JSON.stringify({
          title : e.target.form[0].value,
          // 오늘 부터 설정한 기한 날짜 후의 ms 값을 전송
          deadline : newTodo.deadline ? today_midnight_getTime + (86400000 * newTodo.deadline) : null,
          primary : newTodo.primary,
          routine : newTodo.routine
        })
      })
      .catch(e => console.log(e))
      .then(() => {
        getTodoToDB();
        e.target.form[0].value = '';
      })
    }
  }

  // 투두 설정 관련 state
  const [todoSettingMode, setTodoSettingMode] = useState({ 
    mode : false, 
    loc : { x : 0, y : 0 }, 
    _id : null, 
    modify : false });

   // todo 클릭시 설정
  const handleClickTodoCard = (e) => {
    if(e.target.parentNode.className.includes('WorkpadTodo-list-card')){
      // 해당 todo의 db 아이디 값과 위치 정보를 저장
      const _id = e.target.parentNode.id;
      const { x, y } = e.target.parentNode.getBoundingClientRect();
      if(_id !== todoSettingMode._id){
        setTodoSettingMode({...todoSettingMode, mode : true , loc : { x , y }, _id })
      }
    }
  }
  
  // 수정 할 투두 title 값 저장 state
  const [modifyTodoTitle, setModifyTodoTitle] = useState('');
  const changeModifyTodo = (e) => {
    setModifyTodoTitle(e.target.value);
  }

  // 보여줄 투두 리스트 변경(초기값 '중요' 탭)
  const [showingTodoList, setShowingTodoList] = useState('select-primary');

  const selectShowingTodoList = (e) => {
    switch(e.target.id){
      case 'select-primary':
        setShowingTodoList('select-primary');
        break;
      case 'select-routine':
        setShowingTodoList('select-routine');
        break;
      case 'select-deadline':
        setShowingTodoList('select-deadline');
        break;
      case 'select-done':
        setShowingTodoList('select-done');
        break;
      case 'select-noDone':
        setShowingTodoList('select-noDone');
        break;
      default:
        return;
    }
    setTodoSettingMode({ mode : false });
  }

  return (
    <div className="WorkpadTodo-container">
      {/* Todo 등록 부분 */}
      <div className="WorkpadTodo-register-container">
        <form>
          <input type='text' placeholder="잊지말고 해야 할 일을 적어보세요!" maxLength='50'/>
          <div className='WorkpadTodo-register-option-container'>
            <label htmlFor="todo-primary">중요</label><input type='checkbox' name="primary" className="checkbox" id='todo-primary' checked={newTodo.primary? true : false} onChange={handleCheck}/>
          </div>
          <div className='WorkpadTodo-register-option-container'>
            <label htmlFor="todo-routine">매일 루틴</label><input type='checkbox' name="routine" className="checkbox" id='todo-routine' checked={newTodo.routine? true : false} onChange={handleCheck}/>
          </div>
          <div className='WorkpadTodo-register-option-container'>
            <label htmlFor="todo-deadline">기한(최대7일)
            {newTodo.isDeadline && <select onChange={selectDeadline}>
            <option value={1}>1일</option>
            <option value={2}>2일</option>
            <option value={3}>3일</option>
            <option value={4}>4일</option>
            <option value={5}>5일</option>
            <option value={6}>6일</option>
            <option value={7}>7일</option>
            </select>}
            </label><input type='checkbox' name="isDeadline" className="checkbox" id='todo-deadline' checked={newTodo.isDeadline? true : false} onChange={handleCheck}/>
          </div>
          <div className='WorkpadTodo-register-button-container'>
            <button type='submit' onClick={registerTodo}>할 일 등록</button>
          </div>
        </form>
      </div>
      {/* Todo 리스트 */}
      <div className='WorkpadTodo-todolist-wrap'>
        <h2>Todo 리스트 선택</h2>
        <div className='WorkpadTodo-select-list' onClick={selectShowingTodoList}>
          <div className='primary' id='select-primary'>중요 TODO{` (${todoList.filter(todo => todo.primary).length})`}</div>
          <div className='routine' id='select-routine'>루틴 TODO{` (${todoList.filter(todo => todo.routine).length})`}</div>
          <div className='' id='select-deadline'>기한 TODO{` (${deadlineTodos.length})`}</div>
          <div className='noDone' id='select-noDone'>해야 할 TODO{` (${todoList.filter(todo => !todo.isDone).length})`}</div>
          <div className='done' id='select-done'>완료된 TODO{` (${doneTodos.length})`}</div>
        </div>
        <div className="WorkpadTodo-list-container" onClick={handleClickTodoCard}>
          {showingTodoList === 'select-primary' && 
          <WorkpadTodoList 
            todos={todoList.filter(todo => todo.primary)} 
            todoType='primary' 
            todoSettingMode={todoSettingMode} 
            changeModifyTodo={changeModifyTodo}
            setModifyTodoTitle={setModifyTodoTitle}
            setTodoSettingMode={setTodoSettingMode}
            modifyTodoTitle={modifyTodoTitle}
            showingTodoList={showingTodoList} 
            getTodoToDB={getTodoToDB} >
              중요 TODO</WorkpadTodoList>}
          
          {showingTodoList === 'select-routine' && 
          <WorkpadTodoList 
            todos={todoList.filter(todo => todo.routine)} 
            todoType='routine' 
            todoSettingMode={todoSettingMode} 
            changeModifyTodo={changeModifyTodo}
            setModifyTodoTitle={setModifyTodoTitle}
            setTodoSettingMode={setTodoSettingMode}
            modifyTodoTitle={modifyTodoTitle}
            showingTodoList={showingTodoList} 
            getTodoToDB={getTodoToDB} >
              루틴 TODO</WorkpadTodoList>}
          
          {showingTodoList === 'select-deadline' && 
          <WorkpadTodoList 
            todos={deadlineTodos} 
            todoType='deadline' 
            todoSettingMode={todoSettingMode} 
            changeModifyTodo={changeModifyTodo}
            setModifyTodoTitle={setModifyTodoTitle}
            setTodoSettingMode={setTodoSettingMode}
            modifyTodoTitle={modifyTodoTitle}
            showingTodoList={showingTodoList} 
            getTodoToDB={getTodoToDB} >
              기한 TODO</WorkpadTodoList>}
          
          {showingTodoList === 'select-noDone' && 
          <WorkpadTodoList 
            todos={todoList.filter(todo => !todo.isDone)} 
            todoType='noDone' 
            todoSettingMode={todoSettingMode} 
            changeModifyTodo={changeModifyTodo}
            setModifyTodoTitle={setModifyTodoTitle}
            setTodoSettingMode={setTodoSettingMode}
            modifyTodoTitle={modifyTodoTitle}
            showingTodoList={showingTodoList} 
            getTodoToDB={getTodoToDB} >
              아직 해야 할 TODO</WorkpadTodoList>}
          
          {showingTodoList === 'select-done' && 
          <WorkpadTodoList 
            todos={doneTodos} 
            todoType='done' 
            todoSettingMode={todoSettingMode} 
            changeModifyTodo={changeModifyTodo}
            setModifyTodoTitle={setModifyTodoTitle}
            setTodoSettingMode={setTodoSettingMode}
            modifyTodoTitle={modifyTodoTitle}
            showingTodoList={showingTodoList} 
            getTodoToDB={getTodoToDB} >
              완료된 TODO</WorkpadTodoList>}
        </div>
      </div>
      
    </div>
  )
}

export default WorkpadTodo;