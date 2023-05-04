import styled from 'styled-components';
import { Line, Bar, getElementAtEvent } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

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