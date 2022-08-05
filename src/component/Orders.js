import { async } from "@firebase/util";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../sass/components/order.scss";
import BasketItem from "./BasketItem";
import Order from "./Order";
import { useStateValue } from "./StateProvider";

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respon = await fetch("http://localhost:4000/orders");
                const json = await respon.json();
                const ordersForEmail = await json.filter(
                    (item) => item.order.email === user.email
                );

                setOrders(ordersForEmail.map((item) => item.order));
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [user]);

    console.log();
    return (
        <div className="orders">
            <h2>The Orders</h2>

            <div className="orders-container">
                {user ? (
                    orders?.map((order) => (
                        <Order order={order} key={Math.random()} />
                    ))
                ) : (
                    <h3>You haven't sign in!</h3>
                )}
            </div>
        </div>
    );
}

export default Orders;
