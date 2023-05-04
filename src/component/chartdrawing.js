import styled from 'styled-components';
import { Line, Bar, getElementAtEvent } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// import { firestore, database } from "./src/firebase";

// const db = firestore.collection("map");

// var place_name = document.getElementById("place_name");
// place_name.appendChild(document.createTextNode(""));
// //캡쳐한 영상 담을 div를 아이디로 불러옴
// var capimg = document.getElementById("capimg");

// db.once('value').then(function(snapshot){
//   snapshot.forEach(function(childSnapshot){
//     //childsnapshot.key = 장소 이름임 (예:전남대 용봉탑)
//     if(childSnapshot.key == place_name.innerHTML){
//       var db_place = childSnapshot.ref.limitToLast(1);
//       //db_place는 장소 밑에 있는 시간에 접근함, limitTolast는 제일 최근 데이터 1개만 불러옴
//       db_place.once('value').then((snapshot)=>{
//         snapshot.forEach((childSnapshot)=>{
//           //childsnapshot.key = 시간임 (예 : 4-3_23:03:00)
//           //childsnapshot.val() = {인구수:x, url:y}
//           var info = childSnapshot.val();
//           document.getElementById("people_cnt").innerHTML = "유동 인구 수 : " + info['유동 인구 수'] + "명";
//           capimg.style.backgroundImage="url("+info['data_url']+")";
//           document.getElementById("time_now").innerHTML = childSnapshot.key;
//           console.log(childSnapshot.key);
//         })
//       })
//     }
//   })
// })


const HourData = {
  type: 'bar',
    labels: ['01', '02', '03', '04', '05', '06'],
    datasets: [{
        label: 'HOUR',
        backgroundColor: 'rgb(135,206,250)', // lightskyblue
        data: [1, 2, 3, 4, 5, 6],
        hoverBackgroundColor: 'rgb(30,144,255)', //dodgerblue
        //hoverBorderColor: 'rgb(30,144,255)',
      },
    ],
  };

  const MinuteData = {
    type: 'bar',
    labels: [10, 20, 30, 40, 50, 60],
    datasets: [
      {
        label: 'MINUTE',
        backgroundColor: 'rgb(135,206,250)', // lightskyblue
        data: [
          1, 2, 3, 4, 5, 6
        ],
        hoverBackgroundColor: 'rgb(30,144,255)', //dodgerblue
      }
    ]
  }

  const config = {
    type: 'bar',
    data: HourData,
    options: {
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true,
          beginZero: true
        }
      }
    }
  };

  const config2 = {
    type: 'bar',
    data: MinuteData,
    options: {
      scales: {
        y: {
          beginZero: true
        }
      }
    }
  };

  // const ctx = document.getElementById('HourChart');
  // const HourChart = new Chart(
  //   ctx,
  //   config
  // );

// const ctx2 = document.getElementById('MinuteChart');
//   const MinuteChart = new Chart(
//     ctx2,
//     config2
//   );

  // function clickHanler(click){
  //   const points = HourChart.getElementsAtEventForMode(click, 'nearest', {
  //     intersect: true}, true);
  //     console.log(points.length);
  //     // if(points.length == 1){
        
  //     //   const bg = points[0].element.options.backgroundColor;
  //     //   const bc = points[0].element.options.borderColor;
  //     //   const label = points[0].element.$contest.raw.x;

  //     //   MinuteChart.config.data.datasets[0].backgroundColor = bg;
  //     //   MinuteChart.update();
  //     // }
  //   }
  //   ctx.onclick = clickHanler;

function Chartdraw (){

  return (
    
    <Container>
    <Bar type = 'bar' data={HourData}/>
    <Bar type = 'bar' data={MinuteData}/>
  </Container>
  
  );
};

export default Chartdraw;

const Container = styled.div`
width: 348.8px;

`;

 