const mongoose = require('mongoose');
const expressAsyncHandler = require('express-async-handler');

const BusStation = mongoose.model('busStation', new mongoose.Schema({
  정류장번호 : {
    type : String
  },
  정류장명 : {
    type : String
  },
  위도 : {
    type : String
  },
  경도 : {
    type : String
  },
  모바일단축번호 : {
    type : String
  },
  도시명 : {
    type : String
  },
  관리도시명 : {
    type : String
  },
}));

const SeoulBusStation = mongoose.model('seoulBusStation', new mongoose.Schema({
  정류장번호 : {
    type : String
  },
  모바일단축번호 : {
    type : String
  },
  정류소명 : {
    type : String
  },
  경도 : {
    type : String
  },
  위도 : {
    type : String
  },
}));

// 내 지역 버스 정류장 조회
const getUserRegionBusStation = expressAsyncHandler(async (req, res, next) => {
  const userAddress = req.user.address;
  const userAddressDetail = req.user.addressDetail;
  if(userAddress.includes('서울') || userAddressDetail.includes('서울')){
    const busStaion = await SeoulBusStation.find({});
    console.log('bus:',busStaion)
    req.busStation = busStaion;
    next();
  } else {
    const busStaion = await BusStation.find({});
    let userRegionBusStation = busStaion.filter(d => userAddressDetail.includes(d['관리도시명']) || userAddress.includes(d['관리도시명']));
    if(userRegionBusStation.length === 0){
      userRegionBusStation = busStaion.filter(d => d['관리도시명'].includes('경기'));
      if(userRegionBusStation.length === 0){
        userRegionBusStation = busStaion.filter(d => d['관리도시명'].includes('TSBIS'));
      }
    }
    req.busStation = userRegionBusStation;
    next();
  }  
})

const getBusStaionInfo = expressAsyncHandler(async (req, res, next) => {
  const userAddress = req.user.address;
  const userAddressDetail = req.user.addressDetail;
  const busStationId = req.params.id;
  if(userAddress.includes('대전') || userAddressDetail.includes('대전')){
    fetch(`http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByUid?arsId=${busStationId}&serviceKey=${process.env.BUS_REST_API_KEY_ENCODED}`,{
      method : 'GET'
    })
    .then(r => r.text())
    .then(r => {
      req.busStationInfo = r;
      next();
    })
  }
})
module.exports = {
  getUserRegionBusStation,
  getBusStaionInfo,
}