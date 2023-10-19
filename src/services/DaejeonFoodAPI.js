import React, {useEffect, useState} from "react";

function DaejeonFoodAPI() {
    const [foodApiData, setFoodApiData] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:5300/food')
        .then(res => res.json())
        .then(result => {
            console.log(result)
            setFoodApiData(result)
        },[])
    }) 
    return foodApiData
}
export default DaejeonFoodAPI