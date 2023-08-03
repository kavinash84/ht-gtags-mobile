import React from "react";
import { connect } from "react-redux";
import { NotFound } from "containers";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Img from "hometown-components/lib/Img";
import Div from "hometown-components/lib/Div";
import Row from "hometown-components/lib/Row";
import Text from "hometown-components/lib/Text";
import Container from "hometown-components/lib/Container";
// import Input from 'hometown-components/lib/Input';
import Button from "hometown-components/lib/Buttons";

import ReactStars from "react-stars";
import * as actionCreators from "redux/modules/feedback";
import { bindActionCreators } from "redux";

const LogoIcon = require("../../../static/logo.png");
const fbIcon = require("../../../static/facebook.png");
const twIcon = require("../../../static/twitter.png");
const ytIcon = require("../../../static/youtube.png");
const instaIcon = require("../../../static/instagram.png");
// const closeIcon = require('../../../static/close-icon.svg');

const xBtn = {
  position: "absolute",
  right: "-9px",
  top: "-9px",
  border: "1px solid grey",
  width: "19px",
  fontSize: "10px",
  fontWeight: "bold",
  borderRadius: "50%",
  backgroundColor: "rgba(182, 11, 11, 1)",
  height: "19px",
  margin: "auto",
  color: "white"
};

