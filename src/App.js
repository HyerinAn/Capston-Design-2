import logo from './logo.svg';
import './App.css';

import React, {useEffect, useState} from "react";
import Makemenu from "./component/nav";
import Makestandard from "./component/standard";
import { firestore,database } from "./firebase";
import $ from 'jquery';

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
      // 클러스터러 사용 시
      // level: 10
  };

  const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  const db = firestore.collection("map"); // firestore collection 접근

  //처음에 옆에 창 안열리게 설정
  document.getElementById("first").style.display="none";
  //처음에 변동 사항이 없습니다. 알림 안뜨게 설정
  document.getElementById("notify").style.display="none";
  //처음에 캡쳐한 이미지 안뜨게 설정
  document.getElementById("capimg").style.display="none";
  //처음에 옆창(도표창) 안뜨게 설정
  document.getElementById("chart_wrap").style.display="none";
  //옆에 x창(두번째 x창) 안뜨게 설정
  document.getElementById("close_btn2").style.display="none";

  document.getElementById("popup").style.display="block";

  var linePaths = [
    {
      //선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
      linePath : [
        new kakao.maps.LatLng(35.17501071921674 , 126.90599208081575),
        new kakao.maps.LatLng(35.173468856972 , 126.90529678225698)
      ]
    },
    {
      linePath : [
        new kakao.maps.LatLng(35.176443121768955 , 126.90502437361847),
        new kakao.maps.LatLng(35.1762089690736 , 126.90527988219107),
        new kakao.maps.LatLng(35.17595690419236 , 126.90568361124701)
      ]
    },
    {
      linePath : [
        new kakao.maps.LatLng(35.17786570083091 , 126.9088540848093),
        new kakao.maps.LatLng(35.17824958388012 , 126.90993226223246)
      ]
    },
    {
      linePath : [
        new kakao.maps.LatLng(35.18057864183477 , 126.90572493118653),
        new kakao.maps.LatLng(35.18070980046131 , 126.90632036379202)
      ]
    }
  ];

  // 지도에 표시할 선을 생성합니다
  var polyline = new kakao.maps.Polyline({
    strokeWeight: 6, // 선의 두께 입니다
    strokeColor: '#386de8', // 선의 색깔입니다
    strokeOpacity: 1.0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid' // 선의 스타일입니다
  });

  var line = new kakao.maps.Polyline({
    // path: linePaths[i].linePath, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 7.5, // 선의 두께 입니다
    strokeColor: 'black', // 선의 색깔입니다
    strokeOpacity: 1.0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid' // 선의 스타일입니다
  });

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
    content += '</div>';

    // circle 그리는 함수
    var cctvInfo = new kakao.maps.CustomOverlay({
      position: cctvPosition,
      content: content,
  });

  var cctvimg = '/img/cctv.png';

  displayCCTVMarker(cctvPosition, cctvimg);

  var mylocationimg = '/img/marker.png';
  
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

    //사진 담을 div를 아이디로 불러옴
    var viewimg = document.getElementById("viewimg");
    //장소 이름 적을 span을 아이디로 불러옴
    var place_name = document.getElementById("place_name");
    place_name.appendChild(document.createTextNode(""));
    //캡쳐한 영상 담을 div를 아이디로 불러옴
    var capimg = document.getElementById("capimg");

    // CCTV 마커 표시 함수
    function displayCCTVMarker(cctvPosition, imageaddress) {
  
      var imageSrc = imageaddress;
      var imageSize = new kakao.maps.Size(40,40);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      
      // cctvmarker 생성
      var cctvmarker = new kakao.maps.Marker({  
          map: map, 
          position: cctvPosition,
          title: allDoc.data().title,
          image: markerImage,
          zIndex: 2,
      }); 

      map.setCenter(cctvPosition); 

      // 클러스터러 그릴 마커 넣기
      var markers = [];
      markers.push(cctvmarker);

      // // 마커 클러스터러 생성
      // var clusterer = new kakao.maps.MarkerClusterer({
      //   map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      //   averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      //   minLevel: 5 // 클러스터 할 최소 지도 레벨 
      // });

      // clusterer.addMarkers(markers);
      
      // 옆에 창 여는 클로저를 만드는 함수
      function openwd(src, name, i) {
        var place_name = document.getElementById("place_name");
        return function(){
          document.getElementById("first").style.display="block";
          viewimg.style.backgroundImage="url("+src+")";
          document.getElementById("place_name").innerHTML = name;
          var db = database.ref('hyein_test');
          db.once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
              //childsnapshot.key = 장소 이름임 (예:전남대 용봉탑)
              if(childSnapshot.key == place_name.innerHTML){
                var db_place = childSnapshot.ref.limitToLast(2);
                //db_place는 장소 밑에 있는 시간에 접근함, limitTolast는 제일 최근 데이터 1개만 불러옴
                db_place.once('value').then((snapshot)=>{
                  snapshot.forEach((childSnapshot)=>{
                    //childsnapshot.key = 시간임 (예 : 4-3_23:03:00)
                    //childsnapshot.val() = {인구수:x, url:y} => 예전 형식
                    //childsnapshot.val() = 인구 수 => 현재 방식
                    // var info = childSnapshot.val();
                    if(childSnapshot.key == 'data_url') {
                    capimg.style.backgroundImage="url("+childSnapshot.val()+")";
                    }
                    else{
                    document.getElementById("people_cnt").innerHTML = "유동 인구 수 : " + childSnapshot.val() + "명";
                    document.getElementById("time_now").innerHTML = childSnapshot.key;
                    }
                  })
                })
              }
            })
          })
          var change_db;
          db.on('child_changed', (data)=>{
            change_db = data;
          })
          document.getElementById("refresh").addEventListener('click',()=>{
            if(typeof(change_db) == 'undefined'){
              document.getElementById("notify").style.display = "block";
              setTimeout(()=>{document.getElementById("notify").style.display = "none";},1000);
            }
            else{
              if(change_db.key == place_name.innerHTML){
                var change_db_place = change_db.ref.limitToLast(2);
                change_db_place.once('value').then((snapshot)=>{
                  snapshot.forEach((childSnapshot)=>{
                    if(childSnapshot.key == 'data_url'){
                      capimg.style.backgroundImage="url("+childSnapshot.val()+")";
                      change_db = undefined
                    }
                    else{
                      document.getElementById("people_cnt").innerHTML = 
                      "유동 인구 수 : " + childSnapshot.val() + "명";
                      document.getElementById("time_now").innerHTML = childSnapshot.key;
                      change_db = undefined
                    }
                  })
                })
              }
              else{
                document.getElementById("notify").style.display = "block";
                setTimeout(()=>{document.getElementById("notify").style.display = "none";},1000);
                change_db = undefined
              }
            }
          })
          line.setPath(linePaths[i].linePath);
          polyline.setPath(linePaths[i].linePath);
          document.getElementById("people_cnt").addEventListener('click',()=>{
            line.setMap(map);
            polyline.setMap(map);
            document.getElementById("capimg").style.display="block";
          });
        }
      }

  function close_line(polyline, line){
    return function(){
      line.setMap(null);
      polyline.setMap(null);
      document.getElementById("capimg").style.display="none";
    }
  }  

  //창 1개만 닫히게 테스트중
  var close_btn1 = document.getElementById("close_btn1");
  var close_btn2 = document.getElementById("close_btn2");
  var chart_btn = document.getElementById("chart1");

 chart_btn.addEventListener('click',()=>{
    document.getElementById("chart_wrap").style.display="block";
    close_btn2.style.display="block";
    close_btn1.style.display="none";
  })
  close_btn2.addEventListener('click',()=>{
    document.getElementById("chart_wrap").style.display="none";
    close_btn2.style.display="none";
    close_btn1.style.display="block";
  })
  close_btn1.addEventListener('click',()=>{
    document.getElementById("first").style.display="none";
  })

