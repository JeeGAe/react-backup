import React, { useEffect } from "react";
import '../styles/Sidebar.css'
import { Link } from "react-router-dom"
import { useCookies } from 'react-cookie';


function Sidebar({ homeIcons, buttonFlag, flagChange, setLoginModalState, setOptionModalState }) {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const anotheClickHideSidebar = (e) => { // 다른 곳을 클릭하면 사이드바가 사라지게 하는 함수

        const sidebarmenu = document.querySelector('.window-bar') // 사이드바 
        const footerButton = document.querySelector('footer button')   // 시작버튼
        const footerButtonChildDiv = footerButton.childNodes[0]  // div : 시작버튼의 자식 div
        const footerButtonChildDivImg = footerButton.childNodes[0].children[0] // img : 윈도우 아이콘
        const footerButtonChildDivSpan = footerButton.childNodes[0].children[1] // span : 시작 text

        if (sidebarmenu.classList.contains('showSidebar') // 사이드바가 보여지고 있을 때
            && e.target !== footerButton // footer>button을 제외한 다른 곳을 클릭했을 때
            && e.target !== footerButtonChildDiv // button>div를 제외한 다른 곳을 클릭했을 때
            && e.target !== footerButtonChildDivImg // '윈도우 아이콘'을 다른 곳을 클릭했을 때
            && e.target !== footerButtonChildDivSpan  // '시작' 문구를 제외한 다른 곳을 클릭했을 때  
        ) {
            flagChange() // 상위 컴포넌트 footer에서 buttonFlag를 false로 바꿔주는 함수를 props로 받아와서 실행한다.
        }

    }

    useEffect(() => { // 다른 곳을 클릭하면 사이드바가 사라지게 하는 함수를 실행한다.
        document.addEventListener('click', anotheClickHideSidebar);
        return () => {
            document.removeEventListener('click', anotheClickHideSidebar);
        };
    }, []);
    const handleLoginModal = () => {
        setLoginModalState(true)
    }
    const handleOptionModal = () => {
        setOptionModalState(true)
    }
    const handleLogout = () => { 
        removeCookie('accessToken');
        window.location.reload()
    }

    return (
        <>
            <div className={`window-bar ${buttonFlag ? 'showSidebar' : ''}`}>  {/* buttonFlag가 true일때 sidebar가 나타난다 */}
                <div className="window-textbar"><h5>Window<span>95</span></h5></div>
                <div className="window-menubar">
                    {homeIcons.map((icon, id) => {
                        return (
                            <React.Fragment key={id}> 
                                {icon.iconTitle === '로그인' ? (
                                    <div onClick={handleLoginModal}>
                                        <img src={icon.iconSrc} alt="" />
                                        {icon.iconTitle}
                                    </div>
                                ) : icon.iconTitle === '설정' ? (
                                    <div onClick={handleOptionModal}>
                                        <img src={icon.iconSrc} alt="" />
                                        {icon.iconTitle}
                                    </div>
                                ) : icon.iconTitle === '로그아웃' ? (
                                    <div onClick={handleLogout}>
                                        <img src={icon.iconSrc} alt="" />
                                        {icon.iconTitle}
                                    </div>)
                                    : (
                                        <Link to={icon.url} state={icon.iconTitle}>
                                            <div>
                                                <img src={icon.iconSrc} alt="" />
                                                {icon.iconTitle}
                                            </div>
                                        </Link>
                                    )}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Sidebar