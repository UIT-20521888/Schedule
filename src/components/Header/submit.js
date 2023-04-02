import React from "react";
import { useState, useContext } from "react";
import { AppContext } from "../../Context";
import procCourses from "./procCourses";
import * as XLSX from "xlsx";


function FileUploader() {
  const header = ["Khoa chủ quản HP","Mã HP",	"Tên HP", "Số TC", "Mã LHP", "Tình trạng LHP", "Loại HP", "Lớp sinh viên",
  "SS Tối thiểu"	,"SS Tối đa"	,"SS đã đăng ký"	,"SS còn trống"	,"Phòng học"	,"Độ lệch sức chứa"	,"Ngày BĐ"	,"Ngày KT"	,"Thời khóa biểu"	,"Mã GVGD"	,"Tên GVGD"]
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);
  const {valueState, updateState} = useContext(AppContext);

  function handleFileInputChange(event) {
    setSelectedFile(event.target.files[0])
  }

  async function HandleSubmit(event) {
    event.preventDefault()
    
    let data = await selectedFile.arrayBuffer()
    let wb = XLSX.read(data)
    let sheet_name = wb.SheetNames
    let new_data = []
    // console.log(sheet_name)
    for(var i = 1; i < sheet_name.length; i++) {

      let row = XLSX.utils.sheet_to_json(wb.Sheets[sheet_name[i]], {
        header: 1,
        defval: '',
        blankrows:true});
      new_data.push({khoa: sheet_name[i], row: row});
    }
    let resultData = procCourses(new_data)
    // console.log(resultData.data)
    updateState.setDatatable(resultData.data)
    updateState.setFilters(resultData.data)
    updateState.setDataFind(resultData.dataFind)
    updateState.setCheck(resultData.check)
    // console.log(resultData.check)
    // console.log(valueState.datatable)
    alert("Đã Upload thành công")
  }
  
  return(
    <div>
        <input type="file" onChange={handleFileInputChange} accept=".xlsx" />
        <button type="submit" onClick={(e) => HandleSubmit(e)} >Upload</button>
    </div>
  )
}
export default FileUploader;