
import { useState } from 'react';
import logo from './logo.svg';
import axios from "axios";
import {useNavigate} from "react-router-dom"

const baseUrl = "http://localhost:8000";

export let JSON_= [{"HEKKO": "gg"}];


function Uploads() {
    const navigate = useNavigate();
    let columnDrop =[];
    const [csvFiles, updateCsvFiles] = useState({"file": "jkhjgvc"});
    const [csvJSON, updateCsvJSON] = useState([""]);
    const [csvColumns, updateCsvColumns] = useState([""]);



    const handleFile = (e) =>{
        let files = e.target.files;
       
        updateCsvFiles({ "files":files });
    
    
      }

    const handleUpload =  async ( e ) =>{
 
        // console.log(formData)
     
        ////extremely important
        e.preventDefault();
          let files = csvFiles["files"];
      let formData = new FormData();
        formData.append("files", files);
        console.log( "form data",csvFiles["files"]);
     
         try {
           
           const config = {
             headers: {
               'content-type': 'multipart/form-data',
               //'enctype': 'multipart/form-data',
              
               
             },
           };
     
           const data = await axios.post(`${baseUrl}/edit`, 
           csvFiles['files'],config
           );
    
        updateCsvJSON(data.data.csvdata);
     
     
           
               let keysJSON = Object.keys(csvJSON[0]);
               updateCsvColumns(keysJSON);

               JSON_ = (data.data.csvdata).slice();

               console.log(JSON_) 
  
               navigate("/Clean")
         
         } catch (err) {
     
           console.log(err);

         }
         
       
       

         
     
       }
  



  return (
   
<div>
    <form  method="POST"  enctype="multipart/form-data"> 
   <div >
       <label>File:
         <input  type="file" name="csv_file" id="csv_file" required="True" class="form-control"  onChange={(e) => handleFile(e)} ></input>
          </label>
       <div >
       </div>                    
   </div>
   <div >                    
       <div >
            <button onClick={(e) => {handleUpload(e);}}>Upload </button>
       </div> 
   </div>



    </form>
    
    
    </div>

    
  );


}


export default Uploads;
