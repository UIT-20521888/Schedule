
import TableSelect from './table-select.js';
import React, {useState, useContext} from 'react';
import { AppContext } from '../../Context/index.js';
import { checkCourse, procdate, procSchedule, updateSche, delsche } from './proc.js';
import "./table-select.css"

function procCourse(courses) {
    const header = ["Khoa chủ quản HP","Mã HP",	"Tên HP", "Số TC", "Mã LHP", "Tình trạng LHP", "Loại HP", "Lớp sinh viên",
    "SS Tối thiểu"	,"SS Tối đa"	,"SS đã đăng ký"	,"SS còn trống"	,"Phòng học"	,"Độ lệch sức chứa"	,"Ngày BĐ"	,"Ngày KT"	,"Thời khóa biểu"	,"Mã GVGD"	,"Tên GVGD"]
    let results = {
        khoa: courses[header[0]],
        mahp: courses[header[1]],
        tenhp: courses[header[2]],
        sotc: courses[header[3]],
        malhp: courses[header[4]],
        statehp: courses[header[5]],
        loaihp: courses[header[6]],
        lsv: courses[header[7]],
        magv: courses[header[17]],
        tengv: courses[header[18]],
    }

    results.daystart = procdate(courses[header[14]])
    results.dayend = procdate(courses[header[15]])
    results.schedule = (procSchedule(courses[header[16]]))

    return results
}


function TableSelection()
{
    const {valueState, updateState} = useContext(AppContext)
    const header = ["Khoa chủ quản HP","Mã HP",	"Tên HP", "Số TC", "Mã LHP", "Tình trạng LHP", "Loại HP", "Lớp sinh viên",
                                 "SS Tối thiểu"	,"SS Tối đa"	,"SS đã đăng ký"	,"SS còn trống"	,"Phòng học"	,"Độ lệch sức chứa"	,"Ngày BĐ"	,"Ngày KT"	,"Thời khóa biểu"	,"Mã GVGD"	,"Tên GVGD"]                      

    const handleClick = (even) =>
    {
        const value = document.getElementById("label-input").value
        const filteredData = valueState.datatable.filter((row) => {
                return row[header[2]].toLowerCase().includes(value.toLowerCase()) ||
                row[header[0]].toLowerCase().includes(value.toLowerCase()) || row[header[1]].toLowerCase().includes(value.toLowerCase()) 
            });
        console.log(filteredData)
        updateState.setFilters(filteredData);
    }
    const handleChane = (event) => 
    {
        const key = event.target.getAttribute('keys')
        // console.log(valueState.check[key])
        if(!valueState.check[key])
        {
            var update = valueState.courses
            const new_courses = procCourse(valueState.dataFind[key])
            const check = checkCourse(update, new_courses)
            if (!check.breakmap)
            {
                update[key] = new_courses
                updateState.setCourses(update)
                updateState.setCredits(valueState.credits + new_courses.sotc)
                const new_schedule = updateSche(new_courses, valueState.tableSchedule)

                updateState.setTableSchedule(new_schedule)
            }
            else{
                alert(`Bị trùng với lớp ${check.match}`)
            }
        }
        else{
            var update = valueState.courses
            let del = update[key]
            delete update[key]
            // console.log(update)
            updateState.setCourses(update)
            updateState.setCredits(valueState.credits - del.sotc)
            const new_schedule = delsche(del, valueState.tableSchedule)
            updateState.setTableSchedule(new_schedule)
        }
        const updatecheck = valueState.check
        updatecheck[key] = !valueState.check[key]
        updateState.setCheck(updatecheck)
    }

    return (<div className="subject">
        <div className="search">
            <input type="text" id='label-input' placeholder="Search theo khoa, học phần, ..."/>
            <button onClick={handleClick}>Search</button>
        </div>
        <div className="div-subject">
            <table className="table-select" cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <th className='table-header'>Check</th>
                        {
                            header.map(value =>
                                <th className='table-header'>{value}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        valueState.filters.map((row) => (
                        <tr key={row[header[4]]}>
                            <td>
                                <input type="checkbox" className="checkbox" keys={row["Mã LHP"]} id={row["Mã LHP"]} checked={valueState.check[row["Mã LHP"]]} onChange = {handleChane}></input>
                                </td>
                            {
                                header.map(value => <td>{row[value]}</td>)
                            }
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    </div>)
}

export default TableSelection