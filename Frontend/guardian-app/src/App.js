import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import LoggedIn from "./Routes/loggedIn";
import Search from "./Routes/Search";
import EditPage from "./Routes/EditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="/loggedIn" element={<LoggedIn />}>
          <Route path="search" element={<Search />} />
        </Route>

        <Route path="edit" element={<EditPage />} />

        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
