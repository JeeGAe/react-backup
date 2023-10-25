// 유저 주소 위도, 경도 얻기
const getUserLocation = (req, res, next) => {
  const userAddressDetail = req.user.addressDetail;
  // 주소로 위도, 경도 얻는 API
  fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${userAddressDetail}`,{
    method : 'GET',
    headers : {
      'Conent-Type' : 'application/json;charset=UTF-8',
      'Authorization' : `KakaoAK ${process.env.KAKAO_REST_API_KEY}`
    },
  })
  .then(r => r.json())
  .then(r => {
    console.log(r.documents)
    if(r.documents){
      const { documents } = r;
      const { x, y } = documents[0];
      req.userLocation = { x, y };
    }
    next()
  })
}

module.exports = {
  getUserLocation,
}