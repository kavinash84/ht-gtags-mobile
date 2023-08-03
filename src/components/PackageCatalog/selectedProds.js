import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Div from "hometown-components/lib/Div";
import {
  selectSkuForPlp,
  setPdpFromCart,
  setPdpIndex,
  togglePLPModal,
  toggleProdModal
} from "../../redux/modules/lackpackages";
import { Link } from "react-router-dom";

const styles = require("./index.scss");

@connect(({ userLogin, lackpackages }) => ({
  openProdModal: lackpackages.openProdModal,
  packageCatalog: lackpackages.package_catalog,
  packageId: lackpackages.sudoCart
}))
export default class SelectedItems extends Component {
  state = {};

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleProdModal = data => {
    const { dispatch } = this.context.store;
    const { openProdModal } = this.props;
    dispatch(setPdpIndex(data));
    dispatch(toggleProdModal(!openProdModal));
  };

  render() {
    const { isSudoCart, cat, index, packageCatalog, packageId } = this.props;
    return (
      <Div
        p="0"
        m="0"
        style={{
          background: "#FFF8F4",
          padding: isSudoCart ? "25px 0px 25px 0px" : "25px 0px 25px 25px",
          marginBottom: isSudoCart
            ? "70px"
            : index + 1 === packageCatalog.categories.length
            ? "120px"
            : "0px"
        }}
      >
        <div>
          {!isSudoCart && (
            <div
              style={{
                padding: "10px 30px 10px 0px"
              }}
            >
              <div
                style={{
                  color: "#323131",
                  fontSize: "19px",
                  fontWeight: 600,
                  marginBottom: "10px"
                }}
              >
                {index + 1}. {cat.title}
              </div>
            </div>
          )}

          <div style={{ background: "#FFF8F4" }}>
            {cat.products.map((item, i) => {
              if (isSudoCart) {
                return (
                  <div className={styles.seletedProduct_container}>
                    {isSudoCart && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          background: "#D2D2D2",
                          padding: "5px",
                          borderTopRightRadius: "7px",
                          borderBottomLeftRadius: "7px",
                          fontSize: "12px",
                          color: "#222222"
                        }}
                      >
                        {i + 1}
                      </div>
                    )}
                    <div className={styles.selected_prod_img}>
                      <img src={item.image} alt="product image" />
                    </div>
                    <div className={styles.selected_prod_details}>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#323131",
                          fontWeight: 600
                        }}
                        className={styles.prodTitle}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#999999",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <span>By Hometown</span>
                        <span>Qty: {item.qty}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <button
                          onClick={() => {
                            const { dispatch } = this.context.store;
                            dispatch(selectSkuForPlp(item.simpleSku));
                            dispatch(togglePLPModal(true));
                          }}
                        >
                          <Link
                            to={`/package-catalog/${packageId}`}
                            style={{ color: "white" }}
                          >
                            Replace
                          </Link>
                        </button>
                        <span
                          style={{ color: "#E9916B", fontSize: "11px" }}
                          onClick={() => {
                            const { dispatch } = this.context.store;
                            const { openProdModal } = this.props;
                            dispatch(toggleProdModal(!openProdModal));
                            dispatch(setPdpFromCart(item.simpleSku));
                          }}
                        >
                          More Info {`>`}
                        </span>
                      </div>
                    </div>
                    {!item.is_deliverable ? (
                      <div
                        style={{ position: "absolute", bottom: 0, right: 0 }}
                      >
                        Not Deliverable
                      </div>
                    ) : null}
                  </div>
                );
              } else {
                return (
                  <React.Fragment>
                    {item.isSelected ? (
                      <div className={styles.seletedProduct_container}>
                        {isSudoCart && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              background: "#D2D2D2",
                              padding: "5px",
                              borderTopRightRadius: "7px",
                              borderBottomLeftRadius: "7px",
                              fontSize: "12px",
                              color: "#222222"
                            }}
                          >
                            {i + 1}
                          </div>
                        )}
                        <div className={styles.selected_prod_img}>
                          <img
                            src={`${item.image}-catalog_360.jpg`}
                            alt="product image"
                          />
                        </div>
                        <div className={styles.selected_prod_details}>
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#323131",
                              fontWeight: 600
                            }}
                            className={styles.prodTitle}
                          >
                            {item.meta.name}
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#999999",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center"
                            }}
                          >
                            <span>By Hometown</span>
                            <span>Qty: {item.qty}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center"
                            }}
                          >
                            <button
                              onClick={() => this.props.handlePlpModal(index)}
                            >
                              Replace
                            </button>
                            <span
                              style={{ color: "#E9916B", fontSize: "11px" }}
                              onClick={() => {
                                if (!isSudoCart)
                                  this.handleProdModal({
                                    catIndex: index,
                                    prodIndex: i
                                  });
                              }}
                            >
                              More Info {`>`}
                            </span>
                          </div>
                        </div>
                        {!item.isDeliverable ? (
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              right: 0
                            }}
                          >
                            Not Deliverable
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </React.Fragment>
                );
              }
            })}
          </div>
        </div>
      </Div>
    );
  }
}
