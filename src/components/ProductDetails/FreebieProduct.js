import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Image from 'hometown-components/lib/Img';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import HeadingH6 from 'hometown-components/lib/HeadingH6';

function FreebieProduct({ bogoBundle: { image, link, name } }) {
  return (
    <Section mb="10px" p="0" mt="10px">
      <Row mr="0" ml="0" flexWrap="nowrap">
        <Div col="2">
          <Link to={link}>
            <ImageShimmer src={image} height={64}>
              {imageURL => (
                <Image
                  src={imageURL}
                  alt="buy one get one"
                  width="64px"
                  height="64px"
                  sx={{ border: 'secondaryLarge' }}
                />
              )}
            </ImageShimmer>
          </Link>
        </Div>
        <Div col="10" pl="12px">
          <Link to={link}>
            <HeadingH6 fontSize="16px" color="primary" mb="0px" mt="0px">
              Get Free
            </HeadingH6>
            <HeadingH6 fontSize="16px" color="textDark" mb="0px" mt="5px">
              {name}
            </HeadingH6>
          </Link>
        </Div>
      </Row>
    </Section>
  );
}

FreebieProduct.propTypes = {
  bogoBundle: PropTypes.object.isRequired
};

export default FreebieProduct;
