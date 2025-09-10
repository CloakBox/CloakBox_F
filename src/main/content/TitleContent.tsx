import {ViewBox} from "./element/ViewBox.tsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * 메인 화면
 * @constructor
 */
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
        //컨텐츠 존재시 정보 있는 box 미존재 시 그냥 box(클릭하면,글쓰는창으로 넘어가는)
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