export default function procvalue(course)
{
    let header = ["Khoa chủ quản HP", "Mã HP",	"Tên HP", "Số TC", "Mã LHP", "Tình trạng LHP", "Loại HP", "Lớp sinh viên",
                                 "SS Tối thiểu"	,"SS Tối đa"	,"SS đã đăng ký"	,"SS còn trống"	,"Phòng học"	,"Độ lệch sức chứa"	,"Ngày BĐ"	,"Ngày KT"	,"Thời khóa biểu"	,"Mã GVGD"	,"Tên GVGD"]
    let data = []
    let dataFind = {}
    let check = {}
    course.map((val1, index1) => {
        val1.row.map((val2, index2) => {
            if(!val2[1] ||val2[0] == header[0] || val2[1] == header[0])
            {
                
            }
            else{
                let row = {}
                header.map((v, e) => {
                    if(val2[0])
                    {
                        row[v] = val2[e]
                    }
                    else{
                        row[v] = val2[e + 1]
                    }
                })
                data.push(row)
                dataFind[row["Mã LHP"]] = row
                check[row["Mã LHP"]] = false
            }

        })
    })
    return {data, dataFind, check}
}