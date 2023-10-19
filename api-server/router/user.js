const express = require('express')
const User = require('../models/User')
const expressAsyncHandler = require('express-async-handler')
const { generateToken, isAuth } = require('../auth')
const { v4 : uuidv4 } = require('uuid'); 
const { mailOpt, sendMail } = require('../emailAuth')
const router = express.Router()

router.get('/', expressAsyncHandler( async(req, res) => {
    const users = await User.find({})
    res.json(users)
}))

router.post('/register', expressAsyncHandler( async(req, res, next) => {
    const user = new User({
        userId : req.body.userId ,
        password : req.body.password ,
        name : req.body.name,
        keyword : req.body.keyword ,
        address : req.body.address ,
        addressDetail : req.body.addressDetail
    })
    const newUser = await user.save()

    if(!newUser) {
        res.status(401).json({ code : 401 , message : 'Invalid User Data' })
    } else {
        const { userId, keyword, address, name } = newUser
        res.json({
            code : 200 ,
            token : generateToken(newUser) ,
            userId, keyword, address, name
        })
    }
}))

router.post('/login',expressAsyncHandler( async (req, res) => {
    const loginUser = await User.findOne({
        userId : req.body.userId ,
        password : req.body.password ,
    })
    
    if(!loginUser) {
        res.status(401).json({ code : 401, message : '이메일이 존재하지 않거나 비밀번호가 일치하지 않습니다'})
    } else {
        const { userId, keyword, address, name } =loginUser
        res.json({
            code : 200 , 
            token : generateToken(loginUser) ,
            userId, keyword, address , name
        })
    }
}))


router.get('/isLogin',isAuth, (req, res) => {
    res.status(200).json({code : 200, name: req.user.name, keyword : req.user.keyword, address : req.user.address})
})

router.get('/logout', (req, res) => {
    // res.clearCookie('accessToken');
    res.status(200).json({ code : 200, message: 'logout'});
})

router.post('/searchPassword',expressAsyncHandler(async(req, res) => {
    const user = await User.findOne({
        userId : req.body.userId ,
    })
    console.log(user)
    try {
        if(!user || user === '' || user === null) {
            return res.status(401).json({ code : 401 , message : '이메일을 찾을 수 없습니다.'})
        } else {
            const uuid = uuidv4()
            console.log(uuid)
            user.password = uuid || user.password
            const passwordSearchUser = await user.save()
            const { userId, password }= passwordSearchUser
            const mailOption = mailOpt(passwordSearchUser)
            sendMail(mailOption)
            return res.status(200).json({ code : 200 , message : "입력하신 이메일로 임시 비밀번호를 전송 했습니다" , userId, password})
        }
    } catch(error) {
        console.log(error)
    }
}))

// 회원정보 수정 전 유저 확인
router.post('/passwrodVerify', isAuth, expressAsyncHandler(async (req, res) => {
    const searchUser = await User.findOne({ userId : req.user.userId, password : req.body.password });

    if(!searchUser){
        res.status(401).json({ code : 401, message : 'Invalid modify user' })
    } else {
        const { name, keyword, address } = searchUser;
        res.status(200).json({ code : 200, name, keyword, address });
    }
}))

router.put('/modify', isAuth, expressAsyncHandler(async (req, res) => {
    const searhUser = await User.findOne({ userId : req.user.userId });
    if(!searhUser){
        res.status(401).json({ code : 401, message : 'Invalid modify user'});
    } else {
        searhUser.name = req.body.name || searhUser.name;
        searhUser.password = req.body.password || searhUser.password;
        searhUser.keyword = req.body.keyword || searhUser.keyword;
        searhUser.address = req.body.address || searhUser.address;
        const updatedUser = await searhUser.save();
        res.status(200).json({ code : 200, token : generateToken(updatedUser)});
    }
}))

module.exports = router