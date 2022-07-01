
import { useState } from 'react';

import {useNavigate} from "react-router-dom"
import { JSON_}  from './Uploads';

const baseUrl = "http://localhost:8000";

let csvImp = JSON_;
let colImp = Object.keys(JSON_[0]);


function Clean() {
    const navigate = useNavigate();
    let columnDrop =[];
    const [csvJSON, updateCsvJSON] = useState([""]);
    const [csvColumns, updateCsvColumns] = useState([""]);
    //JSON_ = csvJSON;


    const handleButtonChange =    (e) =>{
      console.log(columnDrop)
      let csvJSONTemp = csvJSON.slice();
      let csvColumnsTemp = csvColumns.slice()
    for (let m = 0; m< columnDrop.length; m++)
    {
      delete csvColumnsTemp[csvColumns.indexOf(columnDrop[m])];
      for (let n = 0; n< csvJSONTemp.length; n++)
      {
        
        delete (csvJSONTemp[n])[columnDrop[m]];
      
    
    
    
      }
    
  
  
  
    }
    columnDrop =[];
  updateCsvColumns(csvColumnsTemp);
  updateCsvJSON(csvJSONTemp);

  navigate("/Analysis");
    }
  
  



  return (



    
   
<div>



{
  //<p> {JSON.stringify(row, null, 2)}</p>
csvImp.map((row,i)=> {
  console.log(
    "innnnn"
  )
if(i < 10 ){
 

return(<div>


<p> {JSON.stringify(row, null, 2)}</p>

</div>)

}





})}
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
