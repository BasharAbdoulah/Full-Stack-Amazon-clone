import React, { useEffect, useState } from "react";
import BasketItem from "./BasketItem";
import { useStateValue } from "./StateProvider";
import "../sass/components/payment.scss";
import "../sass/vaiables/_colors.scss";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import StripeChecout from "react-stripe-checkout";

const PUBLIC_KEY =
    "pk_test_51LQrH6EMY6St7oZJP0vm3N7HyPHtzxjcJaBknUFWQGLsWORUleN7qpT6GubxqBuCEndoLwND5ONaRYTKPYpXKDfr00lGTdAS5A";

function Payment() {
    const history = useNavigate();
    const [{ basket, newUsername, user }, dispatch] = useStateValue();

    const makePayment = async () => {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            // IF the user have signed in then save his orders
            if (user) {
                fetch(`http://localhost:4000/payment`, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        order: {
                            basket: basket,
                            time: new Date().toLocaleString(),
                            email: user.email,
                            amount: getBasketTotal(basket),
                            userName: newUsername,
                        },
                    }),
                })
                    .then((res) => {
                        if (res.status === 200) {
                            return res.json();
                        }
                        throw new Error("Somthing Wrong!!");
                    })
                    .catch((err) => console.log(err.message));
            }

            history("/orders");
            dispatch({
                type: "EMPTY_BASKET",
            });
        } catch (err) {
            console.log(
                "This Error because the payment procces wasn't real ",
                err.message
            );
        }
    };

    return (
        <div className="payment">
            <div className="payment-container">
                <h1>
                    Checkout (
                    <Link to="/checkout"> {basket?.length} items</Link>)
                </h1>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment-address">
                        <p>Email: {user ? user.email : "NO Email!"}</p>
                        <p>Address: 993 Block 4</p>
                        <p>City: Kuwait City, KW</p>
                    </div>
                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment-items">
                        {basket.map((item) => (
                            <BasketItem
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                id={item.id}
                                key={item.id}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment-details">
                        <StripeChecout
                            className="pay-btn"
                            stripeKey={PUBLIC_KEY}
                            token={makePayment}
                            name=""
                            amount={getBasketTotal(basket) * 100}
                            shippingAddress
                        />
                        <div className="payment-price-container">
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                        </div>
                    </div>
                    <p>
                        Card number for test ={">"} 4242 4242 4242 4242 <br />{" "}
                        and use anthing in other fields{" "}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Payment;
