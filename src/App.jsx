import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import "./App.css";
import Layout from "./Layout/layout";
import MainContainer from "./Blocks/MainContainer";
import NewReg from "./pages/NewReg";


function App() {
  return (
   <>
   <Router>
      <Routes>
        
        <Route path="/" element={<Layout />}>
    
          <Route index element={<MainContainer />} /> 
          <Route path="/new" element={<NewReg />} />
        </Route>
      </Routes>
    </Router>
   </>
  );
}

export default App;
