const express = require('express');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { isAuth } = require('../auth');
const convert = require('xml-js');
const jsdom = require('jsdom');

router.get('/getXY', isAuth, expressAsyncHandler(async (req, res) => {
  fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${req.user.addressDetail}`,{
    method : 'GET',
    headers : {
      'Conent-Type' : 'application/json;charset=UTF-8',
      'Authorization' : `KakaoAK ${process.env.KAKAO_REST_API_KEY}`
    },
  })
  .then(r => r.json())
  .then(d => {
    const { documents } = d;
    const { x, y } = documents[0];
    console.log(x , y)
    // res.json({ x, y });
    fetch(`https://apigw.tmoney.co.kr:5556/gateway/saStationByPosGet/v1/stationinfo/getStationByPos?serviceKey=01234567890&tmX=205627.3&tmY=445315.4&radius=1500&busRouteType=1`,{
      method : 'GET',
      headers : {
        'x-Gateway-APIKey' : `${process.env.GET_BUSSTATION_BY_XY}`,
        'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept' : 'application/xml',
        'Cache-Control' : 'no-cache'
      },
      cache : 'no-cache',
      // body : {
      //   'serviceKey' : '01234567890'
      // }
    })
    .then(r => {
      console.log(r);
      return r.text();})
    // .then(d => {
    //   console.log(d);
    //   const dom = new jsdom.JSDOM(d);
    //   return dom;
    // })
    .then(data => {
      const result = convert.xml2js(data, {compact : true});
      res.status(200).json({ result });
    })
  })
}))

module.exports = router;