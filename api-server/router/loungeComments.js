const express = require('express')
const app = express()

const LoungeComment = require('../models/LoungeComment')
const router = express.Router()
const expressAsyncHandler = require('express-async-handler')

app.use(express.json())

router.get('/', expressAsyncHandler (async(req, res) => { // 모든 댓글을 가져온다.
    const loungeComments = await LoungeComment.find({})
    res.json(loungeComments)
}))

router.post('/', expressAsyncHandler(async(req, res)=> { // 댓글등록
    const loungeComments = new LoungeComment({
        nickname: req.body.nickname,
        password: req.body.password,
        text: req.body.text,
        parent : req.body.parent,
    })
    const createdLoungeComment = await loungeComments.save()
    res.status(201).json(createdLoungeComment)
}))

router.post('/edit', expressAsyncHandler(async(req, res)=> { // 비밀번호검증
    const loungeComment = await LoungeComment.findOne({
        _id : req.body._id,
        password: req.body.password
    })
    if(loungeComment){
        res.status(200).json()
        console.log('비밀번호가 일치합니다.')
    }else{
        res.status(404).json({message: 'loungeChat not found'})
        console.log('비밀번호가 일치하지 않습니다.')
    }
}))

router.put('/edit', expressAsyncHandler(async(req, res) => {  // 댓글수정
    const loungeComment = await LoungeComment.findOne({
        _id: req.body._id,
        password: req.body.password
    })
    console.log(req.body.id)
    if(loungeComment){
        loungeComment.text = req.body.text || loungeComment.text

        const updatedLoungeComment = await loungeComment.save()
        res.status(201).json(updatedLoungeComment)
    }else{
        res.status(404).json({message: '비밀번호가 일치하지 않습니다.'})
    }
}))

router.delete('/delete', expressAsyncHandler(async(req, res) => { // 댓글삭제
    const loungeComment = await LoungeComment.findOneAndDelete({
        _id: req.body._id,
        password: req.body.password
    })
    if(loungeComment){
        res.status(201).json({message: '글이 삭제되었습니다'})
}else{
    res.status(404).json({message: '비밀번호가 일치하지 않습니다.'})
}
}))

module.exports = router