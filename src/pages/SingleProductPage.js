import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  AddToCart,
  Error,
  Loading,
  PageHero,
  ProductImages,
  Stars,
} from '../components';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const {
    name,
    price,
    description,
    stars,
    reviews,
    id: sku,
    images,
    main_stone,
    main_color_stone,
    shape,
    status,
    trademark,
    weight,
  } = product;

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="info">
              <span>SKU :</span>
              {sku}
            </p>
            <p className="info">
              <span>Color Stone :</span>
              {main_color_stone}
            </p>
            <p className="info">
              <span>Main Stone :</span>
              {main_stone}
            </p>
            <p className="info">
              <span>Shape :</span>
              {shape}
            </p>
            <p className="info status">
              <span>status :</span>
              <div className={status ? 'active' : ''}>
                {status ? 'Còn Hàng' : 'Hết Hàng'}
              </div>
            </p>
            <p className="info">
              <span>Trade Mark :</span>
              {trademark}
            </p>
            <p className="info">
              <span>Weight :</span>
              {weight}
            </p>
            <p className="desc">{description}</p>
            <hr />
            {status && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    padding: 5px;
    text-transform: capitalize;
    width: 600px;
    display: grid;
    grid-template-columns: 125px 1fr;
    border-bottom: 1px solid;
    padding-bottom: 5px;
    span {
      font-weight: 700;
    }
  }
  .status {
    div {
      padding: 12px;
      width: 100px;
      text-align: center;
      border-radius: 4px;
      background: var(--clr-red-light);
      color: var(--clr-grey-10);
    }
    .active {
      background: var(--clr-green-dark);
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
