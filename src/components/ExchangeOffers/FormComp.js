import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Fade, FormFeedback, FormGroup, Label } from "reactstrap";
import { notifSend } from "../../redux/modules/notifs";
import InputBox from "./Form/InputBox";
import { checkSpecialCharAndNum, validateEmail, validateMobile, validateName, validateOption } from "./validations";
import styles from "./Form/Form.module.css";
import { apiInstanceTest } from "./axios";
import ExchangeOffers from "./index";
import { setExchangeCoupon } from "../../redux/modules/designBuild";

const customStyles = {
  container: () => ({
    width: "100%"
  }),
  input: () => ({
    height: "44px",
    lineHeight: "44px"
  })
};

const PRODUCTS = [
  { value: "1", label: "Beds; Exchange value = 30,000" },
  { value: "2", label: "2 Door Wardrobe; Exchange value = 20,000" },
  {
    value: "3",
    label: "3 Door Wardrobes / Other Wardrobes; Exchange value = 25,000"
  },
  { value: "4", label: "1 Seater Sofa; Exchange value = 10,000" },
  { value: "5", label: "2 Seater Sofa; Exchange value = 25,000" },
  { value: "6", label: "3 Seater Sofa; Exchange value = 40,000" },
  {
    value: "7",
    label:
      "Dining Table set / Other Dining Table set (Table + Chairs); Exchange value = 30,000"
  },
  {
    value: "8",
    label: "Other Furniture; Exchange value = 5,000"
  },
  { value: "9", label: "Mattress Spring/Cotton/Coir/foam; Exchange value = 8,000" }
];

