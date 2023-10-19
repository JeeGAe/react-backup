import '../styles/Header.css'
import homeIcons from "../HomeIconsData";
import { useNavigate, useLocation } from "react-router-dom"


function Header({}){

    const navigate = useNavigate()
    const moveToHomePage = () => { // 상단 X버튼 누르면 메인홈페이지로 이동
        navigate('/')
    }
    const iconExternalState = useLocation()  // Icon 컴포넌트의 useNavigate state 값(icon.title)과 Sidebar 컴포넌트의 state값(icon.title)을 iconText로 모두 반환한다
    const icon = homeIcons.filter(i => iconExternalState.pathname === i.url) // iconText.pathname과 i.url이 일치하는 것만 icon에 담는다

    return(
        <div className="header">
            <h5>{icon.length !== 0 && icon[0].iconTitle}</h5>  
            <div className='button-container'>
                <button onClick={moveToHomePage}>X</button>
            </div>
        </div>    
    )
}

export default Header