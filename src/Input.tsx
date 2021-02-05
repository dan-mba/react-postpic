import React, {useState} from 'react';
import axios from 'axios';
import {endpoint} from './api/endpoint';

function Input() {
  let [type, setType] = useState("");
  let [data, setData] = useState<ArrayBuffer | string | null | undefined>(null);
  let [img, setImg] = useState<string | undefined>(undefined);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setType(e.target.files![0].type);

    const reader = new FileReader();
    reader.onload = (e) => {
      setData(e.target!.result)
    }
    reader.readAsArrayBuffer(e.target.files![0]);
  }

  function onClick() {
    axios.post(endpoint, data, {
      headers: {
        'Content-Type': type
      },
      responseType: 'blob'
    }).then(function (res) {
      setImg(URL.createObjectURL(res.data));
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
    </div>
  );
};

export default Input;
