import React from "react";
import "../sass/components/checkout.scss";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
    const history = useNavigate();
    const [{ basket, user }, dispatch] = useStateValue();

    const checkBeforePay = () => {
        if (user) {
            history("/payment");
        } else {
            history("/login");
        }
    };

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items):{" "}
                            <strong>{value}</strong>
                        </p>
                        <small className="subtotal-gift">
                            <input type="checkbox" /> This Orders contains a
                            gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            {basket.length <= 0 ? (
                <button
                    className="btnn"
                    onClick={(e) => history("/payment")}
                    disabled
                >
                    Proceed to Checkout
                </button>
            ) : (
                <button className="btnn" onClick={checkBeforePay}>
                    Proceed to Checkout
                </button>
            )}
        </div>
    );
}

export default Subtotal;
