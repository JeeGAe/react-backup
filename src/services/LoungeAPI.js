import React, {useState, useEffect} from "react";

function LoungeAPI(){
    const [lounge, setLounge] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try{
        const response = await fetch('http://127.0.0.1:5300/lounge', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const loungeData = await response.json()
        setLounge(loungeData)
    }
catch(err){
        console.log(err)
    }
}
fetchData()
}, [])
    return lounge
}

export default LoungeAPI