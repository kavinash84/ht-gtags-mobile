import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import ResponsiveModal from 'components/Modal';
import FeedBackForm from 'hometown-components/lib/Forms/FeedBackForm';
import { validateMobile, isEmpty, validateEmail } from 'utils/validation';
import { notifSend } from 'redux/modules/notifs';
import { sendData } from 'redux/modules/services';
import { FEEDBACK as FEEDBACK_API } from 'helpers/apiUrls';
import styles from './ContactUs.scss';

@connect(({ services }) => ({
  serviceRequest: services.feedback || {}
}))
class Feedback extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    firstNameFeedBackError: false,
    firstNameFeedBackMessage: 'First Name Cannot be Empty ',
    lastNameFeedBackError: false,
    lastNameFeedBackMessage: 'Last Name Cannot be Empty',
    phoneFeedBackError: false,
    phoneFeedBackMessage: 'Enter Valid 10 Digits Mobile Number',
    emailFeedBackError: false,
    emailFeedBackMessage: 'Enter Valid Email Id ',
    orderFeedBackError: false,
    orderFeedBackMessage: '',
    storeNameFeedBackError: false,
    storeNameFeedBackMessage: '',
    cityFeedBackError: false,
    cityFeedBackMessage: 'City Cannot be Empty',
    instore: false,
    delivery: false,
    fitment: false,
    aftersale: false
  };
  componentWillReceiveProps(nextProps) {
    const { loaded, loading } = nextProps.serviceRequest;
    if (loaded && !loading) {
      this.setState({
        open: true,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        order: '',
        review: '',
        storeName: '',
        instore: false,
        delivery: false,
        fitment: false,
        aftersale: false
      });
    }
  }
  onSubmitForm = e => {
    e.preventDefault();
    // Validate Form
    const { dispatch } = this.context.store;
    const {
      firstName,
      lastName,
      phone,
      email,
      city,
      storeName,
      review,
      order,
      instore,
      aftersale,
      fitment,
      delivery
    } = this.state;
    const firstNameFeedBackError = isEmpty(firstName);
    const lastNameFeedBackError = isEmpty(lastName);
    const phoneFeedBackError = !validateMobile(phone);
    const emailFeedBackError = !validateEmail(email);
    const cityFeedBackError = isEmpty(city);
    const storeNameFeedBackError = isEmpty(storeName);
    const reviewFeedBackError = isEmpty(review);
    const orderFeedBackError = isEmpty(order);

    if (
      firstNameFeedBackError ||
      lastNameFeedBackError ||
      phoneFeedBackError ||
      emailFeedBackError ||
      cityFeedBackError ||
      storeNameFeedBackError ||
      orderFeedBackError ||
      reviewFeedBackError
    ) {
      this.setState({
        firstNameFeedBackError,
        lastNameFeedBackError,
        phoneFeedBackError,
        cityFeedBackError,
        emailFeedBackError,
        storeNameFeedBackError,
        orderFeedBackError,
        reviewFeedBackError
      });
      dispatch(notifSend({
        type: 'warning',
        msg: 'Please Fill All Details Correctly',
        dismissAfter: 3000
      }));
    } else {
      let services = {
        aftersale,
        delivery,
        instore,
        fitment
      };
      services = Object.values(services)
        .map((item, index) => item && Object.keys(services)[index])
        .filter(item => item !== false)
        .join(',');

      const postData = {
        firstName,
        lastName,
        email,
        store: storeName,
        city,
        review,
        services,
        mobile: phone,
        orderNumber: order
      };
      dispatch(sendData(FEEDBACK_API, postData, 'feedback'));
    }
  };
  handleChange = e => {
    const {
      target: { value, name }
    } = e;
    this.setState({
      [name]: value,
      [`${name}FeedBackError`]: false
    });
  };
  handleCheckBoxChange = e => {
    const {
      target: { name }
    } = e;
    this.setState({
      [name]: !this.state[name]
    });
  };
  handleModal = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const { loaded, loading } = this.props.serviceRequest;
    const correctIcon = require('../../../static/correct.svg');
    const { open } = this.state;
    return (
      <Div type="block">
        <Section mb="0.3125rem" p="0.5rem" pr="0.5rem" pl="0.5rem">
          <Container type="container" pr="1rem" pl="1rem">
            <Row display="block" mr="0" ml="0">
              <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontWeight="400">
                FEEDBACK
              </Heading>
            </Row>
          </Container>
        </Section>
        <Section
          pt="1.25rem"
          pb="1.25rem"
          mb="0"
          bg="sectionBgDark"
          boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
          display="flex"
          p="0"
        >
          <Container type="container" pr="1rem" pl="1rem">
            <FeedBackForm
              onSubmitForm={this.onSubmitForm}
              handleChange={this.handleChange}
              handleCheckBoxChange={this.handleCheckBoxChange}
              {...this.state}
              loading={loading}
              loaded={loaded}
              col="12"
              reviewcolSize="12"
            />
            <ResponsiveModal onCloseModal={this.handleModal} open={open}>
              <Div ta="center" className={styles.serviceThankYouWrapper}>
                <Img m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" />
                <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
                  Thank you !
                </Text>
              </Div>
            </ResponsiveModal>
          </Container>
        </Section>
      </Div>
    );
  }
}
Feedback.defaultProps = {
  loading: false,
  loaded: false,
  serviceRequest: {}
};
Feedback.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  serviceRequest: PropTypes.object
};
export default Feedback;
