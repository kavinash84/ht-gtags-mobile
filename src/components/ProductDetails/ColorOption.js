import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Row from "hometown-components/lib/Row";
import Img from "hometown-components/lib/Img";
// import Button from 'components/Buttons';
import Div from "hometown-components/lib/Div";
import { Link } from 'react-router-dom';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';

const LinkCustom = styled(Link)`
  display: inline-block;
`;

const ProductImg = styled(Img)`
  position: absolute;
  max-width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
`;

const ImgWrapper = styled.div`
  background: #FFF;
  position: relative;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  margin-right: 0.5rem;
  margin-bottom: 0.3125rem;
`;

const CurrentImgWrapper = styled.div`
  background: #FFF;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
  margin-bottom: 0.3125rem;
`;

const ColorOptions = styled(Div)`
  max-height: 150px;
  overflow: auto;
  ${props => props.active && {
        maxHeight: 'inherit'
    }
    }
`;

const urlName = name => name.split(' ').join('-').toLowerCase();

const ColorOption = ({
    data, showmorecolorproducts, currentImage
}) => (
    <Row mr="0" ml="0" mb="0px" mt="1rem" display="block">
        <ColorOptions active={!showmorecolorproducts}>
            <CurrentImgWrapper>
                <ImageShimmer
                    src={`${currentImage}`}
                    height="40px"
                    borderradius="50%"
                    mb="-4px"
                    borderCircle="2px solid #707070"
                >
                    {imageURL => (<ProductImg
                        src={imageURL}
                        alt="Current product"
                        width="60px"
                    />)}
                </ImageShimmer>
                {/* <ProductImg src={currentImage} alt="current Image" width="70px" /> */}
            </CurrentImgWrapper>
            {data.map((item, index) => (
                <LinkCustom
                    to={`/${item.meta.product_link}`}
                >
                    <ImgWrapper>
                        <ImageShimmer src={`${item.swatch_image}`} height="30px" borderradius="50%">
                            {imageURL => (
                                <ProductImg
                                    src={imageURL}
                                    alt={item.meta.name}
                                    width="60px"
                                />
                            )}
                        </ImageShimmer>
                    </ImgWrapper>
                </LinkCustom>
            ))}
        </ColorOptions>
        {/* {data.length > 5 && <Div>
      <Button
        btnType="link"
        size="block"
        ta="right"
        color="#f98d29"
        pt="15px"
        pr="64px"
        onClick={toggleShowMoreColorProducts}
      >{showmorecolorproducts ? 'Show More Products' : 'Show Less'}</Button>
    </Div>} */}
    </Row>
);
ColorOption.defaultProps = {
    showmorecolorproducts: true,
    // toggleShowMoreColorProducts: () => {},
    currentImage: ''
};
ColorOption.propTypes = {
    data: PropTypes.array.isRequired,
    showmorecolorproducts: PropTypes.bool,
    // toggleShowMoreColorProducts: PropTypes.func,
    currentImage: PropTypes.string
};

export default ColorOption;
