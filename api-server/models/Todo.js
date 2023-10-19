const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  id : {
    type : Number,
    require : true
  },
  title : {
    type : String,
    require : true,
  },
  deadline : {
    type : Date
  },
  primary : {
    type : Boolean
  },
  routine : {
    type : Boolean
  },
  routineDoneTime : {
    type : Date
  },
  isDone : {
    type : Boolean,
    default : false
  },
  isSuccess : {
    type : Boolean
  },
  typeImg : {
    type : String,
  },
  userId : {
    type : mongoose.Types.ObjectId,
    require : true,
  },
})

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;