const CITIES = [
  { value: "Ahmedabad", label: "Ahmedabad" },
  // { value: "Vadodra", label: "Vadodra" },
  { value: "Bengaluru", label: "Bengaluru" },
  // { value: "Mysore", label: "Mysore" },
  // { value: "Kochin", label: "Kochin" },
  { value: "Chennai", label: "Chennai" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Vizag", label: "Vizag" },
  { value: "Kolkata", label: "Kolkata" },
  // { value: "Ranchi", label: "Ranchi" },
  { value: "Siliguri", label: "Siliguri" },
  { value: "Raipur", label: "Raipur" },
  { value: "Asansol", label: "Asansol" },
  { value: "Guwahati", label: "Guwahati" },
  { value: "Bhubaneshwar", label: "Bhubaneshwar" },
  { value: "Patna", label: "Patna" },
  { value: "Lucknow", label: "Lucknow" },
  { value: "Bhopal", label: "Bhopal" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "NCR", label: "NCR" },
  { value: "Pune", label: "Pune" },
  { value: "Nagpur", label: "Nagpur" },
  { value: "Nashik", label: "Nashik" },
  { value: "Aurangabad", label: "Aurangabad" },
  { value: "Kakinada ", label: "Kakinada " },
  { value: "Vijaywada ", label: "Vijaywada " }

];

const initialState = {
  firstName: "",
  firstNameError: false,
  firstNameErrorMessage: "",
  lastName: "",
  lastNameError: false,
  lastNameErrorMessage: "",
  mobile: "",
  mobileError: false,
  mobileErrorMessage: "",
  email: "",
  emailError: false,
  emailErrorMessage: "",
  selectedCity: {},
  selectedCityError: false,
  selectedCityErrorMessage: "",
  selectedProduct: {},
  selectedProductError: false,
  selectedProductErrorMessage: "",
  isSubmiting: false,
  isSubmitted: false,
  isFailedToSubmit: false,
  submissionError: "",
  imageFile: "",
  imagePreviewUrl: "",
  imageFileError: false,
  imgSizeError: false,
  imgTypeError: false,
  imageFileErrorMessage: "Please upload a exchange product image"
};

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
    this.platform = "";
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  componentDidMount() {
    let path = "";
    const windowGlobal = typeof window !== "undefined" && window ? window : "";
    if (windowGlobal) {
      path = windowGlobal.location.hostname;
    }
    const mobileSites = [
      "stage-m.hometown.in",
      "beta-m.hometown.in",
      "m.hometown.in"
    ];
    const desktopSites = [
      "stage.hometown.in",
      "beta.hometown.in",
      "www.hometown.in"
    ];
    const appSites = ["pwa.hometown.in", "stage-pwa.hometown.in"];
    if (mobileSites.indexOf(path) > -1) {
      this.platform = "msite";
    } else if (desktopSites.indexOf(path) > -1) {
      this.platform = "desktop";
    } else if (appSites.indexOf(path) > -1) {
      this.platform = "android";
    } else {
      this.platform = "NA";
    }
  }

  onUploadImage = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    let typeError = false;
    if (file && file.size) {
      if (file) {
        const pattern = /image-jpg|png|jpeg|bmp/;
        if (!file.type.match(pattern)) {
          typeError = true;
        }
      }
      const size = file.size / 1024 / 1024;
      if (file && size <= 3 && !typeError) {
        reader.onloadend = () => {
          this.setState({
            imageFile: file,
            imagePreviewUrl: reader.result,
            imgSizeError: false,
            imgTypeError: false
          });
        };
        reader.readAsDataURL(file);
      } else if (typeError) {
        this.setState({
          imageFile: "",
          imagePreviewUrl: "",
          imgSizeError: false,
          imgTypeError: true
        });
      } else {
        this.setState({
          imageFile: "",
          imagePreviewUrl: "",
          imgSizeError: true,
          imgTypeError: false
        });
      }
    } else {
      this.setState({
        imageFile: "",
        imageFileError: true,
        imagePreviewUrl: ""
      });
    }
  };
  handleFirstNameInput = e => {
    //eslint-disable-line
    const {
      target: { value }
    } = e;
    const checkError = validateName(value);
    const check = checkSpecialCharAndNum(value);
    let error = "";
    if (checkError.error && checkError.errorMessage) {
      error = checkError.errorMessage;
    } else if (check) {
      error = "Special Characters And Numbers Are Not Allowed !";
    }
    this.setState({
      firstName: value,
      firstNameError: checkError.error || check,
      firstNameErrorMessage: error
    });
  };
  handleLastNameInput = e => {
    //eslint-disable-line
    const {
      target: { value }
    } = e;
    const checkError = validateName(value);
    const check = checkSpecialCharAndNum(value);
    let error = "";
    if (checkError.error && checkError.errorMessage) {
      error = checkError.errorMessage;
    } else if (check) {
      error = "Special Characters And Numbers Are Not Allowed !";
    }
    this.setState({
      lastName: value,
      lastNameError: checkError.error || check,
      lastNameErrorMessage: error
    });
  };
  handleMobileInput = e => {
    const {
      target: { value }
    } = e;
    const checkError = validateMobile(value);
    if (value.length > 10) return;
    this.setState({
      mobile: value,
      mobileError: checkError.error,
      mobileErrorMessage: checkError.error ? checkError.errorMessage : ""
    });
  };
  handleEmailInput = e => {
    const {
      target: { value }
    } = e;
    const checkError = validateEmail(value);
    this.setState({
      email: value,
      emailError: checkError.error,
      emailErrorMessage: checkError.error ? checkError.errorMessage : ""
    });
  };
  handleCityChange = e => {
    let city = { value: e.target.value };
    const { value } = city;
    const checkError = validateOption(value);
    this.setState({
      selectedCity: city,
      selectedCityError: checkError.error,
      selectedCityErrorMessage: checkError.error ? checkError.errorMessage : ""
    });
  };
  handleProductChange = e => {
    let product = { value: e.target.value };
    const { value } = product;
    const checkError = validateOption(value);
    this.setState({
      selectedProduct: product,
      selectedProductError: checkError.error,
      selectedProductErrorMessage: checkError.error
        ? checkError.errorMessage
        : ""
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { sendFormData } = this.props;
    const {
      firstName,
      lastName,
      mobile,
      email,
      selectedCity: { value: exchangeCity },
      selectedProduct: { value: exchangeProduct },
      imageFile
    } = this.state;
    const { switchUI } = this.props;

    const urlParams = new URLSearchParams(window.location.search);
    let source = urlParams.get("utm_source")
      ? urlParams.get("utm_source")
      : "Website";
    let campaign = urlParams.get("utm_campaign")
      ? urlParams.get("utm_campaign")
      : "Website";
    let medium = urlParams.get("utm_medium")
      ? urlParams.get("utm_medium")
      : "Website";
    let term = urlParams.get("utm_term")
      ? urlParams.get("utm_term")
      : "Website";

    const checkFirstName = validateName(firstName);
    const checkFirstNameCharAndNum = checkSpecialCharAndNum(firstName);
    const checkLastName = validateName(lastName);
    const checkLastNameCharAndNum = checkSpecialCharAndNum(lastName);
    const checkMobileNumber = validateMobile(mobile);
    const checkEmail = validateEmail(email);
    const checkSelectedCity = validateOption(exchangeCity);
    const checkSelectedProduct = validateOption(exchangeProduct);
    // const imageAvailable = !!imagePreviewUrl;

    if (
      checkFirstName.error ||
      checkFirstNameCharAndNum ||
      checkMobileNumber.error ||
      checkEmail.error ||
      checkSelectedCity.error ||
      checkSelectedProduct.error ||
      imageFile === ""
    ) {
      return this.setState({
        firstNameError: checkFirstName.error || checkFirstNameCharAndNum,
        firstNameErrorMessage: checkFirstNameCharAndNum
          ? "Special characters are not allowed in name field !"
          : checkFirstName.errorMessage,
        lastNameError: checkLastName.error || checkLastNameCharAndNum,
        lastNameErrorMessage: checkLastNameCharAndNum
          ? "Special characters are not allowed in name field !"
          : checkFirstName.errorMessage,
        mobileError: checkMobileNumber.error,
        mobileErrorMessage: checkMobileNumber.errorMessage,
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage,
        selectedCityError: checkSelectedCity.error,
        selectedCityErrorMessage: checkSelectedCity.errorMessage,
        selectedProductError: checkSelectedProduct.error,
        selectedProductErrorMessage: checkSelectedProduct.errorMessage,
        imageFileError: true,
        isSubmitted: false
      });
    }

    const formData = new FormData();
    formData.append("fname", firstName);
    formData.append("lname", lastName);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("city", exchangeCity);
    formData.append("product", `${exchangeProduct}`);
    formData.append("image", imageFile);
    formData.append("source", source);
    formData.append("campaign", campaign);
    formData.append("medium", medium);
    formData.append("term", term);
    this.setState({
      isSubmiting: true
    });

    apiInstanceTest
      .post("/tesla/offers/cashback-offers", formData)
      .then(response => {
        if (response.data.error_message) {
          const { dispatch } = this.context.store;
          this.setState({
            isSubmiting: false,
            isSubmitted: false,
            isFailedToSubmit: true
            // submissionError: message
          });
          dispatch(notifSend({
              type: "warning",
              msg: response.data.error_message || "Ooops..! Something went wrong. Try again",
              dismissAfter: 3000
            }));
        } else {
          this.setState({ open: true },
            () => {
              const { dispatch } = this.context.store;
              dispatch(
                setExchangeCoupon({
                  coupon: response.data.coupon,
                  validity: response.data.endDate
                })
              );
              const { history } = this.props;
              history.push({
                pathname: "/thank-you-eo",
                search: `?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}&utm_term=${term}`
              });
            }
          );
        }
      })
      .catch(error => {
        const {
          response: {
            data: { error_message: message }
          }
        } = error;
        const { dispatch } = this.context.store;
        this.setState({
          isSubmiting: false,
          isSubmitted: false,
          isFailedToSubmit: true,
          submissionError: message
        });
        dispatch(
          notifSend({
            type: "warning",
            msg: message || "Ooops..! Something went wrong. Try again",
            dismissAfter: 3000
          })
        );
      });
  };
  isDisabled = () => {
    const {
      firstNameError,
      mobileError,
      emailError,
      selectedCityError,
      selectedProductError,
      imgSizeError,
      imgTypeError
    } = this.state;
    return firstNameError ||
      mobileError ||
      emailError ||
      selectedCityError ||
      imgSizeError ||
      imgTypeError ||
      selectedProductError;
  };
  getUI = () => {
    const {
      firstName,
      firstNameError,
      firstNameErrorMessage,
      lastName,
      lastNameError,
      lastNameErrorMessage,
      mobile,
      mobileError,
      mobileErrorMessage,
      email,
      emailError,
      emailErrorMessage,
      selectedCity,
      selectedCityError,
      selectedCityErrorMessage,
      selectedProduct,
      selectedProductError,
      selectedProductErrorMessage,
      isSubmiting,
      imageFileError,
      imageFileErrorMessage,
      imagePreviewUrl,
      imgSizeError,
      imgTypeError
    } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        id="form"
        className={styles.contactForm}
      >
        <div>
          <div>
            <InputBox
              label="First Name*"
              type="text"
              placeholder="Your First Name"
              value={firstName}
              onChangeInput={this.handleFirstNameInput}
              error={firstNameError}
              errorMessage={firstNameErrorMessage}
              flexFlow={styles.flexFlowRow}
              labelProps={{
                className: `mb-0 pr-3 ${styles.labelWidth}`
              }}
              inputStyleProps={{
                className: styles.landingInput
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <InputBox
              label="Last Name*"
              type="text"
              placeholder="Your Last Name"
              value={lastName}
              onChangeInput={this.handleLastNameInput}
              error={lastNameError}
              errorMessage={lastNameErrorMessage}
              flexFlow={styles.flexFlowRow}
              labelProps={{
                className: `mb-0 pr-3 ${styles.labelWidth}`
              }}
              inputStyleProps={{
                className: styles.landingInput
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <InputBox
              label="Mobile*"
              type="number"
              placeholder="Mobile Number"
              value={mobile}
              onChangeInput={this.handleMobileInput}
              error={mobileError}
              errorMessage={mobileErrorMessage}
              flexFlow={styles.flexFlowRow}
              labelProps={{
                className: `mb-0 pr-3 ${styles.labelWidth}`
              }}
              inputStyleProps={{
                className: styles.landingInput
              }}
            />
          </div>
          <div>
            <InputBox
              label="Email*"
              type="text"
              placeholder="Email"
              value={email}
              onChangeInput={this.handleEmailInput}
              error={emailError}
              errorMessage={emailErrorMessage}
              flexFlow={styles.flexFlowRow}
              labelProps={{
                className: `mb-0 pr-3 ${styles.labelWidth}`
              }}
              inputStyleProps={{
                className: styles.landingInput
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <FormGroup style={{ marginBottom: "15px" }}>
              <Label
                for="City"
                style={{ marginBottom: "10px", display: "block" }}
              >
                City*
              </Label>

              <select
                onChange={this.handleCityChange}
                placeholder="Select City"
                defaultValue={null}
                value={selectedCity.value}
                style={{
                  width: "100%",
                  height: "48px",
                  fontSize: "14px",
                  color: "#7E7575",
                  outline: "none",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  border: "1px solid hsl(0,0%,80%)"
                }}
              >
                <option key="" value=""></option>
                {CITIES.map(val => (
                  <option key={val.value} value={val.value}>
                    {val.label}
                  </option>
                ))}
              </select>
              <FormFeedback className="text-left" style={{ marginTop: "0px" }}>
                <Fade in={selectedCityError} style={{ color: "#dc4c3a" }}>
                  {selectedCityError ? selectedCityErrorMessage : ""}
                </Fade>
              </FormFeedback>
            </FormGroup>
          </div>
          <div>
            <FormGroup style={{ marginBottom: "15px" }}>
              <Label
                for="City"
                style={{ marginBottom: "10px", display: "block" }}
              >
                Exchange Product*
              </Label>

              <select
                onChange={this.handleProductChange}
                placeholder="Select Exchange Product"
                defaultValue={null}
                value={selectedProduct.value}
                style={{
                  width: "100%",
                  height: "48px",
                  fontSize: "14px",
                  color: "#7E7575",
                  marginBottom: "10px",
                  outline: "none",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  border: "1px solid hsl(0,0%,80%)"
                }}
              >
                <option key="" value=""></option>
                {PRODUCTS.map(val => (
                  <option key={val.value} value={val.value}>
                    {val.label}
                  </option>
                ))}
              </select>
              <FormFeedback className="text-left" style={{ marginTop: "0px" }}>
                <Fade in={selectedProductError} style={{ color: "#dc4c3a" }}>
                  {selectedProductError ? selectedProductErrorMessage : ""}
                </Fade>
              </FormFeedback>
            </FormGroup>
          </div>
        </div>
        <div>
          <div>
            <InputBox
              accept="image/*"
              label="Upload Image*"
              type="file"
              onChangeInput={this.onUploadImage}
            />
            <p style={{ color: "#dc4c3a" }}>
              {imageFileError && !imagePreviewUrl ? imageFileErrorMessage : ""}
            </p>
          </div>

          <div>
            <Button
              type="submit"
              outline
              color="link"
              style={{
                background: "rgba(51, 51, 51, 0.85)",
                border: "none",
                color: "white",
                fontWeight: 600,
                marginBottom: "10px"
              }}
              disabled={isSubmiting || this.isDisabled()}
            >
              Submit
            </Button>
          </div>

          {imgSizeError && (
            <p style={{ color: "red" }}> Image Size Should Be Less Than 3 MB</p>
          )}
          {imgTypeError && (
            <p style={{ color: "red" }}>
              {" "}
              Only .png, .jpg, .bmp and .jpeg image format allowed!
            </p>
          )}
        </div>
        <div className="text-center">
        </div>
      </form>
    );
  };

  render() {
    return this.getUI();
  }
}

ExchangeOffers.defaultProps = {
  loading: false,
  loaded: false,
  data: {},
  sendFormData: () => { }
};

ExchangeOffers.propTypes = {
  sendFormData: PropTypes.func
};
