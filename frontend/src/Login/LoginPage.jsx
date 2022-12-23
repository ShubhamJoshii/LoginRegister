import TopImg from "./Img.png";
import userLogo from "./userLogo.png";
import lockLogo from "./lockLogo.png";
import "./Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({setLoginUser}) => {
  const [userInfo, setUserInfo] = useState({
    Email: " ",
    Password: " ",
  });

  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [count, setCount] = useState(0);


  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  }


  let navigate = useNavigate();

  const loginInfo = () => {
    setUserInfo({
      Email: userEmail,
      Password: userPassword,
    });
    // setTimeout(()=>{
    //     navigate("/front")
    // },1000)
  };
  const DataSend = () => {
    axios.post("http://localhost:8000/sendData", userInfo,{
      headers: headers
    }).then((res) => {
        if(count > 0){
            alert(res.data.message);
        }

      if (res.data.message === "Password is In-Correct") {
        document.getElementById("password").style.backgroundColor = "#FF3300";
        document.getElementById("email").style.backgroundColor = "#00a4b36b";
      } else if (res.data.message === "User Logined") {
        document.getElementById("password").style.backgroundColor = "#00a4b36b";
        document.getElementById("email").style.backgroundColor = "#00a4b36b";
        setLoginUser(res.data.user);
        navigate("/front");
      } else if (res.data.message === "User Not Registerted") {
        if (count === 2) {
          document.getElementById("email").style.backgroundColor = "#FF3300";
        }
        console.log(count);
        setCount(2);
      }
      console.log(res.data.user);
    });
  };
  useEffect(() => {
    DataSend();
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div className="Login">
      <img
        src={TopImg}
        alt="Imsgfs"
        id="LoginImg"
        width="350px"
        height="250px"
      />
      <div className="text">USER LOGIN</div>
      <form action="">
        <div id="email">
          <img src={userLogo} alt="dfas" width="20px" />
          <input
            type="text"
            placeholder="Email or Username"
            onChange={(e) => {
              setuserEmail(e.target.value);
            }}
          />
        </div>
        <div id="password">
          <img src={lockLogo} alt="dfas" width="20px" />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setuserPassword(e.target.value);
            }}
          />
        </div>
        <input type="button" id="formBtn" value="Log in" onClick={loginInfo} />
      </form>
      <p
        onClick={() => {
          navigate("/register");
        }}
      >
        Create Account
      </p>
    </div>
  );
};

export default Login;
