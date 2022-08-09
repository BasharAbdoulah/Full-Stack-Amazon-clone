import React, { useContext, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarRateIcon from "@mui/icons-material/StarRate";

import "../sass/components/product.scss";
import "../sass/vaiables/colors.scss";

import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";

function Product({ title, img, price, rate, id }) {
    const [{ basket }, dispatch] = useStateValue();

    const rateNum = Math.floor(rate);
    const rateArray = [];
    for (let i = 0; i < rateNum; i++) {
        rateArray.push(i);
    }

    // showing product page
    const productClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch({
            type: "PRODUCT_CLICK",
            proprtys: { title, img, price, rate, id },
        });
    };
    return (
        <div className="product">
            <div className="product-view">
                <Link to="/product" onClick={productClick}>
                    <img className="product-img" src={img} />
                </Link>
            </div>
            <div className="product-info">
                <p>{title}</p>
                <p className="product-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product-rating">
                    {rateArray.map((i) => (
                        <StarRateIcon
                            key={Math.random(5)}
                            className="starRate"
                        />
                    ))}
                </div>
                <button>
                    Save for later <FavoriteBorderIcon className="heart" />{" "}
                </button>
            </div>
        </div>
    );
}

export default Product;
