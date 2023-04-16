import classNames from "classnames/bind";
import { Row, Col } from "react-bootstrap";
import { RiRefund2Fill } from "react-icons/ri";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { MdRealEstateAgent } from "react-icons/md";
import { useLocation } from "react-router-dom";

import style from './Footer.module.scss';
const cx = classNames.bind(style)
function Features() {
    const { pathname } = useLocation()

    const features = [
        {
            title: "ĐẢM BẢO SÁCH THẬT",
            desc: "CHÚNG TÔI NÓI KHÔNG VỚI SÁCH GIẢ, SÁCH NHÁI",
            Icon: MdRealEstateAgent
        },
        {
            title: "FREE SHIP CHO ĐƠN HÀNG",
            desc: "300.000 (TPHCM) - 500.000 (TỈNH/THÀNH KHÁC)",
            Icon: MdOutlineDeliveryDining
        },
        {
            title: "ĐỔI TRẢ TRONG 7 NGÀY",
            desc: "SÁCH HƯ HỎNG, DẬP MÓP SÁCH DO VẬN CHUYỂN",
            Icon: RiRefund2Fill
        }
    ]

    return (
        <div
            className={cx('features-wrapper')}
            style={{ backgroundColor: pathname !== "/" && '#F5F7FF' }}
        >
            <Row className="justify-content-center">
                {
                    features.map((feature, index) => (
                        <Col lg={3} md={4} sm={12} key={index}>
                            <div className={cx('feature')}>
                                <div className={cx('feature-head')}>
                                    <feature.Icon className={cx('icon')} />
                                </div>
                                <p className={cx('feature-name')}>{feature.title}</p>
                                <p className={cx('feature-desc')}>{feature.desc}</p>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}

export default Features;