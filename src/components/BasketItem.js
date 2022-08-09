import React from "react";
import "../sass/components/BasketItem.scss";
import { useStateValue } from "./StateProvider";
import StarRateIcon from "@mui/icons-material/StarRate";

function BasketItem({ title, image, price, rating, id, quantity, hideButton }) {
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
                    <strong>{price}</strong> <br />
                </p>
                <strong>Quantity: {quantity}</strong>
                <div className="basket-item-rating">
                    {rateArray.map((i) => (
                        <StarRateIcon
                            className="starRate"
                            key={Math.random()}
                        />
                    ))}
                </div>
                {!hideButton && (
                    <button className="btnn" onClick={removeFromBasket}>
                        Remove From Basket
                    </button>
                )}
            </div>
        </div>
    );
}

export default BasketItem;
