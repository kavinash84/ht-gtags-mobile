import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HOME_URL, MK_URL } from 'helpers/Constants';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import Text from 'hometown-components/lib/Text';

const styles = require('./ModularKitchen.scss');

// const mkLogo = require('../../../static/mkLogo.png');
const LogoIcon = require('../../../static/logo3x.png');
const closeIcon = require('../../../static/close-icon.svg');
const userIcon = require('../../../static/user.svg');
const userIcon1 = require('../../../static/mkNew/Ellipse1.svg');
const userIcon2 = require('../../../static/mkNew/user1.svg');

const arrowForward = require('../../../static/newHomepage/newForwardArrow.svg');

// const Header = ({ link, text }) => (
//   <Section p="15px 0" mb="0">
//     <Container type="container" pr="0.5rem" pl="0.5rem">
//       <Row ml="0" mr="0">
//         <Div col="7" pt="10px">
//           <Button pt="0px" style={{border: 'none', float: 'left'}}>
//             {/* <Img float="left" height="22px" mr="5px" src={LogoIcon} alt="Hometown" /> */}
//             <Div ml="5px" mr="10px" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '20px', width:"20px"}}>
//               <Div style={{borderTop: '2px solid grey'}}></Div>
//               <Div style={{borderTop: '2px solid grey'}}></Div>
//               <Div style={{borderTop: '2px solid grey', width: '70%'}}></Div>
//             </Div>
//           </Button>
//           <Link to={MK_URL}>
//             {/* <Img height="19px" width="auto" mr="0" mt="2px" float="left" src={mkLogo} alt="" /> */}
//             <Img float="left" height="22px" mr="5px" src={LogoIcon} alt="Hometown" />
//           </Link>
//         </Div>
//         <Div col="5" ta="right">
//           {/* <ul className={styles.menuMk}>
//             <li>
//               <Link to={link}>{text}</Link>
//             </li>
//           </ul> */}
//           <Button style={{color: '#F47020', borderColor: '#F47020'}}>Request Quote</Button>
//         </Div>
//       </Row>
//     </Container>
//   </Section>
// );

export default class Header extends Component {
  state = {
    showNav: false
  };

  handleNav = () => {
    this.setState(
      {
        showNav: !this.state.showNav
      },
      () => console.log(this.state.showNav)
    );
  };

  render() {
    const { display, isLoggedIn, fullName } = this.props;
    return (
      <Section p="15px 0" mb="0">
        <Container type="container" pr="0.5rem" pl="0.5rem">
          <Row ml="0" mr="0" justifyContent="flex-start">
            <Div pt="0px" width="45%" style={{ float: 'none', width: '45%' }}>
              <Button pt="0px" mt="10px" style={{ border: 'none', float: 'left' }} onClick={this.handleNav}>
                {/* <Img float="left" height="22px" mr="5px" src={LogoIcon} alt="Hometown" /> */}
                <Div
                  ml="5px"
                  mr="10px"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '20px',
                    width: '20px'
                  }}
                >
                  <Div style={{ borderTop: '2px solid grey' }}></Div>
                  <Div style={{ borderTop: '2px solid grey' }}></Div>
                  <Div style={{ borderTop: '2px solid grey', width: '70%' }}></Div>
                </Div>
              </Button>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                {/* <Img height="19px" width="auto" mr="0" mt="2px" float="left" src={mkLogo} alt="" /> */}
                <Img float="left" ml="-10px" height="35px" src={LogoIcon} alt="Hometown" />
              </Link>
            </Div>
            <Div ta="right" style={{ float: 'none', width: '45%' }}>
              {/* <ul className={styles.menuMk}>
                <li>
                  <Link to={link}>{text}</Link>
                </li>
              </ul> */}
              {/* {display ? (
                <Button mr="20px" style={{color: '#F47020', borderColor: '#F47020'}} onClick={this.props.handleModal}>Request Quote</Button>
              ) : null} */}
              <Button style={{ color: '#F47020', borderColor: '#F47020' }} onClick={this.props.handleModal}>
                Request Quote
              </Button>
            </Div>
          </Row>
        </Container>

        {this.state.showNav ? (
          <Div
            style={{
              height: '100vh',
              width: '100%',
              position: 'fixed',
              zIndex: '10',
              top: '0px',
              left: '0px',
              background: 'white'
            }}
          >
            <Div p="30px">
              <Img
                src={closeIcon}
                onClick={this.handleNav}
                style={{
                  width: '20px',
                  float: 'right'
                }}
              />
            </Div>
            <Row ml="0px" mr="0px" pl="20px" pr="20px">
              <Img
                src={userIcon1}
                alt="user icon"
                style={{
                  width: '60px'
                }}
              />
              <Img
                ml="-43px"
                mr="20px"
                src={userIcon2}
                alt="user icon"
                style={{
                  width: '25px'
                }}
              />
              <Div
                style={{
                  width: '250px'
                }}
                p="5px 20px"
              >
                {isLoggedIn ? (
                  <Div>
                    <Text fontSize="16px" fontFamily="regular" style={{ letterSpacing: '1.28px' }}>
                      Hello
                    </Text>
                    <Text fontSize="16px" fontFamily="regular" style={{ letterSpacing: '1.28px', fontWeight: 'bold' }}>
                      {fullName}
                    </Text>
                  </Div>
                ) : (
                  <Link to="/login">
                    <Text fontSize="16px" fontFamily="regular" style={{ letterSpacing: '1.28px' }}>
                      Login | Register
                    </Text>
                  </Link>
                )}
              </Div>
            </Row>
            <Div mt="20px">
              <Div p="25px" pt="10px" pb="10px" bg="#FAF4F2">
                <Link to="/modular-kitchens/">
                  <Text
                    fontSize="16px"
                    style={{ fontWeight: 'bold', letterSpacing: '1.28px', display: 'inline-block', width: '90%' }}
                  >
                    DuraCucine
                  </Text>
                  <img
                    style={{
                      display: 'inline',
                      marginLeft: '-8px',
                      height: '10px',
                      width: '40px'
                    }}
                    src={arrowForward}
                    alt="Arrow"
                  />
                </Link>
              </Div>
              <Div pb="15px" pt="15px" pl="25px">
                <Link to="/plan-your-kitchen">
                  <Text style={{ letterSpacing: '1.28px' }}>Plan Your Kitchen</Text>
                </Link>
              </Div>
              <Div pb="15px" pl="25px">
                <Link to="/design-build/" target="_blank">
                  <Text style={{ letterSpacing: '1.28px' }}>Design & Build</Text>
                </Link>
              </Div>
              <Div pb="15px" pt="15px" ml="25px" style={{ borderTop: '1px solid #E3E3E3', width: '85%' }}>
                <Link to="/store-locator">
                  <Text style={{ letterSpacing: '1.28px' }}>Locate Us</Text>
                </Link>
              </Div>
              <Div pb="15px" pl="25px">
                <Link to="/who-we-are">
                  <Text style={{ letterSpacing: '1.28px' }}>Who We Are</Text>
                </Link>
              </Div>
              <Div pb="15px" pl="25px">
                <Link to="/contact-us">
                  <Text style={{ letterSpacing: '1.28px' }}>Contact Us</Text>
                </Link>
              </Div>
            </Div>
          </Div>
        ) : null}
      </Section>
    );
  }
}

Header.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

// export default Header;
