import React, { createContext, useEffect, useState } from "react";
import primeImg from "../images/amazon-prime.jpeg";
import "../sass/components/home.scss";
import "../sass/components/spinner.scss";
import Product from "./Product";
import Slider from "./Slider";
import { useStateValue } from "./StateProvider";

export const productsContext = createContext();

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [{ basket, user }, dispatch] = useStateValue();

    // fetch orders for current user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respon = await fetch(
                    "https://amazon-clone-b.herokuapp.com/orders"
                );
                const json = await respon.json();
                // filtring orders who comes from DB  for current user
                const ordersForEmail = await json.filter(
                    (item) => item.order.email === user.email
                );
                // i pass the username comes from db to reducer.js to recive it in another comps
                const passingUsername = await dispatch({
                    type: "REGISTER_ACTION",
                    userName: ordersForEmail[0].order.userName,
                });
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [user]);

    // Fetch the products from API
    useEffect(() => {
        setLoading(true);
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => setProducts(json));

        if (products) {
            setLoading(false);
        }
    }, []);

    return (
        <productsContext.Provider value={products}>
            <div className="home">
                {loading && (
                    <div className="spinner-container">
                        <div className="loading-spinner"></div>
                    </div>
                )}

                <Slider />
                <div className="home-container">
                    <div className="home-row">
                        {products.slice(0, 2).map((prod) => {
                            return (
                                <Product
                                    key={Math.random(5)}
                                    title={prod.title}
                                    img={prod.image}
                                    price={prod.price}
                                    rate={prod.rating.rate}
                                    id={prod.id}
                                />
                            );
                        })}
                    </div>
                    <div className="home-row">
                        {products.slice(2, 5).map((prod) => {
                            return (
                                <Product
                                    key={Math.random(5)}
                                    title={prod.title}
                                    img={prod.image}
                                    price={prod.price}
                                    rate={prod.rating.rate}
                                    id={prod.id}
                                />
                            );
                        })}
                    </div>
                    <div className="home-row">
                        {products.slice(5, 9).map((prod) => {
                            return (
                                <Product
                                    key={Math.random(5)}
                                    title={prod.title}
                                    img={prod.image}
                                    price={prod.price}
                                    rate={prod.rating.rate}
                                    id={prod.id}
                                />
                            );
                        })}
                    </div>
                    <div className="home-row">
                        {products.slice(14, 19).map((prod) => {
                            return (
                                <Product
                                    key={Math.random(5)}
                                    title={prod.title}
                                    img={prod.image}
                                    price={prod.price}
                                    rate={prod.rating.rate}
                                    id={prod.id}
                                />
                            );
                        })}
                    </div>
                    <div className="home-row">
                        {products.slice(13, 14).map((prod) => {
                            return (
                                <Product
                                    key={Math.random(5)}
                                    title={prod.title}
                                    img={prod.image}
                                    price={prod.price}
                                    rate={prod.rating.rate}
                                    id={prod.id}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </productsContext.Provider>
    );
}

export default Home;
