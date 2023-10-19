import React from "react"
import { SnsTimeFormat } from "../components"
import "../styles/LoungeCommentOutput.css"

function LoungeCommentOutput({ comment, commentCode, dbCode, HandleModalEdit, modalPosition, passwordMatched, confirmEditText, depth }) {
    return (
        <>
            {comment?.map((chat) => {
     
                {
                    return chat.parent === dbCode  ? 
                        <div className="comment__output" key={chat._id}>
                            <div className="nickname">
                                <span><img src='images/loungeuser.png' alt='userProfile' />{chat.nickname} </span> <SnsTimeFormat chatTime={chat.date} /> <span className='paragraph-id'>{chat._id}</span><span className="depth">1</span>
                            </div>
                            <div className="text__output">
                                {passwordMatched && !modalPosition && chat._id === commentCode && depth ==='1' ?
                                    <>
                                        <div className="editInputDiv" >
                                            <input type="text" className="editText" defaultValue={chat.text} />
                                        </div>

                                        <div className="text__function__edit">
                                            <span className="confirm" onClick={(e, index) => confirmEditText(e, index)}>확인</span>
                                        </div>
                                        <div className="text__function__cancle" ><span className="delete" onClick={(e, index) => confirmEditText(e, index)}>취소</span></div>
                                    </>
                                    :
                                    <>
                                        <p>{chat.text}</p>
                                        <div className="text__function__edit"><span className="edit" onClick={HandleModalEdit} >수정</span></div>
                                        <div className="text__function__delete"><span className="delete" onClick={HandleModalEdit} >삭제</span></div>
                                    </>
                                }
                            </div>
                        </div>
                        : null
                }

            })}
        </>



    )
}

export default LoungeCommentOutput