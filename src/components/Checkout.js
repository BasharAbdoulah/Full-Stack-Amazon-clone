import React from "react";
import "../sass/components/checkout.scss";
import adImg from "../images/Header_TakeIt_1500x300.jpeg";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import BasketItem from "./BasketItem";

function Checkout() {
    const [{ basket, newUsername, user }, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout-left">
                <img className="ad-image" src={adImg} />
                <div className="checkout-message">
                    Hello, {newUsername ? newUsername : "Guest"}
                </div>
                <div className="checkout-title">
                    <h2>Your Shoping Basket</h2>
                </div>

                {basket.length > 0 ? (
                    basket.map((item) => {
                        return (
                            <BasketItem
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                id={item.id}
                                quantity={item.quantity}
                                key={Math.random()}
                            />
                        );
                    })
                ) : (
                    <div className="is-empty">Sorry, Nothing to show</div>
                )}
            </div>

            <div className="chechout-right">
                <Subtotal />
            </div>
        </div>
    );
}
export default Checkout;
