import classNames from "classnames/bind";
import { useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";

import Button from "~/components/Button";
import style from "./Review.module.scss"
const cx = classNames.bind(style)
function Review() {
    const reviewData = [
        {
            content: 'Tôi thực sự rất hài lòng với sản phẩm sách này. Nó được đóng gói cẩn thận và đến nhanh chóng. Nội dung sách rất hữu ích và chất lượng in ấn cũng rất tốt.',
            author: 'Nguyễn Thế Anh'
        },
        {
            content: 'Đây là lần đầu tiên tôi mua sách trên trang thương mại điện tử và tôi không hề thất vọng. Quy trình đặt hàng rất dễ dàng và tiện lợi. Sản phẩm đến sớm hơn dự kiến và chất lượng sách thật sự tuyệt vời.',
            author: 'Tran Dai Vang'
        },
        {
            content: 'Sách này đã cung cấp cho tôi những kiến thức mới mẻ và thú vị. Tôi thích cách tác giả trình bày các ý tưởng và thông tin trong sách. Đây là một sản phẩm tuyệt vời và tôi chắc chắn sẽ mua thêm sách từ trang web này.',
            author: 'Do Thi Hong Ngoc'
        },
        {
            content: 'Tôi rất ấn tượng với chất lượng sách và dịch vụ khách hàng của trang thương mại điện tử này. Tôi đã nhận được hỗ trợ nhanh chóng và chuyên nghiệp từ đội ngũ hỗ trợ khách hàng khi tôi gặp vấn đề với đơn hàng của mình. Sách đến đúng hạn và tôi rất hài lòng với trải nghiệm mua sắm của mình.',
            author: 'Ho Huu Duc'
        },
    ]
    const [review, setReview] = useState(reviewData[0])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <div className={cx('content')}>
                    <div className={cx('icon')}>
                        <MdOutlineRateReview />
                    </div>
                    <span>
                        {review.content}
                    </span>
                </div>
                <div className={cx('author')}>
                    -{review.author}
                </div>
            </div>
            <div className={cx('bottom')}>
                <Button outline to={"comming"}>Trải nghiệm của bạn</Button>
                <div className={cx('changeReview')}>
                    <div className={(review === reviewData[0]) ? cx('review-active') : ' '} onClick={() => (setReview(reviewData[0]))}></div>
                    <div className={(review === reviewData[1]) ? cx('review-active') : ' '} onClick={() => (setReview(reviewData[1]))}></div>
                    <div className={(review === reviewData[2]) ? cx('review-active') : ' '} onClick={() => (setReview(reviewData[2]))}></div>
                    <div className={(review === reviewData[3]) ? cx('review-active') : ' '} onClick={() => (setReview(reviewData[3]))}></div>
                </div>
            </div>
        </div>);
}

export default Review;