import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import HeadingH4 from 'hometown-components/lib/HeadingH4';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Text from 'hometown-components/lib/Text';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Button from 'hometown-components/lib/Buttons';
import { validateEmail } from 'utils/validation';
import { sendData } from 'redux/modules/services';
import { SUBSCRIPTION as SUBSCRIPTION_API } from 'helpers/apiUrls';
import { weContactUs } from '../../redux/modules/services';

const fbIcon = require('../../../static/facebook.svg');
const twIcon = require('../../../static/twitter.svg');
const ytIcon = require('../../../static/youtube.svg');
const instaIcon = require('../../../static/instagram.svg');
const pinIcon = require('../../../static/pinterest.svg');
const ourAppIcon = require('../../../static/google-play-store.svg');
const paymentMethodIcon = require('../../../static/paymentMethodIcon.jpg');
const styles = require('./Footer.scss');

const mapStateToProps = ({ services }) => ({
  subscribe: services.footer
});

class Footer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    email: '',
    emailError: false,
    emailErrorMessage: 'Please Enter a Valid Email',
    already: false
  };
  componentWillReceiveProps(nextProps) {
    const { loaded, loading } = nextProps.subscribe;
    const { already } = this.state;
    if (loaded && !loading && !already) {
      this.setState({
        email: '',
        already: true
      });
    }
  }
  onChangeEmail = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateEmail(value);
    this.setState({
      email: value,
      emailError: checkError
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { sendFormData } = this.props;
    const { email } = this.state;
    const emailError = !validateEmail(email);
    if (emailError) {
      return this.setState({
        emailError
      });
    }
    const data = {
      email
    };
    sendFormData(SUBSCRIPTION_API, data, 'footer');
    window.dataLayer.push({
      event: 'all_pages_27_newsletter_subscribed',
      pagetype: '',
      source_page_url: window.location.href,
      previous_page_url: '',
      destination_page_url: '',
      login_status: '',
      user_id: '',
      click_text: e.target.innerText,
      email_id: email
    });
  };
  render() {
    const { email, emailError, emailErrorMessage, already } = this.state;
    return (
      <Div mb="0" p="0" pt="15px" pb="0" className={styles.footer}>
        <Section bg="footerTop" mb="0" p="1.5rem 1rem 0.625rem">
          <Container pr="0" pl="0">
            <Row m="0">
              {!already ? (
                <form onSubmit={this.handleSubmit}>
                  <Div col="8">
                    <FormInput
                      label=""
                      onChange={this.onChangeEmail}
                      value={email}
                      type="text"
                      placeholder=""
                      feedBackError={emailError}
                      feedBackMessage={emailErrorMessage}
                    />
                  </Div>
                  <Div col="4">
                    <Button
                      btnType="primary"
                      size="block"
                      boder="solid 1px rgba(151,151,151,0.47)"
                      fontFamily="regular"
                      height="38px"
                      mt="0"
                      ml="-1px"
                      onClick={this.handleSubmit}
                    >
                      Subscribe
                    </Button>
                  </Div>
                </form>
              ) : (
                <Text color="green" fontSize="0.955rem" mt="0" mb="0" lh="2" ta="left">
                  You have been successfully subscribed to the Newsletter
                </Text>
              )}
              <Div col="6" mt="0.625rem">
                <HeadingH4 color="white" fontSize="0.875rem" mt="0" pr="0.625rem">
                  CONTACT US
                </HeadingH4>
                <ul>
                  <li>
                    <a href="tel:08069252525">Call Us: 08069252525</a>
                  </li>
                  <li
                    onClick={() => {
                      const { dispatch } = this.context.store;
                      dispatch(weContactUs());
                    }}
                  >
                    <a href="mailto:care@hometown.in">Email: care@hometown.in</a>
                  </li>
                </ul>
              </Div>
              <Div col="6" mt="0.625rem">
                <HeadingH4 color="white" fontSize="0.875rem" mt="0">
                  FOLLOW US
                </HeadingH4>
                <ul className={styles.socials}>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.facebook.com/hometown.in/"
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_homepage_click_button_social_click',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: 'https://www.facebook.com/hometown.in/',
                          login_status: '',
                          user_id: '',
                          page_url: window.location.href,
                          banner_id: '',
                          click_text: ''
                        });
                      }}
                    >
                      <Img width="23px" src={fbIcon} alt="Facebook" />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://twitter.com/HomeTown_In/"
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_homepage_click_button_social_click',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: 'https://twitter.com/HomeTown_In/',
                          login_status: '',
                          user_id: '',
                          page_url: window.location.href,
                          banner_id: '',
                          click_text: ''
                        });
                      }}
                    >
                      <Img width="23px" src={twIcon} alt="Twitter" />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/hometownindia/"
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_homepage_click_button_social_click',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: 'https://www.instagram.com/hometownindia/',
                          login_status: '',
                          user_id: '',
                          page_url: window.location.href,
                          banner_id: '',
                          click_text: ''
                        });
                      }}
                    >
                      <Img width="23px" src={instaIcon} alt="instagram" />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.youtube.com/channel/UCBZGArWnKT6MYYwOsPCNjiw"
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_homepage_click_button_social_click',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: 'https://www.youtube.com/channel/UCBZGArWnKT6MYYwOsPCNjiw',
                          login_status: '',
                          user_id: '',
                          page_url: window.location.href,
                          banner_id: '',
                          click_text: ''
                        });
                      }}
                    >
                      <Img width="23px" src={ytIcon} alt="youtube" />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://in.pinterest.com/hometownstore/"
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_homepage_click_button_social_click',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: 'https://in.pinterest.com/hometownstore/',
                          login_status: '',
                          user_id: '',
                          page_url: window.location.href,
                          banner_id: '',
                          click_text: ''
                        });
                      }}
                    >
                      <Img width="23px" src={pinIcon} alt="Pinterest" />
                    </a>
                  </li>
                </ul>
              </Div>
            </Row>
          </Container>
        </Section>
        <Section bg="footerTop" mb="0" p="0.3125rem 1rem 1rem">
          <Container pr="0" pl="0">
            <Row m="0">
              {/* <Div display="flex" col="6" pr="0.3125rem" mb="0.625rem">
                <HeadingH4 color="white" fontSize="0.875rem" mt="0.625em">
                  ABOUT US
                </HeadingH4>
                <ul>
                  <li>
                    <Link to="/who-we-are">Who We Are</Link>
                  </li>
                  <li>
                    <a href="https://www.praxisretail.in/careers.html" rel="noreferrer noopener" target="_blank">
                      Careers
                    </a>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
                <HeadingH4 color="footerHeadingH4" fontFamily="regular" fontSize="1rem" mt="1rem" pb="2px">
                  USEFUL LINKS
                </HeadingH4>
                <ul>
                  <li>
                    <a href="https://m.hometown.in/sitemap.html" target="_blank" rel="noopener noreferrer">
                      Sitemap
                    </a>
                  </li>
                  <li>
                    <Link to="/promotions">Promotions</Link>
                  </li>
                </ul>
              </Div> */}
              <Div display="flex" col="6" pr="0.3125rem" mb="0.625rem">
                <HeadingH4 color="white" fontSize="0.875rem" mt="0.625em">
                  CUSTOMER SERVICE
                </HeadingH4>
                <ul>
                  <li>
                    <Link
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_global_click_link_footer_menu',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: '/track-order',
                          login_status: '',
                          user_id: '',
                          page_url: '',
                          banner_id: '',
                          click_text: 'Track Order'
                        });
                      }}
                      to="/track-order"
                    >
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_global_click_link_footer_menu',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: '/track-order',
                          login_status: '',
                          user_id: '',
                          page_url: '',
                          banner_id: '',
                          click_text: ' Bulk Order'
                        });
                      }}
                      to="/bulk-order"
                    >
                      Bulk Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_global_click_link_footer_menu',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: '/return-policy',
                          login_status: '',
                          user_id: '',
                          page_url: '',
                          banner_id: '',
                          click_text: 'Returns'
                        });
                      }}
                      to="/return-policy"
                    >
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_global_click_link_footer_menu',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: '/cancellation',
                          login_status: '',
                          user_id: '',
                          page_url: '',
                          banner_id: '',
                          click_text: 'Cancellation'
                        });
                      }}
                      to="/cancellation"
                    >
                      Cancellation
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_global_click_link_footer_menu',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: '/faq',
                          login_status: '',
                          user_id: '',
                          page_url: '',
                          banner_id: '',
                          click_text: 'FAQ'
                        });
                      }}
                      to="/faq"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_global_click_link_footer_menu',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: '/privacy-policy',
                          login_status: '',
                          user_id: '',
                          page_url: '',
                          banner_id: '',
                          click_text: ' Privacy Policy'
                        });
                      }}
                      to="/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_global_click_link_footer_menu',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: '/terms-and-conditions',
                          login_status: '',
                          user_id: '',
                          page_url: '',
                          banner_id: '',
                          click_text: ' Terms and Conditions'
                        });
                      }}
                      to="/terms-and-conditions"
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                </ul>
              </Div>
              <Div display="flex" col="6" pr="0.625rem" mb="0.625rem">
                <HeadingH4 color="white" fontSize="0.875rem" mt="1rem">
                  OUR APP
                </HeadingH4>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.fabfurnish.android"
                >
                  <Img src={ourAppIcon} alt="Our App" mt="1rem" height="35px" />
                </a>
              </Div>
              <Div display="flex" col="6" pr="0.625rem" mb="0.625rem">
                <HeadingH4 color="white" fontSize="0.875rem" mt="1rem">
                  PAYMENT METHOD
                </HeadingH4>
                <Img src={paymentMethodIcon} alt="Payment Method" mt="1rem" width="100%" height="34px" />
              </Div>
            </Row>
          </Container>
        </Section>
        <Section bg="footerBottom" mb="0" p="0.625rem">
          <Container pr="0" pl="0">
            <Row m="0">
              <Div col="12" ta="center" alignSelf="center">
                <Text color="#a6a6a6" ta="center" fontSize="0.875rem" mt="0" mb="0" lh="2">
                  Copyright reserved @ 2018
                </Text>
              </Div>
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}

Footer.defaultProps = {
  subscribe: {}
};

Footer.propTypes = {
  sendFormData: PropTypes.func.isRequired,
  subscribe: PropTypes.object
};
export default connect(mapStateToProps, { sendFormData: sendData })(Footer);
