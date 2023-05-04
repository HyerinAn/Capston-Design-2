import React from "react";
// import React, {useEffect, useState} from "react";
import './stdstyle.css';

function Makestandard(){
    return(
        <div id="popup">
            <table>
                <tbody>
                    <tr>
                        <td><img src="/img/green.png" width={20} height={20}></img></td>
                        <td>여유</td>
                    </tr>
                    <tr>
                        <td><img src="/img/yellow.png" width={20} height={20}></img></td>
                        <td>보통</td>
                    </tr>
                    <tr>
                        <td><img src="/img/red.png" width={20} height={20}></img></td>
                        <td>혼잡</td>
                    </tr>
                    <tr>
                        <td><img src="/img/red2.png" width={20} height={20}></img></td>
                        <td>매우 혼잡</td>
                    </tr>
                    <tr>
                        <td><img src="/img/maroon.png" width={20} height={20}></img></td>
                        <td>위험</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Makestandard;