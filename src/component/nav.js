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
                        <span id="people_cnt"></span>
                    </div>
                    <div id="chart">
                        <Chart></Chart>
                    </div>
                </div>
            </div>
            <div id="close_btn">
                <img src="/img/x.png" width="15px" height="15px" alt="close"></img>
            </div>

            <div id ="chart_wrap"></div>
        </div>
        
        
    )
}

export default Makemenu;