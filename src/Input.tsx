import {useState, ReactElement} from 'react';
import axios from 'axios';
import endpoint from './api/endpoint';

function Input():ReactElement {
  const [type, setType] = useState("");
  const [data, setData] = useState<ArrayBuffer | string | null | undefined>(null);
  const [img, setImg] = useState<string | undefined>(undefined);
  const [txt, setTxt] = useState<string>("");

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setType(e.target.files![0].type);

    const reader = new FileReader();
    reader.onload = (e) => {
      setData(e.target!.result)
    }
    reader.readAsArrayBuffer(e.target.files![0]);
  }
  
  function readJson(data: Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      setTxt(reader.result as string);
    }
    reader.readAsText(data);
  }

  function onClick() {
    axios.post(endpoint, data, {
      headers: {
        'Content-Type': type
      },
      responseType: 'blob'
    }).then(function (res) {
      if (res.headers['content-type'].includes('image')) {
        setImg(URL.createObjectURL(res.data));
      } else {
        readJson(res.data as Blob);
      }
    }).catch(function (e) {
      console.log(e);
    });
  }

  return (
    <div className="input-box">
      <form>
        <input type="file" onChange={(e) => onFileChange(e)}/>
        {!data ?
          <button type="button" disabled>Upload</button> :
          <button type="button" onClick={() => onClick()}>Upload</button>
        }
      </form>
      <img src={img} alt="" />
      <pre>{txt? JSON.stringify(JSON.parse(txt!),null,2) : null}</pre>
    </div>
  );
}

export default Input;
