import classNames from "classnames/bind";
import style from "./ChildDashboardComponents.mobule.scss"
import { Row, Col } from "react-bootstrap";

const cx = classNames.bind(style)
function AddressBook() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Địa chỉ giao hàng</div>
            <Row>
                <Col lg={4}>
                    <div className={cx('sub-title')}>Địa chỉ giao hàng</div>
                    <div className={cx('body')}>
                        <div className={cx('body')}>
                            <div className={cx('content')}>Bạn chưa có địa chỉ giao hàng.</div>
                        </div>
                    </div>
                    <div className={cx('change-info')}>
                        <span className={cx('disible-edit')}>Cập nhập địa chỉ</span>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className={cx('sub-title')}>Địa chỉ nhận hàng</div>
                    <div className={cx('body')}><div className={cx('content')}>Bạn chưa có địa chỉ nhận hàng.</div></div>
                    <div className={cx('change-info')}>
                        <span className={cx('disible-edit')}>Cập nhập địa chỉ</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AddressBook;