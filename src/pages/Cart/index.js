import classNames from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify"
import { useEffect } from "react";
import { AiOutlineInbox } from "react-icons/ai";

import { clearCart } from "~/redux/userCartSlice";
import { Formatter } from "~/components/FormatCurrency";
import { getTotal } from '~/redux/userCartSlice';
import Pageing from "~/components/Pageing";
import Product from "~/components/Product";
import Button from "~/components/Button";
import style from './Cart.module.scss';
const cx = classNames.bind(style)
function Cart() {
    const dispath = useDispatch()
    const isMobile = useMediaQuery({ query: '(max-width: 426px)' })
    const cart = useSelector(state => state.userCart)
    const { cartTotalAmount } = cart

    useEffect(() => {
        dispath(getTotal(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'GIỎ HÀNG CỦA BẠN'
    }, [])

    const handleClear = () => {
        dispath(clearCart())
        toast.error(`Đã xoá toàn bộ sản phẩm`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const checkoutItems = [
        {
            title: "Giá Trị Sách",
            ship: cart.cartItems.length > 0 ? `${cartTotalAmount}` : 0
        },
        {
            title: "Giá ship",
            ship: 21
        },
        {
            title: "Thuế",
            ship: 1.91
        },
        {
            title: "Tổng giá trị đơn hàng",
            ship: cart.cartItems.length > 0 ? `${cartTotalAmount + 21 + 1.91}` : 0
        }
    ]

    return (
        <Container className={cx('wrapper')}>
            <Pageing pages={[{ title: 'Giỏ Hàng', path: 'yourcart' }]} />
            <h1 className={cx('Cart-Head')}>Đơn hàng</h1>
            {/* Products */}
            {cart.cartItems.length > 0 ? (
                <Row>
                    <Col lg={9} sm={12}>
                        {
                            !isMobile &&
                            <div className={cx('titles')}>
                                <Row>
                                    <Col md={2}>Sản phẩm</Col>
                                    <Col md={4}></Col>
                                    <Col md={2}>Giá</Col>
                                    <Col md={1}>Số Sách</Col>
                                    <Col md={2}>Tổng giá</Col>
                                    <Col md={1}></Col>
                                </Row>
                            </div>
                        }
                        {cart.cartItems.map(product => (
                            <Product isInCart key={product.id} data={product} />
                        ))}
                        <div className={cx('buttons')}>
                            <Button to='/' outlineGray>Tiếp tục mua hàng</Button>
                            <Button onClick={handleClear} black>Xoá toàn bộ sản phẩm</Button>
                        </div>
                    </Col>

                    <Col lg={3} sm={12} className={cx('right')}>
                        <h1 className={cx('right-head')}>Đơn hàng</h1>
                        <ul className={cx('menu')}>
                            {
                                checkoutItems.map((item, index) => (
                                    <li key={index}>
                                        <h2>{item.title}</h2>
                                        <span>{Formatter.format(item.ship)}</span>
                                    </li>
                                ))
                            }
                        </ul>
                        <Button primary>Tiến hành thanh toán</Button>
                    </Col>
                </Row>
            ) : (
                <div className={cx('nodata')}>
                    <AiOutlineInbox />
                    <h1>Không có dữ liệu</h1>
                </div>
            )}
        </Container>
    );
}

export default Cart;