const express = require('express');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const Schedule = require('../models/Schedule');
const { isAuth } = require('../auth');
const { Types : { ObjectId } } = require('mongoose');

// 모든 스케줄 리스트 조회
router.get('/', isAuth, expressAsyncHandler(async (req, res) => {
  const scheduleList = await Schedule.find({ userId : req.user._id });
  if(!scheduleList){
    res.status(404).json({ code : 404, message : 'not found schedule list'})
  }else{
    res.json({ code : 200, scheduleList})
  }
  
}))

// 신규 스케줄 등록
router.post('/', isAuth, expressAsyncHandler(async (req, res) => {
  const schedule = Schedule({
    start : new Date(req.body.start),
    end : new Date(req.body.end),
    title : req.body.title,
    description : req.body.description,
    userId : new ObjectId(req.user._id)
  })

  const newSchedule = await schedule.save();
  if(!newSchedule){
    res.status(401).json({ code : 401, message : 'Invalid schedule'});
  }else{
    res.status(200).json({ code : 200, message : 'new schedule register!'})
  }
}))

// 하나의 스케줄 조회
router.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const schedule = await Schedule.findOne({ 
    userId : req.user._id, 
    _id : req.params.id });
  if(!schedule){
    res.status(404).json({ code : 404, message : 'not found schedule list'})
  }else{
    res.json({ schedule })
  }
}))
// 스케줄 삭제
router.delete('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const schedule = await Schedule.deleteOne({ 
    userId : req.user._id,
    _id : req.params.id });
  res.status(200).json({ code : 200, message : 'delete schedule'})
}))
// 스케줄 수정
router.put('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const schedule = await Schedule.findOne({ 
    userId : req.user._id,
    _id : req.params.id });
  if(!schedule){
    res.status(404).json({ code : 404, message : 'Not Found modify schedule'})
  }else{
    schedule.title = req.body.title || schedule.title;
    schedule.description = req.body.description || schedule.description;
    const updateSchedule = await schedule.save();
    res.status(200).json({ schedule : updateSchedule })
  }
}))

module.exports = router;