import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PasswordSearchComponent from "../components/PasswordSearchComponent"
import { useCookies } from 'react-cookie';
import '../styles/LoginModal.css';

function LoginModal({loginModalStateChange ,setUserInfo , setLoginModalState}){
  const [ cookies, setCookie ] = useCookies(['accessToken'])
  const [user, setUser] = useState({ email : '', password : '' })
  const [passwordState, setPasswordState] = useState(false)

  const onChange = async (event) => {
    const { name, value } = event.target
    setUser({
      ...user,
      [name] : value
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    await fetch('http://127.0.0.1:5300/user/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
    },
      credentials: 'include',
      body : JSON.stringify({
        userId: user.email,
        password: user.password  
      })

    })
    .then(res => res.json())
    .then((res) => {
      if(res.code === 200){
      setCookie('accessToken', res.token, { 
        path: '/',
      })
      setUserInfo({ name: res.name , keyword : res.keyword, address : res.address})  
      loginModalStateChange()
      alert(`${res.name}님의 방문을 환영합니다.`)
    }else{
      alert('아이디 또는 비밀번호가 일치하지 않습니다.')
    }
    })
  }

  const navigate = useNavigate();
  const moveToRegisterPage = () => {
    navigate('/register');
  }
  

  // 비밀번호 찾기
  const passwordSearchChange = () => {
    setPasswordState(true)
  }

  
  return (
    <div className='LoginModal-container'>
      <div className="modal-title">
        <span>로그인</span>
        <button className='modalClose-btn' onClick={loginModalStateChange}>X</button>
      </div>
      {!passwordState? 
        <>
          <form>
            <div className="LoginModal-input-container">
              <label><span><u>U</u>ser email:</span><input type='text' name='email' onChange={onChange}/></label>
              <label><span><u>P</u>assword:</span><input type='password' name='password' onChange={onChange} /></label>
            </div>
            <div className="LoginModal-login-btn-container"><button type='submit' onClick={handleLogin}>로그인</button></div>
          </form>
          <div className="LoginModal-footer">
            <button onClick={passwordSearchChange}>비밀번호 찾기</button>
            <button onClick={moveToRegisterPage}>회원가입</button>
          </div>
        </> : 
        <PasswordSearchComponent setLoginModalState={setLoginModalState}></PasswordSearchComponent>
        }
    </div>
  )
}

export default LoginModal;