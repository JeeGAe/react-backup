import { useEffect } from "react";

function WorkpadTodoSetting({ todoSettingMode, showingTodoList, getTodoToDB, setTodoSettingMode, modifyTodoTitle, setModifyTodoTitle, modifyInput }){
  const { loc , _id } = todoSettingMode;
  // 투두 클릭 시 나오는 설정 탭 기능 함수
  const handleTodoSetting = (e) => {
    if(e.target.tagName === 'BUTTON'){
      switch(e.target.textContent){
        case '일끝':
          fetch(`http://127.0.0.1:5300/api/todo/done/${_id}`,{
            method : 'PUT',
            credentials : 'include',
          })
          .catch(e => console.log(e))
          .then(() => {
            getTodoToDB();
            setTodoSettingMode({ mode : false });
          });
          break;
        case '다시':
          fetch(`http://127.0.0.1:5300/api/todo/done/${_id}`,{
            method : 'PUT',
            credentials : 'include',
          })
          .catch(e => console.log(e))
          .then(() => {
            getTodoToDB();
            setTodoSettingMode({ mode : false });
          });
          break;
        case '수정':
            setTodoSettingMode({ ...todoSettingMode, modify : true });
          break;
        case '적용':
            if(modifyTodoTitle){
              fetch(`http://127.0.0.1:5300/api/todo/${_id}`,{
              method : 'PUT',
              headers : {
                'Content-Type' : 'application/json'
              },
              credentials : 'include',
              body : JSON.stringify({
                title : modifyTodoTitle
              })
            })
            .catch(e => console.log(e))
            .then(() =>{
              getTodoToDB();
              setTodoSettingMode({ ...todoSettingMode, modify : false });
            })
            }
          break;
        case '삭제':
          fetch(`http://127.0.0.1:5300/api/todo/${_id}`,{
            method : 'DELETE',
            credentials : 'include',
          })
          .catch(e => console.log(e))
          .then(() => {
            getTodoToDB();
            setTodoSettingMode({ mode : false });
          });
          break;
        default:
          return;
      }
    }
  }

  const style = {
    top : loc.y,
    left : loc.x
  }
  return (
    <span className='WorkpadTodo-todo-card-set'  onClick={handleTodoSetting}>
      {/* todo 카드 세팅 탭 */}
      <button>{showingTodoList !== 'select-done'? '일끝' : '다시'}</button>
      <button>{!todoSettingMode.modify? '수정' : '적용'}</button>
      <button>삭제</button>
    </span>
  )
}

export default WorkpadTodoSetting;