import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import "../sass/components/home.scss";
import "../sass/components/spinner.scss";
import Slider from "./Slider";
import { useStateValue } from "./StateProvider";
import group1 from "../images/Groups images/cgildren stuff.jpeg";
import group2 from "../images/Groups images/books.jpeg";
import group3 from "../images/Groups images/download.jpeg";
import group4 from "../images/Groups images/health care.jpeg";
import group5 from "../images/Groups images/kitchen stuff.jpeg";
import group6 from "../images/Groups images/women clothes.jpeg";
import group7 from "../images/Groups images/mens clothes.jpeg";
import group8 from "../images/Groups images/laptobs.jpeg";
import group9 from "../images/Groups images/images.jpeg";
import { Link } from "react-router-dom";

export const productsContext = createContext();

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [{ basket, user }, dispatch] = useStateValue();
    const [data, setData] = useState(null);

    // fetch orders for current user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respon = await fetch(
                    "https://amazon-clone-b.herokuapp.com/orders"
                );
                const json = await respon.json();
                // filtring orders who comes from DB  for current user
                const ordersForEmail = await json.filter(
                    (item) => item.order.email === user.email
                );
                // i pass the username comes from db to reducer.js to recive it in another comps
                const passingUsername = await dispatch({
                    type: "REGISTER_ACTION",
                    userName: ordersForEmail[0].order.userName,
                });
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [user]);

    return (
        <productsContext.Provider value={products}>
            <div className="home">
                <Slider />
                <div className="home-container">
                    <div className="home-row">
                        <div className="products-group">
                            <h3>Children stuff</h3>
                            <Link to="/homeGroup">
                                <img src={group1} alt="group" />
                                <KeyboardDoubleArrowUpIcon />
                            </Link>
                        </div>
                        <div className="products-group">
                            <h3>Books & Reading</h3>
                            <Link to="/homeGroup">
                                <img src={group2} alt="group" />
                                <KeyboardDoubleArrowUpIcon />
                            </Link>
                        </div>
                        <div className="products-group">
                            <h3>Gaming Tools</h3>
                            <Link to="/homeGroup">
                                <img src={group3} alt="group" />
                                <KeyboardDoubleArrowUpIcon />
                            </Link>
                        </div>
                    </div>

                    <div className="home-row">
                        <div className="products-group">
                            <h3>Health & Personal Care</h3>
                            <Link to="/homeGroup">
                                <img src={group4} alt="group" />
                                <KeyboardDoubleArrowUpIcon />
                            </Link>
                        </div>
                        <div className="products-group">
                            <h3>Kitchen Tools</h3>
                            <Link to="/homeGroup">
                                <img src={group5} alt="group" />
                                <KeyboardDoubleArrowUpIcon />
                            </Link>
                        </div>
                        <div className="products-group">
                            <h3>Women Clothes</h3>
                            <Link to="/homeGroup">
                                <img src={group6} alt="group" />
                                <KeyboardDoubleArrowUpIcon />
                            </Link>
                        </div>
                    </div>

                    <div className="home-row">
                        <div className="products-group">
                            <h3>Men's Clothes</h3>
                            <Link to="/homeGroup">
                                <img src={group7} alt="group" />
                                <KeyboardDoubleArrowUpIcon />
                            </Link>
                        </div>
                        <div className="products-group">
                            <h3>Labtop & Tablet </h3>
                            <Link to="/homeGroup">
                                <img src={group8} alt="group" />
                                <KeyboardDoubleArrowUpIcon />
                            </Link>
                        </div>
                        <div className="products-group">
                            <h3>Skin Care</h3>
                            <Link to="/homeGroup">
                                <img src={group9} alt="group" />
                                <KeyboardDoubleArrowUpIcon />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </productsContext.Provider>
    );
}

export default Home;
