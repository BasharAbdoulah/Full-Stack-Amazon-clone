import React, { useEffect, useState } from "react";
import "../sass/components/order.scss";
import Order from "./Order";
import { useStateValue } from "./StateProvider";

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respon = await fetch(
                    "https://amazon-clone-b.herokuapp.com/orders"
                );
                const json = await respon.json();
                // Filtring current user orders
                const ordersForEmail = await json.filter(
                    (item) => item.order.email === user.email
                );
                // I set orders who came from DB for current user
                setOrders(ordersForEmail.map((item) => item.order));
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [user]);

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
