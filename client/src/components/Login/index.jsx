import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://auth-assignment-bay.vercel.app/api/auth";
      const { data: res } = await axios.post(url, loginData);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form onSubmit={handleSubmit} className={styles.form_container}>
            <h1>Login</h1>
            <input
              type="email"
              name="email"
              value={loginData?.email}
              placeholder="Email"
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="password"
              name="password"
              value={loginData?.password}
              placeholder="Password"
              onChange={handleChange}
              className={styles.input}
              required
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1> New Here</h1>
          <Link to="/signup">
            <button className={styles.white_btn}>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
