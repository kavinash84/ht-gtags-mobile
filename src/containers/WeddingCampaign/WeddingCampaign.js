import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
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
      <HeadingH3 fontSize="26px" ta="center" color="black" fontFamily="light">
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

const WeddingCampaign = () => (
  <div className="wrapper">
    <Helmet title="Promotions and Offers" />
    <Menu />
    <Div>
      <Div>
        <Img src={`${BASE_IMAGE_URL}/media/cms/extras/banner.jpg`} alt="" />
      </Div>
      <Row pb="30px" pt="30px">
        <Div col="10" ta="center" m="auto">
          <Img src={`${BASE_IMAGE_URL}/media/cms/extras-desktop/Happily-Ever-After.png`} alt="" height="100px" width="auto" m="auto" />
          {/* eslint-disable max-len */}
          <ContentSection
            title="It All Starts Here"
            description="You’ve found your perfect match – now find the perfect pieces to begin your perfect life together. Celebrate each marriage milestone with dinnerware to host your first party, barware for that 1st anniversary toast and décor you’ll fall in love with over and over again."
          />
        </Div>
      </Row>
      <Row ml="0" mr="0" bg="#dedede" alignItems="center">
        <Div col="12" pb="20px">
          <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras/Hot-Deals-Dining-Set.jpg`} alt="" />
        </Div>
        <Div col="12" ta="center" pl="15px" pr="15px">
          <Heading color="#3d3d3b" fontSize="20px" mt="10px" mb="20px">
            Every After Product Combos
          </Heading>
          <Heading color="#3d3d3b" fontSize="15px" mt="10px" mb="20px">
            Starting at Rs. 69,900/-
          </Heading>
          <Text ta="center" color="#434341" fontSize="16px" mb="0" fontFamily="light">
            Style up your space into a cosy and comfortable abode with
          </Text>
          <Text ta="center" color="#434341" fontSize="16px" mt="5px" fontFamily="light">
            with our room combo offer on furniture
          </Text>
          <Text ta="center" color="#434341" fontSize="16px" mt="5px" fontFamily="light">
            and electronics
          </Text>
          <Link to="/combo-offer">
            <Text mt="30px" ta="center" fontSize="20px" fontFamily="light" style={{ textDecoration: 'underline' }}>
              KNOW MORE
            </Text>
          </Link>
        </Div>
      </Row>
      <Row pb="20px" pt="20px">
        <Div col="12" ta="center" m="auto" pl="20px" pr="20px">
          <ContentSection
            title="Married Life Must-Haves"
            description="Make every occasion a celebration with our exclusive furniture, décor, tableware, barware, serviettes, kitchen utilities, travel essentials and more."
          />
        </Div>
      </Row>
      <Row ml="8px" mr="8px">
        <Div col="12" p="8px">
          <Link to="/furniture">
            <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras-desktop/Bed.jpg`} />
            <Heading ta="center" color="black" fontFamily="light">
              FURNITURE ESSENTIALS
            </Heading>
          </Link>
        </Div>
        <Div col="12" p="8px">
          <Link to="/home-furnishings/bedding">
            <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras/Bedding-essentials.jpg`} />
            <Heading ta="center" color="black" fontFamily="light">
              BEDDING ESSENTIALS
            </Heading>
          </Link>
        </Div>
        <Div col="12" p="8px">
          <Link to="/tableware">
            <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras/Dining-Essentials.jpg`} alt="" />
            <Heading ta="center" color="black" fontFamily="light">
              DINNING ESSENTIALS
            </Heading>
          </Link>
        </Div>
        <Div col="12" p="8px">
          <Link to="/kitchenware">
            <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras/Kitchen-essential.jpg`} alt="" />
            <Heading ta="center" color="black" fontFamily="light">
              KITCHEN ESSENTIALS
            </Heading>
          </Link>
        </Div>
        <Div col="12" p="8px">
          <Link to="/home-furnishings/bath-accessory">
            <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras/Bath-essentials.jpg`} alt="" />
            <Heading ta="center" color="black" fontFamily="light">
              BATH ESSENTIALS
            </Heading>
          </Link>
        </Div>
        <Div col="12" p="8px">
          <Link to="/luggage">
            <Img width="100%" src={`${BASE_IMAGE_URL}/media/cms/extras-desktop/travel-essential.jpg`} />
            <Heading ta="center" color="black" fontFamily="light">
              TRAVEL ESSENTIALS
            </Heading>
          </Link>
        </Div>
      </Row>
      <Row pb="40px">
        <Div col="9" ta="center" m="auto">
          <ContentSection description="Customize your dream kitchen to whip up the perfect meal. Choose from over 1000 designs and finishes to turn your everyday activities like cooking and eating into a feast." />
        </Div>
      </Row>
      <Row ml="0" mr="0" alignItems="center" bg={`url(${`${BASE_IMAGE_URL}/media/cms/extras/Kitchen-Banner.jpg`})`} />
      <Row ml="0" mr="0" alignItems="center">
        <Div col="12" ta="center" bg="#9d9696" pt="30px" pb="30px" pl="15px" pr="15px">
          <Img src={`${BASE_IMAGE_URL}/media/cms/extras-desktop/duracucine-logo.png`} alt="" width="auto" m="auto" mb="30px" height="140px" />
          <Text ta="center" color="white" fontSize="18px" mb="0" fontFamily="light">
            Modular Kitchens Starting
          </Text>
          <Text ta="center" color="white" fontSize="18px" mt="5px" fontFamily="light">
            at Rs. 99,900/-
          </Text>
          <Text ta="center" color="white" fontSize="15px" mt="30px" fontFamily="light">
            50000 CUSTOMERS | 1000 MODULES | 200 FINISHES
          </Text>
          <Link rel="noopener noreferrer" to="/modular-kitchens/">
            <Text
              mt="20px"
              mb="0"
              ta="center"
              color="white"
              fontSize="15px"
              fontFamily="light"
              style={{ textDecoration: 'underline' }}
            >
              CLICK HERE
            </Text>
          </Link>
        </Div>
      </Row>
      <Row pb="40px">
        <Div col="9" ta="center" m="auto">
          <ContentSection description="Make your house into a home with expert help on interior design, home styling and end-to-end project management and execution" />
        </Div>
      </Row>
      <Row alignItems="center" bg={`url(${`${BASE_IMAGE_URL}/media/cms/extras/Kitchen-Banner.jpg`})`}>
        <Div col="12" ta="center" bg="#9d9696" pt="50px" pb="30px" pl="15px" pr="15px">
          <Img src={`${BASE_IMAGE_URL}/media/cms/extras-desktop/db-logo.png`} alt="" width="auto" m="auto" mb="30px" height="140px" />
          <Text ta="center" color="white" fontSize="18px" mb="0" fontFamily="light">
            MODULAR KITCHEN | MODULAR WARDROBE
          </Text>
          <Text ta="center" color="white" fontSize="18px" mt="5px" fontFamily="light">
            FULL HOUSE INTERIORS | PART HOUSE RENOVATION
          </Text>
          <Link target="_blank" rel="noopener noreferrer" to="/design-build/">
            <Text
              mt="30px"
              mb="0"
              ta="center"
              color="white"
              fontSize="26px"
              fontFamily="light"
              style={{ textDecoration: 'underline' }}
            >
              CLICK HERE
            </Text>
          </Link>
        </Div>
        <Div col="12" />
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

export default WeddingCampaign;
