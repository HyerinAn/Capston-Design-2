import logo from './logo.svg';
import './App.css';

import React, {useEffect, useState} from "react";
import Makemenu from "./component/nav";
import { firestore } from "./firebase";
import $ from 'jquery';

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
    
    var container = document.getElementById('map'), //지도를 담을 영역의 DOM 레퍼런스
    options = { 
          center: new kakao.maps.LatLng(33.450701, 126.570667), 
          level: 10
    };
  
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    
    //처음에 옆에 창 안열리게 설정
    document.getElementById("first").style.display="none";
    //test위한 default 설정(디자인 확인하려고)
    // document.getElementById("viewimg").style.backgroundImage='url("/place_img/용봉탑.png")';
    // document.getElementById("place_name").innerHTML = '전남대 용봉탑';
    // document.getElementById("people_cnt").innerHTML = 'test하는 중..';

  if (navigator.geolocation) {
      
    // GeoLocation을 이용해서 접속 위치 얻어옴
    navigator.geolocation.getCurrentPosition(function(position) {
        
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        
        var locPosition = new kakao.maps.LatLng(lat, lon); // 좌표 생성
            message = '<div style="padding:5px;">여기에 계신가요?!</div>'
        displayMarker(locPosition, message);
      });
    
  } else {
    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
        message = 'geolocation을 사용할수 없어요..'
    displayMarker(locPosition, message);
  }
  
  // 현위치 마커 표시 함수
  function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({  
        map: map, 
        position: locPosition
    }); 

    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, marker);
  
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);      
  }    

  // 마커 한개만 할 때 아래코드
  // var imageSrc = "/img/marker.png", 
  //       imageSize = new kakao.maps.Size(40,40), // 마커이미지의 크기
  //       imageOption = {offset: new kakao.maps.Point(27, 69)}; 
  
  // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
  //       markerPosition = new kakao.maps.LatLng(35.1751, 126.9059);
  
  // var marker = new kakao.maps.Marker({
  //   position : markerPosition,
  //   image : markerImage
  // });

  //사진 담을 div를 아이디로 불러옴
  var viewimg = document.getElementById("viewimg");
  //장소 이름 적을 span을 아이디로 불러옴
  var place_name = document.getElementById("place_name");
  place_name.appendChild(document.createTextNode(""));

  //마커 여러개의 위치
  var positions = [
    {
      title:'전남대 용봉탑',
      lating: new kakao.maps.LatLng(35.1751, 126.9059),
      imageSrc:"/place_img/용봉탑.png"
      // title:'동래역 자이 아파트 앞',
      // lating: new kakao.maps.LatLng(35.20632793760689, 129.0807318037113),
      // imageSrc:"/place_img/용봉탑.png"
    },
    {
      title:'도서관 정보마루',
      lating: new kakao.maps.LatLng(35.1766, 126.9057),
      imageSrc:"/place_img/정보마루.jpg"
    },
    {
      title:'공과대학 7호관',
      lating: new kakao.maps.LatLng(35.1782, 126.9092),
      imageSrc:"/place_img/공대7.jpg"
    },
    {
      title:'전남대학교 생활관',
      lating: new kakao.maps.LatLng(35.1809, 126.9054),
      imageSrc:"/place_img/기숙사.png"
    }
  ]

  //오버레이 만드는 코드
  // for(var i=0; i<positions.length; i++){
    // var content = '<div class="customoverlay">' +
    // '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
    // '    <span class="title">구의야구공원</span>' +
    // '  </a>' +
    // '</div>';
  
  // var overlay = new kakao.maps.CustomOverlay({
  //   content: content,
  //   position: positions[i].lating,
  //   yAnchor : 1     
  // });
  
  //클러스터러 위해서 존재하는 마크를 다 담음
  var markers = [];
  var imageSrc = "/img/marker.png"
  var imageSize = new kakao.maps.Size(40,40);
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  //마커 여러개 만드는 코드
  for(var i=0; i<positions.length; i++){
    var marker = new kakao.maps.Marker({
      map:map,
      position : positions[i].lating,
      title : positions[i].title, 
      image:markerImage
    });

  //오버레이를 element 생성하여 만듦(그래야 오버레이 닫아짐)
  // var content = document.createElement('div');
  // content.className = "customoverlay";
  // var anchor = document.createElement('a');
  // anchor.href = 'https://map.kakao.com/link/map/11394059';
  // anchor.target="_blank"
  // content.appendChild(anchor);
  // var info = document.createElement('span');
  // info.className = "title";
  // info.appendChild(document.createTextNode(positions[i].title))
  // anchor.appendChild(info);
  // var closeBtn = document.createElement('button');
  // closeBtn.appendChild(document.createTextNode('닫기'));
  // content.appendChild(closeBtn);

  var outercontainer = document.createElement("div");
  var container = document.createElement('div');
  container.id = "container";
  outercontainer.appendChild(container);
  var circle1 = document.createElement('div');
  var circle2 = document.createElement('div');
  var circle3 = document.createElement('div');
  var circle4 = document.createElement('div');
  circle1.style.animationDelay="-3s";
  circle2.style.animationDelay="-2s";
  circle3.style.animationDelay="-1s";
  circle4.style.animationDelay="0s";
  circle1.className = "circle";
  circle2.className = "circle";
  circle3.className = "circle";
  circle4.className = "circle";
  container.appendChild(circle1)
  container.appendChild(circle2)
  container.appendChild(circle3)
  container.appendChild(circle4)

  var overlay = new kakao.maps.CustomOverlay({
    content: outercontainer,
    position: marker.getPosition() 
  });

    markers.push(marker);

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다 
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    // kakao.maps.event.addListener(marker, 'click', clicklistener(map, overlay)); 
    // closeBtn.addEventListener('click', makeOutListener(overlay));
    kakao.maps.event.addListener(marker, 'mouseover', clicklistener(map, overlay)); 
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(overlay)); 
    kakao.maps.event.addListener(marker, 'click', openwd(positions[i].imageSrc, positions[i].title));
  }

  // 마커 클러스터러를 생성합니다 
  var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
    minLevel: 5 // 클러스터 할 최소 지도 레벨 
});

  clusterer.addMarkers(markers);
  
  // 오버레이를 표시하는 클로저를 만드는 함수입니다 
function clicklistener(map, overlay) {
  return function(){
  overlay.setMap(map);
  }
}
// 오버레이를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(overlay) {
  return function(){
    overlay.setMap(null);
    }
}

// 옆에 창 여는 클로저를 만드는 함수
function openwd(src, name) {
  return function(){
    document.getElementById("first").style.display="block";
    viewimg.style.backgroundImage="url("+src+")";
    document.getElementById("place_name").innerHTML = name;
    document.getElementById("people_cnt").innerHTML = 'test하는 중..';
    }
}

var close_btn = document.getElementById("close_btn");
close_btn.addEventListener('click',function(){
    document.getElementById("first").style.display="none";
})

// viewimg.style.backgroundImage='url("/img/marker.png")';

    window.addEventListener('resize', detectSize)
    return() => {
      window.removeEventListener('resize', detectSize)
    }
  
  }, [windowDimension])
  
    return(  
      <div>
        <div id='map'style={{width:'100%', height:'100vh', position:'relative'}}></div>
        <Makemenu></Makemenu>
      </div>
      )
  }

export default Kakao;
