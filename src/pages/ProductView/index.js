import ProductDetail from "~/components/ProductDetail";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import { setId } from "~/redux/filterSlice";
import { ProductById } from "./ProductById";
import style from './ProducView.module.scss'
import slide2 from '~/assets/images/bookbanner.jpg'

const cx = classNames.bind(style)
function ProductView() {
    // const { pathname } = useLocation();
    const dispatch = useDispatch()
    const { productid } = useParams()
    dispatch(setId(productid))
    const product = useSelector(ProductById)

    useEffect(() => {
        window.scrollTo(0, 0);
        // document.title = `${product[0].name}`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            {product[0] && (
                <ProductDetail
                    data={product[0]}
                />
            )}
            <div className={cx('slider')}>
                <Container>
                    <Row className={cx('slider-content')}>
                        <Col sm={12} md={6}>
                            <div className={cx('slider-desc')}>
                                <div className={cx('slider-heading')}>
                                    Đọc sách - Đầu tư cho sự phát triển cá nhân
                                </div>
                                <div className={cx('slider-title')}>Đọc sách không chỉ là một cách thư giãn mà còn mang lại nhiều lợi ích cho sự phát triển cá nhân. Từ việc cải thiện khả năng ngôn ngữ, tăng trí nhớ, đến việc mở rộng tầm nhìn và cải thiện kỹ năng tư duy, đọc sách là một cách tuyệt vời để đầu tư cho bản thân. Ngoài ra, đọc sách cũng giúp giảm stress, tăng sự tập trung và tránh xa khỏi màn hình máy tính, điện thoại. Với các đầu sách chất lượng, bạn có thể tìm hiểu thêm về các lĩnh vực khác nhau và mở rộng kiến thức của mình. Hãy dành thời gian cho việc đọc sách và bạn sẽ thấy những kết quả tích cực mà nó mang lại cho sự phát triển của bạn.</div>
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className={cx('slider-img')}>
                                <img src={slide2} alt="alt" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default ProductView;