kakao.maps.event.addListener(cctvmarker, 'click', close_line(polyline, line));
kakao.maps.event.addListener(cctvmarker, 'click', openwd(allDoc.data().imgsrc, allDoc.data().title, allDoc.data().num));  

 // cctvmarker 마우스오버 시 circle animation 그려짐
kakao.maps.event.addListener(cctvmarker, 'mouseover', function() {
  cctvInfo.setMap(map);
  change_color(cctvmarker.getTitle());
});

function change_color(title){
  var db = database.ref('hyein_test');
      db.once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(childSnapshot.key == title){
            var db_place = childSnapshot.ref.limitToLast(1);
            db_place.once('value').then((snapshot)=>{
              snapshot.forEach((childSnapshot)=>{
                if(Number(childSnapshot.val()) <= 2){
                  $('.dot').css('background-color', '#00D369');
                  // cctvInfo.setContent(
                  //       '<div id = "cctvmarker">' +
                  //       '<div class ="dot" style="animation-delay: -3s; background-color: red">' +
                  //       '</div><div class ="dot" style="animation-delay: -2s; background-color: red"></div>'+
                  //       '<div class ="dot" style="animation-delay: -1s; background-color: red"></div>' +
                  //       '<div class ="dot" style="animation-delay: 0s; background-color: red"></div>' +
                  //       '</div>'
                  // )
                }
                else if(Number(childSnapshot.val()) <= 3){
                  $('.dot').css('background-color', '#FFB100');
                }
                else if(Number(childSnapshot.val()) <= 5){
                  $('.dot').css('background-color', '#FF8040');
                }
                else if(Number(childSnapshot.val()) <= 6){
                  $('.dot').css('background-color', '#DD1F3D');
                }
                else{
                  $('.dot').css('background-color', '#800000');
                }
              })
            })
          }
        })
      })
      var change_db;
        db.on('child_changed', (data)=>{
          change_db = data;
        })
        if(typeof(change_db) == 'undefined'){}
        else{
          if(change_db.key == title){
            var change_db_place = change_db.ref.limitToLast(1);
              change_db_place.once('value').then((snapshot)=>{
                snapshot.forEach((childSnapshot)=>{
                  if(Number(childSnapshot.val()) <= 2){
                    $('.dot').css('background-color', '#00D369');
                  }
                  else if(Number(childSnapshot.val()) <= 3){
                    $('.dot').css('background-color', '#FFB100');
                  }
                  else if(Number(childSnapshot.val()) <= 5){
                    $('.dot').css('background-color', '#FF8040');
                  }
                  else if(Number(childSnapshot.val()) <= 6){
                    $('.dot').css('background-color', '#DD1F3D');
                  }
                  else{
                    $('.dot').css('background-color', '#800000');
                  }
                })
              })
          }
          else{
            change_db = undefined
          }
        }
}

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
  <div>
    <div id='map'style={{width:'100%', height:'100vh', position: 'relative'}}></div>
    <Makemenu></Makemenu>
    <Makestandard></Makestandard>
  </div>
  )
}

export default Kakao;