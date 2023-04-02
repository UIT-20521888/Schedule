import { useState} from "react";
import React from 'react';

export const AppContext = React.createContext('default value');

function AppProvider( {children} )  
{
    let table = []
    for(let i = 0; i < 12; i++) {
        const row = []
        for(let j = 0; j < 8; j++) {
            row.push(j)
        }
        table.push(row)
    }
    const [ tableSchedule, setTableSchedule ] = useState(table)
    const [ filters, setFilters ] = useState([])
    const [ datatable, setDatatable ] = useState([])
    const [ courses, setCourses ] = useState({})
    const [ dataFind, setDataFind ] = useState([])
    const [ credits, setCredits ] = useState(0)
    const [ check, setCheck ] = useState({})

    const valueState = { datatable, courses, credits, dataFind,  tableSchedule, filters, check }
    const updateState = { setDatatable, setCourses, setCredits, setDataFind, setTableSchedule, setFilters, setCheck }
    const data = {valueState, updateState}
    // const [user, setUser] = useState("Jesse Hall");

    return (
    <AppContext.Provider value={data}>
        {children}
    </AppContext.Provider>
    )
}
export default AppProvider