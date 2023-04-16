import { Container } from "react-bootstrap";

import InforAuthor from "./inforAuthor";
import ProductsType from "./ProductsType";
import Review from "../Review";
import Brands from "./Brands";
import ebook from '~/assets/images/ebooktype.png'
import ebook2 from '~/assets/images/ebooktype2.png'
import book from '~/assets/images/bookcategory.jpg'


function Body() {
    return (
        <Container>
            <InforAuthor />
            <ProductsType name={'Ebook'} img={book} category={'laptop-gaming'} />
            <ProductsType name={'Sách Mới'} img={ebook2} category={'pc-gaming'} />
            <Brands />
            <Review />
        </Container>
    );
}

export default Body;