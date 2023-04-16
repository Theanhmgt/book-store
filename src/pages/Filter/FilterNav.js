import classNames from "classnames/bind";
import { useState, memo } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Row, Col } from "react-bootstrap";

import Button from "~/components/Button";
import style from "./Filter.module.scss"

import booklogo1 from '~/assets/images/brands/book-logo1.jpg'
import booklogo2 from '~/assets/images/brands/book-logo2.jpg'
import booklogo3 from '~/assets/images/brands/book-logo3.jpg'
import booklogo4 from '~/assets/images/brands/book-logo4.jpg'
import booklogo5 from '~/assets/images/brands/book-logo5.jpg'
import booklogo6 from '~/assets/images/brands/book-logo6.jpg'

const cx = classNames.bind(style)

function FilterNav({ filter, setFilter }) {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    const [tempFilter, setTempFilter] = useState(filter)
    const [toogleList, setToogleList] = useState({
        category: false,
        price: false,
    })
    const handleSetFilter = () => {
        const { _color, _category, ...otherFilter } = tempFilter
        setFilter(otherFilter)
    }
    const handleSetPriceFilter = (e) => {
        setTempFilter({
            ...tempFilter,
            newPrice_gte: e.target.value - 100000,
            newPrice_lte: e.target.value
        })
        setToogleList({ ...toogleList, price: !toogleList.price })
    }
    const handleSetCategoryFilter = (e) => {
        setTempFilter({
            ...tempFilter,
            categorySlug: e.target.value,
        })
        setToogleList({ ...toogleList, category: !toogleList.category })
    }
    const handleClearFilter = () => {
        const { categorySlug, newPrice_gte, newPrice_lte, ...otherFilter } = tempFilter
        setTempFilter(otherFilter)
        setFilter(otherFilter)
    }
    const getQtyFilter = (filter) => {
        return Object.keys(filter).reduce((agr, key) => {
            if (key.includes('_gte') || key.includes('categorySlug')) {
                return agr + 1
            }
            return agr
        }, 0)
    }

    const categoryList = [
        {
            title: 'Ebook',
            value: 'Ebook',
            id: 1
        },
        {
            title: 'Sách Ôn Thi THPT Quốc Gia',
            value: 'Sách Luyện Thi THPT Quốc Gia',
            id: 2
        },
        {
            title: 'Kiến Thức Bách Khoa',
            value: 'Kiến thức',
            id: 3
        },
        {
            title: 'Sách Kỹ Năng Sống',
            value: 'Kỹ Năng Sống',
            id: 4
        }
    ]
    const priceList = [
        {
            title: '0đ - 100.000đ',
            value: 100000,
            id: 3
        },
        {
            title: '100.000đ - 200.000đ',
            value: 200000,
            id: 4
        },
        {
            title: '200.000đ - 300.000đ',
            value: 300000,
            id: 5
        },
        {
            title: '300.000đ - 400.000đ',
            value: 400000,
            id: 6
        },
        {
            title: '400.000đ - 500.000đ',
            value: 500000,
            id: 7
        },
        {
            title: '500.000đ - 600.000đ',
            value: 600000,
            id: 7
        },
        {
            title: '600.000đ - 700.000đ',
            value: 700000,
            id: 7
        },
        {
            title: '700.000đ - 800.000đ',
            value: 80000,
            id: 10
        },
        {
            title: '800.000đ - 900.000đ',
            value: 900000,
            id: 11
        },
        {
            title: '900.000đ - 1.000.000đ',
            value: 1000000,
            id: 12
        },
    ]
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
        <>
            <div className={cx('background')} >
                {!isMobile && <h1>Lọc</h1>}
                {!isMobile && <Button outline onClick={handleClearFilter}>Dọn dẹp bộ lọc</Button>}

                <div
                    className={cx('heading')}
                    onClick={() => setToogleList({ ...toogleList, category: !toogleList.category })}
                >
                    <h2>Thể loại</h2>
                    {toogleList.category ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </div>
                {toogleList.category && categoryList.map(ele => (
                    <option
                        key={ele.id}
                        value={ele.value}
                        onClick={e => handleSetCategoryFilter(e)}
                    >
                        {ele.title}
                    </option>
                ))
                }

                <div
                    className={cx('heading')}
                    onClick={() => setToogleList({ ...toogleList, price: !toogleList.price })}
                >
                    <h2>Giá</h2>
                    {toogleList.price ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </div>

                {toogleList.price && priceList.map(ele => (
                    <option
                        key={ele.id}
                        value={ele.value}
                        onClick={e => handleSetPriceFilter(e)}
                    >
                        {ele.title}
                    </option>
                ))}
                {isMobile && <Button outline onClick={handleClearFilter}>Clear Filter</Button>}
                <Button primary onClick={handleSetFilter}>Áp dụng lọc {getQtyFilter(tempFilter) > 0 && `( ${getQtyFilter(tempFilter)} )`} </Button>
            </div>
            {!isMobile && (
                <>
                    <div className={cx('brands')}>
                        <h1>Thương hiệu</h1>
                        <Button outlineGray>Xem tất cả</Button>
                    </div>
                    <Row >
                        {brands.map((brand, index) => (
                            <Col md={6} key={index} className={cx('brand')} ><img src={brand.name} alt="alt" /></Col>
                        ))}
                    </Row>
                    <div className={cx('background')} >
                        <h1>So sánh sách</h1>
                        <p>Bạn đang không có sách để so sánh</p>
                    </div>
                    <div className={cx('background')} >
                        <h1>Sách yêu thích</h1>
                        <p>Bạn không có sách yêu thích</p>
                    </div>
                </>
            )}
        </>
    );
}

export default memo(FilterNav);