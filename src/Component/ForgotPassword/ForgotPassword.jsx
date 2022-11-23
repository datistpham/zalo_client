import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsPhoneFill, BsCode } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Background from "../Background/Background";
import styles from "../Signup/Signup.module.sass";
import * as yup from "yup";
import { Button } from "react-bootstrap";
import forgot_password from "../../api/forgot_password";
import "./style.sass";

const ForgotPassword = (props) => {
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
  const { handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [result, setResult] = useState();
  const [confirmCode, setConfirmCode] = useState();

  const [phoneNumber, setPhoneNumber] = useState(() => "");

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
            <div
              className={styles.register_title}
              style={{ marginBottom: 20, fontSize: 24 }}
            >
              Quên mật khẩu <br></br>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {!result && (
                <>
                  <div className={styles.register_form_input}>
                    <input
                      type="email"
                      placeholder="Nhập email của bạn để khôi phục mật khẩu"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      autoComplete={"off"}
                    ></input>
                    <span>
                      <BsPhoneFill />
                    </span>
                  </div>
                  <div className={"fjkadjksjksjdasaa"}>
                    <Button
                      onClick={() => forgot_password(phoneNumber, setResult)}
                    >
                      Gửi
                    </Button>
                  </div>
                </>
              )}
              {result && (
                <div className={"gjldajfskdjsjsa"}>
                  <div className={"jksdjklsdjkasasas"} style={{ fontSize: 12 }}>
                    {result?.message}
                  </div>
                  <div className={styles.register_form_input}>
                    <input
                      type="text"
                      placeholder="Nhập mã xác thực để khôi phục mật khẩu"
                      onChange={(e) => setConfirmCode(e.target.value)}
                      autoComplete={"off"}
                    ></input>
                    <span>
                      <BsCode />
                    </span>
                  </div>
                  <div className={`${styles.register_form_input} fjkadjksjksjdasaa`}>
                    <Button color={"primary"}>Gửi</Button>
                  </div>
                </div>
              )}
            </form>
          </>
        }
      </div>
      <Background />
    </div>
  );
};

export default ForgotPassword;
