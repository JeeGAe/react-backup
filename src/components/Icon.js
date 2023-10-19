import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Icons.css'

import { useCookies } from 'react-cookie';

function Icon({ src, children, href, setUserInfo, userInfo, setOptionModalState, setLoginModalState }) {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    
    const [iconActiveFlag, setIconActiveFlag] = useState(''); // Icon 한번 클릭시 보라색으로 스타일 변경을 위한 state
    const changeIconFlag = (e) => { // Icon 클릭시 css active 설정하기 위해 state값을 변경한다.
        setIconActiveFlag('clicked');
        removeAndAddActiveClass(e);
    };
  
    const removeAndAddActiveClass = (e) => { // Icon 클릭시 기존에 active 설정된 icon은 active를 제거하고, 클릭한 icon에 active를 추가한다.
        const icons = document.querySelectorAll('.main-icons');
        const h5 = document.querySelectorAll('h5');
        icons.forEach((icon) => {
            icon.classList.remove('blurred');
        });
        h5.forEach((h5) => {
            h5.classList.remove('active');  
        })
        e.currentTarget.classList.add('blurred');
        e.currentTarget.lastChild.classList.add('active');
    }
    const handleClickOutside = (e) => { // Icon 외부를 클릭하면 active를 제거한다.
      if (
        e.target.className !== 'icon-image' &&
        e.target.className !== 'main-icons' &&
        e.target.tagName !== 'IMG' &&
        e.target.tagName !== 'H5'
      ) {
        setIconActiveFlag('');
      }
    };
    
    const navigate = useNavigate() // useNavigate hook을 이용해 페이지 이동을 구현한다.
    const moveToPage = () => { // Icon 컴포넌트를 더블클릭하면 해당 페이지로 이동한다.
      if(children === '설정') { // 설정 아이콘을 더블클릭하면 바탕화면 바꾸는 모달창 나오게 하는 코드
        setOptionModalState(true) 
      } else if(children === '로그인'){
        setLoginModalState(true);
      } else if(children === '로그아웃'){
          removeCookie('accessToken');
          window.location.reload()
        console.log('out')
      }
      else {
        navigate(href, {state:children})
      }
    }

    useEffect(() => { // Icon 컴포넌트가 생성될 때 이벤트 리스너를 추가한다.
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);  // Icon 컴포넌트가 사라질 때 이벤트 리스너를 제거한다.
      };
    }, []);
    return (
      <>
        <div
          className={`main-icons ${iconActiveFlag ==='clicked' ? 'blurred' : ''}`}
          onClick={changeIconFlag} onDoubleClick={moveToPage} // onClick은 한번클릭시 스타일링, onDoubleClick은 더블클릭시 페이지 이동
        >
          <div className="icon-image">
            <img src={src} alt="" />
          </div>
          <h5 className={`${iconActiveFlag==='clicked' ? 'active' : ''}`}>{children}</h5>
        </div>
      </>
    );
  }

export default Icon