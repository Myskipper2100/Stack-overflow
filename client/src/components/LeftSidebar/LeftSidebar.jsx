import React from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";
import { useDispatch, useSelector } from "react-redux";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sideBar);
  const toggleSideBar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR", payload: false });
  };
  return (
    <div
      className={
        sidebar.visible ? "show-left-sidebar left-sidebar" : "left-sidebar"
      }
    >
      <nav className="side-nav">
        <NavLink
          to="/"
          className="side-nav-links"
          activeclassname="active"
          onClick={toggleSideBar}
        >
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/about"
          className="side-nav-links"
          activeclassname="active"
          onClick={toggleSideBar}
        >
          <p>About</p>
        </NavLink>

        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          <NavLink
            to="/Questions"
            className="side-nav-links"
            activeclassname="active"
            onClick={toggleSideBar}
          >
            <img src={Globe} alt="Globe" />
            <p style={{ paddingLeft: "10px" }}> Questions </p>
          </NavLink>
          <NavLink
            to="/Tags"
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
            onClick={toggleSideBar}
          >
            <p>Tags</p>
          </NavLink>
          <NavLink
            to="/Users"
            className="side-nav-links"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
            onClick={toggleSideBar}
          >
            <p>Users</p>
          </NavLink>
        </div>
        <NavLink
          to="/product"
          className="side-nav-links add-list-item"
          activeclassname="active"
          onClick={toggleSideBar}
        >
          <p>Product</p>
        </NavLink>
        <NavLink
          to="/teams"
          className="side-nav-links add-list-item"
          activeclassname="active"
          onClick={toggleSideBar}
        >
          <p>For Teams</p>
        </NavLink>
        <NavLink
          to="/stackoverflow-community"
          className="side-nav-links add-list-item"
          activeclassname="active"
          onClick={toggleSideBar}
        >
          <p>Community</p>
        </NavLink>
      </nav>
    </div>
  );
};

export default LeftSidebar;
