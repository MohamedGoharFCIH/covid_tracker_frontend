import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { required, validEmail } from "./helper/validation-functions";
import { Link } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";


const Signup = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const onChangeFullname = (e) => {
        const fullname = e.target.value;
        setFullname(fullname);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(fullname, email, password).then(
                (response) => {
                    setMessage("New account created...." + " Welcome " + fullname);
                    setSuccessful(true);
                }
            ).catch(e => {
                if (e.response && e.response.data) {
                    setMessage(e.response.data.message);
                    setSuccessful(false);
                    return;
                }
                console.log("error from sing up ", e)
                setMessage("Something Wrong");
                setSuccessful(false);


            })
        }
    };
    if (successful) {
        return (
            <div className="text-center" >
                <BsCheckCircle size={70} />
                <br />
                <br />
                <div style={{ fontSize: "18px" }}>
                    New account created with Email Adress :  {email} , Go to
                </div>
                <br></br>
                <div>
                    <Link to="/login"> <button className="btn btn-primary">  Login now </button></Link>
                </div>
            </div>

        )
    }
    return (

        <div className="Auth-form-container">
            <Form className="Auth-form" onSubmit={handleRegister} ref={form}>
                <div className="Auth-form-content">
                    {!successful && (
                        <div>
                            <h3 className="Auth-form-title">Sign Up</h3>
                            <div className="text-center">
                                Already registered?{" "}
                                <Link to="/login"> Login</Link>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="fullname">Full Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="fullname"
                                    onChange={onChangeFullname}
                                    value={fullname}
                                    placeholder="Enter your name"
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                    placeholder="Enter email"
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
                                    placeholder="Enter password"
                                    autoComplete="off"
                                />
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}
                    {(message && !successful) ?
                        <div>
                            <br />
                            <div className={"alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                        :
                        (successful &&
                            <div className="signup-message">
                                <div>{message}</div>
                                <div className="text-center"> <Link to="/login">Login now</Link></div>
                            </div>
                        )

                    }
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </div>
            </Form >
        </div >

    );
};
export default Signup;
