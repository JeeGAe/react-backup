import '../styles/HelpMemo.css';

function HelpMemo({ memoToggle, handleMemoToggle }){
  return (
    <div className={`HelpMemo-container ${memoToggle? 'Memo-open' : 'Memo-hidden'}`}>
      <div className="HelpMemo-header">
        <h5>Help</h5>
        <div className='button-container'>
                <button onClick={handleMemoToggle}>X</button>
        </div>
      </div>
      <div className='HelpMemo-textarea'>
          <p>
            아이콘을 더블클릭 하거나 왼쪽 하단 시작 버튼을 클릭하여 컨텐츠를 이용해보세요.<br/><br/>
            오른쪽 하단 시계 버튼을 클릭하면 스케쥴에 관한 자세한 내용을 확인 할 수 있습니다.
          </p>
      </div>
    </div>
  )
}

export default HelpMemo;