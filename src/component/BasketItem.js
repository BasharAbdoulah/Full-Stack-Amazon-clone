import React from "react";
import "../sass/components/BasketItem.scss";
import { useStateValue } from "./StateProvider";

function BasketItem({ title, image, price, rating, id, hideButton }) {
    const [{ basket }, dispatch] = useStateValue();
    const rateNum = Math.floor(rating);
    const rateArray = [];
    for (let i = 0; i < rateNum; i++) {
        rateArray.push(i);
    }

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        });
    };

    return (
        <div className="basket" id={id}>
            <img className="basket-item-img" src={image} />
            <div className="basket-item-info">
                <p>{title}</p>
                <p className="basket-item-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="basket-item-rating">
                    {rateArray.map((i) => (
                        <p key={Math.random()}>🌟</p>
                    ))}
                </div>
                {!hideButton && (
                    <button className="btn" onClick={removeFromBasket}>
                        Remove From Basket
                    </button>
                )}
            </div>
        </div>
    );
}

export default BasketItem;
