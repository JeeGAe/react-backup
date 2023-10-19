import React, {  useState } from "react"


function NewsPaperHeadline({showDetailArticle, newsData, centerNews, leftNews, rightNews}){

    return(
        <>
            {/* 본문부분 */}
            <div className="newspapaer__body">
                {/* 좌측기사 - 좌측 최상단 기사*/}
                <article className="left">
                    <div className="left__article">
                        <div className="left__article__img">
                            <img src={newsData.length !==0 && leftNews[0].urlToImage ? leftNews[0].urlToImage 
                                : null } onClick={showDetailArticle}/>
                        </div>    
                        <div className="left__article__text">
                            <h3 className="left__article__text__headline" onClick={showDetailArticle}>
                                {newsData.length !==0 && leftNews[0].title} </h3>
                        </div>
                    </div>
                    {/* 좌측기사 - 2번째 작은 기사부터 */}
                    <div className="left__article__sub">
                        <div className="left__article__sub__content">
                        {newsData.length !== 0 ? (
                            leftNews.slice(1).map((item, index) => {
                            return item.urlToImage && item.title ? (
                                <div key={index}>
                                <img src={item.urlToImage} alt={item.title} onClick={showDetailArticle}/>
                                <h3 className="left__article__sub__text__headline" onClick={showDetailArticle}>{item.title}</h3>
                                </div>
                            ) : null})
                        ) : null}
                        </div>
                    </div>    
                </article>
                {/* 중앙기사 - 중앙 최상단 기사*/}
                <article className="center">
                    <div className="center__article">
                        <div className="center__article__img"> 
                            <img src={newsData.length !==0 && centerNews[0].urlToImage ? centerNews[0].urlToImage : null} onClick={showDetailArticle}/>
                        </div>    
                        <div className="center__article__text">
                        <h3 className="center__article__text__headline" onClick={showDetailArticle}>{newsData.length !==0 && centerNews[0].title}</h3>
                        </div>
                    </div>
                    {/* 중앙기사 - 2번째 작은 기사부터 */}
                    <div className="center__article__sub">
                    <div className="center__article__sub__content">
                        {newsData.length !== 0 ? (
                            centerNews.slice(1).map((item, index) => {
                            return item.urlToImage && item.title ? (
                                <div key={index}>
                                <img src={item.urlToImage} alt={item.title} onClick={showDetailArticle} />
                                <h3 className="center__article__sub__text__headline" onClick={showDetailArticle}>{item.title}</h3>
                                </div>
                            ) : null })
                        ) : null}
                        </div>
                    </div>  
                </article>
                {/* 우측기사 - 우측 최상단 기사*/}
                <article className="right">
                    <div className="right__article">
                                <div className="right__article__img">
                                    <img src={newsData.length !==0 && rightNews[0].urlToImage ? rightNews[0].urlToImage : null} onClick={showDetailArticle}/>
                                </div>    
                                <div className="right__article__text">
                                    <h3 className="right__article__text__headline" onClick={showDetailArticle}>{newsData.length !==0 && rightNews[0].title}</h3>
                                </div>
                            </div>
                    {/* 우측기사 - 2번째 작은 기사부터 */}
                    <div className="right__article__sub">
                        <div className="right__article__sub__content">
                        {newsData.length !== 0 ? (
                            rightNews.slice(1).map((item, index) => {
                            return item.urlToImage && item.title ? (
                                <div key={index}>
                                <img src={item.urlToImage} alt={item.title} onClick={showDetailArticle}/>
                                <h3 className="right__article__sub__text__headline" onClick={showDetailArticle}>{item.title}</h3>
                                </div>
                            ) :null })
                        ) : null}
                        </div>
                    </div>    
                </article>
            </div>
           </>
    )
}

export default NewsPaperHeadline