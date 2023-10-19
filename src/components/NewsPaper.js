import React, {useEffect, useState} from "react";
import "../styles/NewsPaper.css"
import NewsPaperAPI from "../services/NewspaperAPI"
import { NewsPaperHeadline, NewsPaperLoading } from "../components"

function NewsPaper() {
    // API 데이터 변수 설정
    const data = NewsPaperAPI()
    const news = data[0] // 중앙기사
    const techNews = data[1] // 좌측기사
    const sportsNews = data[2] // 우측기사

     // 헤더 우측 날짜관련 변수
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();   
    const day = today.getDay(); 
    const days = ['일', '월', '화', '수', '목', '금', '토'];
  
    // state 설정
    const [selectedNews, setSelectedNews] = useState(null) // 기사 클릭시 해당 기사의 정보를 저장하는 state
    const [loading, setLoading] = useState(true) // 기사 로딩시 로딩화면을 보여주는 state

    const showDetailArticle = (e) => {
      const selectedNews =  // 클릭한 기사의 정보를 selectedNews에 저장, 중앙은 인기기사, 좌측은 테크뉴스, 우측은 스포츠뉴스
      techNews.find((news) => news.urlToImage === e.target.src || news.title === e.target.innerText) 
      || news.find((news) => news.urlToImage === e.target.src || news.title === e.target.innerText)
      || sportsNews.find((news) => news.urlToImage === e.target.src || news.title === e.target.innerText)

      setSelectedNews(selectedNews)
  }
  useEffect(()=>{ // 로딩화면 state 변경
    if(data.length !== 0) {
        setLoading(false)
    }
  }, [data]) 

    return (
        <>
            {loading ? <NewsPaperLoading/> :
                <>
                <div className="newspapaer">
            {/* 헤더부분 */}
                        <div className="newspapaer__header">
                        <h1>세상에 이런 일이</h1>
                            <div className="date-information">
                                <span>{`${year}-${month}-${date}(${days[day]})`}</span>
                                </div>
                        </div>

            {/* 본문부분 */}
                    {selectedNews ? 
                    window.location.href = selectedNews.url // 해당기사 출처 본문으로 이동
                    : <NewsPaperHeadline 
                        showDetailArticle={showDetailArticle}
                        newsData={data} // 전체기사
                        centerNews={news} // 중앙기사
                        leftNews={techNews} // 좌측기사
                        rightNews={sportsNews} // 우측기사
                    >
                    </NewsPaperHeadline> // 기사 본문을 보여주지 않을 때는 헤드라인만 보여준다.
                    } 
            {/* 푸터영역 */}
                        <div className="newspapaer__footer">
                            <div className="newspapaer__footer__left">
                                <h3>세상에 이런 일이</h3>
                                <div className="icon-links"></div>
                                <div className="site-information">
                                    <p>Email : email@email.com</p>
                                    <p>API Source : NewsApi.org</p>
                                    <p>Publisher : Kwon | Jihun | Seunghyun</p>
                                    <p>Copyright © React-Team All rights reserved.</p>
                                </div>
                            </div>
                            <div className="newspapaer__footer__right">
                                <ul>
                                    <li className="About">About Us</li>
                                    <li>History</li>
                                    <li>Contact Us</li>
                                </ul>

                                <ul>
                                    <li className="Service">Service</li>
                                    <li>How to Use</li>
                                    <li>Terms of Service</li>
                                </ul>

                                <ul>
                                    <li className="Policy">Policy</li>
                                    <li>Copyright Policy</li>
                                </ul>
                            </div>
                        </div>
                </div>
                </>
                    }
            </>
    )
}

export default NewsPaper