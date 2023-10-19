import React from "react";

function LoungeInputEdit({chat, index, passwordMatched, modalPosition, HandleModalEdit, confirmEditText,  dbCode, handleComment,depth}){
    return (
        <>
            {/* 수정->비밀번호 입력->비밀번호가 일치 했을 때 */}
            {passwordMatched && !modalPosition && dbCode === chat._id && depth === '0' ? // 비밀번호가 일치하고, 모달이 닫혀있고, db코멘트 아이디와 채팅 아이디가 일치하고, depth=0(원글)일 때
            <>  
                <div className="editInputDiv" >
                    <input type="text" className="editText" defaultValue={chat.text} />
                </div>

                <div className="text__function__edit">
                    <span className="confirm" onClick={(e)=>confirmEditText(e, index)}>확인</span>
                </div>
                    <div className="text__function__cancle" ><span className="delete" onClick={(e)=>confirmEditText(e, index)}>취소</span></div>
            </>
        :  
        <>
            {/* 비밀번호가 일치하지 않을 때 */}
            <p>{chat.text}</p>
            <div className="text__function__edit">
                <span className="edit" onClick={(e, index)=>HandleModalEdit(e, index)} >수정</span>
            </div>
            <div className="text__function__delete"><span className="delete" onClick={(e, index)=>HandleModalEdit(e ,index)} >삭제</span></div>
            <div className="text__function__comment"><span className="comment" onClick={(e, index)=>handleComment(e ,index)}>댓글</span></div>
        </>
        }

    </>
    )
}

export default  LoungeInputEdit