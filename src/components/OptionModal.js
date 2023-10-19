import React, { useEffect, useState } from "react";
import "../styles/OptionModal.css"

function OptionModal({ state, optionModalStateChange}) {
    const [fileName, setFileName] = useState('')
    const [fileURL, setFileURL] = useState('')
     
    const fileUpload = (e) => { // 배경화면 바꿀 파일 업로드 함수
          const file = e.target.files[0]
          console.log(file)
          if(file) {
              const fileSrc = URL.createObjectURL(file)
              setFileURL(fileSrc)
              console.log(fileSrc)
          }
          setFileName(file.name)
    }
    
    const backgroundApply = () => { // 업로드된 파일로 배경화면 바꾸기 함수
        const home = document.querySelector('.Home')
        console.log(typeof(fileURL))
        home.style.background = `url(${fileURL})`
        home.style.backgroundSize = 'cover'
    }
    const successBackgroundApply = () => {
        backgroundApply()
        optionModalStateChange()
    }
    return (
        <>
            <div className={`modal ${state ? 'open' : 'close'}`}>
                <div className="modal-container">
                    <div className="modal-title">
                        <span>바탕 화면 설정</span>
                        <button className='modalClose-btn' onClick={optionModalStateChange}>X</button>
                    </div>
                    <div className="modal-body">
                        {fileURL !== '' &&
                        <img src={fileURL} alt="Blob URL Image"/>}
                            <input type='file' name="img" id="upload"
                            onChange={fileUpload}></input>
                        {/* <form action="upload" method="post">
                         </form> */}
                    </div>
                    <div className="modal-footer">
                        <button className="modalSuccess-btn" onClick={successBackgroundApply}>확인</button>
                        <button className="modalfail-btn" onClick={optionModalStateChange}>취소</button>
                        <button className="modalApply-btn" onClick={backgroundApply}>적용</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OptionModal