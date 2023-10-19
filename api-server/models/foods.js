const mongoose = require('mongoose')

const { Schema } = mongoose

const { Types : { ObjectId }} = Schema

const foodSchema = new Schema({
    REST_ID : {
        type : Number,
        trim : true , 
    },
    REST_NM: {
        type : String ,
        trim : true ,
    },
    ADDR: {
        type : String ,
        trim : true ,
    },
    DADDR: {
        type : String ,
        trim : true ,
    },
    TELNO: {
        type : String ,
        trim : true ,
    },
    OPEN_HR_INFO: {
        type : String ,
        trim : true ,
    },
    TOB_INFO: {
        type : String ,
        trim : true ,
    },
    RPRS_MENU_NM: {
        type : String ,
        trim : true ,
    },
    LAT: {
        type : String ,
        trim : true ,
    },
    LOT: {
        type : String ,
        trim : true ,
    },
    MENU_ID: {
        type : Number ,
        trim : true ,
    },
    MENU_KORN_NM: [{type : String}],
    MENU_ENG_NM: [{type : String}],
    MENU_AMT: [{type : String}],
    MENU_KORN_ADD_INFO: [{type : String}],
    MENU_ENG_ADD_INFO: [{type : String}],
    SD_ID: {
        type : Number ,
        trim : true ,
    },
    SD_NM: {
        type : String ,
        trim : true ,
    },
    SD_URL: {
        type : String ,
        trim : true ,
    },
    SD_ID: [{type : String}],

})
const Foods = mongoose.model('foods', foodSchema)
module.exports = Foods