import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import { SERVER_URL } from "./config/config";
import Cookies from "js-cookie";
import { useState } from "react";
import { createContext } from "react";
import Home from "./Component/Home/Home";
import SocketContainer from "./SocketContainer/SocketContainer";
import ForgotPassword from "./Component/ForgotPassword/ForgotPassword";

export const AppContext= createContext()
const App = () => {
  const [data, setData] = useState();
  const [auth, setAuth] = useState();
  const [change, setChange]= useState(false)
  useEffect(() => {
    (async () => {
      if(Cookies.get("uid")) {
        const res = await axios({
          url: `${SERVER_URL}/api/users/${Cookies.get("uid")}`,
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          method: "get",
          params: {
            id: Cookies.get("uid"),
          },
        });
        const result = await res.data;
        if (res.status === 200) {
          setAuth(() => true);
        } else {
          setAuth(() => false);
        }
        return setData(result);
      }
      else {
        setAuth(()=> false)
      }
    })();
  }, [change]);
  return (
    <SocketContainer>
      <AppContext.Provider value={{data, auth,setData, setChange}}>
        <BrowserRouter>
          <Routes>
            {
              auth=== true && <>
                <Route path={"/*"} element={<Home />} />
                <Route path={"/signup"} element={<Navigate to={"/"} />} />
                <Route path={"/login"} element={<Navigate to={"/"} />} />
              </>
            }
            {
              auth=== false && <>
                <Route path={"/*"} element=<Navigate to={"/login"} /> />
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/forgot-password"} element={<ForgotPassword />} />
              </>
            }
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </SocketContainer>
  );
};

export default App;
