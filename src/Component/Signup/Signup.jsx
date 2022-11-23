import { useState } from "react";
import styles from "./Signup.module.sass";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUserAlt } from "react-icons/fa";
import { BsPhoneFill } from "react-icons/bs";
import { AiTwotoneLock, AiOutlineMail } from "react-icons/ai";

import * as yup from "yup";
import Background from "../Background/Background";
import signup from "../../api/signup";
// eslint-disable-next-line

const Signup = () => {
  // eslint-disable-next-line
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState(errors?.phone);
  const [repeatPass, setRepeatPass] = useState("");

  const [countDown, setCountDown] = useState(false);
  const [username, setUsername] = useState(() => "");
  const [phoneNumber, setPhoneNumber] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [email, setEmail]= useState(()=> "")
  const [confirmPassword, setConfirmPassword] = useState(() => "");
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
              Đăng kí tài khoản Zalo <br></br>để kết nối với ứng dụng Zalo Chat
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.register_form_input}>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Họ và tên"
                ></input>
                <span>
                  {" "}
                  <FaUserAlt />
                </span>
              </div>
              <div className={styles.register_form_input}>
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  placeholder="Số điện thoại"
                ></input>
                <span>
                  <BsPhoneFill />
                </span>
              </div>
              <div className={styles.register_form_input}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                ></input>
                <span>
                  <AiOutlineMail />
                </span>
              </div>
              <div className={styles.register_form_input}>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <span>
                  {" "}
                  <AiTwotoneLock />
                </span>
              </div>
              <div className={styles.register_form_input}>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <span>
                  {" "}
                  <AiTwotoneLock />
                </span>
              </div>
              <button
                onClick={() => signup(username, phoneNumber, password,email, setData)}
                className={styles.btn}
              >
                Đăng kí
              </button>

              <div className={styles.toLogin}>
                <Link to="/login">Đăng nhập!</Link>
              </div>
            </form>
          </>
        }
      </div>
      <Background />
    </div>
  );
};

export default Signup;
