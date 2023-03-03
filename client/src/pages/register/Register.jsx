import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../API_URL";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
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
    // dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(`${API_URL}/auth/register`, credentials);
      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/login");
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
          <h1>Create an Account!</h1>
          <p>
            Create your own personal <br /> account with your personal details
            carefully
          </p>
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
              placeholder="Username"
              id="name"
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
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />

            {/* <input
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                outline: "none",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
              type="text"
              placeholder="Phone"
              id="phone"
              onChange={handleChange}
            /> */}

            {/* <input
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                outline: "none",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
              type="text"
              placeholder="City"
              id="city"
              onChange={handleChange}
            /> */}

            {/* <input
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                outline: "none",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
              type="text"
              placeholder="Country"
              id="country"
              onChange={handleChange}
            /> */}

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
              Sign up
            </button>
            {error && <span>{error.message}</span>}
          </form>
        </div>
        <div className="left">
          <h1>Hello There!</h1>
          <p>Create your own personal account carefully</p>
          <span style={{ padding: "20px 0" }}>Already have a account?</span>
          <button>
            <Link
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Register;
