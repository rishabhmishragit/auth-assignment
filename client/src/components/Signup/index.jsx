import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        "https://auth-assignment-bje2yome5-rishabh-mishras-projects-c49412f3.vercel.app/api/users";
      const { data: res } = await axios.post(url, signupData);
      setMsg(res.message);
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
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1> Welcome Back</h1>
          <Link to="/login">
            <button className={styles.white_btn}>Sign In</button>
          </Link>
        </div>
        <div className={styles.right}>
          <form onSubmit={handleSubmit} className={styles.form_container}>
            <h1>Create Account</h1>
            <input
              type="email"
              name="email"
              value={signupData?.email}
              placeholder="Email"
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="password"
              name="password"
              value={signupData?.password}
              placeholder="Password"
              onChange={handleChange}
              className={styles.input}
              required
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
