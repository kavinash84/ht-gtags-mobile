import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Span from 'hometown-components/lib/Span';
import { Label } from 'hometown-components/lib/Label';
import { formatAmount } from 'utils/formatters';
import { formatProductURL } from 'utils/helper';
import ProductCarouselItem from './ProductCarouselItem';
import AddToCartCombined from '../AddToCartCombined';

const styles = require('./Slider.scss');

const ProductCarousel = ({
  data, item, length, pt, pb, height, price, discountedPrice, setDiscount
}) => (
  <Section p="0" pt={pt} pb={pb} mt="0" mb="0" display="flex" className="prodCarousel">
    <Container pr="0" pl="0" className={styles.combinedProductsWrapper}>
      <Row className={styles.combineItemRow} flexWrap="nowrap" ml="-8px" mr="-8px">
        {data.map((skuItem, index) => (
          <Div col="6" className={styles.combineItemWrapper} key={`${skuItem.meta.sku}_${String(index)}`}>
            <Row key={String(index)}>
              <ProductCarouselItem
                name={skuItem.meta.name}
                discPrice={skuItem.meta.max_special_price && formatAmount(skuItem.meta.max_special_price)}
                price={formatAmount(skuItem.meta.price)}
                saving={skuItem.meta.max_saving_percentage}
                percentage={skuItem.meta.max_saving_percentage}
                rating={skuItem.reviews && skuItem.reviews.rating}
                reviewsCount={skuItem.reviews && skuItem.reviews.count}
                image={`${skuItem.image}-product_500.jpg`}
                url={`${formatProductURL(skuItem.meta.name, skuItem.meta.sku)}`}
                height={length <= 3 ? height : '125px'}
              />
              <Div col="1" alignSelf="center" ta="center" ml="-2px" mt="-20px">
                <Label color="plusIcon" fontSize="2rem">
                  {index < data.length - 1 ? '+' : ''}
                </Label>
              </Div>
            </Row>
          </Div>
        ))}
      </Row>
      <Row mr="-5px" ml="-5px" className={styles.combineBottom} pt="0px">
        <Div col="12" alignSelf="center" mt="5px" pl="8px" pr="8px">
          {data.map((skuItem, index) => (
            <Fragment key={String(index)}>
              <Label fontSize="12px" mb="0" color="textExtraLight">
                {`${index + 1} Item`} <br />
                <Span fontSize="14px" mt="5px" display="block" color="rgba(0,0,0,0.8)">
                  {skuItem.meta.max_special_price
                    ? formatAmount(skuItem.meta.max_special_price)
                    : formatAmount(skuItem.meta.max_price)}
                </Span>
              </Label>
              <Label mb="0" color="black" fontSize="1rem" ml="10px" mr="10px">
                {index < data.length - 1 ? '+' : ''}
              </Label>
            </Fragment>
          ))}
          {setDiscount && setDiscount > 0 ? (
            <Fragment>
              <Label mb="0" color="black" fontSize="1rem" ml="1rem" mr="1rem">
                {'-'}
              </Label>
              <Label fontSize="12px" mb="0" color="textExtraLight">
                {'Combo Discount'} <br />
                <Span fontSize="1.125rem" mt="5px" display="block" color="rgba(0,0,0,0.8)">
                  {formatAmount(setDiscount)}
                </Span>
              </Label>
              <Label mb="0" color="black" fontSize="1rem" ml="1rem" mr="1rem">
                {'='}
              </Label>
            </Fragment>
          ) : (
            '='
          )}
          <Label mt="15px" mb="0" mr="1rem" fontSize="1rem" color="textExtraLight">
            Total
            <br />
            <Span ml="0px" color="rgba(0,0,0,0.8)" fontSize="1.125rem">
              {formatAmount(discountedPrice)}
            </Span>
            <Span ml="10px" color="rgba(0,0,0,0.5)" fontSize="0.875rem">
              <s>{formatAmount(price)}</s>
            </Span>
          </Label>
          <Label mt="0" mb="0" va="bottom" ml="1rem">
            {
              <AddToCartCombined
                skusData={item}
                products={data}
                size="block"
                btnType="primary"
                btnColor="#515151"
                height="40px"
                fontSize="13px"
                isSoldOut={false}
              />
            }
          </Label>
        </Div>
      </Row>
    </Container>
  </Section>
);

ProductCarousel.defaultProps = {
  data: [],
  item: {},
  length: 3,
  pt: '0',
  pb: '0',
  height: '125px',
  setDiscount: 0
};

ProductCarousel.propTypes = {
  data: PropTypes.array,
  item: PropTypes.object,
  length: PropTypes.number,
  pt: PropTypes.string,
  pb: PropTypes.string,
  height: PropTypes.string,
  price: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number.isRequired,
  setDiscount: PropTypes.number
};

export default ProductCarousel;
