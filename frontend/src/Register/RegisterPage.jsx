import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopImg from "../img/Img.png";
import userLogo from "../img/userLogo.png";
import lockLogo from "../img/lockLogo.png";
import eyeOpen from "../img/eyeOpen.png"
import eyeClose from "../img/eyeClose.png"
import "./Register.css";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    Name: "",
    Email: "",
    Password: "",
    RePassword:""
  });

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

  const DataSend =async ()=>{
    if(registerData.Password === registerData.RePassword && registerData.Password.length >= 8){
      console.log(registerData);
      await axios.post("http://localhost:8000/saveData",registerData).then((res)=>{
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

  const passwordShow = () =>{
    const Password = document.getElementById("passwordText");
    const PasswordShowBtn = document.getElementById("passwordShowBtn");
    
    if(Password.type === "password"){
      Password.type = "text"
      PasswordShowBtn.src= eyeOpen;
    }
    else{
      Password.type = "password"
      PasswordShowBtn.src= eyeClose;
    }
  }

  const RepasswordShow = () =>{
    const Password = document.getElementById("RepasswordText");
    const PasswordShowBtn = document.getElementById("RepasswordShowBtn");
    
    if(Password.type === "password"){
      Password.type = "text"
      PasswordShowBtn.src= eyeOpen;
    }
    else{
      Password.type = "password"
      PasswordShowBtn.src= eyeClose;
    }
  }

  return (
    <div className="Register">
      <img src={TopImg} alt="Imsgfs" id="RegisterImg" width="350px" height="250px" />
      <div className="text">USER REGISTER</div>
      <form action="" method="POST">
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
            type="password"
            placeholder="Password"
            name="Password"
            id="passwordText"
            onChange={userData}
          />
          <img src={eyeClose} width="23px" onClick={passwordShow} id="passwordShowBtn" alt="passwordShow" />
        </div>
        <div id="Re_password">
          <img src={lockLogo} alt="dfas" width="20px" />
          <input
            type="password"
            placeholder="Re-Password"
            name="rePassword"
            id="RepasswordText"
            onChange={userData}
          />
          <img src={eyeClose} width="23px" onClick={RepasswordShow} id="RepasswordShowBtn" alt="passwordShow" />
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
