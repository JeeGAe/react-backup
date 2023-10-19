import { useState } from "react";
import axios from "axios";
function PasswordSearchComponent({setLoginModalState}) {
    const [test, setTest] = useState('')
    const passwordSearch = (e) => {
        e.preventDefault()
        const email = document.getElementById('search_email').value
        const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(email === '') {
          alert('이메일을 입력하지 않았습니다.')
        } else if(!email.match(email_check)) {
            alert('올바른 이메일 형식을 입력해주세요.')
        } else {
            axios({
                method : 'post' ,
                url : 'http://127.0.0.1:5300/user/searchPassword' ,
                data : {
                    userId : email ,
                } ,
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => {
                alert(res.data.message)
                setLoginModalState(false)
                console.log(res)
            }).catch(function(error) {
                setTest(error.response.data)
                alert(error.response.data.message)
            })
        }
    }
    return (
        <>
            <form>
                <div className= "PasswordSearch-input-container">
                    <label><span><u>U</u>ser email:</span><input type='text' id="search_email"/></label>
                </div>
                <div className="PasswordSearch-search-btn-container"><button type='submit' onClick={passwordSearch}>찾기</button></div>
            </form>
            {/* <div className="LoginModal-footer">
                <button>비밀번호 찾기</button>
            </div> */}
        </>
    )
}

export default PasswordSearchComponent