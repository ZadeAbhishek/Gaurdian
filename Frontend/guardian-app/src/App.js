import "./App.css";
import SearchPage from "./Components/searchPage";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./Routes/Login";
import Register from "./Routes/Register";


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/search" element={<SearchPage/>} ></Route>
      <Route path="/" element={<Login/>} ></Route>
      <Route path="/register" element={<Register/>} ></Route>
   
    </Routes>
  </BrowserRouter>
  );
}

export default App;
