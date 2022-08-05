import React, { useRef } from "react";
import "../sass/components/header.scss";
import logo from "../images/358-3584545_rolling-pin-clip-art.png";
import SearchIcon from "@mui/icons-material/Search";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "../firebaseFiles";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
    const useRefe = useRef();
    const [{ basket, newUsername, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    };
    return (
        <header className="header">
            <div to="/" className="logo-container">
                <MenuIcon
                    className="menu-icon"
                    onClick={() => useRefe.current.classList.toggle("show")}
                />
                <Link to="/checkout" className="bagicon-mobile">
                    <ShoppingBagIcon className="shoping-bag" />
                    <span className="option-line-two">{basket.length}</span>
                </Link>
                <Link to="/">
                    <img className="header-logo" src={logo} />
                </Link>
            </div>

            <div className="header-search">
                <input type="test" placeholder="Search..." />
                <SearchIcon className="search-icon" />
            </div>
            <div className="header-nav" ref={useRefe}>
                <div
                    className="close"
                    onClick={() => useRefe.current.classList.toggle("show")}
                >
                    X
                </div>
                <Link to={!user && "/login"}>
                    <div
                        onClick={handleAuthentication}
                        className="header-option"
                    >
                        <p className="option-line-one">
                            Hello {newUsername ? newUsername : "Guest"}
                        </p>
                        <span className="option-line-two">
                            {user ? "Sign Out" : "Sign In"}
                        </span>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className="header-option">
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