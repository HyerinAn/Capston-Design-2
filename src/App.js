import logo from './logo.svg';
import './App.css';

import React, {useEffect, useState} from "react";
import { firestore } from "./firebase";

const { kakao } = window;

function Kakao(){


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

  const db = firestore.collection("map"); // firestore collection 접근


  db.doc("cctv").get().then((doc) => {
    
    // cctv 좌표
    const cctvPosition = new kakao.maps.LatLng(doc.data().latitude, doc.data().longitude);

    // 지도에 표시할 원을 생성합니다
    var circle = new kakao.maps.Circle({
      center : cctvPosition,  // 원의 중심좌표 입니다 
      radius: 50, // 미터 단위의 원의 반지름입니다 
      strokeWeight: 5, // 선의 두께입니다 
      strokeColor: '#75B8FA', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'dashed', // 선의 스타일 입니다
      fillColor: '#CFE7FF', // 채우기 색깔입니다
      fillOpacity: 0.7,  // 채우기 불투명도 입니다
      //text: "15"   
    }); 

    // 지도에 원을 표시합니다 
    circle.setMap(map);

    var content = doc.data().people;

    var cctvInfo = new kakao.maps.CustomOverlay({
      position: cctvPosition,
      content: content,

  });
  cctvInfo.setMap(map);

  
    //displayMarker(cctvPosition, message)
    
  });

  const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  const options = { 
	    center: new kakao.maps.LatLng(33.450701, 126.570667), 
	    level: 3 
  };

  const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

 
if (navigator.geolocation) {
    
  // GeoLocation을 이용해서 접속 위치 얻어옴
  navigator.geolocation.getCurrentPosition(function(position) {
      
      var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
      
      var locPosition = new kakao.maps.LatLng(lat, lon); // 좌표 생성
   
      displayMarker(locPosition, message);
          
    });
  
} else {
  
  var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
      message = '위치 추적'
      
  displayMarker(locPosition, message);
}

// 마커 표시 함수
function displayMarker(locPosition, message) {

  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", 
    imageSize = new kakao.maps.Size(24, 35); // 마커이미지의 크기
    //imageOption = {offset: new kakao.maps.Point(24, 35)}; 

  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
  
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({  
      map: map, 
      position: locPosition,
      //image: markerImage
  }); 

  
  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);      
}    

  window.addEventListener('resize', detectSize)
  return() => {
    window.removeEventListener('resize', detectSize)
  }



}, [windowDimension])

  return(
  
  <div id='map'
  style={{
    width:'100%', 
    height:'650px'}}
  >
  </div>

  )
}

export default Kakao;



