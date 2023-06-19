import './App.css';
import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar';
import Chat from './Chat'
// main start point
// import { Routes } from '@mui/material';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import SidebarChat from './SidebarChat';
import Login from './Login';
import {useStateValue} from './StateProvider';

                                                                                                  
function App() {
// const [user, setUser] = useState(null);
const [{user}, dispatch] = useStateValue();

  return (
    <div className="App">

       {!user?(
        <Login />
      ):(

      <div className="app_body">
        <Router>

          <Routes>
       
         <Route path = "/" element = {<React.Fragment><Sidebar /><Chat/></React.Fragment>}>
      
         </Route>

         
         <Route path = "/rooms/:roomId" element = {<React.Fragment><Sidebar /><Chat/></React.Fragment>}>

         </Route>

          
          </Routes>
        </Router>


      </div>
  )}
    </div>
  );
}

export default App;
