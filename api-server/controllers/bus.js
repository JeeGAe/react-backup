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

// 내 지역 버스 정류장 조회
const getUserRegionBusStation = expressAsyncHandler(async (req, res, next) => {
  const busStaion = await BusStation.find({});
  const userAddressDetail = req.user.addressDetail;
  let userRegionBusStation = busStaion.filter(d => userAddressDetail.includes(d['관리도시명']));
  req.busStation = userRegionBusStation;
  next();
    // 전체 정류장 얻는 API
  // fetch(`https://api.odcloud.kr/api/15067528/v1/uddi:eb02ec03-6edd-4cb0-88b8-eda22ca55e80?page=64&perPage=10000`,{
  //   method : 'GET',
  //   headers : {
  //     'Content-Type' : 'application/json',
  //     'Authorization' : `Infuser ${process.env.BUS_REST_API_KEY}`
  //   }
  // })
  // .then(r => r.json())
  // .then(r => {
  //   // 유저 지역에 있는 정류장만 추출
  //   userRegionBusStation = r.data.filter(d => userAddressDetail.includes(d['관리도시명']));
  //   console.log(userRegionBusStation);
  //   req.busStation = userRegionBusStation;
  //   next();
  // })
  
})

module.exports = {
  getUserRegionBusStation,
}