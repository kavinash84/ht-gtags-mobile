import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import ProfileForm from 'hometown-components/lib/Forms/ProfileForm';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Menu from 'components/OtherMenu';
import UpdatePassword from 'containers/UpdatePassword';
import DatePicker from 'components/Form/DatePicker';
import { validateEmail } from 'js-utility-functions';
import { validateMobile, validateName, validateDob, checkSpecialChar } from 'utils/validation';
import { updateUserProfile } from 'redux/modules/profile';
import { isGSTNumber } from 'utils/helper';

const styles = require('./index.scss');

const showDateField = (dob, onChange) => {
  if (dob && dob !== 'Invalid date') {
    dob = moment(dob, 'DD-MM-YYYY').toDate();
  } else dob = null;

  return <DatePicker onChange={onChange} selectedDay={dob} />;
};

@connect(({ profile }) => ({
  profile: profile.data,
  futurePay: profile.data.futurPayProfile,
  response: profile
}))
export default class ProfileFormContainer extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      contact_number: PropTypes.string,
      email: PropTypes.string,
      full_name: PropTypes.string,
      gst: PropTypes.string,
      dob: PropTypes.string,
      city: PropTypes.string,
      gender: PropTypes.string
    }),
    response: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    profile: PropTypes.shape({
      contact_number: '',
      email: '',
      full_name: '',
      gst: '',
      dob: '',
      city: '',
      gender: ''
    }),
    response: {}
  };

  state = {
    email: '',
    emailError: false,
    emailErrorMessage: 'Enter valid email',
    phone: '',
    phoneError: false,
    phoneErrorMessage: 'Enter 10 Digits Valid Mobile Number',
    fullName: '',
    fullNameError: false,
    fullNameErrorMessage: "Name can't be blank",
    gst: '',
    gstError: false,
    gstErrorMessage: 'Enter valid GST number',
    dob: '',
    dobError: false,
    dobErrorMessage: 'Enter valid Date of Birth',
    gender: 'male',
    genderError: false,
    genderErrorMessage: 'Enter a valid Gender',
    city: '',
    cityError: false,
    cityErrorMessage: 'Enter a valid City'
  };
  componentWillMount() {
    const {
      profile: { full_name: fullName, email, contact_number: phone, gst, dob, gender, city }
    } = this.props;

    this.setState({
      fullName: fullName && fullName.trim(),
      email,
      phone: phone || '',
      gst: gst || '',
      dob: dob || '',
      city: city || '',
      gender
    });
  }
  // onChangeEmail = e => {
  //   const {
  //     target: { value }
  //   } = e;
  //   const checkError = validateEmail(value);
  //   this.setState({
  //     email: value,
  //     emailError: checkError.error
  //   });
  // };
  // onChangePhone = e => {
  //   const {
  //     target: { value }
  //   } = e;
  //   const checkError = !validateMobile(value);
  //   if (!allowNChar(value, 10) || (!allowTypeOf(value, 'number') && value.length > 0)) {
  //     return;
  //   }
  //   this.setState({
  //     phone: value,
  //     phoneError: checkError,
  //     phoneErrorMessage:
  //       value[0] === '0' ? 'Mobile number must not start with 0' : 'Enter 10 Digits Valid Mobile Number'
  //   });
  // };
  onChangeFullName = e => {
    const {
      target: { value }
    } = e;
    const checkError = validateName(value).error;
    this.setState({
      fullName: value,
      fullNameError: checkError,
      fullNameErrorMessage: validateName(value).msg
    });
  };
  onChangeGender = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      gender: value
    });
  };
  onChangeCity = e => {
    const {
      target: { value }
    } = e;
    const checkError = checkSpecialChar(value).error;
    this.setState({
      city: value,
      cityError: checkError,
      cityErrorMessage: checkSpecialChar(value).msg
    });
  };
  onChangeGST = e => {
    const {
      target: { value }
    } = e;
    const checkError = value && !isGSTNumber(value);
    this.setState({
      gst: value,
      gstError: checkError
    });
  };
  onChangeDob = value => {
    const checkError = validateDob(value).error;
    const {
      futurePay,
      profile: { wallet_created: walletCreationStatus }
    } = this.props;
    if (walletCreationStatus === '1' || futurePay.status === 'success') {
      const newDob = moment(value, 'DD-MM-YYYY').toDate();
      const currentDate = `${new Date().toJSON().slice(0, 10)} 01:00:00`;
      const myAge = Math.floor((Date.now(currentDate) - newDob) / 31557600000);
      if (myAge > 10) {
        this.setState({
          dob: moment(value).format('DD-MM-YYYY'),
          dobError: checkError
        });
      } else {
        this.setState({
          // dob: value,
          dobError: true,
          dobErrorMessage: 'Wallet user shoud be atleast 10 years old'
        });
      }
      // this.setState({
      //   dob: moment(value).format('DD-MM-YYYY'),
      //   dobError: checkError,
      //   dobErrorMessage: validateDob(value).msg
    } else {
      this.setState({
        dob: value,
        dobError: checkError
      });
    }
  };
  onSubmitProfile = e => {
    e.preventDefault();
    const { email, fullName, phone, dob, city } = this.state;
    const checkEmail = validateEmail(email);
    const phoneError = !validateMobile(phone);
    const checkFullName = validateName(fullName).error;
    const checkDob = validateDob(dob).error;
    if (checkEmail.error || checkFullName || phoneError || checkDob) {
      return this.setState({
        emailError: checkEmail.error,
        fullNameError: checkFullName,
        fullNameErrorMessage: validateName(fullName).msg,
        phoneError,
        dobErrorMessage: validateDob(dob).msg,
        dobError: checkDob
      });
    }
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      dob: dob ? moment(dob, 'DD-MM-YYYY').format('YYYY-MM-DD') : ''
    };
    dispatch(updateUserProfile(data));
  };

  render() {
    const {
      email,
      phone,
      fullName,
      gender,
      city,
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      fullNameError,
      fullNameErrorMessage,
      gst,
      gstError,
      gstErrorMessage,
      dob,
      dobError,
      dobErrorMessage,
      genderError,
      genderErrorMessage,
      cityError,
      cityErrorMessage
    } = this.state;
    const { response } = this.props;
    return (
      <div className={styles.formContainer}>
        <Menu />
        <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem" pb="0.3125rem">
          <Container type="container" pr="1rem" pl="1rem">
            <Row display="block" mr="0" ml="0">
              <Heading fontSize="1.125rem" color="textDark" mb="0px" mt="0px" fontFamily="light">
                Profile Information
              </Heading>
            </Row>
          </Container>
        </Section>
        <div className={styles.formWrapper}>
          <Section p="1.25rem" mb="0" bg="sectionBgDark">
            <Row display="block" mr="0" ml="0">
              <Div>
                <ProfileForm
                  email={email}
                  onChangeEmail={() => {}}
                  emailFeedBackError={emailError}
                  emailFeedBackMessage={emailErrorMessage}
                  gst={gst}
                  dob={dob}
                  onChangeGST={this.onChangeGST}
                  gstFeedBackError={gstError}
                  gstFeedBackMessage={gstErrorMessage}
                  phone={phone}
                  onChangePhone={() => {}}
                  phoneFeedBackError={phoneError}
                  phoneFeedBackMessage={phoneErrorMessage}
                  fullName={fullName}
                  onChangeFullName={this.onChangeFullName}
                  fullNameFeedBackError={fullNameError}
                  fullNameFeedBackMessage={fullNameErrorMessage}
                  onSubmitProfile={this.onSubmitProfile}
                  dobFeedBackError={dobError}
                  dobFeedBackMessage={dobErrorMessage}
                  date={showDateField(dob, this.onChangeDob)}
                  response={response}
                  gender={gender}
                  genderFeedBackError={genderError}
                  genderFeedBackMessage={genderErrorMessage}
                  city={city}
                  cityFeedBackError={cityError}
                  cityFeedBackMessage={cityErrorMessage}
                  onChangeGender={this.onChangeGender}
                  onChangeCity={this.onChangeCity}
                />
              </Div>
            </Row>
          </Section>
          <UpdatePassword />
        </div>
      </div>
    );
  }
}
