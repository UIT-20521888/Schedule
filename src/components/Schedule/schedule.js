import "./schedule.css"
import React from "react"
import {useState, useContext} from 'react';
import { AppContext } from '../../Context/index.js';
import { delsche }  from "../tabelSelect/proc"
 
export default function Schedule()
{
    const { valueState, updateState } = useContext(AppContext)
    const handClicking = (event) =>
    {
        const key = event.target.getAttribute('keys')
        let update = valueState.courses
        let del = update[key]
        updateState.setCredits(valueState.credits - del.sotc)
        const new_schedule = delsche(del, valueState.tableSchedule)
        updateState.setTableSchedule(new_schedule)
        delete update[key]
        updateState.setCourses(update)
        const updatecheck = valueState.check
        updatecheck[key] = !valueState.check[key]
        updateState.setCheck(updatecheck)
    }

    return (<table className="schedule-table" id="schedule-table" cellPadding="0px" cellSpacing="0px">
            <tr>
                <th className="hours">
                    Tiết
                </th>
                <th>
                    Thứ 2
                </th>
                <th>
                    Thứ 3
                </th>
                <th>
                    Thứ 4
                </th>
                <th>
                    Thứ 5
                </th>
                <th>
                    Thứ 6
                </th>
                <th>Thứ 7</th>
                <th>Chủ nhật</th>
            </tr>
            { 
            valueState.tableSchedule.map((row1, index) =>
            <tr>
                {
                    row1.map((col1, index1) =>{

                        if(typeof col1 == "number")
                        {
                            return <td className={(index1 === 0) ? "hours":null} >{(index1 === 0) ? index + 1:null}</td>
                        }
                        else{
                            if(col1 !== null )
                            {
                                let nrow = - col1.hourStart + col1.hourEnd + 1
                                // console.log(col1)
                                return <td rowspan={nrow} className="activity">
                                    <span className="header" >{col1.malhp}</span>
                                    <span >{col1.tenhp}</span>
                                    <span >{col1.tengv}</span>
                                    <span >P.{col1.phong}</span>
                                    <span >BĐ: {col1.daystart}</span>
                                    <span >KT: {col1.dayend}</span>
                                    <span className="cancel-course" onClick={handClicking}>
                                        <i class="fa-solid fa-x" keys={col1.malhp}></i>
                                    </span>
                                    </td>
                            }
                        }
                    })
                }
            </tr>
            )}
    </table>)
}