import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import logo from "../images/png-clipart-logo-amazon-com-brand-flipkart-others-text-orange-thumbnail-removebg-preview.png";
import "../sass/components/login.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { auth, db } from "../firebaseFiles";
import { useStateValue } from "./StateProvider";

function Login() {
    //
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [errMessage, setErrMessage] = useState(false);
    const [registerErr, setRegisterErr] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [rePassword, setRePassword] = useState("");
    const [errText, setErrText] = useState("");

    // Sign in funcion
    const signIn = async (e) => {
        e.preventDefault();

        if (password.split("").length < 6) {
            setErrMessage(true);
            setErrText("Password is short!");
        } else {
            setLoading(true);
            try {
                const sign = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                if (sign) {
                    setLoading(false);
                    history("/");
                }
            } catch (error) {
                console.log(error.message);
                setLoading(false);
                setErrMessage(true);
                setErrText("Password or Email is wrong!");
            }
        }
    };

    // register function
    const register = async (e) => {
        setRegisterLoading(true);
        if (password === rePassword) {
            try {
                dispatch({
                    type: "REGISTER_ACTION",
                    userName: userName,
                });
                const user = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                if (user) {
                    setRegisterLoading(false);
                    history("/");
                }
            } catch (error) {
                setErrMessage(true);
                setRegisterLoading(false);
                setRegisterErr(true);
            }
        } else {
            setErrMessage(true);
            setRegisterLoading(false);
            setErrText("The passords aren't match or less than 6 charkters!  ");
        }
    };
    return (
        <div className="login">
            <ArrowForwardIcon
                className="arrow"
                onClick={() => setIsLoginForm(true)}
            />
            <Link to="/">
                <img className="login-logo" src={logo} />
            </Link>
            {errMessage && (
                <div className="err-container">
                    There was a problem
                    <span className="err-message">
                        {registerErr ? "This email is already Exist!" : errText}
                    </span>
                </div>
            )}

            {!isLoginForm ? (
                // Register Form
                <div className="login-container">
                    <h1>Create Acount</h1>

                    <form>
                        <label>Your name</label>
                        <input
                            required
                            type="text"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>E-Email</label>
                        <input
                            required
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Password</label>
                        <input
                            required
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Re-enter password</label>
                        <input
                            required
                            type="password"
                            name="password"
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                    </form>
                    <p>
                        By continuing, you agree to FAKE Amazon's{" "}
                        <a>Conditions</a> of Use and <a>Privacy Notice.</a>
                    </p>

                    <button className="create-btn btnn" onClick={register}>
                        {registerLoading ? "Please wait.." : "Create Acount"}
                    </button>
                </div>
            ) : (
                // Sign in Form
                <div className="login-container">
                    <h1>Sign in</h1>
                    <form>
                        <label>E-Email</label>
                        <input
                            required
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Password</label>
                        <input
                            required
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="btnn" onClick={signIn}>
                            {loading ? "Loading..." : "Sign in"}
                        </button>
                    </form>
                    <p>
                        By continuing, you agree to Amazon's <a>Conditions</a>{" "}
                        of Use and <a>Privacy Notice.</a>
                    </p>

                    <span>New to Amazon?</span>
                    <button
                        className="create-btn"
                        onClick={() => setIsLoginForm(false)}
                    >
                        {registerLoading
                            ? "Loading..."
                            : "Create your Amazon Account"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;
