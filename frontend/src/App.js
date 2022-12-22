import Login from "./Login/LoginPage"
import Register from "./Register/RegisterPage"
import Front from "./front/front"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useState } from "react";

function App() {
  const [loginData, setLoginUser]=useState({});

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setLoginUser={setLoginUser}/>}/>
        {/* {console.log(loginData)} */}
        <Route path="/" element={<Login  setLoginUser={setLoginUser}/>}/>
        <Route path="register" element={<Register />}/>
        <Route path="front" element={<Front loginData={loginData} />}/>
        {/* <Route/> */}
      </Routes>
    </Router>
  );
}

export default App;
