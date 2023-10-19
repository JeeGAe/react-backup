const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const loungeChatSchema = new Schema({
    nickname: {
        type: String,
        reuired: true,
    },
    password: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // mongodb 스키마 정의 시, 타입이 Date인 필드의 default는 함수로 설정해야 한다. 만약 defulat를 new Date()로 설정할 경우, 특정 시점에 반환된 Date객체를 계속해서 사용하므로 예상치 못한 값이 db에 저장될 것이다.
    },
    lastModifiedAt: {
        type: Date,
        default: Date.now,
    },
    depth: {
        type: Number,
        default: 0,
    }
})

const LoungeChat = mongoose.model('loungeChats', loungeChatSchema);
module.exports = LoungeChat