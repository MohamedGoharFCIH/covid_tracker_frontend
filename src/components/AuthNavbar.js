import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

const AuthNavbar = (props) => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary">
            <Link style={{ marginLeft: "10px" }} to={"/"} className="navbar-brand">
                Home
            </Link>
            <div className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link to={"/medicines"} className="nav-link">
                        Suggested Medicines
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/patients"} className="nav-link">
                        patients map
                    </Link>
                </li>

            </div>
            <div className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                        profile
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={props.logout}>
                        LogOut
                    </a>
                </li>
            </div>
        </nav >
    )
}

export default AuthNavbar;