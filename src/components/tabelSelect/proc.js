export const procdate = (date) =>
{
    let result = ''
    if(typeof date === "number")
    {
        let new_date = (date - 25569)*60*24*60*1000;
        new_date = new Date(new_date)
        const year = new_date.getFullYear();
        const month = new_date.getMonth() + 1;
        const day = new_date.getDate();
        // console.log(`${day}/${month}/${year}`)
        result = `${day}-${month}-${year}`
    }
    else{
        if (date !== '')
        {
            let new_date = new Date(date)
            const year = new_date.getFullYear();
            const month = new_date.getMonth() + 1;
            const day = new_date.getDate();
            result = `${day}-${month}-${year}`
        }
    }
    return result
}

export const procSchedule = (schedule) =>
{
    let result = []
    const day = {
        "Thứ Hai": 2,
        "Thứ Ba": 3,
        "Thứ Tư": 4,
        "Thứ Năm": 5,
        "Thứ Sáu": 6,
        "Thứ Bảy": 7,
        "Chủ Nhật": 8
    }
    if (schedule !== "")
    {
        schedule.split(";").map((item) => 
        {
            item = item.trim()
            item = item.split(" ")
            const obj = {
                thu: day[item[0] + " " + item[1]],
                phong: item[4]
            }
            const hour = item[2].replace(/[()]/g,"")
            obj.hourStart = +hour.split('-')[0]
            obj.hourEnd = +hour.split('-')[1]
            result.push(obj)
        })
    }
    return result
}

export const checkCourse = (allcourse,course) => {
    
    let breakmap = false
    let match = ""
    for( const key in allcourse )
    {
        if (breakmap) return false 
        if (allcourse.hasOwnProperty(key))
        {
            const value = allcourse[key]
            // console.log(value)
            // {
            //     for(var i = 0; i < )
            // }
            value.schedule.map((val1) =>{
                if(breakmap) return
                course.schedule.map((val2) =>{
                    if(breakmap) return
                    if(val1.thu == val2.thu)
                    {
                        // console.log(val1)
                        // console.log(val2)
                        if(val1.hourStart >= val2.hourStart && val1.hourStart <= val2.hourEnd|| 
                            val2.hourStart >= val1.hourStart&& val2.hourStart <= val1.hourEnd)
                            {
                                breakmap = true
                                match = value.malhp
                            }
                    }
                })
            })
        }
    }
    if (breakmap) return {breakmap, match}
    return {breakmap, match} 
}

export const updateSche = (new_course, tableOld) => {
    // console.log(new_course)
    // console.log(tableOld)
    let tableNew = tableOld;
    new_course.schedule.map(value => 
    {
        const obj = { tenhp: new_course.tenhp,
                        malhp: new_course.malhp,
                        tengv: new_course.tengv,
                        daystart: new_course.daystart,
                        dayend: new_course.dayend,
                        hourStart: value.hourStart,
                        hourEnd: value.hourEnd,
                        phong: value.phong,
        }
        tableNew[value.hourStart - 1][value.thu - 1] = obj
        for( let j = value.hourStart ; j < value.hourEnd ; j++ ){
            tableNew[j][value.thu - 1] = null
        }
        
    })
    // console.log( tableNew)
    return tableNew
}

export const delsche = (del, tableOld) =>
{
    const tableNew = tableOld

    del.schedule.map(value => 
        {
            tableNew[value.hourStart - 1][value.thu - 1] =  value.hourStart - 1
            for( let j = value.hourStart ; j < value.hourEnd; j++ ){
                tableNew[j][value.thu - 1] = j
            }
        })
    return tableNew
}