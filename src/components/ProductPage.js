import React, { useState } from "react";
import { useStateValue } from "./StateProvider";
import "../sass/components/productpage.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarRateIcon from "@mui/icons-material/StarRate";

function ProductPage() {
    const [{ basket, newUsername, clickedProduct, user }, dispatch] =
        useStateValue();
    const [counter, setCounter] = useState(1);

    const rateNum = Math.floor(clickedProduct.rate);
    const rateArray = [];
    for (let i = 0; i < rateNum; i++) {
        rateArray.push(i);
    }

    // Add the product to basket comp
    const addToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: Math.random(),
                title: clickedProduct.title,
                image: clickedProduct.img,
                price: clickedProduct.price * counter,
                rating: clickedProduct.rate,
                quantity: counter,
            },
        });
    };

    const increament = () => {
        if (counter !== 0) {
            setCounter(counter - 1);
        }
    };
    const decerement = () => {
        if (counter === 10) {
            return false;
        } else {
            setCounter(counter + 1);
        }
    };

    return (
        <div className="product-page">
            <div className="product-container">
                <div className="img-section">
                    <img alt="product" src={clickedProduct.img} />
                </div>
                <div className="caption-section">
                    <div className="details">
                        <p className="title">{clickedProduct.title}</p>
                        <div className="product-rating">
                            {rateArray.map((i) => (
                                <StarRateIcon
                                    key={Math.random(5)}
                                    className="starRate"
                                />
                            ))}
                        </div>
                        <h3>
                            $
                            {counter
                                ? clickedProduct.price * counter
                                : clickedProduct.price}
                        </h3>
                        <div className="counter">
                            <span onClick={increament}>-</span>
                            <p>{counter}</p>
                            <span onClick={decerement}>+</span>
                        </div>
                        <div className="about-item">
                            <h4>About this item</h4>
                            <p>
                                80-count box of Band-Aid Brand Tru-Stay Sheer
                                Strips Adhesive Bandages to
                            </p>
                            <p>help minor cuts and scrapes heal.</p>
                            <p>
                                These sterile bandages are sheer in appearance
                            </p>
                            <p>
                                The Microvent backing of these sheer bandages
                                provides superior breathability.
                            </p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="btnn" onClick={addToBasket}>
                            Add to cart
                        </button>
                        <button className="save-btn">
                            Save to later <FavoriteBorderIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
