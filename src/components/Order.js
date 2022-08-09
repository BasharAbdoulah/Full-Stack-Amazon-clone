import React, { useEffect, useState } from "react";
import "../sass/components/order.scss";
import BasketItem from "./BasketItem";
import moment from "moment";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";

function Order({ order }) {
    const [{ basket, user }] = useStateValue();

    return (
        <div className="order">
            <div className="order-details">
                <h2>Order</h2>
                <p>Purchase's date: {order.time}</p>
            </div>
            <div className="order-column">
                {order.basket?.map((item) => {
                    return (
                        <BasketItem
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            id={item.id}
                            quantity={item.quantity}
                            key={item.id}
                            hideButton
                        />
                    );
                })}
            </div>
            <CurrencyFormat
                renderText={(value) => <h3>Order Total: {value}</h3>}
                decimalScale={2}
                value={order.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    );
}

export default Order;
