import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import { Label } from 'hometown-components/lib/Label';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import SlickSlider from '../SlickSlider';

const styles = require('./CategoryBar.scss');

const adjustSlides = () => ({
  slidesToShow: 2.5,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});
const cleanTail = url => {
  if (url[url.length - 1] === '/') {
    return url.substring(0, url.length - 1);
  }
  return url;
};
const formatLink = url => {
  const paramLink = url.split('/').filter(z => z !== '');
  if (paramLink.length >= 4) {
    paramLink.splice(1, 1);
  }
  const newLink = paramLink.join('/');
  const sanitizedUrl = cleanTail(newLink);
  const newURL = sanitizedUrl.replace('catalog/', '');
  return newURL;
};
const CategoryBar = ({ categoryBar, pathname, handleCategoryClick }) => {
  if (pathname[pathname.length - 1] === '/') {
    pathname = pathname.slice(0, -1);
  }
  return (
    <Section mb="0" p="0">
      <Container p="0px">
        <Row justifyContent="center" className="categoryBarCarousel" mt="0" mb="-1rem">
          <SlickSlider settings={adjustSlides()}>
            {categoryBar &&
              categoryBar
                .filter(list => list.show_l4 === '1')
                .map((item, index) => (
                  <Div
                    key={String(index)}
                    className={`${styles.categoryBlock} ${pathname.split('/')[pathname.split('/').length - 1] === item.url_key.split('/')[item.url_key.split('/').length - 1] ? styles.active : ''}`}
                    col="12"
                    display="flex"
                    pb="0.625rem"
                    pt="0.625rem"
                  >
                    <Link to={`/${item.url_key}`} key={item.name} onClick={handleCategoryClick}>
                      <ImageShimmer src={item.icon_url} height="80px">
                        {imageURL => <Img width="80px" m="auto" src={imageURL} alt={item.name} />}
                      </ImageShimmer>
                      <Label mt="0" mb="0" display="block" ta="center">
                        {item.name}
                      </Label>
                    </Link>
                  </Div>
                ))}
          </SlickSlider>
        </Row>
      </Container>
    </Section>
  );
};

CategoryBar.defaultProps = {
  categoryBar: [],
  pathname: ' '
};
CategoryBar.propTypes = {
  categoryBar: PropTypes.array,
  pathname: PropTypes.string,
  handleCategoryClick: PropTypes.func.isRequired
};
export default CategoryBar;
