import React, { useContext } from "react";

import "../sass/components/product.scss";
import "../sass/vaiables/_colors.scss";

import { useStateValue } from "./StateProvider";

function Product({ title, img, price, rate, id }) {
    const [{ basket }, dispatch] = useStateValue();

    const rateNum = Math.floor(rate);
    const rateArray = [];
    for (let i = 0; i < rateNum; i++) {
        rateArray.push(i);
    }

    const addToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: img,
                price: price,
                rating: rate,
            },
        });
    };
    return (
        <div className="product">
            <div className="product-info">
                <p>{title}</p>
                <p className="product-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product-rating">
                    {rateArray.map((i) => (
                        <p key={Math.random(5)}>🌟</p>
                    ))}
                </div>
                <img className="product-img" src={img} />
            </div>
            <button className="btn" onClick={addToBasket}>
                Add to Basket
            </button>
        </div>
    );
}

export default Product;
