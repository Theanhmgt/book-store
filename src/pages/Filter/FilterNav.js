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
    const handleSetFilter = () => {
        const { _color, _category, ...otherFilter } = tempFilter
        setFilter(otherFilter)
    }
    const handleSetPriceFilter = (e) => {
        setTempFilter({
            ...tempFilter,
            newPrice_gte: e.target.value - 100,
            newPrice_lte: e.target.value
        })
        setToogleList({ ...toogleList, price: !toogleList.price })
    }
    const handleClearFilter = () => {
        const { _category, newPrice_gte, newPrice_lte, ...otherFilter } = tempFilter
        setTempFilter(otherFilter)
        setFilter(otherFilter)
    }
    const getQtyFilter = (filter) => {
        return Object.keys(filter).reduce((agr, key) => {
            if (key.includes('_gte') || key.includes('_color') || key.includes('_category')) {
                return agr + 1
            }
            return agr
        }, 0)
    }
    const [toogleList, setToogleList] = useState({
        category: false,
    })
    const categoryList = [
        {
            title: 'CUSTOM PCS',
            value: 'custompcs',
            id: 1
        },
        {
            title: 'MSI ALL-IN-ONE',
            value: 'masiallinone',
            id: 2
        }
    ]
    const priceList = [
        {
            title: '$0.00 - $100.00',
            value: 100,
            id: 3
        },
        {
            title: '$100.00 - $200.00',
            value: 200,
            id: 4
        },
        {
            title: '$200.00 - $300.00',
            value: 300,
            id: 5
        },
        {
            title: '$300.00 - $400.00',
            value: 400,
            id: 6
        },
        {
            title: '$400.00 - $500.00',
            value: 500,
            id: 7
        },
        {
            title: '$500.00 - $600.00',
            value: 600,
            id: 8
        },
        {
            title: '$600.00 - $700.00',
            value: 700,
            id: 9
        },
        {
            title: '$700.00 - $800.00',
            value: 800,
            id: 10
        },
        {
            title: '$800.00 - $900.00',
            value: 900,
            id: 11
        },
        {
            title: '$900.00 - $1.000.00',
            value: 1000,
            id: 12
        },
        {
            title: '$1.000.00 - $1.100.00',
            value: 1100,
            id: 13
        },
        {
            title: '$1.100.00 - $1.200.00',
            value: 1200,
            id: 14
        },
        {
            title: '$1.200.00 - $1.300.00',
            value: 1300,
            id: 15
        }
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
                        onClick={e => setTempFilter({
                            ...tempFilter,
                            _category: e.target.value
                        })}
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