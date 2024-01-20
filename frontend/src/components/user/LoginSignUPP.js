import "./LoginSignUp.css";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Stack } from "@mui/material";
import Loader from "../layout/Loader";
import {
  clearErrors,

  loginUser,
  registerUser,
} from "../../reducers/userReducer";

function LoginSignUpp() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const switcherTab = useRef(null);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const professionOptions = [
    "Student",
    "Professor",
    "Researcher",
    "Teacher",
    "Docter",
  ];

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
  });

  const { name, email, password, profession } = user;

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ loginEmail, loginPassword }));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myData = {
      name,
      email,
      password,
      profession,
    };

   
    dispatch(registerUser(myData));
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [isAlertDisplay, setisAlertDisplay] = useState(false);
  const [alertMessage, setalertMessage] = useState("Error Occured !!");
  const [alertType, setalertType] = useState("error");
  const fireAlert = (type, message) => {
    setalertType(type);
    setalertMessage(message);
    setisAlertDisplay(true);

    setTimeout(() => {
      setisAlertDisplay(false);
    }, 3000);
  };
  

  useEffect(() => {
    
    if (error) {
      fireAlert("error", error);

      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
   
  }, [dispatch, isAuthenticated, navigate, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAlertDisplay && (
            <div className="alert absolute w-full ">
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity={alertType}>{alertMessage}</Alert>
              </Stack>
            </div>
          )}
          <div className="LoginSignUpContainer  ">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              {/* Login form */}
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <div className="mr-4 text-xl  absolute  translate-x-1">
                    <ion-icon name="mail-outline"></ion-icon>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <div className="mr-2 text-xl absolute translate-x-1">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    minLength={8}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to={"/password/forgot"}>Forget Pssword ? </Link>
                <input type="submit" value={"login"} className="loginBtn" />
              </form>

              {/*  Registration Form */}
              <form
                className="signUpForm space-y-3"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <div className="absolute translate-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      viewBox="0 0 448 512"
                    >
                      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                    </svg>
                  </div>{" "}
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <div className="absolute text-xl translate-x-2">
                    {" "}
                    <ion-icon name="mail-outline"></ion-icon>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <div className="absolute text-xl translate-x-2">
                    {" "}
                    <ion-icon name="lock-closed-outline"></ion-icon>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    minLength={8}
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <div className="absolute text-xl translate-x-2">
                    {" "}
                    <ion-icon name="options-outline"></ion-icon>{" "}
                  </div>
                  <select
                    required
                    name="profession"
                    id="professionSelection"
                    onChange={registerDataChange}
                  >
                    {professionOptions.map((e,i) => (
                      <option key={i} value={e}>{e}</option>
                    ))}
                  </select>
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LoginSignUpp;
