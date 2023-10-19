const dotenv = require('dotenv')

// process.env 객체에 삽입 .env 파일의 환경변수 주입
dotenv.config()

module.exports = {
    MONGODB_URL : process.env.MONGODB_URL ,
    JWT_SECRET : process.env.JWT_SECRET ,
}