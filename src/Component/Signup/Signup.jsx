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
import check_user from "../../api/check_user";
import forgot_password from "../../api/forgot_password";
import { Button } from "react-bootstrap";
import confirm_code from "../../api/confirm_code";
import { useEffect } from "react";
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
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [username, setUsername] = useState(() => "");
  const [phoneNumber, setPhoneNumber] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [email, setEmail]= useState(()=> "")
  // eslint-disable-next-line
  const [confirmPassword, setConfirmPassword] = useState(() => "");
  // eslint-disable-next-line
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

  const [message, setMessage]= useState()
  const [checkFinal, setCheckFinal]= useState()
  const [codeVerify, setCodeVerify]= useState()
  const [status, setStatus]= useState()

  const checkUserandSignup=async ()=> {
    const check= await check_user(email, phoneNumber)
    if(check?.msg=== true) {
      setMessage(true)
      forgot_password(email, setCheckFinal, true)
    }
    else {
      setMessage(false) 
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        {
          <>
            <div className={styles.register_title} style={{ marginBottom: 20 }}>
              Đăng kí tài khoản Zalo <br></br>để kết nối với ứng dụng Zalo Chat
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {
                message=== true && <>
                  {
                    checkFinal && <>
                      <div style={{textAlign: "center", fontSize: 12}}>Chúng tôi đã gửi một mã xác thực gồm 6 chữ số đến email của bạn. Vui lòng nhập vào đây để hoàn tất quá trình đăng ký</div>
                      <input
                        onChange={(e) => setCodeVerify(e.target.value)}
                        type="text"
                        placeholder="Nhập mã xác thực"
                      ></input>
                      <br />
                      <Button color={"primary"} onClick={()=> confirm_code(email,codeVerify, setStatus)}>Xác nhận</Button>
                      {status?.verify=== false && <div>Mã xác thực không chính xác</div>}
                      {status?.verify=== true && <AutoSignup username={username} phoneNumber={phoneNumber} password={password} email={email} setData={setData} />}
                    </>
                  }
                </>
              }
              {
                !message && <>
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
                <div>{message=== false && <div style={{color: "red", fontSize: 12}}>Số điện thoại hoặc gmail đã tồn tại vui lòng thử lại</div>}</div>
                <button
                  onClick={checkUserandSignup}
                  className={styles.btn}
                >
                  Đăng kí
                </button>
              </>
              }

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

const AutoSignup= (props)=> {
  const navigate= useNavigate()
  useEffect(()=> {
    if(props) {
      (async()=> {
        const x= await signup(props?.username, props?.phoneNumber, props?.password, props?.email, props?.setData)
        console.log(x)
        navigate("/login")
      })()
    }
  }, [navigate, props])
  return <></>
}
