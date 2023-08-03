import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "hometown-components/lib/Section";
import Div from "hometown-components/lib/Div";
import Img from "hometown-components/lib/Img";
import Row from "hometown-components/lib/Row";
import Button from "hometown-components/lib/Buttons";
import { Link } from "react-router-dom";
import Text from "hometown-components/lib/Text";
import { PropTypes } from "prop-types";
import {
  validateMobile,
  validateEmail,
  isEmpty,
  validateFullname,
  checkSpecialChar
} from "utils/validation";
import FormInput from "./FormInput";
import CustomSlider from "./slider";
import {
  addCustomerReview,
  loadProductsListForReview
} from "../../redux/modules/reviews";

const CloseIcon = require("../../../static/Review/closeIcon.svg");
const PlusIcon = require("../../../static/Review/plusIcon.svg");
const StarEmpty = require("../../../static/Review/starEmpty.svg");
const StarFilled = require("../../../static/Review/starFilled.svg");

const styles = require("./writeReview.scss");

@connect(({ reviews, stores }) => ({
  productsToBeReviewed: reviews.productsToBeReviewed,
  stores: stores.data.items.text,
  reviewAdded: reviews.reviewAdded,
  productsLoader: reviews.productsLoader,
  loading: reviews.loading
}))
export default class WriteReview extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    name: "",
    nameError: "",
    nameErrorMsg: "Enter Valid Full Name",
    mobile: "",
    mobileError: "",
    mobileErrorMsg: "Enter Valid 10 Digit Phone Number",
    email: "",
    emailError: "",
    emailErrorMsg: "Please Enter Valid Email ",
    city: "",
    cityError: "",
    cityErrorMsg: "City field is Required",
    offline: "offline",
    offlineError: "",
    offlineErrorMsg: "Offline field is Required",
    store: "",
    storeError: "",
    storeErrorMsg: "Store field is Required",
    product: "",
    productError: "",
    productErrorMsg: "Product field is Required",
    addImg: "",
    addImgError: "",
    addImgErrorMsg: "Image field is Required",
    description: "",
    descriptionError: "",
    descriptionErrorMsg: "Description field is Required",
    ratings: 1,
    getDetailsHit: false
  };

  onChangeRating = e => {
    this.setState({ ratings: e });
  };
  onChangeName = e => {
    if (e.target.value) {
      this.setState({ name: e.target.value, nameError: false });
    } else {
      this.setState({
        nameError: true,
        name: ""
      });
    }
  };
  onChangeMobile = e => {
    if (e.target.value) {
      const checkError = !validateMobile(e.target.value);
      this.setState({
        mobile: e.target.value,
        mobileError: checkError,
        getDetailsHit: !checkError ? true : false,
        product: ""
      });
      document.getElementById("selectprodForReview").value = "";
    } else {
      this.setState({
        mobileError: true,
        mobile: ""
      });
    }
  };
  onChangeEmail = e => {
    if (e.target.value) {
      this.setState({ email: e.target.value, emailError: false });
    } else {
      this.setState({
        emailError: true,
        email: ""
      });
    }
  };
  onChangeCity = e => {
    if (e.target.value) {
      this.setState({ city: e.target.value, cityError: false });
    } else {
      this.setState({
        cityError: true,
        city: ""
      });
    }
  };
  onChangeOffline = e => {
    if (e.target.value) {
      this.setState({ city: e.target.value, cityError: false });
    } else {
      this.setState({
        cityError: true,
        city: ""
      });
    }
  };
  onChangeOffline = e => {
    if (e.target.value) {
      this.setState({ offline: e.target.value, offlineError: false });
    } else {
      this.setState({
        offlineError: true,
        offline: ""
      });
    }
  };
  onChangeStore = e => {
    if (e.target.value) {
      this.setState({ store: e.target.value, storeError: false });
    } else {
      this.setState({
        storeError: true,
        store: ""
      });
    }
  };
  onChangeProduct = e => {
    if (e.target.value) {
      this.setState({ product: e.target.value, productError: false });
    } else {
      this.setState({
        productError: true,
        product: ""
      });
    }
  };
  handleDescription = e => {
    if (e.target.value) {
      this.setState({ description: e.target.value, descriptionError: false });
    } else {
      this.setState({
        descriptionError: true,
        description: ""
      });
    }
  };
  handleFileUpload = e => {
    if (e.target.files.length) {
      this.setState({ addImg: e.target.files, addImgError: false });
    } else {
      this.setState({
        addImgError: true,
        addImg: ""
      });
    }
  };
  handleGetDetails = () => {
    const { dispatch } = this.context.store;
    dispatch(loadProductsListForReview(this.state.mobile));
    this.setState({ getDetailsHit: false });
  };
  onSubmitForm = e => {
    e.preventDefault();
    const {
      name,
      mobile,
      email,
      description,
      city,
      offline,
      product,
      store,
      addImg
    } = this.state;
    const nameError =
      isEmpty(name) || validateFullname(name) || checkSpecialChar(name);
    const mobileError = !validateMobile(mobile);
    const emailError = !validateEmail(email);
    const descriptionError = isEmpty(description);
    const cityError = isEmpty(city);
    const offlineError = isEmpty(offline);
    const productError = isEmpty(product);
    const storeError =
      this.state.offline === "offline" ? isEmpty(store) : false;
    // const addImgError = addImg === "" ? true : false;

    if (
      nameError ||
      mobileError ||
      emailError ||
      descriptionError ||
      cityError ||
      offlineError ||
      productError ||
      storeError
      //  ||
      // addImgError
    ) {
      this.setState({
        nameError,
        mobileError,
        emailError,
        descriptionError,
        cityError,
        offlineError,
        productError,
        storeError
        // addImgError
      });
    } else {
      const { dispatch } = this.context.store;
      let formdata = new FormData();
      formdata.append("name", this.state.name);
      formdata.append("rating", this.state.ratings);
      formdata.append("review", this.state.description);
      formdata.append("email", this.state.email);
      formdata.append("mobile", this.state.mobile);
      formdata.append("city", this.state.city);
      formdata.append("storeType", this.state.offline);
      if (this.state.offline === "offline") {
        formdata.append("storeName", this.state.store);
      }
      const selectedSku = this.state.product;
      const arr = [...this.props.productsToBeReviewed];
      const foundSkuProduct = arr.find(
        item => item.fk_catalog_config === +selectedSku
      );
      if (foundSkuProduct) {
        formdata.append("sku", foundSkuProduct.sku);
      }
      if (this.state.addImg) {
        formdata.append("image", this.state.addImg[0]);
      }
      dispatch(addCustomerReview(this.state.product, formdata));
    }
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.reviewAdded &&
      nextProps.reviewAdded !== this.props.reviewAdded
    ) {
      this.setState({
        name: "",
        mobile: "",
        email: "",
        description: "",
        city: "",
        offline: "offline",
        product: "",
        store: "",
        addImg: "",
        ratings: 1
      });
      document.getElementById("selectprodForReview").value = "";
      document.getElementById("selectStoreforReview").value = "";
    }
  }
  render() {
    const {
      name,
      mobile,
      email,
      description,
      city,
      offline,
      product,
      store,
      addImg,
      nameError,
      nameErrorMsg,
      mobileError,
      mobileErrorMsg,
      emailError,
      emailErrorMsg,
      descriptionError,
      descriptionErrorMsg,
      cityError,
      cityErrorMsg,
      offlineError,
      offlineErrorMsg,
      productError,
      productErrorMsg,
      storeError,
      storeErrorMsg,
      addImgError,
      addImgErrorMsg,
      ratings,
      getDetailsHit
    } = this.state;
    const {
      loading,
      stores,
      productsToBeReviewed,
      productsLoader
    } = this.props;
    return (
      <Section p="0" mb="0" className={styles.writeReviewContainer}>
        <Div style={{ background: "#f5eeee", padding: "15px 15px 0px" }}>
          <Div className={styles.close}>
            <Link to="/reviews">
              <Img src={CloseIcon} alt="Close" />
            </Link>
          </Div>
          <Div className={styles.writeTitle}>
            <Div className={styles.title}>Write Your Review</Div>
            <Div className={styles.titleBottom} />
          </Div>
          <Div className={styles.writeFormContainer}>
            <form onSubmit={this.onSubmitForm}>
              <Row m="0">
                <Div col="12" ta="left">
                  <FormInput
                    label=""
                    type="text"
                    placeholder="Name*"
                    onChange={this.onChangeName}
                    value={name}
                    feedBackError={nameError}
                    feedBackMessage={nameErrorMsg}
                  />
                </Div>
                <Div col="12" className={styles.mobileInputContainer} ta="left">
                  <FormInput
                    label=""
                    type="text"
                    placeholder="Mobile No.*"
                    style={{ width: "100%" }}
                    onChange={this.onChangeMobile}
                    value={mobile}
                    feedBackError={
                      mobileError
                        ? mobileError
                        : getDetailsHit
                        ? getDetailsHit
                        : false
                    }
                    feedBackMessage={
                      mobileError
                        ? mobileErrorMsg
                        : getDetailsHit
                        ? "Please click on get details to get all your product details"
                        : mobileErrorMsg
                    }
                  />
                  <div
                    className={styles.getDetailsBtn}
                    style={{
                      height: (mobileError
                      ? mobileError
                      : getDetailsHit
                      ? getDetailsHit
                      : false)
                        ? "48%"
                        : "63%"
                    }}
                    onClick={() => {
                      if (!productsLoader) {
                        const mobileValError = !validateMobile(mobile);
                        if (!mobileValError) {
                          this.handleGetDetails();
                        } else {
                          this.setState({ mobileError: true });
                        }
                      }
                    }}
                  >
                    {productsLoader ? "Loading...!" : "Get my order details"}
                  </div>
                </Div>
              </Row>
              <Row m="0">
                <Div col="12" ta="left">
                  <FormInput
                    label=""
                    type="email"
                    placeholder="Email ID"
                    onChange={this.onChangeEmail}
                    value={email}
                    feedBackError={emailError}
                    feedBackMessage={emailErrorMsg}
                  />
                </Div>
              </Row>
              <Row m="0">
                <Div col="6" ta="left">
                  <FormInput
                    label=""
                    type="text"
                    placeholder="City"
                    onChange={this.onChangeCity}
                    value={city}
                    feedBackError={cityError}
                    feedBackMessage={cityErrorMsg}
                  />
                </Div>
                <Div
                  col="6"
                  style={{ width: "47%", marginLeft: "3%" }}
                  ta="left"
                >
                  <div className="select-wrapper">
                    <div
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        height: "50px",
                        borderColor: "#E3E3E3",
                        padding: "0px 8px",
                        fontSize: "14px",
                        color: "#7E7575",
                        marginBottom: "10px",
                        outline: "none",
                        backgroundColor: "white"
                      }}
                    >
                      <select
                        onChange={this.onChangeOffline}
                        placeholder="Offline"
                        style={{
                          width: "100%",
                          height: "50px",
                          border: "none",
                          fontSize: "14px",
                          color: "#7E7575",
                          marginBottom: "10px",
                          outline: "none",
                          backgroundColor: "white"
                        }}
                        value={this.state.offline}
                      >
                        <option value="offline" selected>
                          Offline
                        </option>
                        <option value="online">Online</option>
                      </select>
                    </div>
                  </div>
                  {offlineError ? (
                    <Text color="#dc3545" fontSize="13px" mt="0px">
                      {offlineErrorMsg}
                    </Text>
                  ) : null}
                </Div>
              </Row>
              <Row m="0">
                <Div col="12" ta="left">
                  <div className="select-wrapper">
                    <div
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        height: "50px",
                        borderColor: "#E3E3E3",
                        padding: "0px 8px",
                        fontSize: "14px",
                        color: "#7E7575",
                        marginBottom: "10px",
                        outline: "none",
                        backgroundColor: "white"
                      }}
                    >
                      <select
                        onChange={this.onChangeStore}
                        placeholder="Select Store"
                        style={{
                          width: "100%",
                          height: "50px",
                          border: "none",
                          fontSize: "14px",
                          color: "#7E7575",
                          marginBottom: "10px",
                          outline: "none",
                          backgroundColor: "white"
                        }}
                        id="selectStoreforReview"
                        disabled={
                          this.state.offline === "online" ? true : false
                        }
                      >
                        <option value="Select Store" disabled selected>
                          Select Store
                        </option>
                        {stores.map(val => (
                          <option key={val.id} value={val.store}>
                            {val.store}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {storeError && this.state.offline === "offline" ? (
                    <Text color="#dc3545" fontSize="13px" mt="0px">
                      {storeErrorMsg}
                    </Text>
                  ) : null}
                </Div>
                <Div col="12" ta="left">
                  <div className="select-wrapper">
                    <div
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        height: "50px",
                        borderColor: "#E3E3E3",
                        padding: "0px 8px",
                        fontSize: "14px",
                        color: "#7E7575",
                        marginBottom: "10px",
                        outline: "none",
                        backgroundColor: "white"
                      }}
                    >
                      <select
                        onChange={this.onChangeProduct}
                        placeholder="Select Product"
                        style={{
                          width: "100%",
                          height: "50px",
                          border: "none",
                          fontSize: "14px",
                          color: "#7E7575",
                          marginBottom: "10px",
                          outline: "none",
                          backgroundColor: "white"
                        }}
                        id="selectprodForReview"
                      >
                        <option value="" selected disabled>
                          Select Product
                        </option>
                        {productsToBeReviewed.map(val => (
                          <option
                            key={val.fk_catalog_config}
                            value={val.fk_catalog_config}
                          >
                            {val.product_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {productError ? (
                    <Text color="#dc3545" fontSize="13px" mt="0px">
                      {productErrorMsg}
                    </Text>
                  ) : null}
                </Div>
                <Div col="12" style={{ position: "relative" }} ta="left">
                  <div
                    onClick={() => {
                      document.getElementById("imagesUploadForReview").click();
                    }}
                  >
                    <FormInput
                      label=""
                      type="text"
                      placeholder="Add Image"
                      disabled={true}
                      value={addImg ? "Image Added" : ""}
                      feedBackError={addImgError}
                      feedBackMessage={addImgErrorMsg}
                    />
                    <Img
                      src={PlusIcon}
                      alt="ADD"
                      style={{
                        width: "20px",
                        height: "20px",
                        padding: "3px",
                        border: "1px solid #999999",
                        borderRadius: "4px",
                        position: "absolute",
                        top: "24%",
                        right: "4%"
                      }}
                    />
                  </div>
                  <input
                    type="file"
                    id="imagesUploadForReview"
                    onChange={this.handleFileUpload}
                    accept="image/png, image/gif, image/jpeg"
                    style={{
                      position: "absolute",
                      top: "2%",
                      right: "2%",
                      zIndex: -1
                    }}
                  />
                </Div>
                <Div col="12" ta="left">
                  <textarea
                    placeholder="Write a review here…."
                    name="review"
                    value={description}
                    onChange={this.handleDescription}
                    rows="4"
                    style={{
                      borderColor: "rgb(227, 227, 227)",
                      background: "white",
                      borderRadius: "5px",
                      padding: "10px",
                      width: "100%"
                    }}
                  />
                  {descriptionError ? (
                    <Text color="#dc3545" fontSize="13px" mt="0px">
                      {descriptionErrorMsg}
                    </Text>
                  ) : null}
                </Div>
                <Div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "15px"
                  }}
                >
                  <Div
                    style={{
                      display: "flex",
                      width: "70%",
                      justifyContent: "center"
                    }}
                  >
                    <Img
                      src={1 <= ratings ? StarFilled : StarEmpty}
                      width="20px"
                      height="20px"
                      style={{ marginLeft: "5px" }}
                      onClick={() => this.onChangeRating(1)}
                    />
                    <Img
                      src={2 <= ratings ? StarFilled : StarEmpty}
                      width="20px"
                      height="20px"
                      style={{ marginLeft: "5px" }}
                      onClick={() => this.onChangeRating(2)}
                    />
                    <Img
                      src={3 <= ratings ? StarFilled : StarEmpty}
                      width="20px"
                      height="20px"
                      style={{ marginLeft: "5px" }}
                      onClick={() => this.onChangeRating(3)}
                    />
                    <Img
                      src={4 <= ratings ? StarFilled : StarEmpty}
                      width="20px"
                      height="20px"
                      style={{ marginLeft: "5px" }}
                      onClick={() => this.onChangeRating(4)}
                    />
                    <Img
                      src={5 <= ratings ? StarFilled : StarEmpty}
                      width="20px"
                      height="20px"
                      style={{ marginLeft: "5px" }}
                      onClick={() => this.onChangeRating(5)}
                    />
                  </Div>
                </Div>
                <CustomSlider
                  ratings={ratings}
                  handleChange={this.onChangeRating}
                />
                <button
                  type="submit"
                  id="reviewSubmitBtn"
                  onClick={this.onSubmitForm}
                  style={{ visibility: "hidden" }}
                >
                  submit
                </button>
              </Row>
            </form>
          </Div>
        </Div>
        <Div
          col="12"
          pr="0.625rem"
          pl="0.625rem"
          className={styles.bottomFixedSubmit}
        >
          <Button
            style={{
              borderColor: "#F47020",
              color: "#F47020",
              backgroundColor: "#FFFFFF",
              borderRadius: "5px",
              fontSize: "14px",
              width: "100%",
              fontWeight: 600,
              margin: "10px 0px 10px"
            }}
            fontFamily="regular"
            height="50px"
            m="0"
            pl="5%"
            pr="5%"
            onClick={() => {
              document.getElementById("reviewSubmitBtn").click();
            }}
            disabled={loading}
          >
            {loading ? "Submiting Review..." : "Submit Review"}
          </Button>
        </Div>
      </Section>
    );
  }
}
