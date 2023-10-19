const nodeMailer = require('nodemailer')

const mailPoster = nodeMailer.createTransport({
    service: 'gmail' ,
    auth : {
        user : '' , // 본인 구글 아이디
        pass : '' , // 본인 구글 비밀번호
    }
})

const mailOpt = (user) => {
    const mailOptions = {
        from : '' , // 보낼 email
        to : user.userId ,
        subject : "비밀번호 변경 코드 입니다. 꼭 다시 변경해 주시기 바랍니다." ,
        text : user.password ,
    }
    return mailOptions
}

const sendMail = (mailOptions) => {
    mailPoster.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(' 에러 ' , error)
        } 
        else {
            console.log(' 전송 완료 ' , info.response)
        }
    })
}
module.exports = {
    mailOpt ,
    sendMail ,
}