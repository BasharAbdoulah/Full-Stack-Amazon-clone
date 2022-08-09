import Carousel from "react-bootstrap/Carousel";
import img1 from "../images/Slide-Images/maxresdefault.jpeg";
import img2 from "../images/Slide-Images/amazon-prime-servis.jpeg";
import img3 from "../images/Slide-Images/NHNFJ3npPLC4dGGrRcuXy-1200-80.jpeg";
import "../sass/components/home.scss";

function Slider() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100 home-image"
                    src={img3}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 home-image"
                    src={img1}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 home-image"
                    src={img2}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Slider;
