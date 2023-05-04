import React from "react";
// import React, {useEffect, useState} from "react";
import './navstyle.css';
import Chart from "./chartdrawing";

function Makemenu(){
    return(
        <div id="first">
            <div id="menu_wrap">
                <div id="menu">
                    <div id="viewimg"></div>
                    <div id="placebox">
                        <span id="place_name"></span>
                    </div>
                    <div id="peoplebox">
                        <a id="people_cnt">유동 인구 수 : </a>
                    </div>
                    <div id="timebox">
                        <span id="time_now"></span>
                        <img id="refresh" src="/img/reload.png" width="17px" height="17px"></img>
                    </div>
                    <div id="notifybox">
                        <span id="notify">변동 사항이 없습니다.</span>
                    </div>
                    <div id="capimg"></div>
                    <div id="chart1">
                        <Chart></Chart>
                    </div>
                </div>
            </div>

            <div id ="chart_wrap">
                <div id="chart2">
                    <Chart></Chart>
                    <Chart></Chart>
                    <Chart></Chart>
                    <Chart></Chart>
                </div>
            </div>

            <div id="close_btn1">
                <img src="/img/x.png" width="15px" height="15px" alt="close"></img>
            </div>
            <div id="close_btn2">
                <img src="/img/x.png" width="15px" height="15px" alt="close"></img>
            </div>
        </div>
    )
}

export default Makemenu;