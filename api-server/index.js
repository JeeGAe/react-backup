const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()

const port = 5300
const corsOptions = {
    origin : 'http://127.0.0.1:3000',
    credentials : true ,
}

// 몽고디비 연결
mongoose.connect(config.MONGODB_URL)
.then( () => console.log('mongodb connect ...'))
.catch(e => console.log(`faild to connect mongodb ${e}`))

// 미들웨어 설정
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// 라우터 설정
const loginRouter = require('./router/user')
const foodRouter = require('./router/food')
const loungeChat = require('./router/loungeChats')
const loungeComment = require('./router/loungeComments')
const scheduleRoute = require('./router/schedule')
const todoRoute = require('./router/todo')


// 라우터 적용
app.use('/user', loginRouter)
app.use('/food', foodRouter)
app.use('/lounge', loungeChat)
app.use('/loungeComment', loungeComment)
app.use('/api/schedule', scheduleRoute);
app.use('/api/todo', todoRoute)

// 에러처리 미들웨어
app.get('/error', (req, res, next) => {
    throw new Error('서버에 치명적인 에러가 발생했습니다.')
})

app.use((req, res, next) => { // 사용자가 요청한 페이지가 없는 경우 에러 처리
    res.status(404).send('Page not Found')
})

app.use((err, req, res, next) => { // 서버내부 오류처리
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
})
app.listen(port, '0.0.0.0', () => {
    console.log(`server is runnig on port ${port}...`)
})