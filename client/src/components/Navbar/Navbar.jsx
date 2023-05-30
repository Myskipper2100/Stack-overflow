import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
import { HiBars3 } from "react-icons/hi2";
import { BiArrowBack } from "react-icons/bi";

import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/logo.png";
import icon from "../../assets/icon.png";
import search from "../../assets/search-solid.svg";
import "./Navbar.css";
import { setCurrentUser } from "../../actions/currentUser";

const Navbar = () => {
  const dispatch = useDispatch();
  const location= useLocation()

  const User = useSelector((state) => state.currentUserReducer);
  const sidebar = useSelector((state) => state.sideBar);
  const navigate = useNavigate();
  const [profileDropdown, setProfileDropdown] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
    setProfileDropdown(false);
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  const toggleSideBar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR", payload: !sidebar.visible });
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };


  const checkAuth=() =>{
    if(User===null){
      alert("login or signup to upgrade to pemium")
      navigate('/Auth')
    }else{
      navigate("/Premium")
    }
  };

  return (
    <nav className="main-nav">
      <div className="navbar">
        <div className="left-nav">
          {window.location.pathname !== "/stackoverflow-community" ? (
            <HiBars3 className="bar-icon" onClick={toggleSideBar} />
          ) : (
            <BiArrowBack className="bar-icon" onClick={() => navigate("/")} />
          )}
          <div className="mini-logo">
            <Link to="/" className="nav-item nav-logo">
              <img src={icon} alt="logo" />
            </Link>
          </div>
          <div className="big-logo">
            <Link to="/" className="nav-item nav-logo">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="nav-list">
          <Link to="/" className="nav-item nav-btn">
            Products
          </Link>
          <Link to="/" className="nav-item nav-btn">
            For Teams
          </Link>
          <Link to="/stackoverflow-community" className="nav-item nav-btn">
            Community
          </Link>
          <button onClick={checkAuth}  className="pre-btn">
            Upgrade
          </button>
        </div>
        <form>
          <input type="text" placeholder="Search..." />
          <img src={search} alt="search" width="18" className="search-icon" />
        </form>
        <div className="nav-right">
          {profileDropdown && (
            <div className="nav-right-modelbox">
              <Link
                to={`/Users/${User?.result?._id}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                <div onClick={() => setProfileDropdown(false)}>
                  <span>Profile</span>
                  <CgProfile />
                </div>
              </Link>
              <div onClick={handleLogout}>
                <span>Sign Out</span>
                <IoMdLogOut />
              </div>
            </div>
          )}
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <div
                className="avatar"
                onClick={toggleProfileDropdown}
                style={{ color: "white", cursor: "pointer" }}
              >
                {User.result.name.charAt(0).toUpperCase()}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
