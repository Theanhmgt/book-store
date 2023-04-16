import classNames from "classnames/bind";

import style from "./Body.module.scss";

import booklogo1 from '~/assets/images/brands/book-logo1.jpg'
import booklogo2 from '~/assets/images/brands/book-logo2.jpg'
import booklogo3 from '~/assets/images/brands/book-logo3.jpg'
import booklogo4 from '~/assets/images/brands/book-logo4.jpg'
import booklogo5 from '~/assets/images/brands/book-logo5.jpg'
import booklogo6 from '~/assets/images/brands/book-logo6.jpg'

const cx = classNames.bind(style)
function Brands() {

    const brands = [
        {
            name: booklogo1,
            href: "",
        },
        {
            name: booklogo2,
            href: "",
        },
        {
            name: booklogo3,
            href: "",
        },
        {
            name: booklogo4,
            href: "",
        },
        {
            name: booklogo5,
            href: "",
        },
        {
            name: booklogo6,
            href: "",
        }
    ]

    return (
        <div className={cx('wrapper-brand')}>
            {
                brands.map((brand, index) =>
                (
                    <a href={brand.href} className={cx('brand-link')} key={index}>
                        <img src={brand.name} alt="name" />
                    </a>
                )
                )
            }
        </div>
    );
}

export default Brands;