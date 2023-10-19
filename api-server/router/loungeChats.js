const express = require('express')
const app = express()

const LoungeChat = require('../models/LoungeChat')
const LoungeComments = require('../models/LoungeComment')
const router = express.Router()
const expressAsyncHandler = require('express-async-handler')

app.use(express.json())

router.get('/', expressAsyncHandler (async(req, res, next) => { // 모든 글을 가져온다.
    const loungeChats = await LoungeChat.find({})
    res.json(loungeChats)
}))

router.post('/', expressAsyncHandler(async(req, res, next)=> {
    const loungeChats = new LoungeChat({
        nickname: req.body.nickname,
        password: req.body.password,
        text: req.body.text,
    })
    const createdLoungeChat = await loungeChats.save()
    res.status(201).json(createdLoungeChat)
}))

router.post('/edit', expressAsyncHandler(async(req, res, next)=> {
    const loungeChat = await LoungeChat.findOne({
        _id : req.body._id,
        password: req.body.password
    })
    if(loungeChat){
        res.status(200).json()
        console.log('비밀번호가 일치합니다.')
    }else{
        res.status(404).json({message: 'loungeChat not found'})
        console.log('비밀번호가 일치하지 않습니다.')
    }
}))

router.put('/edit', expressAsyncHandler(async(req, res, next) => {  
    const loungeChat = await LoungeChat.findOne({
        _id: req.body._id,
        password: req.body.password
    })
    console.log(req.body.id)
    if(loungeChat){
        loungeChat.text = req.body.text || loungeChat.text

        const updatedLoungeChat = await loungeChat.save()
        res.status(201).json(updatedLoungeChat)
    }else{
        res.status(404).json({message: '비밀번호가 일치하지 않습니다.'})
    }
}))

router.delete('/delete', expressAsyncHandler(async(req, res, next) => {
    console.log(req.body)
    const loungeChat = await LoungeChat.findOneAndDelete({
        _id: req.body._id,
        password: req.body.password
    })
    const loungeComment = await LoungeComments.deleteMany({parent: req.body._id}) // 원글 하위의 댓글들도 삭제
    if(loungeChat && loungeComment){
        res.status(201).json({message: '글이 삭제되었습니다'})
}else{
    res.status(404).json({message: '비밀번호가 일치하지 않습니다.'})
}
}))

module.exports = router