const mapStateToProps = ({ feedback }) => {
  if (feedback.data) {
    return {
      feedback,
      customer: feedback.data.customer,
      prodArr: feedback.data.orderItems,
      orderDate: feedback.data.orderDate,
      mobile: feedback.data.mobile,
      sapOrderNumber: feedback.data.hasOwnProperty("sapOrderNumber")
        ? feedback.data.sapOrderNumber
        : ""
    };
  }
  return {
    feedback,
    customer: "",
    prodArr: [],
    orderDate: "",
    mobile: "",
    sapOrderNumber: ""
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionCreators }, dispatch);
class FeedbackMailer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showMore: false,
      formData: {},
      otheresFormData: {
        deliveryRating: 0,
        deliveryRatingError: false,
        deliveryRatingErrorMessage: "Delivery Rating is required",
        deliveryReview: "",
        deliveryReviewError: false,
        deliveryReviewErrorMessage: "Delivery Review is required",
        installationRating: 0,
        installationRatingError: false,
        installationRatingErrorMessage: "Installation Rating is required",
        installationReview: "",
        installationReviewError: false,
        installationReviewErrorMessage: "Installation Review is required",
        overallRating: 0,
        overallRatingError: false,
        overallRatingErrorMessage: "Overall Rating is required",
        overallReview: "",
        overallReviewError: false,
        overallReviewErrorMessage: "Overall Review is required"
      },
      validFeedback: true,
      submitClicked: false,
      images: {},
      products: []
    };
  }

  componentDidMount() {
    this.initialRender();
  }

  setValidErrorObject = val => {
    if (!val.rating) {
      val = {
        ...val,
        ratingError: true,
        ratingErrorMessage: "Rating is required"
      };
    } else {
      val = { ...val, ratingError: false, ratingErrorMessage: "" };
    }

    if (val.rating <= 3) {
      if (!val.review) {
        val = {
          ...val,
          reviewError: true,
          reviewErrorMessage: "Review is required"
        };
      } else {
        val = { ...val, reviewError: false, reviewErrorMessage: "" };
      }
    } else {
      val = { ...val, reviewError: false, reviewErrorMessage: "" };
    }
    return val;
  };

  // showMoreHandler = () => {
  //   this.setState({
  //     showMore: !this.state.showMore
  //   });
  // };

  initialRender = () => {
    const { showMore } = this.state;
    const { prodArr } = this.props;
    const arr = !showMore ? prodArr.slice(0, 2) : prodArr;
    const form = {};
    arr.map(item => {
      form[`${item.id}`] = {
        id: `${item.id}`,
        rating: 0,
        review: ""
      };
    });
    this.setState({
      products: !showMore ? prodArr.slice(0, 2) : prodArr,
      formData: form
    });
  };

  showMoreHandler = () => {
    // const { showMore } = this.state;
    const { prodArr } = this.props;
    this.setState(
      {
        showMore: !this.state.showMore
      },
      () => {
        // console.log(this.state.showMore, 'showMore');
        this.setState({
          products: this.state.showMore ? prodArr : prodArr.slice(0, 2)
        });
      }
    );
  };

  validateForm = form => {
    if (!Object.keys(form).length) return true;

    // add validation Error and Error message object
    Object.keys(form).forEach(key => {
      form = {
        ...form,
        [`${key}`]: {
          ...this.setValidErrorObject(form[key])
        }
      };
    });
    this.setState({ formData: form });

    const {
      otheresFormData: { deliveryRating, installationRating, overallRating }
    } = this.state;
    if (!deliveryRating || !installationRating || !overallRating) return true;

    // Validate if there is any error
    return Object.keys(form).some(key => {
      if (form[key].ratingError) return true;
      if (form[key].reviewError) return true;
      return false;
    });
  };

  validateOtheresForm = () => {
    const { otheresFormData } = this.state;
    const form = { ...otheresFormData };
    if (!otheresFormData.deliveryRating) {
      form["deliveryRatingError"] = true;
    } else {
      form["deliveryRatingError"] = false;
    }
    if (
      !otheresFormData.deliveryReview &&
      otheresFormData.deliveryRating <= 3
    ) {
      form["deliveryReviewError"] = true;
    } else {
      form["deliveryReviewError"] = false;
    }
    if (!otheresFormData.installationRating) {
      form["installationRatingError"] = true;
    } else {
      form["installationRatingError"] = false;
    }
    if (
      !otheresFormData.installationReview &&
      otheresFormData.installationRating <= 3
    ) {
      form["installationReviewError"] = true;
    } else {
      form["installationReviewError"] = false;
    }
    if (!otheresFormData.overallRating) {
      form["overallRatingError"] = true;
    } else {
      form["overallRatingError"] = false;
    }
    if (!otheresFormData.overallReview && otheresFormData.overallRating <= 3) {
      form["overallReviewError"] = true;
    } else {
      form["overallReviewError"] = false;
    }
    this.setState({ otheresFormData: form });
  };

  otheresRatingsChanged = (newRating, id) => {
    const { otheresFormData } = this.state;
    this.setState(
      {
        otheresFormData: {
          ...otheresFormData,
          [`${id}`]: newRating
        }
      },
      () => {
        // if (this.state.submitClicked) {
        this.validateOtheresForm();
        // }
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formData, otheresFormData } = this.state;
    const {
      deliveryRatingError,
      deliveryReviewError,
      installationRatingError,
      installationReviewError,
      overallRatingError,
      overallReviewError
    } = otheresFormData;
    const { customer, setFeedbackForm, mobile, sapOrderNumber } = this.props;
    const valid = !this.validateForm(formData);
    this.validateOtheresForm();
    this.setState({
      submitClicked: true,
      validFeedback: valid
    });
    if (
      valid &&
      !deliveryRatingError &&
      !deliveryReviewError &&
      !installationRatingError &&
      !installationReviewError &&
      !overallRatingError &&
      !overallReviewError
    ) {
      const prodIds = Object.keys(formData).join();
      const formdata = new FormData();
      const deliveryRating = parseInt(otheresFormData.deliveryRating);
      const installationRating = parseInt(otheresFormData.installationRating);
      const overallRating = parseInt(otheresFormData.overallRating);
      if (deliveryRating) {
        formdata.append(`deliveryRating`, `${deliveryRating}`);
      }
      if (installationRating) {
        formdata.append(`installationRating`, `${installationRating}`);
      }
      if (overallRating) {
        formdata.append(`overallRating`, `${overallRating}`);
      }
      // if (otheresFormData.overallReview) {
      formdata.append(`overallReview`, otheresFormData.overallReview);
      // }
      // if (otheresFormData.deliveryReview) {
      formdata.append(`deliveryReview`, otheresFormData.deliveryReview);
      // }
      // if (otheresFormData.installationReview) {
      formdata.append(`installationReview`, otheresFormData.installationReview);
      // }
      Object.values(formData).forEach(data => {
        const rating = parseInt(data.rating, 10);

        formdata.append(`productId[${data.id}]`, data.id);
        if (data.rating) {
          formdata.append(`productRating[${data.id}]`, `${rating}`);
        }
        if (data.review) {
          formdata.append(`productReview[${data.id}]`, data.review);
        } else {
          formdata.append(`productReview[${data.id}]`, "");
        }
        if (data.image) formdata.append("uploadImage", data.image);
        else formdata.append("uploadImage", "");
      });
      formdata.append("customerMobile", mobile);
      formdata.append("products", `${prodIds}`);
      formdata.append("customerName", customer);
      if (sapOrderNumber) {
        formdata.append("order", sapOrderNumber);
      }
      setFeedbackForm(formdata);
    }
  };

  ratingChanged = (newRating, id, name, ratingType) => {
    console.log(newRating, id, name);
    const { formData } = this.state;
    this.setState(
      {
        formData: {
          ...formData,
          [`${id}`]: {
            ...formData[`${name.id}`],
            id: name.id,
            [ratingType]: newRating
          }
        }
      },
      () => {
        if (this.state.submitClicked) {
          this.setState({
            validFeedback: !this.validateForm(this.state.formData)
          });
        }
      }
    );
  };

  handleChange = (value, name, ratingType) => {
    const { formData } = this.state;
    if (value) {
      this.setState(
        {
          formData: {
            ...formData,
            [`${name.id}`]: {
              ...formData[`${name.id}`],
              id: name.id,
              [ratingType]: value
            }
          }
        },
        () => {
          if (this.state.submitClicked) {
            this.setState({
              validFeedback: !this.validateForm(this.state.formData)
            });
          }
        }
      );
    } else {
      delete formData[`${name.id}`].review;
      if (this.state.submitClicked) {
        this.setState({
          validFeedback: !this.validateForm(this.state.formData)
        });
      }
    }
  };

  uploadImageHandler = (e, id, name) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    let typeError = false;
    if (file) {
      const pattern = /image-jpg|png|jpeg|bmp/;
      if (!file.type.match(pattern)) {
        typeError = true;
      }
    }
    const size = file.size / 1024 / 1024;
    if (file && size <= 5 && !typeError) {
      // console.log('state var for images');
      reader.onloadend = () => {
        this.setState(
          {
            images: {
              ...this.state.images,
              [`${id}-img`]: {
                imageFile: file,
                imagePreviewUrl: reader.result,
                imgSizeError: false,
                imgTypeError: false
              }
            }
          },
          () => {
            console.log(this.state, "image check");
            const { formData } = this.state;
            this.setState(
              {
                formData: {
                  ...formData,
                  [`${id}`]: {
                    ...formData[`${id}`],
                    id: name.id,
                    image: file
                  }
                }
              },
              () => {
                if (this.state.submitClicked) {
                  this.setState({
                    validFeedback: !this.validateForm(this.state.formData)
                  });
                }
              }
            );
          }
        );
      };
      reader.readAsDataURL(file);
    } else if (typeError) {
      this.setState({
        images: {
          ...this.state.images,
          [`${id}-img`]: {
            imageFile: file,
            imagePreviewUrl: reader.result,
            imgSizeError: false,
            imgTypeError: true,
            imgSizeErrorMessage: "",
            imgTypeErrorMessage: "Image type is invalid"
          }
        }
      });
    } else {
      this.setState({
        images: {
          ...this.state.images,
          [`${id}-img`]: {
            imageFile: file,
            imagePreviewUrl: reader.result,
            imgSizeError: true,
            imgTypeError: false,
            imgSizeErrorMessage: "Image size not within limits",
            imgTypeErrorMessage: ""
          }
        }
      });
    }

    // const { formData } = this.state;
    // this.setState(
    //   {
    //     formData: {
    //       ...formData,
    //       [`${id}`]: {
    //         ...formData[`${id}`],
    //         id: name.id,
    //         image: e.target.files[0]
    //       }
    //     }
    //   }
    // () => {
    //   if (this.state.submitClicked) {
    //     this.setState({
    //       validFeedback: !this.validateForm(this.state.formData)
    //     });
    //   }
    // }
    // () => console.log(this.state, ' state check')
    // );
  };

  removeImage = id => {
    const { images, formData } = this.state;
    delete images[`${id}-img`];
    delete formData[`${id}`].image;
    this.setState({ ...this.state });
  };

  renderProducts = prodArr => {
    const { orderDate } = this.props;
    const { formData, otheresFormData, images, products } = this.state;
    // let products = [];
    // if (!this.state.showMore) {
    //   products = prodArr.slice(0, 2);
    // } else {
    //   products = prodArr;
    // }
    const renderProds = products.map(prod => (
      <Div style={{ background: "#f0f0f0" }} p="15px" mb="10px">
        {/* <Row alignItems="center" mb="20px"> */}
        <Div mb="20px">
          <Div col="12" style={{ float: "none" }}>
            <Text>Product Purchased</Text>
          </Div>
          <Row col="12" ml="0" mr="0" alignItems="center">
            <Img src={prod.img} height="64px" mr="15px" />
            <Text fontFamily="medium" fontSize="16px">
              {prod.name}
            </Text>
          </Row>
        </Div>
        <Row alignItems="center" mb="20px">
          <Div col="5" pl="15px" pr="10px">
            <Text>Date of Purchase</Text>
          </Div>
          <Div col="7" pl="0" pr="15px">
            <input
              type="date"
              value={orderDate}
              disabled
              style={{
                fontSize: "12px",
                width: "100%",
                padding: "2px",
                backgroundColor: "white"
              }}
            />
          </Div>
        </Row>
        <Row alignItems="center" mb="20px">
          <Div col="5" pl="15px" pr="10px">
            <Text>Product Rating*</Text>
          </Div>
          <Div col="7" pl="0" pr="15px">
            <ReactStars
              count={5}
              onChange={val => this.ratingChanged(val, prod.id, prod, "rating")}
              size={20}
              value={
                formData[`${prod.id}`] && formData[`${prod.id}`].rating
                  ? formData[`${prod.id}`].rating
                  : 0
              }
              half={false}
              color2="#ffd700"
            />
            {formData[`${prod.id}`] && formData[`${prod.id}`].ratingError ? (
              <Text color="red" fontSize="12px">
                {formData[`${prod.id}`].ratingErrorMessage ||
                  "Review is required"}
              </Text>
            ) : null}
          </Div>
        </Row>
        <Row alignItems="center" mb="20px">
          <Div col="5" pl="15px" pr="10px">
            <Text>Product Review</Text>
          </Div>
          <Div col="7" pl="0" pr="15px">
            <textarea
              style={{
                padding: "4px",
                width: "100%",
                height: "50px",
                outline: "none",
                border: "1px solid grey",
                fontSize: "14px"
              }}
              type="text"
              onChange={e => this.handleChange(e.target.value, prod, "review")}
            />
            {formData[`${prod.id}`] && formData[`${prod.id}`].reviewError ? (
              <Text color="red" fontSize="12px">
                {formData[`${prod.id}`].reviewErrorMessage}
              </Text>
            ) : null}
          </Div>
        </Row>

        <Row ml="0" mr="0" alignItems="center">
          <Div col="5" pr="15px" width="40%">
            <Text mt="0px" mb="0">
              We love to see our product in your home
            </Text>
          </Div>
          <Div col="7" style={{ top: "15px" }}>
            <label htmlFor={`file-input${prod.id}`}>
              <span
                style={{
                  fontFamily: "regular",
                  backgroundColor: "#D4D4D4",
                  padding: "3px 5px",
                  border: "1px solid grey",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
              >
                Upload image
              </span>
            </label>
            <input
              type="file"
              id={`file-input${prod.id}`}
              style={{ display: "none" }}
              onChange={e => {
                this.uploadImageHandler(e, prod.id, prod);
              }}
            />
            {images[`${prod.id}-img`] &&
            images[`${prod.id}-img`].imgSizeError ? (
              <Text color="red" fontSize="12px">
                {images[`${prod.id}-img`].imgSizeErrorMessage}
              </Text>
            ) : (
              <Text color="grey" fontSize="10px" className="info-btn">
                {/* {formData[`${prod.id}`].imageErrorMessage} */}
                {"Image size sould be less than 5MB"}
              </Text>
            )}
          </Div>
        </Row>
        <Row alignItems="center" mt="20px">
          <Div col="5" pl="15px" pr="10px">
            <Text>Product Preview</Text>
          </Div>
          <Div col="7" pl="0" pr="15px">
            <div
              style={{
                width: "60px",
                margin: "auto",
                position: "relative"
              }}
            >
              {formData[`${prod.id}`] && formData[`${prod.id}`].image ? (
                <div>
                  <button
                    style={xBtn}
                    onClick={() => this.removeImage(prod.id, prod)}
                  >
                    X
                  </button>
                  <img
                    src={
                      this.state.images && this.state.images[`${prod.id}-img`]
                        ? this.state.images[`${prod.id}-img`].imagePreviewUrl
                        : null
                    }
                    alt=""
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "5px"
                    }}
                  />
                </div>
              ) : null}
            </div>
          </Div>
        </Row>
      </Div>
    ));
    return (
      <Div style={{ background: "#f0f0f0" }} p="15px" mb="10px">
        {renderProds}
        <Row alignItems="center" mb="20px">
          <Div col="5" pl="15px" pr="10px">
            <Text>Rate your Delivery Experience*</Text>
          </Div>
          <Div col="7" pl="0" pr="15px">
            <ReactStars
              count={5}
              onChange={val =>
                this.otheresRatingsChanged(val, "deliveryRating")
              }
              size={20}
              value={
                otheresFormData.deliveryRating
                  ? otheresFormData.deliveryRating
                  : 0
              }
              half={false}
              color2="#ffd700"
            />
            {otheresFormData.deliveryRatingError ? (
              <Text color="red" fontSize="12px">
                {otheresFormData.deliveryRatingErrorMessage}
              </Text>
            ) : null}
          </Div>
        </Row>
        <Row alignItems="center" mb="20px">
          <Div col="5" pl="15px" pr="10px">
            <Text>Delivery Review</Text>
          </Div>
          <Div col="7" pl="0" pr="15px">
            <textarea
              style={{
                padding: "4px",
                width: "100%",
                height: "50px",
                outline: "none",
                border: "1px solid grey",
                fontSize: "14px"
              }}
              type="text"
              onChange={e =>
                this.otheresRatingsChanged(e.target.value, "deliveryReview")
              }
            />
            {otheresFormData.deliveryReviewError ? (
              <Text color="red" fontSize="12px">
                {otheresFormData.deliveryReviewErrorMessage}
              </Text>
            ) : null}
          </Div>
        </Row>
        <Row alignItems="center" mb="20px">
          <Div col="5" pl="15px" pr="10px">
            <Text>Rate your Installation Experience*</Text>
          </Div>
          <Div col="7" pl="0" pr="15px">
            <ReactStars
              count={5}
              onChange={val =>
                this.otheresRatingsChanged(val, "installationRating")
              }
              size={20}
              value={
                otheresFormData.installationRating
                  ? otheresFormData.installationRating
                  : 0
              }
              half={false}
              color2="#ffd700"
            />
            {otheresFormData.installationRatingError ? (
              <Text color="red" fontSize="12px">
                {otheresFormData.installationRatingErrorMessage}
              </Text>
            ) : null}
          </Div>
        </Row>
        <Row alignItems="center" mb="20px">
          <Div col="5" pl="15px" pr="10px">
            <Text>Installation Review</Text>
          </Div>
          <Div col="7" pl="0" pr="15px">
            <textarea
              style={{
                padding: "4px",
                width: "100%",
                height: "50px",
                outline: "none",
                border: "1px solid grey",
                fontSize: "14px"
              }}
              type="text"
              onChange={e =>
                this.otheresRatingsChanged(e.target.value, "installationReview")
              }
            />
            {otheresFormData.installationReviewError ? (
              <Text color="red" fontSize="12px">
                {otheresFormData.installationReviewErrorMessage}
              </Text>
            ) : null}
          </Div>
        </Row>
        <Row alignItems="center" mb="20px">
          <Div col="5" pl="15px" pr="10px">
            <Text>Rate your Overall Experience*</Text>
          </Div>
          <Div col="7" pl="0" pr="15px">
            <ReactStars
              count={5}
              onChange={val => this.otheresRatingsChanged(val, "overallRating")}
              size={20}
              value={
                otheresFormData && otheresFormData.overallRating
                  ? otheresFormData.overallRating
                  : 0
              }
              half={false}
              color2="#ffd700"
            />
            {otheresFormData.overallRatingError ? (
              <Text color="red" fontSize="12px">
                {otheresFormData.overallRatingErrorMessage}
              </Text>
            ) : null}
          </Div>
        </Row>
        <Row alignItems="center" mb="20px">
          <Div col="5" pl="15px" pr="10px">
            <Text>Overall Review</Text>
          </Div>
          <Div col="7" pl="0" pr="15px">
            <textarea
              style={{
                padding: "4px",
                width: "100%",
                height: "50px",
                outline: "none",
                border: "1px solid grey",
                fontSize: "14px"
              }}
              type="text"
              onChange={e =>
                this.otheresRatingsChanged(e.target.value, "overallReview")
              }
            />
            {otheresFormData.overallReviewError ? (
              <Text color="red" fontSize="12px">
                {otheresFormData.overallReviewErrorMessage}
              </Text>
            ) : null}
          </Div>
        </Row>
      </Div>
    );
  };

  render() {
    const {
      customer,
      prodArr,
      feedback: {
        loading,
        formSubmit: formSubmited,
        error: pageLoadError,
        data
      }
    } = this.props;

    const { showMore, validFeedback } = this.state;

    console.log(this.state.formData, "formData");

    if (!pageLoadError && Object.keys(data).length) {
      return (
        <Container mt="30px">
          <Helmet title="Feedback" />
          <Div
            type="flex"
            col="9"
            m="auto"
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              float: "none"
            }}
          >
            <Div ta="center">
              <Img
                src={LogoIcon}
                alt="Hometown"
                height="60px"
                width="auto"
                m="auto"
              />
            </Div>
            {!formSubmited ? (
              <Div>
                <Div mt="20px" mb="20px" ta="center">
                  <Text ta="center">Dear {customer}</Text>
                  <Text ta="center">
                    Thank you for making us a part of your home. We hope we have
                    met your expectaions in every sense.
                    <br />
                    We would love to hear from you on your experience with us.
                  </Text>
                </Div>
                {this.renderProducts(prodArr)}
                {prodArr && prodArr.length > 2 ? (
                  <Div mt="20px" ta="center">
                    <Button
                      type="button"
                      style={{ background: "#000", color: "#FFF" }}
                      onClick={() => {
                        this.showMoreHandler();
                      }}
                    >
                      {!showMore ? "Show More" : "Show Less"}
                    </Button>
                  </Div>
                ) : null}
                <Div mt="20px">
                  <Div ta="center" mb="30px">
                    <Button
                      disabled={loading}
                      type="submit"
                      style={{ background: "#000", color: "#FFF" }}
                      onClick={e => this.handleSubmit(e)}
                    >
                      {loading ? "Please Wait ..." : "SUBMIT"}
                    </Button>

                    <Div mt="20px" ta="center">
                      {!validFeedback && (
                        <Text ta="center" fontSize="14px" color="red">
                          Please fill the form to submit your feedback
                        </Text>
                      )}
                    </Div>
                  </Div>
                </Div>
              </Div>
            ) : (
              <Div
                type="flex"
                style={{
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text ta="center" fontFamily="medium">
                  Thank you for your feedback
                </Text>
              </Div>
            )}

            <Div mb="10px">
              <Row ml="0" mr="0" justifyContent="center">
                <a
                  href="https://www.facebook.com/hometown.in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Img src={fbIcon} alt="" height="40px" ml="10px" mr="10px" />
                </a>
                <a
                  href="https://twitter.com/HomeTown_In/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Img src={twIcon} alt="" height="40px" ml="10px" mr="10px" />
                </a>
                <a
                  href="https://www.instagram.com/hometownindia/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Img
                    src={instaIcon}
                    alt=""
                    height="40px"
                    ml="10px"
                    mr="10px"
                  />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCBZGArWnKT6MYYwOsPCNjiw"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Img src={ytIcon} alt="" height="40px" ml="10px" mr="10px" />
                </a>
              </Row>
            </Div>
            <Div mb="20px">
              <Text ta="center" fontFamily="medium">
                If you have any questions or issues, Please contact
                <br />
                08069252525(10am - 8pm) | care@hometown.in | www.hometown.in
              </Text>
            </Div>
          </Div>
        </Container>
      );
    }
    return <NotFound />;
  }
}

FeedbackMailer.defaultProps = {
  customer: "",
  prodArr: [],
  orderDate: "",
  mobile: "",
  sapOrderNumber: ""
};

FeedbackMailer.propTypes = {
  customer: PropTypes.string,
  prodArr: PropTypes.array,
  orderDate: PropTypes.string,
  setFeedbackForm: PropTypes.func.isRequired,
  mobile: PropTypes.string,
  feedback: PropTypes.object.isRequired,
  sapOrderNumber: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackMailer);
