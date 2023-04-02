import './header.css';
import FileUploader from './submit.js';


function Header() 
{
    return <div className="header" >
        <h2>HCMUE Schedule</h2>
        <p>Tool giúp dễ dàng sắp xếp thời khóa biểu</p>
        <FileUploader></FileUploader>
    </div>
}

export default Header