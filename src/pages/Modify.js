import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import daejeonRegionData from '../DaejeonRegionData';
import '../styles/userModify.css';
import { useCookies } from 'react-cookie';

function Modify({ setUserInfo, userInfo }) {
  const [ cookies, setCookie ] = useCookies(['accessToken'])
  // 회원 정보 수정 전 유저 확인
  const [modifyVerified, setModifyVerified] = useState(false);
  // 회원 정보 스테이트
  const [inputModifyData, setInputModifyData] = useState({
    userPassword : '',
    CheckingUserPassword : '',
    userName : '',
    userKeyword : '',
    userAddress : ['','']
  });
  // 에러 스테이트
  const [errorInputData, setErrorInputData] = useState({
    err : null,
    message : ''
  });
  // 회원 정보 수정 전 비밀번호로 유저 확인 확인 되면 기존 유저 정보를 기본값으로 설정
  const handleVerify = (event) => {
    event.preventDefault();

    if(inputModifyData.userPassword.trim()){
      fetch('http://127.0.0.1:5300/user/passwrodVerify', {
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        credentials : 'include',
        body : JSON.stringify({
          password : inputModifyData.userPassword
        })
      })
      .catch(e => console.log(e))
      .then(res => res.json())
      .then(res => {
        if(res.code !== 200){
          setErrorInputData({ err : 'invalidPassword', message : '비밀번호를 확인해주세요!'})
        } else {
          const addressArray = res.address.split(' ');
          console.log(addressArray)
          setInputModifyData({...inputModifyData, 
            userPassword : '',
            userName : res.name, 
            userKeyword: res.keyword, 
            userAddress : [addressArray[1], addressArray[2]]});
          setModifyVerified(true);
        }
      })
    }
  }

  const changeModifyData = (event) => {
    const { name } = event.target;
    setErrorInputData({ err : null , message : ''});
    setInputModifyData({ ...inputModifyData, [name] : event.target.value.trim() });
  }
  // 유저 정보 수정
  const handleModify = (event) => {
    event.preventDefault();
    
    if(!inputModifyData.userName.trim()){
      setErrorInputData({ err : 'emptyName', message : '이름을 입력해주세요!'});
      return ;
    }

    if(inputModifyData.userPassword.trim() !== '' && inputModifyData.userPassword.trim() !== inputModifyData.CheckingUserPassword.trim()){
      setErrorInputData({ err : 'passwordMatching', message : '비밀번호가 다릅니다.'});
      return ;
    }

    fetch('http://127.0.0.1:5300/user/modify', {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      credentials : 'include',
      body : JSON.stringify({
        password : inputModifyData.userPassword.trim(),
        name : inputModifyData.userName.trim(),
        keyword : inputModifyData.userKeyword.trim(),
        address : '대전광역시' + ' ' + inputModifyData.userAddress[0] + ' ' + inputModifyData.userAddress[1]
      })
    })
    .catch(e => console.log(e))
    .then(res => res.json())
    .then((res) => {
      if(res.code === 200){
        alert('정보수정이 완료되었습니다!');
        setCookie('accessToken', res.token, { 
          path: '/',
        });
        setUserInfo({
          name : inputModifyData.userName.trim() , 
          keyword : inputModifyData.userKeyword.trim(), 
          address : `대전광역시 ${inputModifyData.userAddress[0]} ${inputModifyData.userAddress[1]}`})
        setInputModifyData({
          userId : '',
          userPassword : '',
          CheckingUserPassword : '',
          userName : '',
          userKeyword : '',
          userAddress : ''
        })
        moveToHomePage();
      }
    })

  }

  const navigate = useNavigate();
  const moveToHomePage = () => {
    navigate('/');
  }

  return (
    <>
    
    {!modifyVerified ?
      <div className="Modify-container">
        <div className="Modify-header">
          <h5>회원정보 수정</h5>
          <div className='Modify-button-container'>
            <button onClick={moveToHomePage}>X</button>
          </div>
        </div>
        <div className='Modify-form-container'>
          <form>
            <h3>비밀번호를 입력해주세요</h3>
            <label><span>password : </span><input type='password' name='userPassword' onChange={changeModifyData} value={inputModifyData.userPassword}/></label>
            {errorInputData.err === 'invalidPassword' && <span style={{color:'red'}}>{errorInputData.message}</span>}
            <button onClick={handleVerify}>확인</button>
          </form>
        </div>
      </div>
      :
      <div className="Modify-container">
        <div className="Modify-header">
          <h5>회원정보 수정</h5>
          <div className='Modify-button-container'>
            <button onClick={moveToHomePage}>X</button>
          </div>
        </div>
        <div className='Modify-form-container'>
          <form>
            <label><span>password : </span><input type='password' name='userPassword' onChange={changeModifyData} value={inputModifyData.userPassword}/></label>
            <label><span>password 확인 : </span><input type='password' name='CheckingUserPassword' onChange={changeModifyData} value={inputModifyData.CheckingUserPassword}/></label>
            {errorInputData.err === 'passwordMatching' && <span style={{color:'red'}}>{errorInputData.message}</span>}
            <label><span>name : </span><input type='text' name='userName' onChange={changeModifyData} value={inputModifyData.userName}/></label>
            <label><span>관심 키워드 : </span><input type='text' maxLength='15' name='userKeyword' onChange={changeModifyData} value={inputModifyData.userKeyword}/></label>
            <label><span>직장 주소 : </span>
              <select defaultValue={inputModifyData.userAddress[0]} onChange={(e) => {setInputModifyData({...inputModifyData, userAddress : [e.target.value,daejeonRegionData[e.target.value][0]]})}}>
                <option value='동구'>동구</option>
                <option value='서구'>서구</option>
                <option value='중구'>중구</option>
                <option value='유성구'>유성구</option>
                <option value='대덕구'>대덕구</option>
              </select>
              <select defaultValue={inputModifyData.userAddress[1]} onChange={(e) => {setInputModifyData({...inputModifyData, userAddress : [inputModifyData.userAddress[0], e.target.value] })}}>
                {daejeonRegionData[`${inputModifyData.userAddress[0]}`]?.map((d, index) => {
                  return <option key={index+d} value={d}>{d}</option>
                })}
              </select>
            </label>
            {errorInputData.err === 'emptyName' && <span style={{color:'red'}}>{errorInputData.message}</span>}
            <button onClick={handleModify}>수정완료</button>
          </form>
        </div>
      </div>
    }
    </>
  )

}

export default Modify;