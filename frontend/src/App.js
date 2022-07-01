import logo from './logo.svg';
import './App.css';
import Analysis  from './Analysis.js';
import Uploads  from './Uploads.js';

import {Route,Routes} from 'react-router-dom';


function App() {
  return (
   


    <Routes>
    <Route path='/' element={<Uploads />} />
    
     <Route path='/Analysis' element={<Analysis />} />
    
  </Routes>

  
  );


}


export default App;
