import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import { required, validEmail } from "./helper/validation-functions";

const Login = () => {
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(email, password)
                .then((data) => {
                    if (data.token) {
                        navigate("/");
                        window.location.reload();
                    }
                })
                .catch(e => {
                    // console.log(e.response.status)
                    setLoading(false);
                    if(e.response &&  e.response.status == 404){
                        setMessage("incorrect Email or Password");
                    }
                    else{
                        setMessage("Something went wrong please try again")
                    }
                    
                    
                })
        }
        else {
            setLoading(false);
        }
    }

    return (
        <div className="Auth-form-container">
            <Form className="Auth-form" onSubmit={handleLogin} ref={form}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Login</h3>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <Link to="/signup">Sign Up</Link>
                            
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email address</label>
                        <Input
                            type="email"
                            className="form-control mt-1"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            placeholder="Enter email"
                            validations={[validEmail]}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                    {message && (
                        <div className="form-group">
                            <br/>
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </div>
            </Form>
        </div>
    );
};
export default Login;
