import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Container from 'hometown-components/lib/Container';
import HeadingH3 from 'hometown-components/lib/HeadingH4';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import { BASE_IMAGE_URL } from "helpers/Constants";

const ContentSection = ({ description, title }) => (
  <Fragment>
    {(title !== '' || title !== null) && (
      <HeadingH3 fontSize="24px" ta="center" color="black" fontFamily="light">
        {title}
      </HeadingH3>
    )}
    <Row justifyContent="center" mb="20px">
      <Div bg="black" col="1" height="1px" />
    </Row>
    {(!description !== '' || description !== null) && (
      <Text fontSize="16px" ta="center">
        {description}
      </Text>
    )}
  </Fragment>
);

ContentSection.defaultProps = {
  title: '',
  description: ''
};

ContentSection.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string
};

const TagText = ({ text, url, ...rest }) => (
  <Link to={url}>
    <Text
      fontSize="16px"
      fontFamily="regular"
      color="white"
      pl="10px"
      pr="10px"
      lh="1"
      style={{ borderRight: '2px solid #FFF', textTransform: 'uppercase' }}
      {...rest}
    >
      {text}
    </Text>
  </Link>
);

TagText.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

const ComboOffer = () => (
  <div className="wrapper">
    <Helmet title="Promotions and Offers" />
    <Menu />
    <Div pl="15px" pr="15px">
      <Div>
        <Img src={`${BASE_IMAGE_URL}/media/cms/extras/combo-offer-banner.jpg`} alt="" />
      </Div>
      <Row pb="30px" pt="30px">
        <Div col="10" ta="center" m="auto">
          <Img src={`${BASE_IMAGE_URL}/media/cms/extras-desktop/Happily-Ever-After.png`} alt="" height="100px" width="auto" m="auto" />
          {/* eslint-disable max-len */}
          <ContentSection
            title="Product Package Offers"
            description="You’ve found your perfect match – now find the perfect pieces to begin your perfect life together. Celebrate each marriage milestone with dinnerware to host your first party, barware for that 1st anniversary toast and décor you’ll fall in love with over and over again."
          />
        </Div>
      </Row>
      <Row ml="0" mr="0" mb="20px" alignItems="center">
        <Div col="12">
          <Link to="/store-locator">
            <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras/complete-home-package.jpg`} alt="" />
          </Link>
        </Div>
      </Row>
      <Row ml="-10px" mr="-10px">
        <Div col="12" p="10px">
          <Link to="/store-locator">
            <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras/Living-Room.jpg`} alt="" />
          </Link>
        </Div>
        <Div col="12" p="10px">
          <Link to="/store-locator">
            <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras/Bed-Room.jpg`} alt="" />
          </Link>
        </Div>
      </Row>
      <Row ml="-10px" mr="-10px" mb="20px">
        <Div col="12" p="10px">
          <Link to="/store-locator">
            <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras/Living-Dining-Room.jpg`} alt="" />
          </Link>
        </Div>
        <Div col="12" p="10px">
          <Link to="/store-locator">
            <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras/Kitchen.jpg`} alt="" />
          </Link>
        </Div>
      </Row>
      <Row justifyContent="center" bg="#84cac8" pt="10px" pb="10px">
        <TagText url="/furniture" text="FURNITURE" />
        <TagText url="home-furnishings" text="HOME FURNISHING" />
        <TagText url="/home-decor" text="DECOR" />
        <TagText url="/tableware" text="TABLEWARE" />
        <TagText url="/kitchenware" text="KITCHENWARE" />
        <TagText url="/luggage" text="LUGGAGE" />
        <TagText url="/electronics" text="ELECTRONICS" />
        <TagText
          url="/modular-kitchens"
          style={{ borderRight: 'none', textTransform: 'uppercase' }}
          text="MODULAR KITCHEN"
        />
      </Row>
      <Div pt="30px" pb="30px">
        {/* eslint-disable */}
        <Container>
          <Heading fontSize="22px" color="#55545b">
            Plan Your Happily Ever Afters with Hometown.
          </Heading>
          <HeadingH3 color="#55545b" fontSize="16px" mt="20px">
            Try Different Looks for Each Rooms
          </HeadingH3>
          <Text color="#817f7d">
            You can give a different look for each of your rooms in the house. For example the furniture used in your
            living room should be beautiful, elegant as well as designer. Whether it is a sofa set or a designer
            arrangement of traditional furniture, it should enhance the look for of your living room. Similarly,
            your bedroom furniture should be comfortable, sturdy as well as durable. It should well fit within the
            available space in your room without cluttering or congesting it.
          </Text>
          <Text color="#817f7d">
            The furniture should match the overall theme of your house, which could be somber or quirky. Further, for a
            modern look, you can use a modular kitchen that beautifies the house instantly. Hometown offers a wide range
            of furniture designs to help you get the best pick. You can also experiment with different material for each
            rooms individually. For example you can use a Polyurethane furniture for your living room and use a wooden
            bed in the bedroom. At hometown you can also explore outdoor furniture like swings, table and recliner chair
            to have an private space for yourself.
          </Text>

          <HeadingH3 color="#55545b" fontSize="16px" mt="20px">
            Our Online Collection of Home Furnishing Products
          </HeadingH3>
          <Text color="#817f7d">
            Make the interior of your home the luxury of space with each of our online home furnishing items, comprising
            an array of bed linen, curtains, bath linen , bedsheets, pillow covers, mats , cushions, protectors , covers
            and inserts, bedding , a mattress, bathroom accessories, blankets, towels, curtain and other accessories.
            Choose from a wide range of attractive bedsheets, bed covers available at HomeTown, ranging from floral to
            digital, check, ethnic, stripes or printed patterns to suit your penchants. You can also choose from many
            beautiful pillow covers as well as pillows to complement the shades and patterns of your bed sheets. Opt for
            bolster covers, chilly winter with range of quilts and blankets.
          </Text>

          <HeadingH3 color="#55545b" fontSize="16px" mt="20px">
            Explore More at Hometown!
          </HeadingH3>
          <Text color="#817f7d">
            Once you get the furniture pieces you are looking for, you can further accentuate the beauty and elegance of
            your house by adding in some home decor items like matching curtains and lamps. Hometown has a wide range of
            home furnishing like upholstery, beddings, pillow covers and cushions. Moreover, you can also explore the
            different kitchenware and table options.
          </Text>
        </Container>
        {/* eslint-enable */}
      </Div>
    </Div>
    <Footer />
  </div>
);

export default ComboOffer;
