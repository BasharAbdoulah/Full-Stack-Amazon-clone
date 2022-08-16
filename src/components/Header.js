import React, { useEffect, useRef, useState } from "react";
import "../sass/components/header.scss";
import logo from "../images/358-3584545_rolling-pin-clip-art.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBasket";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "../firebaseFiles";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
    const history = useNavigate();
    const useRefe = useRef();
    const [{ basket, newUsername, user }, dispatch] = useStateValue();
    const [isSignIn, setIsSignIn] = useState(false);

    // Sign out click
    const handleAuthentication = () => {
        setIsSignIn(false);
        if (user) {
            auth.signOut();
        }
    };

    // Check if user signed in
    useEffect(() => {
        if (newUsername) {
            setIsSignIn(true);
        }
    }, [newUsername]);

    // Disaple scrolling finction and toggle menu
    const showMenu = () => {
        useRefe.current.classList.toggle("show");
        document.body.classList.add("stop-scrolling");
    };

    // Disaple scrolling finction and toggle menu
    const hideMenu = () => {
        useRefe.current.classList.toggle("show");
        document.body.classList.remove("stop-scrolling");
    };

    return (
        <header className="header">
            <div to="/" className="logo-container">
                <MenuIcon className="menu-icon" onClick={showMenu} />
                <Link to="/checkout" className="bagicon-mobile">
                    <ShoppingBagIcon className="shoping-bag" />
                    <span className="option-line-two">{basket.length}</span>
                </Link>
                <div className="mo-person-box">
                    <p className="mo-person-name">
                        {isSignIn ? newUsername : "Guest"}
                    </p>
                    <PersonPinCircleOutlinedIcon
                        onClick={() => history("/login")}
                        className="mo-person"
                    />
                </div>
                <Link to="/">
                    <img className="header-logo" src={logo} />
                </Link>
            </div>

            <div className="header-search">
                <input type="test" placeholder="Search..." />
                <SearchIcon className="search-icon" />
            </div>
            <div className="header-nav" ref={useRefe}>
                <div className="close" onClick={hideMenu}>
                    X
                </div>
                <Link to={!user && "/login"} onClick={hideMenu}>
                    <div
                        onClick={handleAuthentication}
                        className="header-option"
                    >
                        <p className="option-line-one">
                            Hello {isSignIn ? newUsername : "Guest"}
                        </p>
                        <span className="option-line-two">
                            {user ? "Sign Out" : "Sign In"}
                        </span>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className="header-option" onClick={hideMenu}>
                        <p className="option-line-one">Returns</p>
                        <span className="option-line-two">& Orders</span>
                    </div>
                </Link>
                <div className="header-option">
                    <p className="option-line-one">Your</p>
                    <span className="option-line-two">Prime</span>
                </div>
                <Link to="/checkout">
                    <div className="header-option thebag">
                        <ShoppingBagIcon className="shoping-bag" />
                        <span className="option-line-two">{basket.length}</span>
                    </div>
                </Link>
            </div>
        </header>
    );
}

export default Header;
