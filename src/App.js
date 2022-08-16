import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import "./sass/layout/globalRules.scss";
import "./index.css";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { useStateValue } from "./components/StateProvider";
import { auth } from "./firebaseFiles";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";
import Footer from "./components/Footer";
import ProductPage from "./components/ProductPage";
import HomeGroup from "./components/HomeGroup";

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
                                <Header /> <Home /> <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/homeGroup"
                        element={
                            <>
                                <Header /> <HomeGroup /> <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/product"
                        element={
                            <>
                                <Header /> <ProductPage /> <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/orders"
                        element={
                            <>
                                <Header /> <Orders /> <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <>
                                <Header /> <Checkout /> <Footer />
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
            </div>
        </Router>
    );
}

export default App;
