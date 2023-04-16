import { Container, Row, Col } from "react-bootstrap";
import Pageing from "~/components/Pageing";
import classNames from "classnames/bind";
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdSort } from 'react-icons/md';
import queryString from "query-string"
import { AiOutlineInbox } from "react-icons/ai";

import LoadingSpinner from "~/components/LoadingSpinner";
import PaginationProduct from "./PaginationProduct";
import Product from "~/components/Product";
import FilterNav from "./FilterNav";
import style from "./Filter.module.scss"
import SelectSort from "./SelectSort";
import Button from "~/components/Button";
const cx = classNames.bind(style)

function Filter() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    let isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const [showDesc, setShowDesc] = useState(false)
    const [showNavFillter, setShowNavFillter] = useState(!isMobile)
    const [product, setProduct] = useState([])

    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: (isMobile && 12) || (isTabletOrMobile && 9) || 12,
        _totalRows: 13,
    })
    const [filter, setFilter] = useState({
        _page: 1,
        _limit: (isMobile && 12) || (isTabletOrMobile && 9) || 12
    })

    const handlePageChange = (newPages) => {
        setFilter({
            ...filter,
            _page: newPages,
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Tất cả sản phẩm'
    }, [product]);

    useEffect(() => {
        async function fetchAPI() {
            try {
                setIsLoading(true)
                const paramstring = queryString.stringify(filter)
                const requestURL = `http://localhost:5000/api/data?${paramstring}`
                const response = await fetch(requestURL);
                const responseJSON = await response.json()
                const { data, pagination } = responseJSON
                setProduct(data)
                setPagination(pagination)
                setIsLoading(false)
            }
            catch (error) {
                setIsLoading(false)
                console.log(error)
            }
        }
        fetchAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    return (
        <Container className={cx('wrapper')}>
            {isLoading && <LoadingSpinner />}
            <Pageing pages={[{ title: 'Tất cả sách', path: 'filter' }]} />
            <Row>
                {!isMobile && (
                    <Col lg={2} md={3}>
                        <div className={cx('back')}>
                            <button onClick={() => navigate('/')}>{'< Trở về'}</button>
                        </div>
                    </Col>
                )}
                <Col lg={10} md={9} sm={12}>
                    <div className={cx('sort-head')}>
                        {!isMobile ? <span>Số sách 1- {product.length} của {pagination._totalRows}</span> :
                            <div
                                className={cx('showOnMobile')}
                                onClick={() => setShowNavFillter(!showNavFillter)}
                            >
                                <p>Lọc</p>
                            </div>}

                        <div className={cx('sort-control')}>
                            <SelectSort
                                values={['Mặc định', 'Giá']}
                                filter={filter}
                                setFilter={setFilter}
                            />
                            {!isMobile && <MdSort className={cx('icon')} />}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                {showNavFillter && (
                    <Col lg={2} md={3} className={cx('navFilterInmobile')}>
                        <FilterNav filter={filter} setFilter={setFilter} />
                    </Col>
                )}
                <Col lg={10} md={9} sm={12}>
                    {product.length > 0 ? (
                        <>
                            <Row className=" d-flex flex-wrap" >
                                {
                                    product.map((ele) => (
                                        <Col key={ele.id} lg={2} md={4} xs={6}>
                                            <Product primary data={ele} />
                                        </Col>
                                    ))
                                }
                            </Row>
                            <PaginationProduct
                                pagination={pagination}
                                onPageChange={handlePageChange}
                            />
                            <div className={cx('description')} >
                                <div className={cx('content', showDesc ? "show-desc" : "hiden-desc")}>
                                    <p>Book Store xuất hiện trên Facebook từ năm 2023, chúng tôi đã từng bước khẳng định được giá trị và uy tín trong cộng đồng những người yêu sách. Với mong muốn là một điểm đến lý tưởng của các độc giả, để tìm được cho mình những cuốn sách yêu thích. Đó có thể là sách mới, các ấn bản giới hạn hoặc là sách cũ mà bạn tìm kiếm đã lâu.

                                        Book Store là nhà phân phối chính thức của các nhà xuất bản, nhà phát hành sách trên toàn quốc. Được sự tín nhiệm của các nhà xuất bản, chúng tôi cũng là đơn vị phân phối độc quyền một số ấn bản giới hạn và đặc biệt, điển hình như bộ sách Việt Nam danh tác do Nhã Nam phát hành.

                                        Từ tháng 3/2023, chúng tôi thành lập Công ty TNHH Book Store. Để mở rộng kênh phân phối đến các quý độc giả trên toàn quốc cùng một số kế hoạch phát hành sách khác. Sự ủng hộ đông đảo của các độc giả chính là động lực để chúng tôi phát triển bền vững trong tương lai.</p>
                                </div>
                                <Button
                                    outlineGray
                                    onClick={() => setShowDesc(!showDesc)}
                                >
                                    {showDesc ? "Đóng" : "Xem Thêm"}
                                </Button>
                            </div>
                        </>
                    ) : (!isLoading &&
                        <div className={cx('nodata')}>
                            <AiOutlineInbox />
                            <h1>Không có dữ liệu</h1>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Filter;