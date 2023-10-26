const express = require('express');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { isAuth } = require('../auth');
const convert = require('xml-js');
const jsdom = require('jsdom');
const { getUserLocation } = require('../controllers/kakaoMap');
const { getUserRegionBusStation, getBusStaionInfo } = require('../controllers/bus');

// router.get('/getXY', isAuth, expressAsyncHandler(async (req, res) => {
//   fetch(`https://api.odcloud.kr/api/15067528/v1/uddi:eb02ec03-6edd-4cb0-88b8-eda22ca55e80`,{
//     method : 'GET',
//     headers : {
//       'Content-Type' : 'application/json',
//       'Authorization' : `Infuser ${process.env.BUS_REST_API_KEY}`
//     }
//   })
//   .then(res => res.json())
//   .then(res => console.log(res))
//   fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=서울특별시 용산구 한강대로 405`,{
//     method : 'GET',
//     headers : {
//       'Conent-Type' : 'application/json;charset=UTF-8',
//       'Authorization' : `KakaoAK ${process.env.KAKAO_REST_API_KEY}`
//     },
//   })
//   .then(r => r.json())
//   .then(d => {
//     const { documents } = d;
//     const { x, y } = documents[0];
//     console.log(x, y)
//     fetch(`https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${x}&y=${y}&input_coord=WGS84&output_coord=TM`,{
//                 method : 'GET',
//                 headers : {
//                     'ContentType' : 'application/json;charset=UTF-8 ',
//                     'Authorization' : `KakaoAK ${process.env.KAKAO_REST_API_KEY}`
//                 }
//             })
//             .then(res => res.json())
//             .then(data => res.json({ data }))
//   })
// }))

// router.get('/getCloseStation', isAuth, expressAsyncHandler(async (req, res) => {
//   const tmX = req.query.tmX;
//   const tmY = req.query.tmY;
//   console.log(tmX, tmY)
//   fetch(`https://apigw.tmoney.co.kr:5556/gateway/saStationByPosGet/v1/stationinfo/getStationByPos?serviceKey=01234567890&tmX=${tmX}&tmY=${tmY}&radius=1000&busRouteType=1`,{
//       method : 'GET',
//       headers : {
//         'x-Gateway-APIKey' : `${process.env.GET_BUSSTATION_BY_XY}`,
//         'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
//         'Accept' : 'application/xml',
//         'Cache-Control' : 'no-cache'
//       },
//       cache : 'no-cache',
//     })
//     .then(r => {
//       console.log(r);
//       return r.text();})
//     // .then(d => {
//     //   console.log(d);
//     //   const dom = new jsdom.JSDOM(d);
//     //   return dom;
//     // })
//     .then(data => {
//       const result = convert.xml2js(data, {compact : true});
//       res.status(200).json({ code : 200, result });
//     })

// }))
router.get('/getUserNearBusStation', isAuth, getUserRegionBusStation, getUserLocation, expressAsyncHandler(async (req, res) => {
  const busStations = [...req.busStation];
  const userLocation = req.userLocation;
  const userAddress = req.user.address;
  const userAddressDetail = req.user.addressDetail;
  if(userAddress.includes('서울') || userAddressDetail.includes('서울')){
    const nearBusStation = busStations.filter(b => {
      return (Math.abs(parseFloat(b['경도'])-parseFloat(userLocation.x)) <= 0.005 && Math.abs(parseFloat(b['위도'])-parseFloat(userLocation.y)) <= 0.005)});
    if(!nearBusStation){
      res.status(404).json({ code : 404, message : 'Not found near bus-station'});
    } else {
      res.status(200).json({ code : 200, region: '서울', nearBusStation, userLocation });
    }
  } else {
    const nearBusStation = busStations.filter(b => {
      return (Math.abs(parseFloat(b['경도'])-parseFloat(userLocation.x)) <= 0.005 && Math.abs(parseFloat(b['위도'])-parseFloat(userLocation.y)) <= 0.005)});
    if(!nearBusStation){
      res.status(404).json({ code : 404, message : 'Not found near bus-station'});
    } else {
      res.status(200).json({ code : 200, region: '지역', nearBusStation, userLocation });
    }
  }
  
}))

router.get('/getBusStationInfo:id', isAuth, getBusStaionInfo, expressAsyncHandler(async (req, res) => {
  const dom = new jsdom.JSDOM(req.busStationInfo);
  const result = convert.xml2js(dom, {compact : true});
  res.status(200).json({ code : 200, result });
}))

module.exports = router;