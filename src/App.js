import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import "./sass/layout/_globalRules.scss";
import Checkout from "./component/Checkout";
import Header from "./component/Header";
import Home from "./component/Home";
import Login from "./component/Login";
import { useStateValue } from "./component/StateProvider";
import { auth } from "./firebaseFiles";
import Payment from "./component/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./component/Orders";
import Footer from "./component/Footer";

const PUBLIC_KEY =
    "pk_test_51LQrH6EMY6St7oZJP0vm3N7HyPHtzxjcJaBknUFWQGLsWORUleN7qpT6GubxqBuCEndoLwND5ONaRYTKPYpXKDfr00lGTdAS5A";

const promise = loadStripe(PUBLIC_KEY);

function App() {
    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        // will only run once app component loads
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // the user just logged in / the user was logged in
                dispatch({
                    type: "SET_USER",
                    user: authUser, // this user is who come from firebase
                });
            } else {
                // the user is logged out
                dispatch({
                    type: "SET_USER",
                    user: null,
                });
            }
        });
    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header /> <Home />
                            </>
                        }
                    />
                    <Route
                        path="/orders"
                        element={
                            <>
                                <Header /> <Orders />
                            </>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <>
                                <Header /> <Checkout />
                            </>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/payment"
                        element={
                            <>
                                <Header />
                                <Elements stripe={promise}>
                                    <Payment />
                                </Elements>
                            </>
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
