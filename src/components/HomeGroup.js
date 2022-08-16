import React, { createContext, useEffect, useRef, useState } from "react";
import { useStateValue } from "./StateProvider";
import "../sass/components/homeGroup.scss";
import Product from "./Product";
import StarRateIcon from "@mui/icons-material/StarRate";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

export const productsContext = createContext();

function HomeGroup() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFiltred, setIsFiltred] = useState(false);
    const [filterdProducts, setFiltredPro] = useState([]);
    const [arrowIsUp, setArrowIsUp] = useState(false);
    const useRefe = useRef();

    // Fetch the products from API
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json) => {
                setProducts(json);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(true);
            });
    }, []);

    // Filtring By stars
    const filterUpTo = (v) => {
        setFiltredPro(products.filter((product) => product.rating.rate >= v));
        setIsFiltred(true);
    };

    // Filtring By price
    const filtringByPrice = (v) => {
        if (v == 10) {
            setFiltredPro(
                products.filter(
                    (product) => product.price >= 1 && product.price <= 100
                )
            );
        } else if (v == 100) {
            setFiltredPro(
                products.filter(
                    (product) => product.price >= 100 && product.price <= 500
                )
            );
        } else if (v == 500) {
            setFiltredPro(products.filter((product) => product.price > 500));
        }
        setIsFiltred(true);
    };

    // filtring by categories
    const handleChange = (e) => {
        const { value, checked } = e.target;
        console.log(`${value} is ${checked}`);
        if (checked) {
            var filtredByCategory = products.filter(
                (product) => product.category === value
            );

            // Here i set products who filtred by category
            setFiltredPro(filtredByCategory);

            // Here i group all selected products together
            const allSelectedProducts = [
                ...filterdProducts,
                ...filtredByCategory,
            ];

            setFiltredPro([...allSelectedProducts]);
            setIsFiltred(true);
        } else {
            var filtredByCategory2 = filterdProducts.filter(
                (product) => product.category !== value
            );
            setFiltredPro(filtredByCategory2);

            if (filtredByCategory2.length == 0) {
                console.log("its empty");
                setIsFiltred(false);
            }
        }
    };

    // show filter in media screens
    const showFilter = () => {
        // Toggle the arrow
        setArrowIsUp(arrowIsUp ? false : true);
        useRefe.current.classList.toggle("show");
        document.body.classList.toggle("stop-scrolling");
    };

    return (
        <div className="homeGroup">
            <div className="mo-filter">
                <h4>like Aldus PageMaker including versions of Lorem Ipsum.</h4>
                <div className="filter-content" onClick={showFilter}>
                    <p>Filtring procces here</p>
                    <strong>Filter</strong>
                    {arrowIsUp ? (
                        <KeyboardDoubleArrowUpIcon className="d-arrow" />
                    ) : (
                        <KeyboardDoubleArrowDownIcon className="d-arrow" />
                    )}
                </div>
                <div className="mo-filter-container">
                    <div className="mo-filter-section " ref={useRefe}>
                        <div className="mo-categories">
                            <h4>Choice Categories</h4>
                            <form className="mo-form">
                                <input
                                    className="mo-input"
                                    type="checkbox"
                                    value="men's clothing"
                                    onChange={handleChange}
                                />
                                <label
                                    className="mo-label"
                                    htmlFor="men's clothing"
                                >
                                    Men's clothing
                                </label>
                                <br />
                                <input
                                    className="mo-input"
                                    type="checkbox"
                                    value="jewelery"
                                    onChange={handleChange}
                                />
                                <label className="mo-label" htmlFor="jewelery">
                                    Jewelery
                                </label>
                                <br />
                                <input
                                    className="mo-input"
                                    type="checkbox"
                                    value="electronics"
                                    onChange={handleChange}
                                />
                                <label
                                    className="mo-label"
                                    htmlFor="electronics"
                                >
                                    Electronics
                                </label>
                                <br />
                                <input
                                    className="mo-input"
                                    type="checkbox"
                                    value="women's clothing"
                                    onChange={handleChange}
                                />
                                <label
                                    className="mo-label"
                                    htmlFor="women's clothing"
                                >
                                    Women's clothing
                                </label>
                                <br />
                            </form>
                        </div>

                        <div className="reviews">
                            <h4>Choice Customer Reviews</h4>
                            <p className="stars" onClick={() => filterUpTo(4)}>
                                <StarRateIcon className="star" />
                                <StarRateIcon className="star" />
                                <StarRateIcon className="star" />
                                <StarRateIcon className="star" />& UP
                            </p>
                            <p className="stars" onClick={() => filterUpTo(3)}>
                                <StarRateIcon className="star" />
                                <StarRateIcon className="star" />
                                <StarRateIcon className="star" />& UP
                            </p>
                            <p className="stars" onClick={() => filterUpTo(1)}>
                                <StarRateIcon className="star" /> & UP
                            </p>
                        </div>
                        <div className="price">
                            <h4>Choice Price</h4>
                            <p onClick={() => filtringByPrice(10)}>
                                $10 to $100
                            </p>
                            <p onClick={() => filtringByPrice(100)}>
                                $100 to $500
                            </p>
                            <p onClick={() => filtringByPrice(500)}>
                                $500 to $10000
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                ""
            )}
            <div className="homeGroup-container">
                <div className="homeGroup-row">
                    {isFiltred
                        ? filterdProducts.map((prod) => {
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
                          })
                        : products.map((prod) => {
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
                <div className="filter-section ">
                    <div className="categories">
                        <h4>Choice Categories</h4>
                        <form>
                            <label
                                className="container"
                                htmlFor="men's clothing"
                            >
                                <input
                                    type="checkbox"
                                    id="men's clothing"
                                    name="men's clothing"
                                    value="men's clothing"
                                    onChange={handleChange}
                                />
                                Men's clothing
                                <span className="checkmark"></span>
                            </label>

                            <label className="container" htmlFor="jewelery">
                                <input
                                    type="checkbox"
                                    id="jewelery"
                                    name="jewelery"
                                    value="jewelery"
                                    onChange={handleChange}
                                />
                                Jewelery
                                <span className="checkmark"></span>
                            </label>

                            <label className="container" htmlFor="electronics">
                                <input
                                    type="checkbox"
                                    id="electronics"
                                    name="electronics"
                                    value="electronics"
                                    onChange={handleChange}
                                />
                                Electronics
                                <span className="checkmark"></span>
                            </label>

                            <label
                                className="container"
                                htmlFor="women's clothing"
                            >
                                <input
                                    type="checkbox"
                                    id="women's clothing"
                                    name="women's clothing"
                                    value="women's clothing"
                                    onChange={handleChange}
                                />
                                Women's clothing
                                <span className="checkmark"></span>
                            </label>
                        </form>
                    </div>

                    <div className="reviews">
                        <h4>Choice Customer Reviews</h4>
                        <p className="stars" onClick={() => filterUpTo(4)}>
                            <StarRateIcon className="star" />
                            <StarRateIcon className="star" />
                            <StarRateIcon className="star" />
                            <StarRateIcon className="star" />& UP
                        </p>
                        <p className="stars" onClick={() => filterUpTo(3)}>
                            <StarRateIcon className="star" />
                            <StarRateIcon className="star" />
                            <StarRateIcon className="star" />& UP
                        </p>
                        <p className="stars" onClick={() => filterUpTo(1)}>
                            <StarRateIcon className="star" /> & UP
                        </p>
                    </div>
                    <div className="price">
                        <h4>Choice Price</h4>
                        <p onClick={() => filtringByPrice(10)}>$10 to $100</p>
                        <p onClick={() => filtringByPrice(100)}>$100 to $500</p>
                        <p onClick={() => filtringByPrice(500)}>
                            $500 to $10000
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeGroup;
