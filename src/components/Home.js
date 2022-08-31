import React, { createContext, useEffect, useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import "../sass/components/home.scss";
import "../sass/components/spinner.scss";
import Slider from "./Slider";
import { useStateValue } from "./StateProvider";

import Device1 from "../images/Groups images/Device_no1.webp";
import Device2 from "../images/Groups images/Device_no2.webp";
import Device3 from "../images/Groups images/Device_no3.jpeg";
import Device4 from "../images/Groups images/Device_no4.jpeg";

import sign__img from "../images/home__signin.jpeg";
import child1 from "../images/Groups images/children_no1.avif";
import child2 from "../images/Groups images/children_no2.avif";
import child3 from "../images/Groups images/children_no3.avif";
import group2 from "../images/Groups images/books.jpeg";

import group5 from "../images/Groups images/kitchen stuff.jpeg";
import group6 from "../images/Groups images/women clothes.jpeg";
import group7 from "../images/Groups images/mens clothes.jpeg";
import group8 from "../images/Groups images/laptobs.jpeg";
import group9 from "../images/Groups images/images.jpeg";
import { Link } from "react-router-dom";
import ProductsSlider from "./productsSlider";

export const productsContext = createContext();

function Home() {
    const [products, setProducts] = useState([]);
    const [{ basket, user }, dispatch] = useStateValue();

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

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
        afterChange: function (index) {},
    };

    return (
        <productsContext.Provider value={products}>
            <div className="home">
                <Slider />
                <div className="home-container">
                    <div className="home-row">
                        <div className="products-group-four">
                            <h3>Children stuff</h3>
                            <Link to="/homeGroup" className="four_items_groub">
                                <img
                                    className="c-img"
                                    src={child1}
                                    alt="group"
                                />
                                <img
                                    className="c-img"
                                    src={child2}
                                    alt="group"
                                />
                                <img
                                    className="c-img"
                                    src={child3}
                                    alt="group"
                                />
                                <img
                                    className="c-img"
                                    src={child1}
                                    alt="group"
                                />
                            </Link>
                            <KeyboardDoubleArrowUpIcon />
                        </div>
                        <div className="products-group-four">
                            <h3>Gaming Tools</h3>
                            <Link to="/homeGroup" className="four_items_groub">
                                <img src={Device1} alt="group" />
                                <img src={Device2} alt="group" />
                                <img src={Device3} alt="group" />
                                <img src={Device4} alt="group" />
                            </Link>
                            <KeyboardDoubleArrowUpIcon />
                        </div>
                        <div className="products-group signin">
                            <div className="home__signin">
                                <h4>Sign in for the best experience</h4>
                                <Link className="home_sign_btn" to="/login">
                                    Sign In Securly
                                </Link>
                            </div>
                            <div className="home_sign_img">
                                <img src={sign__img} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="home-row">
                        <div className="products-group">
                            <h3>Books & Reading</h3>
                            <Link to="/homeGroup">
                                <img
                                    className="group-img"
                                    src={group2}
                                    alt="group"
                                />
                                <span></span>
                            </Link>
                            <KeyboardDoubleArrowUpIcon />
                        </div>
                        <div className="products-group">
                            <h3>Kitchen Tools</h3>
                            <Link to="/homeGroup">
                                <img
                                    className="group-img"
                                    src={group5}
                                    alt="group"
                                />
                                <span></span>
                            </Link>
                            <KeyboardDoubleArrowUpIcon />
                        </div>
                        <div className="products-group">
                            <h3>Women Clothes</h3>
                            <Link to="/homeGroup">
                                <img
                                    className="group-img"
                                    src={group6}
                                    alt="group"
                                />
                                <span></span>
                            </Link>
                            <KeyboardDoubleArrowUpIcon />
                        </div>
                    </div>

                    <div className="hoe-row">
                        <ProductsSlider />
                    </div>

                    <div className="home-row">
                        <div className="products-group">
                            <h3>Men's Clothes</h3>
                            <Link to="/homeGroup">
                                <img
                                    className="group-img"
                                    src={group7}
                                    alt="group"
                                />
                                <span></span>
                            </Link>
                            <KeyboardDoubleArrowUpIcon />
                        </div>
                        <div className="products-group">
                            <h3>Labtop & Tablet </h3>
                            <Link to="/homeGroup">
                                <img
                                    className="group-img"
                                    src={group8}
                                    alt="group"
                                />
                                <span></span>
                            </Link>
                            <KeyboardDoubleArrowUpIcon />
                        </div>
                        <div className="products-group">
                            <h3>Skin Care</h3>
                            <Link to="/homeGroup">
                                <img
                                    className="group-img"
                                    src={group9}
                                    alt="group"
                                />
                                <span></span>
                            </Link>
                            <KeyboardDoubleArrowUpIcon />
                        </div>
                    </div>
                </div>
            </div>
        </productsContext.Provider>
    );
}

export default Home;
