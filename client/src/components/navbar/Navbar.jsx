import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleClick = () => {
    navigate("/profile");
  };

  const { dispatch } = useContext(AuthContext);

  const handleLogout = async (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Hotels</span>
        </Link>
        {user ? (
          <div className="navItems">
            <div className="navProfile" onClick={handleClick}>
             
              <FontAwesomeIcon icon={faUser} />
            </div>

            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegister}>
              Register
            </button>
            <button className="navButton" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
