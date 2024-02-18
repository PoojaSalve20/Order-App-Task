import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Header2 from './Components/Header2';
import Table from "./Components/Table"
import CreateNewForm from './Components/CreateNewForm';
import "./App.css"
import { useEffect, useState } from 'react';

function App() {
  const [rowss, setRows] = useState([]);

  const addRow = (formData) => {
    setRows([...rowss, formData]);
  };
   
  return (
    <div className='app'>
      <div className='container1'>
        
          <Header />
           
      
        <Router>
          <Routes>
            <Route exact path='/' element={<Table rows={rowss} />} />
            <Route path='/create-new' element={<CreateNewForm  addRow={addRow}/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
