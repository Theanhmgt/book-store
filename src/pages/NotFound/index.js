import classNames from "classnames/bind";

import Button from "~/components/Button";
import style from './NotFound.module.scss'
const cx = classNames.bind(style)
function NotFount() {
    return (<div className={cx('wraaper')}>
        <h2>404</h2>
        <p>Không tìm thấy trang</p>
        <Button outlineGray to={'/'} >Trở về trang chủ</Button>
    </div>);
}

export default NotFount;