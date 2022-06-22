import { useState } from 'react';
import logo from './logo.svg';
//import './App.css';
import axios from "axios";






const baseUrl = "http://localhost:8000";
const Analysis = () => {
  const [csvFiles, updateCsvFiles] = useState({"file": "jkhjgvc"});
  const [csvJSON, updateCsvJSON] = useState([]);
  const [csvColumns, updateCsvColumns] = useState([]);
  let columnDrop =[];
  const [targetClass, setTargetClass] = useState("");
  const [testSize, setTestSize] = useState(0);
  const [sciLearnParams, setSciLearnParams] = useState({});
  const linRegParam = [["penalty","l1", "l2","elasticnet", "none"],["dual", "bool"],["tol", "flt"],["C", "flt"],["fit_intercept", "bool"], ["intercept_scaling","flt"],["multi_class", "auto", "ovr", "multinomial"],["solver","newton-cg", "lbfgs", "liblinear", "sag", "saga"],["random_state", "int"],["max_iter", "int"],["verbose", "int"] ,["n_jobs", "int"], ["l1_ratio","flt"]

  ,["warm_start", "bool"]

];
  const linSVCParam = [["penalty","l1", "l2"],["dual", "bool"],["loss", "hinge","squared_hinge"],["tol", "flt"],["C", "flt"],["fit_intercept", "bool"],["multi_class", "ovr", "crammer_singer"], ["fit_intercept","bool"],["intercept_scaling","flt"],["random_state", "int"],["max_iter", "int"],["verbose", "int"] 


];
  const randForClf = [["n_estimators", "int"],["criterion","gini", "entropy", "log_loss"],["max_depth", "int"],["min_samples_split", "flt"],["min_samples_leaf", "flt"],["min_weight_fraction_leaf", "flt"],["max_features","sqrt", "log2", "None"],["max_leaf_nodes", "int"],["min_impurity_decrease","flt"],["bootstrap", "bool"],["oob_score", "bool"],["random_state", "int"],["max_iter", "int"],["verbose", "int"] ,["n_jobs", "int"]

  ,["warm_start", "bool"], ["ccp_alpha", "flt"],["max_samples", "flt"]

];
const [paramString, setParamString] = useState("");
const [classRegChoice, setClassRegChoice] = useState("");
const [userChoice, setUserChoice] = useState(""); 

  
  
  
  

  const handleFile = (e) =>{
    let files = e.target.files;
   
    updateCsvFiles({ "files":files });


  }

  const handleTestTrain =  async ( e ) =>{
  
  
  }

  const handleParamChange = (e,par)=>
  {

   
    let temp1 = sciLearnParams;
    temp1[par] = e.target.value;

  
  
    
    let stringParam = "";
    
  
      setSciLearnParams(temp1)

      for (const [key, value] of Object.entries(sciLearnParams)) {
        
          stringParam = stringParam+""+key+""+"="+value+",";

         
        



      }
  setParamString(stringParam);

 
    
    


  }

  const handleClassification =  async ( e ) =>{


    console.log(csvJSON);
    console.log(targetClass)
      console.log(testSize)
      console.log(paramString);

    const data =  await axios.post(`${baseUrl}/show`, {
      newJsonCsv: csvJSON,
      ttestsize: testSize,
      tgtClass: targetClass,
      parameters: paramString,
      classReg: classRegChoice

    
  });

  console.log(data.data)
  
  
  }

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
            <button onClick={(e) => handleUpload(e)}>Upload </button>
       </div> 
   </div>

{
  //<p> {JSON.stringify(row, null, 2)}</p>
csvJSON.map((row,i)=> {
if(i < 10 ){
 

return(<div>


<p> {JSON.stringify(row, null, 2)}</p>

</div>)

}





})}


    </form>


    <h1> Clean data</h1>
    <p>Pick a column to drop</p>
{


csvColumns.map((col, j) => {


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



    <h1> choose target class Test-Train Split</h1>
    {


csvColumns.map((col, j) => {


return(
//onClick ={ )=>columnDrop.push(col) }
<button id = {col}  onClick ={ ()=> {setTargetClass(col);}  }
>
{col}
  
</button>



)




}
)


}
<br></br>
<br></br>

<label> test train split 
<input   required="True" class="form-control"  onChange={(e) => {
  if(typeof(parseInt(e.target.value)) === "number" && ((e.target.value > 0)&& (e.target.value <100 ))){setTestSize(parseFloat(e.target.value))}
  else{


    console.log("please enter an number from 1-99")
  }

}
  } ></input>

</label>




<button  onClick ={ ()=> { handleButtonChange()}  } > Done</button>


{([1]).map((i,j) => {
  if(userChoice === ""){
    return(
    <div>
 <button onClick={(e) => setUserChoice("clf")}> Classification </button>
<br></br>
 <button onClick={(e) => setUserChoice("reg")}> Regression </button>

    </div>
     
      
    
   
)
    




  }
  else if (userChoice === "reg"){

    return(
    
      <div> 
        
        <p> Regression</p>
      
      </div>
     
  )

  }
  else if (userChoice === "clf") {

    if(classRegChoice === "" ){
      return(
      <div> 
      
      <button  onClick ={(e) =>  setClassRegChoice("logreg") }  > Logistic Regression</button>
    <button  onClick ={ (e) => setClassRegChoice("linsvc") } > Linear SVC</button>
    <button  onClick ={ (e) => setClassRegChoice("rand") } > Random Forest Classifier</button>
    
    </div>

      )


    }

    else if (classRegChoice === "logreg" )
    {

      return(

<div>


<p>  choose parameters for Logistic Regression * Optional</p>
{linRegParam.map((param,i) => {

if(param[1] === "int" ){

  return(


      <div>

    <label> {param[0]} <input onChange={(e) => handleParamChange(e,param[0])}></input> </label> 
    <br></br>

      </div>

   
    
    )


}
else  if(param[1] === "flt" ){
  return(




    <div>

<label> {param[0]} <input onChange={(e) => handleParamChange(e,param[0])}></input> </label> 
    <br></br>

      </div>
    
    
    
    
    )



}
else if(param[1] === "bool" ){

  return(




    <div>

    <label> {param[0]}</label> <input type="checkbox"  onChange={(e) =>{ 
      if(e.target.value === "on"){e.target.value = 1}
      else{e.target.value = 0;}
     handleParamChange(e,param[0])}} ></input>
    <br></br>

      </div>
    
    
    
    
    )


}
else{

return(




  <div>

  <b> {param[0]}</b> 
<br></br>
  {param.map((p,i) => {

if(i != 0){

  return(
    <div>
      <label> {p}</label><input type="radio" name={param[0]} value={"'"+p+"'"} onChange={(e) => handleParamChange(e,param[0])} ></input>
    
    </div>
  
  
    )

}

  })}


  
<br></br>
    </div>
    
    
    
    
    )

}







})}


<button  onClick ={ ()=> { handleClassification()}  } ><b>Done</b> </button>

  <p>Mean CV score</p>
<p>Feature importance graph</p>
</div>

      )



    }
    else if (classRegChoice === "linsvc")
    {
      return(

        <div>
 <p>  Choose parameters for  Linear SVM Classifier * Optional</p>
  {linSVCParam.map((param,i) => {

if(param[1] === "int" ){

  return(


      <div>

    <label> {param[0]} <input onChange={(e) => handleParamChange(e,param[0])}></input> </label> 
    <br></br>

      </div>

   
    
    )


}
else  if(param[1] === "flt" ){
  return(




    <div>

<label> {param[0]} <input onChange={(e) => handleParamChange(e,param[0])}></input> </label> 
    <br></br>

      </div>
    
    
    
    
    )



}
else if(param[1] === "bool" ){

  return(




    <div>

    <label> {param[0]}</label> <input type="checkbox"  onChange={(e) =>{ 
      if(e.target.value === "on"){e.target.value = 1}
      else{e.target.value = 0;}
     handleParamChange(e,param[0])}} ></input>
    <br></br>

      </div>
    
    
    
    
    )


}
else{

return(




  <div>

  <b> {param[0]}</b> 
<br></br>
  {param.map((p,i) => {

if(i != 0){

  return(
    <div>
      <label> {p}</label><input type="radio" name={param[0]} value={"'"+p+"'"} onChange={(e) => handleParamChange(e,param[0])} ></input>
    
    </div>
  
  
    )

}

  })}


  
<br></br>
    </div>
    
    
    
    
    )

}







})}
  
  <p>Mean CV score</p>
 <p>Feature importance graph</p>

        </div>
      )


      
    } 
  else
    {

      return(

        <div>

<p>  Choose parameters for RandomForestClassifier * Optional</p>
  {randForClf.map((param,i) => {

if(param[1] === "int" ){

  return(


      <div>

    <label> {param[0]} <input onChange={(e) => handleParamChange(e,param[0])}></input> </label> 
    <br></br>

      </div>

   
    
    )


}
else  if(param[1] === "flt" ){
  return(




    <div>

<label> {param[0]} <input onChange={(e) => handleParamChange(e,param[0])}></input> </label> 
    <br></br>

      </div>
    
    
    
    
    )



}
else if(param[1] === "bool" ){

  return(




    <div>

    <label> {param[0]}</label> <input type="checkbox"  onChange={(e) =>{ 
      if(e.target.value === "on"){e.target.value = 1}
      else{e.target.value = 0;}
     handleParamChange(e,param[0])}} ></input>
    <br></br>

      </div>
    
    
    
    
    )


}
else{

return(




  <div>

  <b> {param[0]}</b> 
<br></br>
  {param.map((p,i) => {

if(i != 0){

  return(
    <div>
      <label> {p}</label><input type="radio" name={param[0]} value={"'"+p+"'"} onChange={(e) => handleParamChange(e,param[0])} ></input>
    
    </div>
  
  
    )

}

  })}


  
<br></br>
    </div>
    
    
    
    
    )

}







})}


  <p>Mean CV score</p>
  <p>Feature importance graph</p>


<p>
ROC Curves


</p>
          
        </div>
      )

      
    }


  }




})}







</div>
   
// onClick={ handleButtonChange()}

  );
}

export default Analysis;
