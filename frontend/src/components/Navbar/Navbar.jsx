import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        Task Manager
      </Link>

      <div className="navbar-links">

        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        {token ? (
          <>
            <Link
              to="/dashboard"
              className={
                location.pathname === "/dashboard"
                  ? "active"
                  : ""
              }
            >
              Dashboard
            </Link>

            <button
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={
                location.pathname === "/login"
                  ? "active"
                  : ""
              }
            >
              Login
            </Link>

            <Link
              to="/signup"
              className={
                location.pathname === "/signup"
                  ? "active"
                  : ""
              }
            >
              Sign Up
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;