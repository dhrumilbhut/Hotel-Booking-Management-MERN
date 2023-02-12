import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: undefined,
    city: undefined,

    country: undefined,
    phone: undefined,
    email: undefined,
    password: undefined,
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
      const res = await axios.post("/auth/register", credentials);
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
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="name"
          id="name"
          className="lInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="city"
          id="city"
          className="lInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="country"
          id="country"
          className="lInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="phone"
          id="phone"
          className="lInput"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="lInput"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="lInput"
          onChange={handleChange}
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
