import React, { useState, useEffect } from "react";
import {
    Header, 
    Footer,
    LoungeInputEdit,
    LoungeModal, 
    LoungeRegisterInput, 
    LoungePagenation, 
    SnsTimeFormat, 
    LoungeCommentRegister, 
} from "../components"
import "../styles/Lounge.css"

function Lounge({ userInfo }) {

    const [chat, setChat] = useState([]) // db에서 가져온 데이터를 저장합니다
    const [comment, setComment] = useState([]) // db에서 가져온 댓글 데이터를 저장합니다
    const [modalPosition, setModalPosition] = useState(null) // 모달창의 위치를 저장합니다
    const [clickData, setClickData] = useState(null) // 수정, 삭제, 댓글 버튼을 클릭했을때 그 버튼의 정보를 저장합니다
    const [passwordText, setPasswordText] = useState(null) // 비밀번호를 저장합니다
    const [passwordMatched, setPasswordMatched] = useState(false) // 비밀번호가 일치하는지 확인합니다
    const [updateInputValue, setUpdateInputValue] = useState('') // 수정할때 입력창에 기존 글을 보여줍니다
    const [dbCode, setDbCode] = useState('') // db에 저장된 데이터의 고유 코드를 저장합니다
    const [commentCode, setCommentCode] = useState('') // db에 저장된 댓글 데이터의 고유 코드를 저장합니다

    const [modalStyle, setModalStyle] = useState(false) // 비밀번호가 일치하지 않을때 모달창의 스타일을 변경합니다
    const [toggleComment, setToggleComment] = useState(false) // 댓글을 보여줍니다
    const [depth, setDepth] = useState('') // 댓글의 깊이를 저장합니다

    const [page, setPage] = useState(1) // 페이지네이션을 위한 페이지 번호를 저장합니다
    const limit = 8 // 페이지네이션을 위한 페이지당 데이터 개수를 저장합니다    
    const totalPosts = chat.length // 페이지네이션을 위한 전체 데이터 개수를 저장합니다
    const offset = (page - 1) * limit // 페이지네이션을 위한 데이터의 시작점을 저장합니다
    const currentPosts = chat.slice(0).reverse().slice(offset, offset + limit) // 시간 역순으로 데이터를 정렬하여 1페이지에 보여줄 데이터만큼 잘라냅니다.

    // DB데이터 가져오기
    const getChatData = async () => {
        await fetch('http://127.0.0.1:5300/lounge', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setChat(data))
    }
    const getCommentData = async () => {
        await fetch('http://127.0.0.1:5300/loungeComment', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setComment(data))
    }

    useEffect(() => {
        getChatData()
        getCommentData()
    }, [])
    // console.log(chat)

    useEffect(() => {
        const clickModalOutside = (e) => { // 모달창 밖을 클릭하면 모달창이 닫힙니다
            e.stopPropagation()
            if (modalPosition &&
                e.target.className !== "edit" && e.target.className !== "delete"
                && e.target.className !== "comment" && e.target.className !== "confirm"
                && e.target.className !== "text_function"
                && e.target.className !== "passwordCheck"
                && e.target.className !== 'editPassword') {
                setModalPosition(null)
                setUpdateInputValue('')
            }
        }
        document.addEventListener('click', clickModalOutside)
        return () => {  // clean up
            document.removeEventListener('click', clickModalOutside)
        }
    }, [modalPosition]) // modalPosition이 바뀔때마다 useEffect가 실행됩니다

    // 글 등록하기
    const registerText = () => { // 등록 버튼 누르면 글이 서버에 저장되고 웹페이지에서 보여줍니다
        const id = document.querySelector("#nickname").value;
        const password = document.querySelector("#password").value;
        const text = document.querySelector("#text").value;

        fetch('http://127.0.0.1:5300/lounge', { // db에 저장
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: id,
                password: password,
                text: text
            })
        })
        getChatData() // db에서 데이터 가져오기

        // 입력창 초기화
        document.querySelector("#nickname").value = "";
        document.querySelector("#password").value = "";
        document.querySelector("#text").value = "";
    }


    // 모달창 띄우기
    const HandleModalEdit = async (e) => {
        e.stopPropagation() // 댓글 수정,삭제 비밀번호 입력후 부모글의 수정,삭제를 누르면 부모글이 수정창이 나오는것을 방지합니다(버블링)
        const mongoDbId = e.target.parentNode.parentNode.parentNode.firstChild.children[2].innerText
        const depth = e.target.parentNode.parentNode.parentNode.firstChild.children[3].innerText

        // console.log(e.target.closest('.lounge__textOutput__text').querySelector('.paragraph-id').innerText) // comment 와 공동사용 불가
        setModalStyle(false)
        setClickData(e.target)
        setDepth(depth)
        if (depth === '0') {
            if (dbCode !== mongoDbId) {
                setToggleComment(false)
            }
            setDbCode(mongoDbId) // 부모글의 db코드를 저장합니다
        }
        if (depth === '1') {
            setCommentCode(mongoDbId) // 댓글의 db코드를 저장합니다
        }

        const rect = e.target.getBoundingClientRect();

        setModalPosition({
            top: rect.top + rect.height,
            left: rect.left,
        });
    }

    // 수정, 삭제하기 (비밀번호 일치했을경우)
    const editModalText = async (e) => {
        e.stopPropagation()
        const id = clickData.parentNode.parentNode.previousSibling.firstChild.innerText
        const editPassword = document.querySelector("#editPassword").value
        const text = clickData.parentNode.parentNode.firstChild.innerText
        console.log(editPassword)
        if (clickData.innerText === "수정" && depth === '0') {
            try {
                const response = await fetch('http://127.0.0.1:5300/lounge/edit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _id: dbCode,
                        password: editPassword,
                    })
                })
                if (response.ok === true && editPassword !== "") {
                    setPasswordMatched(true);
                    setModalPosition(null)
                    setPasswordText(editPassword)
                    getChatData()
                } else {
                    setPasswordMatched(false);
                    setModalStyle(true)
                    setModalPosition(modalPosition)
                }
            }

            catch (error) {
                console.log(error);
            }
        } else if (clickData.innerText === "수정" && depth === '1') {
            try {
                const response = await fetch('http://127.0.0.1:5300/loungeComment/edit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _id: commentCode,
                        password: editPassword,
                    })
                })
                if (response.ok === true && editPassword !== "") {
                    setPasswordMatched(true);
                    setModalPosition(null)
                    setPasswordText(editPassword)
                    getCommentData()
                } else {
                    setPasswordMatched(false);
                    setModalStyle(true)
                    setModalPosition(modalPosition)
                }
            }

            catch (error) {
                console.log(error);
            }
        }
        if (clickData.innerText === "삭제" && depth === '0') {
            try {
                fetch('http://127.0.0.1:5300/lounge/delete', {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _id: dbCode,
                        password: editPassword,
                    })
                })
                    .then(res => {
                        if (res.ok === true) {
                            getChatData()
                            setModalPosition(null)
                            setModalStyle(false)
                        } else {
                            setModalStyle(true)
                            setModalPosition(modalPosition)
                            console.log('삭제실패')
                        }
                    }
                    )
            } catch (error) {
                console.log(error);
            }
        } else if (clickData.innerText === "삭제" && depth === '1') {
            try {
                fetch('http://127.0.0.1:5300/loungeComment/delete', {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _id: commentCode,
                        password: editPassword,
                    })
                })
                    .then(res => {
                        if (res.ok === true) {
                            getCommentData()
                            setModalPosition(null)
                            setModalStyle(false)
                        } else {
                            setModalStyle(true)
                            setModalPosition(modalPosition)
                            console.log('삭제실패')
                        }
                    }
                    )
            } catch (error) {
                console.log(error);
            }
        }
    }

    // 모달창에서 비밀번호 일치 후 수정확정하거나 취소하기
    const confirmEditText = (e, index) => {
        e.stopPropagation()
        const editedText = document.querySelector(".editText").value
        console.log(depth)
        setUpdateInputValue(editedText)

        if (e.target.innerText === "확인" && depth === '0') {
            fetch('http://127.0.0.1:5300/lounge/edit', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: dbCode,
                    password: passwordText,
                    text: editedText,
                    lastModifiedAt: new Date()
                })
            })
                .then(res => res.json()) // 서버에서 응답한 데이터를 json형태로 변환
                .then(data => { // json형태로 변환된 데이터를 data라는 이름의 매개변수로 받아옴
                    const updatedChat = chat.map(c => {
                        if (chat._id === dbCode) {
                            return { ...chat, text: editedText } // 수정된 데이터를 화면에 보여주기 위해 상태값을 업데이트
                        } else {
                            return { ...chat }
                        }
                    })
                    setChat(updatedChat) // 수정된 데이터를 화면에 보여주기 위해 상태값을 업데이트
                    setUpdateInputValue('') // 수정된 데이터를 화면에 보여주고 나면 input창을 비워줌
                    setPasswordMatched(false)
                    getChatData()
                })
        } else if (e.target.innerText === "확인" && depth === '1') {
            fetch('http://127.0.0.1:5300/loungeComment/edit', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: commentCode,
                    password: passwordText,
                    text: editedText,
                    lastModifiedAt: new Date()
                })
            })
                .then(res => res.json()) // 서버에서 응답한 데이터를 json형태로 변환
                .then(data => { // json형태로 변환된 데이터를 data라는 이름의 매개변수로 받아옴
                    const updatedChat = chat.map(c => {
                        if (chat._id === commentCode) {
                            return { ...chat, text: editedText } // 수정된 데이터를 화면에 보여주기 위해 상태값을 업데이트
                        } else {
                            return { ...chat }
                        }
                    })
                    setComment(updatedChat) // 수정된 데이터를 화면에 보여주기 위해 상태값을 업데이트
                    setUpdateInputValue('') // 수정된 데이터를 화면에 보여주고 나면 input창을 비워줌
                    setPasswordMatched(false)
                    getCommentData()
                })
        }

        if (e.target.innerText === "취소") {
            setPasswordMatched(false)
            setUpdateInputValue('') // 수정된 데이터를 화면에 보여주고 나면 input창을 비워줌
        }
    }
    const onChange = (e) => { // input창에 입력한 값을 상태값에 저장
        setUpdateInputValue(e.target.value)
    }
    const handleComment = (e) => {
        e.stopPropagation()
        const mongoDbId = e.target.parentNode.parentNode.parentNode.firstChild.children[2].innerText
        const depth = e.target.parentNode.parentNode.parentNode.firstChild.children[3].innerText
        setDbCode(mongoDbId)
        if (e.target.innerText === "댓글") {
            setClickData(e.target)
            setToggleComment(!toggleComment)
            setDepth(depth)
            if (toggleComment) {
                setModalPosition(null)
            }
        }
    }

    return (
        <>
            <Header></Header>
            <div className="loung__body" >
                <div className="lounge__textOutput">
                    <div className="lounge__textOutput__title">
                        <h3>Small Talk Lounge</h3>
                        <hr />
                    </div>

                    {chat.length !== 0 && currentPosts.map((chat, index) => {
                        return (
                            <React.Fragment key={chat._id}>
                                <div>
                                    <div className="lounge__textOutput__text" >
                                        <div className="nickname">
                                            <span><img src='images/loungeuser.png' alt='userProfile' />{chat.nickname} </span> <SnsTimeFormat chatTime={chat.date} /> <span className='paragraph-id'>{chat._id}</span><span className="depth">0</span>
                                        </div>
                                        <div className="text__function" >
                                            <LoungeInputEdit // 수정버튼 누르고 패스워드 일치시 input창이 나오도록 설정
                                                passwordMatched={passwordMatched}
                                                HandleModalEdit={(e, index) => HandleModalEdit(e, index)}
                                                confirmEditText={(e) => confirmEditText(e, index)}
                                                modalPosition={modalPosition}
                                                clickData={clickData}
                                                onChange={onChange}
                                                updateInputValue={updateInputValue}
                                                chat={chat}
                                                dbCode={dbCode}
                                                handleComment={handleComment}
                                                depth={depth}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <LoungeCommentRegister  // 댓글 등록
                                    passwordMatched={passwordMatched}
                                    modalPosition={modalPosition}
                                    comment={comment}
                                    toggleComment={toggleComment}
                                    dbCode={dbCode}
                                    commentCode={commentCode}
                                    chat={chat}
                                    getCommentData={getCommentData}
                                    HandleModalEdit={HandleModalEdit}
                                    updateInputValue={updateInputValue}
                                    editModalText={editModalText}
                                    onChange={onChange}
                                    modalStyle={modalStyle}
                                    confirmEditText={confirmEditText}
                                    clickData={clickData}
                                    depth={depth}
                                />
                            </ React.Fragment>
                        )
                    })}
                    <LoungeModal  // 수정, 삭제 클릭시 나오는 모달창
                        modalPosition={modalPosition}
                        updateInputValue={updateInputValue}
                        editModalText={editModalText}
                        onChange={onChange}
                        modalStyle={modalStyle}
                    />

                </div>
                <LoungeRegisterInput
                    registerText={registerText}
                />
                <LoungePagenation
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    totalPosts={totalPosts}
                />
            </div>
            <Footer userInfo={userInfo}></Footer>
        </>
    )
}

export default Lounge

