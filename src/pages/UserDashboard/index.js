import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import AccountInfo from "./ChildDashboardComponents/AccountInfo";
import AddressBook from "./ChildDashboardComponents/AddressBook";
import MyOrders from "./ChildDashboardComponents/MyOrders";
import Pageing from "~/components/Pageing";
import style from "./UseDashboard.module.scss"

const cx = classNames.bind(style)

function UserDashboard() {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    const { pathname } = useLocation();
    const Data = [
        {
            title: 'Thông tin Tài khoản',
            component: AccountInfo
        },
        {
            title: 'Địa chỉ giao hàng',
            component: AddressBook
        },
        {
            title: 'Đơn hàng của tôi',
            component: MyOrders
        },
    ]
    const [currentData, setCurrentData] = useState(Data[0])
    const RightComponent = currentData.component
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Tài khoản của tôi'
    }, [pathname]);

    return (
        <Container className={cx('wrapper')}>
            {!isMobile && <Pageing pages={[{ title: 'Tài khoản', path: 'dashboard' }]} />}
            <h1 className={cx('title')}>Tài khoản của tôi</h1>
            <Row>
                <Col lg={3} sm={12}>
                    <div className={cx('wrapper-lef-col')}>
                        {Data.map((ele, ind) => (
                            <div
                                key={ind}
                                className={cx(ele.title === currentData.title && 'data-active', 'option')}
                                onClick={() => setCurrentData(Data[ind])}
                            >
                                {ele.title}
                            </div>
                        ))}
                    </div>
                    <div className={cx('background')} >
                        <h1>So sánh sản phẩm</h1>
                        <p>Bạn không có sản phẩm để so sánh</p>
                    </div>
                    <div className={cx('background')} >
                        <h1>Sản phẩm yêu thích của tôi</h1>
                        <p>Bạn không có sản phẩm yêu thích</p>
                    </div>
                </Col>
                <Col lg={9} sm={12}>
                    <RightComponent />
                </Col>
            </Row>
        </Container>
    );
}

export default UserDashboard;