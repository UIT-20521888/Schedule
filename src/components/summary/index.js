import './summary.css';
import React from 'react';
import { AppContext } from '../../Context';

function Courses(props)
{
    return (<li>{props.course}</li>);
}

function Summary(){
    const {valueState, updateState } = React.useContext(AppContext)
    const value = valueState.credits
    const nameCourse = Object.values(valueState.courses)
    // console.log(nameCourse)
    return (<div className="summary-selected">
        <h2>Tổng quan về lựa chọn của bạn</h2>
        <p>Tổng số tín chỉ: {value}</p>
        <h3>Các môn bạn đã chọn</h3>
        <ul>
            {
                nameCourse.map((value) => {
                    return  <li>{value.tenhp}</li>
                })
            }
        </ul>
    </div>)
}

export default Summary;