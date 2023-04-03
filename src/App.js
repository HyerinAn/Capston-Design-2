import logo from './logo.svg';
import './App.css';

import React, {useEffect, useState} from "react";
import { firestore } from "./firebase";

const { kakao } = window;


function Kakao(){


  // widnow 창 resize 조정 부분
  const [windowDimension, detectW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })

  const detectSize = () => {
    detectW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }


useEffect(() => {

  const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  const options = { 
      center: new kakao.maps.LatLng(33.450701, 126.570667), 
      level: 3 
  };

  const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  const db = firestore.collection("map"); // firestore collection 접근

  // firestore에 있는 data 불러오는 부분 -> 해당 data 이용하는 함수 생성 시 이 안에서 짜야함
  db.get().then((result) => { result.forEach( (allDoc) => {

    console.log(allDoc.data());
    
    //cctv 좌표
    const cctvPosition = new kakao.maps.LatLng(allDoc.data().latitude, allDoc.data().longitude);
    console.log(allDoc.data());

    // cctvmarker 마우스오버 시 그려질 circle animation 부분
    var content = '<div id = "cctvmarker">';
    content += '<div class ="dot" style="animation-delay: -3s">';
    content += '</div><div class ="dot" style="animation-delay: -2s"></div>'; 
    content += '<div class ="dot" style="animation-delay: -1s"></div>';
    content += '<div class ="dot" style="animation-delay: 0s"></div>';
    content += '<div/>';

    // circle 그리는 함수
    var cctvInfo = new kakao.maps.CustomOverlay({
      position: cctvPosition,
      content: content,
  });


  var cctvimg = '/image/cctv.png';

  displayCCTVMarker(cctvPosition, cctvimg);

  var mylocationimg = '/image/marker.png';
  
  if (navigator.geolocation) {
      
    // GeoLocation을 이용해서 접속 위치 얻어옴
    navigator.geolocation.getCurrentPosition(function(position) {
        
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        
        var locPosition = new kakao.maps.LatLng(lat, lon); // 좌표 생성
     
        displayMarker(locPosition, mylocationimg);
            
      });
    
  } else {
  
    
    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
        message = '위치 추적'
    
    displayMarker(locPosition, mylocationimg);
  }
  
  // 현위치 마커 표시 함수
  function displayMarker(locPosition, imageaddress) {
  
    var imageSrc = imageaddress;
    var imageSize = new kakao.maps.Size(40,40);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    
    // 현위치 마커를 생성
    var marker = new kakao.maps.Marker({  
        map: map, 
        position: locPosition,
        image: markerImage
    }); 
  
    // 중심좌표를 접속위치로 변경
    map.setCenter(locPosition);     
    
  }
    // CCTV 마커 표시 함수
    function displayCCTVMarker(cctvPosition, imageaddress) {
  
      var imageSrc = imageaddress;
      var imageSize = new kakao.maps.Size(40,40);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      
      // cctvmarker 생성
      var cctvmarker = new kakao.maps.Marker({  
          map: map, 
          position: cctvPosition,
          image: markerImage,
          zIndex: 2,
      }); 

      map.setCenter(cctvPosition); 

 // cctvmarker 마우스오버 시 circle animation 그려짐
kakao.maps.event.addListener(cctvmarker, 'mouseover', function() {

     cctvInfo.setMap(map);
});

// 마우스아웃 시 circle 사라짐
kakao.maps.event.addListener(cctvmarker, 'mouseout', function() {

    cctvInfo.setMap(null);
  
});
   
  }    
  }); 
   
  });


  window.addEventListener('resize', detectSize)
  return() => {
    window.removeEventListener('resize', detectSize)
  }



}, [windowDimension])

  return(
  
  <div id='map'
  style={{
    width:'100%', 
    height:'100vh',
    position: 'relative',
  }}
  >
  </div>

  )
}

export default Kakao;



