import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../API_URL";
// import { API_URL } from "../../API_URL";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials);
      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

        localStorage.setItem("access_token", JSON.stringify(res.data.token));
        // console.log(res.data.token);
        if (res.data.isAdmin == true) {
          navigate("/dashboard");
        } else {
          navigate("/", { state: { ...res.data } });
        }
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="mainContainer">
      <div className="contentArea">
        <div className="right">
          <h1>Sign in your account!</h1>
          <p>Login with your personal details for continue</p>
          <form>
            <input
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                outline: "none",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
              type="text"
              placeholder="email"
              id="email"
              onChange={handleChange}
            />
            <input
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                outline: "none",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
            <button disabled={loading} onClick={handleClick}>
              Login
            </button>
            {error && <span>{error.message}</span>}
          </form>
        </div>
        <div className="left">
          <h1>Welcome Back!</h1>
          <p>to continue please login with your personal account information</p>
          <span style={{ padding: "20px 0" }}>Don't have a account?</span>

          <button>
            <Link
              to="/register"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
