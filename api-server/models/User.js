const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema ({
    userId : {
        type : String ,
        required : true , 
        unique : true,
    } , 
    password : {
        type : String ,
        require : true , 
    },
    name :{
        type : String ,
        require : true ,
    },
    keyword : {
        type : String ,
    },
    address : {
        type : String , 
        require : true ,
    },
    addressDetail : {
        type : String,
    },
    isState : {
        type  : Boolean ,
        default : false , 
    }
})

const User = mongoose.model('User' , userSchema)
module.exports = User