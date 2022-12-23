import TopImg from "./Img.png";
import userLogo from "./userLogo.png";
import lockLogo from "./lockLogo.png";
import "./Register.css";
import { useState } from "react";
// import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    Name: "",
    Email: "",
    Password: "",
    RePassword:""
  });


  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  }

  let navigate = useNavigate();
  const userData = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "UserName") {
      setRegisterData((prev) => {
        return {
          Name: value,
          Email: prev.Email,
          Password: prev.Password,
          RePassword:prev.RePassword
        };
      });
    } else if (name === "Email") {
      setRegisterData((prev) => {
        return {
          Name: prev.Name,
          Email: value,
          Password: prev.Password,
          RePassword:prev.RePassword
        };
      });
    } else if(name === "Password"){
      setRegisterData((prev) => {
        return {
          Name: prev.Name,
          Email: prev.Email,
          Password: value,
          RePassword:prev.RePassword
        };
      });
    }else{
      setRegisterData((prev)=>{
      return{
        Name: prev.Name,
        Email: prev.Email,
        Password: prev.Password,
        RePassword:value
      }
    })}
  };

  const DataSend = ()=>{
    if(registerData.Password === registerData.RePassword && registerData.Password.length >= 8){
      console.log(registerData);
      axios.post("http://localhost:8000/saveData",registerData,{
        headers: headers
      }).then((res)=>{
        // console.log(res.data.message)
        alert(res.data.message)
        if(res.data.message === "User Already Exists"){
          document.getElementById("email").style.backgroundColor="#FF3300"
        }
        else{
          document.getElementById("email").style.backgroundColor="#00a4b36b"
        }
        document.getElementById("password").style.backgroundColor="#00a4b36b"
        document.getElementById("Re_password").style.backgroundColor="#00a4b36b"
      })
    }
    else{
      alert("Wrong Password or Format");
      document.getElementById("password").style.backgroundColor="#FF3300"
      document.getElementById("Re_password").style.backgroundColor="#FF3300"
    }
    // console.log(registerData.Password === registerData.RePassword);

  }


  return (
    <div className="Register">
      <img src={TopImg} alt="Imsgfs" id="RegisterImg" width="350px" height="250px" />
      <div className="text">USER REGISTER</div>
      <form action="">
        <div>
          <img src={userLogo} alt="dfas" width="20px" />
          <input
            type="text"
            placeholder="Username"
            name="UserName"
            onChange={userData}
          />
        </div>
        <div id="email">
          <img src={userLogo} alt="dfas" width="20px" />
          <input
            type="text"
            placeholder="Email ID"
            name="Email"
            onChange={userData}
          />
        </div>
        <div id="password">
          <img src={lockLogo} alt="dfas" width="20px" />
          <input
            type="text"
            placeholder="Password"
            name="Password"
            onChange={userData}
          />
        </div>
        <div id="Re_password">
          <img src={lockLogo} alt="dfas" width="20px" />
          <input
            type="text"
            placeholder="Re-Password"
            name="rePassword"
            onChange={userData}
          />
        </div>
        <input type="button" id="formBtn" value="Register" onClick={DataSend}/>
      </form>
      <p onClick={()=>{
        navigate("/login")
      }}>Login</p>
    </div>
  );
};

export default Register;
