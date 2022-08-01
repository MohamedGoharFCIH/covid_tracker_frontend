import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

const NotAuthNavbar = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary">
            <Link style={{ marginLeft: "10px" }} to={"/"} className="navbar-brand">
                Home
            </Link>
            <div className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="/signup" className="nav-link">
                        SignUp
                    </a>
                </li>
            </div>
        </nav >
    )
}

export default NotAuthNavbar;