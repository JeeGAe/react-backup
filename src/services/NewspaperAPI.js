import React, {useState, useEffect} from "react";

function NewsPaperAPI() {
    const [newsData , setNewsData] = useState([]) // 빈 배열을 넣지않으면 가져온 data가 배열로 처리되지 않아 .length !==0 조건문을 사용할 수 없음
        // 뉴스 api데이터 가져오기
    const newsApiKey = process.env.REACT_APP_Newspaper_API_KEY 
    useEffect( ()=> {
        const fetchData = async () => {
            try{
            // 중앙 기사 랜덤 기사 데이터
            const response1 = await fetch(`https://newsapi.org/v2/top-headlines?page=1&country=kr&apiKey=${newsApiKey}`)
            const newsDatas1 = await response1.json()
            const withImageNewsDatas1 = newsDatas1.articles.filter((newsData) => newsData.urlToImage !== null)
           
           // 좌측 기사 테크관련 기사 데이터
           const response2 = await fetch(`https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=${newsApiKey}`)
           const newsDatas2 = await response2.json()
           const withImageNewsDatas2 = newsDatas2.articles.filter((newsData) => newsData.urlToImage !== null)
           
           // 우측 기사 스포츠관련 기사 데이터
           const response3 = await fetch(`https://newsapi.org/v2/top-headlines?country=kr&category=sports&apiKey=${newsApiKey}`)
           const newsDatas3 = await response3.json()
           const withImageNewsDatas3 = newsDatas3.articles.filter((newsData) => newsData.urlToImage !== null)
           
           setNewsData([withImageNewsDatas1, withImageNewsDatas2, withImageNewsDatas3])
            }
               catch(err){
                console.log(err)                   
            }
    }
    fetchData()
},[])
 return newsData
}
export default NewsPaperAPI