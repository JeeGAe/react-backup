const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const expressAsyncHandler = require('express-async-handler');
const { isAuth } = require('../auth');
const { Types : { ObjectId } } = require('mongoose');

// 투두 등록
router.post('/', isAuth, expressAsyncHandler(async (req, res) => {
  const todos = await Todo.find({ userId : req.user._id });
  const id = todos[todos.length - 1]?.id + 1 || 0;
  let typeImg = '';
  if(req.body.deadline){
    typeImg = '📆';
  }else if(req.body.primary){
    typeImg = '⭐️';
  }else if(req.body.routine){
    typeImg = '🔄';
  }
  const todo = new Todo({
    id : id,
    title : req.body.title,
    deadline : req.body.deadline? new Date(req.body.deadline + 32400000) : req.body.deadline,
    primary : req.body.primary,
    routine : req.body.routine,
    typeImg : typeImg,
    userId : new ObjectId(req.user._id)
  })

  const newTodo = await todo.save();
  if(!newTodo){
    res.status(401).json({ code : 401, message : 'Invalid new todo'});
  }else{
    res.status(200).json({ code : 200, message : 'save new todo'})
  }
}))
// 투두 전체 조회
router.get('/', isAuth, expressAsyncHandler(async (req, res) => {
  const SearchDoneTodos = await Todo.find({ 
    userId : req.user._id,
    isDone : true });
  const initRoutine = SearchDoneTodos.map(todo => {
    if(todo.routine && todo.routineDoneTime?.getDate() !== new Date(new Date().getTime() + 32400000).getDate()){
      todo.isDone = false;
    }
    return todo;
  });
  initRoutine.forEach(async todo => {await todo.save()});
  const todos = await Todo.find({ isDone : false });
  const doneTodos = await Todo.find({ isDone : true });
  res.status(200).json({ code : 200, todos, doneTodos });
}))
// 투두 완료
router.put('/done/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const todo = await Todo.findOne({ 
    userId : req.user._id,
     _id : req.params.id });
  todo.isDone = !todo.isDone;
  if(todo.routine){
    const today = new Date();
    todo.routineDoneTime = new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0 ,0).getTime()+32400000);
  }
  const updateTodo = await todo.save();
  if(!updateTodo){
    res.status(401).json({ code : 401, message : 'Invalid done todo'});
  }else{
    res.status(200).json({ code : 200, message : 'success done or no done'});
  }
}))
// 투두 삭제
router.delete('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndDelete({ _id : req.params.id });
  if(!todo){
    res.status(401).json({ code : 401, messgae : 'Invalid delete todo'});
  }else{
    res.status(200).json({ code : 200, message : 'Success delete'});
  }
}))
// 투두 수정
router.put('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const todo = await Todo.findById({ 
    userId : req.user._id,
    _id : req.params.id });
  todo.title = req.body.title;
  const updateTodo = await todo.save();
  if(!updateTodo){
    res.status(401).json({ code : 401, message : 'Invalid modify todo'});
  }else{
    res.status(200).json({ code : 200, message : 'Success modify'});
  }
}))

module.exports = router;