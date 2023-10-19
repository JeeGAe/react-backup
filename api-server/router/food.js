const express = require('express')
const app = express() 
const expressAsyncHandler = require('express-async-handler');
const Foods = require('../models/foods')

const router = express.Router()

app.use(express.json())

router.post('/' ,expressAsyncHandler (async(req, res, next)=> {
    // cors 오류 설정
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    const foodList = await Foods.find(
        { ADDR : { $regex: /^대전광역시 서구 둔산동 /}}
    ).limit(10)
    if(!foodList) {
        res.status(400).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , foodList})
    }
}))

router.get('/category/:id/:address', expressAsyncHandler (async(req, res, next) => {
    let startAddressIndex = req.params.address.lastIndexOf('동')
    console.log(startAddressIndex)
    const address = req.params.address.substr(0,startAddressIndex + 1)
    const categoryFoodList = await Foods.find({
        $and : [
            { TOB_INFO : req.params.id },
            { ADDR : { $regex: address }}
        ]        
    })
    console.log(categoryFoodList)
    if(!categoryFoodList) {
        res.status(400).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , categoryFoodList})
    }
}))

router.get('/search/:id/:address', expressAsyncHandler (async(req, res, next) => {
    const searchFoodList = await Foods.find({
        $and : [
            { REST_NM : { $regex : req.params.id }},
            // { ADDR : { $regex: req.params.address }}
        ]
    })
    if(searchFoodList.length === 0) {
        res.status(400).json({code : 400 , message : "검색데이터를 찾을 수 없습니다."})
    } else {
        res.status(200).json({code : 200 , searchFoodList})
    }
}))

router.post('/discription/:id/:address', expressAsyncHandler (async(req, res, next) => {
    let startAddressIndex = req.params.address.lastIndexOf('동')
    const address = req.params.address.substr(0,startAddressIndex + 1)
    const discriptionFood = await Foods.findOne({
        $and : [
            { REST_NM : { $regex : req.params.id }},
            { ADDR : { $regex: address }}
        ]
    })
    if(!discriptionFood) {
        res.status(401).json({code : 400 , message : "Request is invalid"})
    } else {
        res.status(200).json({code : 200 , discriptionFood})
    }
}))

router.get('/hashTag/type=:type&tag=:tag/:address', expressAsyncHandler (async(req, res, next) => {
    let startAddressIndex = req.params.address.lastIndexOf('동')
    const address = req.params.address.substr(0,startAddressIndex + 1)
    const hashTagFoodList = await Foods.find({
        $and : [
            { TOB_INFO : { $regex: req.params.type}},
            { RPRS_MENU_NM : { $regex : req.params.tag }},
            { ADDR : { $regex: address }},
        ]
    })
    console.log(hashTagFoodList)
    if(!hashTagFoodList) {
        res.status(400).json({code : 400 , message : "Request is invalid"})
    } else if(hashTagFoodList.length === 0){
        res.status(204).json({code : 204 , message : "데이터를 찾을 수 없습니다"})
    } else {
        res.status(200).json({code : 200 , hashTagFoodList})
    }
}))


module.exports = router