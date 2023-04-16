import React from "react";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import Carousel from "./Carousel";
import style from './Carousels.module.scss'
// import slide from '~/assets/images/slide1.png'
import slice2 from '~/assets/images/slides/slice4.png'
import slice1 from '~/assets/images/slides/slice3.png'

const cx = classNames.bind(style)

const Carousels = () => {
    var settings = {
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <Container className={cx('wrapper')}>
            <Slider {...settings}>
                <div>
                    <img src={slice1} alt="slide" />
                </div>
                <div>
                    <img src={slice2} alt="slide" />
                </div>
            </Slider>
            <div className={cx('head')}>
                <div className={cx('left')}>SÁCH MỚI</div>
                <Link className={cx('right')} to="/filter">Xem tất cả sách</Link>
            </div>

            {/* <Carousel /> */}
        </Container>
    );
}

export default Carousels