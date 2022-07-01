
import { useState } from 'react';
import logo from './logo.svg';
import axios from "axios";
import {useNavigate} from "react-router-dom"

const baseUrl = "http://localhost:8000";

export var JSON_= [{"HEKKO": "gg"}];


function Clean() {
    const navigate = useNavigate();
    let columnDrop =[];
    const [csvFiles, updateCsvFiles] = useState({"file": "jkhjgvc"});
    const [csvJSON, updateCsvJSON] = useState([""]);
    const [csvColumns, updateCsvColumns] = useState([""]);
    JSON_ = csvJSON;


 
  



  return (
   
<div>
<h1> Clean data</h1>
    <p>Pick a column to drop</p>


{


colImp.map((col, j) => {


return(
//onClick ={ )=>columnDrop.push(col) }
<button id = {col}  onClick ={ ()=> {columnDrop.push(col)}  }
>
{col}
  
</button>



)




}
)
}

<br></br>
<br></br>
<button  onClick ={ ()=> { handleButtonChange()}  } > Done</button>
   
    
    
    </div>

    
  );


}


export default Clean;
