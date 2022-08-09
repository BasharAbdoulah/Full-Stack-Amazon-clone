import React from "react";
// import Scss File
import "../sass/components/footer.scss";
// import logo picture
import logo from "../images/358-3584545_rolling-pin-clip-art.png";

function Footer() {
    // back to top function
    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="footer">
            <button className="to-top" onClick={backToTop}>
                Back to top
            </button>
            <div className="footer-container">
                <div className="footer-section">
                    <div className="footer-texts">
                        <h3>Get to Know Us</h3>
                        <p>Careers</p>
                        <p>Blog</p>
                        <p>About FAKE amzon</p>
                        <p>Investor Relations</p>
                        <p>FAKE Amazon Devices</p>
                        <p>FAKE Amazon Science</p>
                    </div>
                    <div className="footer-texts">
                        <h3>Make Money with us</h3>
                        <p>Sell products on Amazon</p>
                        <p>Sell apps on Amazon</p>
                        <p>Sell on Amazon Business</p>
                        <p>Bacome an Affiline</p>
                        <p>Adertise Your products</p>
                        <p>Self-Publish with us</p>
                        <p>Sell products on Amazon</p>
                        <p>Sell apps on Amazon</p>
                        <p>Sell on Amazon Business</p>
                    </div>
                    <div className="footer-texts">
                        <h3>Get to Know Us</h3>
                        <p>Careers</p>
                        <p>Blog</p>
                        <p>About FAKE amzon</p>
                        <p>Investor Relations</p>
                        <p>FAKE Amazon Devices</p>
                        <p>FAKE Amazon Science</p>
                    </div>
                    <div className="footer-texts">
                        <h3>Make Money with us</h3>
                        <p>Sell products on Amazon</p>
                        <p>Sell apps on Amazon</p>
                        <p>Sell on Amazon Business</p>
                        <p>Bacome an Affiline</p>
                        <p>Adertise Your products</p>
                        <p>Self-Publish with us</p>
                        <p>Sell products on Amazon</p>
                        <p>Sell apps on Amazon</p>
                        <p>Bacome an Affiline</p>
                        <p>Sell on Amazon Business</p>
                    </div>
                </div>
                <div className="footer-section">
                    <img src={logo} />
                    <select id="country" name="country">
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syria</option>
                        <option value="Tahiti">Tahiti</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad & Tobago">
                            Trinidad & Tobago
                        </option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks & Caicos Is">
                            Turks & Caicos Is
                        </option>
                    </select>
                    <button>KD - Kuwait .Dinar</button>
                    <button>Kuwait City</button>
                </div>
            </div>
        </div>
    );
}

export default Footer;
