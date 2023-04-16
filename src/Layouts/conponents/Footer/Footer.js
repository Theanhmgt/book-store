import classNames from "classnames/bind";
import { Row, Col, Container } from "react-bootstrap";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { useMediaQuery } from 'react-responsive'
import { useState } from "react";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

import FooterItem from "./FooterItem";
import Button from '~/components/Button'
import style from './Footer.module.scss';
const cx = classNames.bind(style)
function FooterInfors() {
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [columns, setColumns] = useState([
        {
            title: 'Thông tin',
            items: [
                'Về chúng tối', 'Mã bưu điện', 'Công cụ tìm kiếm',
                'Đơn đặt hàng và trả lại', 'Liên hệ với chúng tôi'
            ],
            show: !isTabletOrMobile,
            id: 1
        },
        {
            title: 'Danh mục và sản phẩm nổi bật',
            items: [
                'Sách Luyện Thi THPT Quốc Giá', 'Sách Tham Khảo Lớp 10',
                ' Sách Luyện Thi THPT Quốc Gia Môn Toán',
                ' Sách Luyện Thi THPT Quốc Gia Môn Văn',
                ' Sách Luyện Thi THPT Quốc Gia Môn Anh'
            ],
            show: !isTabletOrMobile,
            id: 3
        },
        {
            title: 'Chính sách',
            items: [
                'Phương thức thanh toán', 'Chính sách vận chuyển', 'Chính sách đổi trả',
                'Chính sách bảo mật'
            ],
            show: !isTabletOrMobile,
            id: 4
        },
        {
            title: 'Địa chỉ',
            items: [
                'Địa chỉ: 307 Nguyễn Kiệm, P3.Q.Gò Vấp TP.HCM', ''
                , 'Phones: (00) 1234 5678', 'Giờ mở của: T2-T5: 9:00 AM - 5:30 PM',
                'T6: 9:00 AM - 6:00 PM', 'T7: 11:00 AM - 5:00 PM',
                'E-mail: theanhmgt66@gmail.com'
            ],
            show: !isTabletOrMobile,
            id: 5
        }
    ])
    const handleShow = (id) => {
        if (isTabletOrMobile) {
            const newColums = [...columns]
            newColums[id - 1].show = !newColums[id - 1].show
            setColumns(newColums)
        }
    }
    return (
        <div className={cx('footer-wrapper')}>
            <Container>
                <div className={cx('head')}>
                    <Row>
                        <Col md={6} sm={12}>
                            <div className={cx('left')}>
                                <p>Đăng ký để nhận bản tin mới từ chúng tôi.</p>
                                <p>Hãy trở thành người đầu tiên nghe về các ưu đãi mới nhất.</p>
                            </div>
                        </Col>
                        <Col md={6} sm={12}>
                            <div className={cx('right')}>
                                <input placeholder="Email của bạn" />
                                <Button primary >Đăng ký</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={cx('body')}>
                    <Row>
                        {
                            columns.map((column, index) => (
                                <Col lg={3} md={12} key={index}>
                                    <div className={cx('col-heading')} onClick={() => handleShow(column.id)}>
                                        <span>{column.title}</span>
                                        {column.show ? <RiArrowUpSLine className="d-block d-lg-none" /> : <RiArrowDownSLine className="d-block d-lg-none" />}
                                    </div>
                                    {column.show && (
                                        <ul>
                                            <FooterItem ele={column.items} />
                                        </ul>
                                    )}
                                </Col>
                            ))
                        }
                    </Row>
                    <div className={cx('foot')}>
                        <div className={cx('social-media')}>
                            <a href="https://www.facebook.com/theanhnguyenmgt/">
                                <AiFillFacebook className={cx('icon-social')} />
                            </a>
                            <a href="/">
                                <AiFillInstagram className={cx('icon-social')} />
                            </a>
                        </div>
                        <div className={cx('Copyright')}>Copyright © 2022 <a href="https://www.facebook.com/theanhnguyenmgt/">AnhNT</a> </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default FooterInfors;