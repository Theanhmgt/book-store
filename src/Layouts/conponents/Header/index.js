import Container from 'react-bootstrap/Container';
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

import logo from '~/assets/images/logo-2.png'
import style from './Header.module.scss'
const cx = classNames.bind(style)
function Header() {
    return (
        <div>
            <Container fluid >
                <div className={cx('background')}>
                    <Container>
                        <div className={cx('wrapper')}>
                            <Link to="/" className={cx('logo')}>
                                <img src={logo} alt="logo" />
                            </Link>
                            <div className='left'>
                                <span className={cx('day')}>Mon-Thu:</span>
                                <span className={cx('time')}>9:00 AM - 5:30PM</span>
                            </div>
                            <div className={cx('center')}>
                                <span className={cx('address')}>Ghé thăm cửa hàng của chúng tôi tại 317 Nguyễn Kiệm, Phường3 Gò Vấp</span>
                                <Link to="/comming" className={cx('contact')}>Liên hệ</Link>
                            </div>
                            <div className={cx('right')}>
                                <a className={cx('phone')} href="tel:+00 151515">+00 151515</a>
                                <a href="https://www.facebook.com/theanhnguyenmgt">
                                    <AiFillFacebook className={cx('icon')} />
                                </a>
                                <a href="https://www.instagram.com/thean_20.04/">
                                    <AiFillInstagram className={cx('icon')} />
                                </a>
                            </div>
                        </div>
                    </Container>
                    <Navbar />
                </div>
            </Container>
        </div>
    );
}

export default Header;