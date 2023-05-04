import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import { Line, Bar, getElementAtEvent } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { firestore, database } from "../firebase";
import Makemenu from "./nav";

const { kakao } = window;


var place_name = document.getElementById("place_name");
// document.getElementById("first").style.display="block";
var db = database.ref('hyein_test');
db.once('value').then(function(snapshot){
  snapshot.forEach(function(childSnapshot){
    //childsnapshot.key = 장소 이름임 (예:전남대 용봉탑)
    if(childSnapshot.key == place_name.innerHTML){
      var db_place = childSnapshot.ref.limitToLast(1);
      //db_place는 장소 밑에 있는 시간에 접근함, limitTolast는 제일 최근 데이터 1개만 불러옴
      db_place.once('value').then((snapshot)=>{
        snapshot.forEach((childSnapshot)=>{
          //childsnapshot.key = 시간임 (예 : 4-3_23:03:00)
          //childsnapshot.val() = {인구수:x, url:y}
          // var info = childSnapshot.val();
          // document.getElementById("people_cnt").innerHTML = "유동 인구 수 : " + info['유동 인구 수'] + "명";
          document.getElementById("time_now").innerHTML = childSnapshot.key;
         

          var now = childSnapshot.key;
          var people = childSnapshot.val();

          console.log(childSnapshot.val());
          console.log(childSnapshot.key);
        })
      })
    }

  })
})

          const HourData = {  
            type: 'bar',
            
              labels: ['50분전', '40분전', '30분전', '20분전', '10분전', 'now'],
              datasets: [{
                  label: 'minute',
                  backgroundColor: 'rgb(135,206,250)', // lightskyblue
                  data: [3, 2, 6, 4, 5, 6],
                  hoverBackgroundColor: 'rgb(30,144,255)', //dodgerblue
                  //hoverBorderColor: 'rgb(30,144,255)',
                },
              ],
            };

            const config = {
              type: 'line',
              data: HourData,
              options: {
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Chart.js Line Chart - Cubic interpolation mode'
                    },
                  },
                scales: {
                  x: {
                    stacked: true
                  },
                  y: {
                    stacked: true,
                    beginZero: true
                  }
                },
                suggestedMin: -10,
                suggestedMax: 200
              }
              
            };
          

function initialChart (){

return (
              
<Container>
    <Bar type = 'bar' data={HourData}/>
</Container>
            
      );
          };



export default initialChart;

const Container = styled.div`
width: 348.8px;

`;

 