import React, {useState, useEffect} from "react"
import LoungeButton from "./LoungeButton"
import LoungePageWrap from "./LoungePageWrap"


function LoungePagenation  ({page, setPage, totalPosts, limit}) {
    const pageLimit = 5 // 페이지 버튼 수
    const numPages = Math.ceil(totalPosts / limit) // 총페이징 수

    const [totalPageArray, setTotalPageArray] = useState([]) // 총 페이지 배열
    const [currentPagesArray, setCurrentPagesArray] = useState([]) // 현재 페이지 배열, 5개 단위로 끊어서 보여줌
    const [btnActive, setBtnActive] = useState(page) // 하단 페이지 버튼 활성화 스타일링
    
    useEffect(()=> {
        const slicedPageArray = slicedPageArrayByLimit(numPages ,pageLimit) // 페이징 수 제한
        setTotalPageArray(slicedPageArray) 
        setCurrentPagesArray(slicedPageArray[0]) 
        // console.log(numPages, slicedPageArray, currentPagesArray) // 디버깅용
    }, [numPages])

    useEffect(()=> {  // 페이지 버튼 클릭시 특정 조건이 되면 currentPagesArray 변경
        // console.log(totalPageArray, currentPagesArray) // 디버깅용
        if(page % pageLimit === 1){  // 배열 내 시작이나 끝나는 값이 5로 나누었을때 1이 되는 값이 되므로 해당 조건식이 설정됨  
            setCurrentPagesArray(totalPageArray[Math.floor(page / pageLimit)])  
        }else if(page % pageLimit === 0){ // pageLimit의 배수가 totalpageArray 배열의 index가 됨, index가 0부터 시작하므로 -1설정
            setCurrentPagesArray(totalPageArray[Math.floor(page / pageLimit) - 1]) 
        }
    }, [page, totalPageArray])

    const handlePageChange = (e ,currentPage) => { // 페이지 숫자 클릭시
        setPage(currentPage)
        setBtnActive(currentPage) // 버튼 활성화
        e.stopPropagation()
    }

    const slicedPageArrayByLimit = (numPages, pageLimit) => { // 페이징 수 제한
        const totalPageArray = Array(numPages)
        .fill()
        .map((_, i) => i + 1)
        return Array(Math.ceil(numPages / pageLimit))
        .fill()
        .map(()=> totalPageArray.splice(0, pageLimit))
    }


    return(
        <>
        {currentPagesArray === undefined ? null : // 페이지가 없을때 버튼 안보이게
            (<LoungePageWrap>

                <LoungeButton 
                onClick={()=> {
                    setPage(page - 1) 
                    setBtnActive(page-1)
                }} 
                disabled={page === 1}>
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </LoungeButton> 
                
                {currentPagesArray?.map(( currentPage , i)=> { // 페이지 버튼
                    return(
                        <LoungeButton
                            key={i+1}
                            className={ currentPage === btnActive ? 'active' : ''} 
                            onClick={(e)=>handlePageChange(e, currentPage)} // 페이지 클릭시
                            aria-current={page === i + 1 ? 'page' : undefined} // 현재 페이지
                            > { currentPage }
                        </LoungeButton> 
                    )
                })
                
                }
                <LoungeButton 
                    onClick={()=>{ 
                        setPage(page + 1) 
                        setBtnActive(page+1)       
                    }} 
                    disabled={page === numPages}>
                        <span className="material-symbols-outlined">arrow_forward_ios</span>
                </LoungeButton>

            </LoungePageWrap>
            )}
            <div className="pagenation__summary">
              <span className="pagenation__text">Page {page} of {numPages}</span>
              <span className="pagenation__text">Total {totalPosts} Posts</span>
            </div>   
        </>
    )

}

export default LoungePagenation

