import {useState, ReactElement} from 'react';
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

  async function onClick() {
    try{
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': type
        },
        body: data
      })

      if (!resp.ok) {
        setTxt(resp.statusText);
        return;
      }
    
      if (resp.headers.get('content-type')?.includes('image')) {
        const blob = await resp.blob()
        setImg(URL.createObjectURL(blob));
      } else {
         const json = await resp.json();
         setTxt(JSON.stringify(json,null,2));

      }
    } catch(e) {
      console.log(e);
    }
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
      <pre>{txt}</pre>
    </div>
  );
}

export default Input;
