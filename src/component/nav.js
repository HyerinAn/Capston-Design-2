import React from "react";
// import React, {useEffect, useState} from "react";
import './navstyle.css';

// function doDisplay(){
//     var con = document.getElementById("first");
//     if(con.style.display=="none"){
//         con.style.display="block";
//     }else{
//         con.style.display="none";
//     }
// }

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
                </div>
            </div>
            <div id="close_btn">
                <img src="/img/x.png" width="15px" height="15px" alt="close"></img>
            </div>
        </div>
    )
}

export default Makemenu;