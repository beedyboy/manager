import React, { Fragment } from 'react';  
import { BrowserRouter as Router } from "./views/Admin/VacationApplication/Components/node_modules/react-router-dom";
import Routes from './Routes';
function App() {
  return (
     <Fragment>
       <Router>
         <Routes />
       </Router>
     </Fragment>
  );
}

export default App;
