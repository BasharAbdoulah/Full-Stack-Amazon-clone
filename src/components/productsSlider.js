import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import slider__img1 from "../images/Slide-Images/slider_img1.avif";
import slider__img2 from "../images/Slide-Images/slider_img2.jpeg";
import "../sass/components/productsSlider.scss";

export default class ProductsSlider extends Component {
    render() {
        const settings = {
            className: "center",
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 5,
            swipeToSlide: true,
            afterChange: function (index) {
                console.log(
                    `Slider Changed to: ${
                        index + 1
                    }, background: #222; color: #bada55`
                );
            },
        };
        return (
            <div className="slider">
                <h2>Swipe To Slide</h2>
                <Slider {...settings} className="slider__container">
                    <div className="slider__item">
                        <Link to="/homeGroup">
                            <img
                                src={slider__img1}
                                alt="products__slider"
                                className="slide__img"
                            />
                        </Link>
                    </div>
                    <div className="slider__item">
                        <Link to="/homeGroup">
                            <img
                                src={slider__img2}
                                alt="products__slider"
                                className="slide__img"
                            />
                        </Link>
                    </div>
                    <div className="slider__item">
                        <Link to="/homeGroup">
                            <img
                                src={slider__img1}
                                alt="products__slider"
                                className="slide__img"
                            />
                        </Link>
                    </div>
                    <div className="slider__item">
                        <Link to="/homeGroup">
                            <img
                                src={slider__img2}
                                alt="products__slider"
                                className="slide__img"
                            />
                        </Link>
                    </div>
                    <div className="slider__item">
                        <Link to="/homeGroup">
                            <img
                                src={slider__img1}
                                alt="products__slider"
                                className="slide__img"
                            />
                        </Link>
                    </div>
                    <div className="slider__item">
                        <Link to="/homeGroup">
                            <img
                                src={slider__img2}
                                alt="products__slider"
                                className="slide__img"
                            />
                        </Link>
                    </div>
                    <div className="slider__item">
                        <Link to="/homeGroup">
                            <img
                                src={slider__img1}
                                alt="products__slider"
                                className="slide__img"
                            />
                        </Link>
                    </div>
                    <div className="slider__item">
                        <Link to="/homeGroup">
                            <img
                                src={slider__img2}
                                alt="products__slider"
                                className="slide__img"
                            />
                        </Link>
                    </div>
                    <div className="slider__item">
                        <Link to="/homeGroup">
                            <img
                                src={slider__img1}
                                alt="products__slider"
                                className="slide__img"
                            />
                        </Link>
                    </div>
                    <div className="slider__item">
                        <Link to="/homeGroup">
                            <img
                                src={slider__img2}
                                alt="products__slider"
                                className="slide__img"
                            />
                        </Link>
                    </div>
                </Slider>
            </div>
        );
    }
}
