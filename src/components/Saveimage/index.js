import "./saveimage.css"
import domtoimage from "dom-to-image";

export default function Saveimage()
{
    const handleClick = () =>
    {
        const table = document.querySelector("#schedule-table")
        // console.log(table);
        domtoimage
        .toPng(table,{ style: { filter: 'none' }, quality: 1, scale: 2 })
        .then((dataUrl) => {

          const img = new Image();
            img.src = dataUrl;

            const link = document.createElement('a');
            link.download = 'table.png';
            link.href = dataUrl;
            link.click();

        })
        .catch((e) => {
          console.log(e);
        });
    }
    return <div className="save-image">
        <button onClick={handleClick}>Lưu hình ảnh</button>
    </div>
}