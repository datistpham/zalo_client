import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiTwotoneLock } from "react-icons/ai";
import { BsPhoneFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Background from "../Background/Background";
import styles from "../Signup/Signup.module.sass";
import * as yup from "yup";
import login from "../../api/login";

const Login = (props) => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    phone: yup
      .string()
      .trim()
      .matches(
        /^(?:\d{10}|(84|0[3|5|7|8|9])+([0-9]{8})\b|\w+@\w+\.\w{2,3})$/,
        "Số điện thoại hoặc email không hợp lệ"
      )
      .required(),
    // password: yup.string().min(8, 'Mật khẩu phải trên 8 kí tự').required(),
  });
  const {
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [phoneNumber, setPhoneNumber] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [data, setData] = useState();

  const onSubmit = async (data) => {
    // if (pass === repeatPass) {
    // await dispatch(registerUserRequest(data, () => {
    //   history.push('/login')
    // }));
    // } else {
    //   setErrorMessage('Mật khẩu không khớp')
    //   setTimeout(() => {
    //     setErrorMessage('')
    //   }, 2000)
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        {
          <>
            <div className={styles.register_title} style={{ marginBottom: 20 }}>
              Đăng nhập tài khoản Zalo <br></br>để kết nối với ứng dụng Zalo
              Chat
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.register_form_input}>
                <input
                  type="text"
                  placeholder="Số điện thoại hoặc email"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  autoComplete={"off"}
                ></input>
                <span>
                  <BsPhoneFill />
                </span>
              </div>
              <div className={styles.register_form_input}>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={"off"}
                ></input>
                <span>
                  {" "}
                  <AiTwotoneLock />
                </span>
              </div>
              <button
                onClick={() => login(phoneNumber, password, setData)}
                className={styles.btn}
              >
                Đăng nhập
              </button>
              <div onClick={()=> navigate("/forgot-password")} style={{ width: "100%", textAlign: "right", fontSize: 14, cursor: "pointer"}}>Quên mật khẩu</div>
              <div className={styles.toLogin}>
                <Link to="/signup">Đăng ký</Link>
              </div>
            </form>
          </>
        }
      </div>
      <Background />
    </div>
  );
};

export default Login;
