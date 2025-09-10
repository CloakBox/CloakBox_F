import {ViewBox} from "./element/ViewBox.tsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const TitleContent = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "50px",
        slidesToShow: 3,
        speed: 500
    };

    return (
        <>
            <div className="main_content">
                <div className="slider-container">
                    <Slider {...settings}>
                        <ViewBox/>
                        <ViewBox/>
                        <ViewBox/>
                        <ViewBox/>
                    </Slider>
                </div>
            </div>
        </>
    )
}