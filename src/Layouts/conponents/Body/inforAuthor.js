import classNames from "classnames/bind";
import style from "./Body.module.scss";

const cx = classNames.bind(style)
function InforAuthor() {
    return (
        <div className={cx('author')}>
            <div className={cx('desc')}>
                One Team : Thế Anh & Minh Tâm
            </div>
        </div>
    );
}

export default InforAuthor;