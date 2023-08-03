import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "hometown-components/lib/Section";
import PropTypes from "prop-types";
import Text from "hometown-components/lib/Text";
import Span from "hometown-components/lib/Span";
import { calculateLowestEmi } from "utils/helper";
import EmiModal from "containers/EmiModal/EmiModal";
import { EMI_THRESHOLD } from "helpers/Constants";
import ProductDesc from "hometown-components/lib/ProductDetails/ProductDesc";
import { formatAmount } from "utils/formatters";
import Specs from "hometown-components/lib/ProductDetails/Specs";
import Stripes from "../ProductDetails/PdpStripe";
import MainFurnitureSlider from "../furnitureCategories/mainSlider";

const styles = require("./index.scss");
const ArrowDown = require("../../../static/onelacPackage/arrowDown.svg");

const formatPrice = price => {
  let newPrice = 0;
  if (price.length > 3 && price !== null) {
    newPrice = Number(price.replace(",", ""));
    return newPrice;
  }
  return Number(price);
};

@connect(({ userLogin, lackpackages, paymentoptions, pincode }) => ({
  openProdModal: lackpackages.openProdModal,
  pdpFromCart: lackpackages.pdpFromCart,
  packageCatalog: lackpackages.package_catalog,
  pdpIndexes: lackpackages.pdpIndexes,
  loading: lackpackages.loading,
  bflMinAmount: paymentoptions.bflMinAmount,
  emidata: { emi: [], noCostEmi: [] },
  pincode
}))
export default class PackagePDP extends Component {
  state = { showmore: true, prodDetail: true };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  toggleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
  };

  getProduct = () => {
    const { packageCatalog, pdpFromCart } = this.props;
    let found = "";
    packageCatalog.categories.map(cat => {
      cat.products.map(prod => {
        if (Object.keys(prod.simples)[0] === pdpFromCart) {
          found = prod;
        }
      });
    });
    return found;
  };

  render() {
    if (this.props.loading) {
      return <div className={styles.package_pdp_container}>Loading...</div>;
    }
    const {
      packageCatalog,
      pdpIndexes,
      bflMinAmount,
      emidata,
      pincode,
      pdpFromCart
    } = this.props;
    let product = "";
    if (packageCatalog.categories && !pdpFromCart) {
      product =
        packageCatalog.categories[pdpIndexes.catIndex].products[
          pdpIndexes.prodIndex
        ];
    }
    if (pdpFromCart) {
      product = this.getProduct();
    }
    const {
      images,
      pricing_details: pricingDetails,
      delivery_details: deliveryDetails,
      meta,
      free_visit: freeVisit = "no",
      free_installation: freeInstallation = "no",
      grouped_attributes: groupedAttributes,
      attributes
    } = product;
    const {
      mrp,
      special_price: csp,
      total_discount_percentage: totalDiscountPercentage,
      total_savings: totalSavings
    } = pricingDetails;
    const {
      name,
      brand,
      price,
      special_price: specialPrice,
      warranty_period: warrantyPeriod = 0,
      fk_catalog_supplier: fkCatalogSupplier = null,
      categories
    } = meta;
    const { description } = attributes;
    const checkSpecialPrice = Number(specialPrice) || Number(price);
    const isEmiAvailable = Number(checkSpecialPrice) >= EMI_THRESHOLD;
    const isFurniture = categories.split("|").includes("131");
    const carosalData = images.map(item => {
      return {
        image: `${item.url}-catalog_360.jpg`,
        m_image: `${item.url}-catalog_360.jpg`
      };
    });
    return (
      <div className={styles.package_pdp_container}>
        {packageCatalog.categories && (
          <React.Fragment>
            <div style={{ padding: "25px 40px 20px 30px" }}>
              <h3 className={styles.prod_title}>{name}</h3>
              <div style={{ fontWeight: 600 }}>By {brand}</div>
            </div>
            <div style={{ height: "75vh", overflow: "auto" }}>
              <Section p="0" m="0">
                <MainFurnitureSlider data={carosalData} mb="0" />
              </Section>
              <Section p="10px 20px" mb="0">
                {formatPrice(csp) < formatPrice(mrp) ? (
                  <Text
                    mt="0px"
                    color="#E9916B"
                    fontSize="1rem"
                    className={styles.price}
                  >
                    {formatPrice(csp) !== 0 ? `₹${csp}` : `₹${mrp}`}
                    <Span>
                      {formatPrice(csp) !== 0 ? (
                        <Text
                          ml="10px"
                          fontSize="12px"
                          color="#999999"
                          className={styles.pricecut}
                        >
                          ₹{mrp}{" "}
                          <Text
                            // mt="0px"
                            color="#999999"
                            fontSize="12px"
                            pl="5px"
                            className={styles.pricecut}
                            style={{ textDecoration: "none" }}
                          >
                            <del>MRP</del> (Inclusive of all taxes)
                          </Text>
                        </Text>
                      ) : (
                        <Text
                          // mt="0px"
                          color="#999999"
                          fontSize="12px"
                          pl="5px"
                          className={styles.pricecut}
                          style={{ textDecoration: "none" }}
                        >
                          MRP (Inclusive of all taxes)
                        </Text>
                      )}
                    </Span>
                  </Text>
                ) : (
                  <Text
                    color="#E9916B"
                    fontSize="1rem"
                    className={styles.price}
                  >
                    ₹{mrp}{" "}
                    <Text
                      // mt="0px"
                      color="#999999"
                      fontSize="12px"
                      pl="5px"
                      className={styles.pricecut}
                      style={{ textDecoration: "none" }}
                    >
                      MRP (Inclusive of all taxes)
                    </Text>
                  </Text>
                )}
                {totalSavings !== "0" ? (
                  <Text mt="0px" color="#626463" fontSize="12px">
                    Total Savings ₹ {totalSavings} ({totalDiscountPercentage}%
                    OFF)
                  </Text>
                ) : null}
                <div
                  style={{
                    color: "#666666",
                    fontWeight: 600,
                    fontSize: "14px",
                    padding: "5px 0px 20px"
                  }}
                >
                  {(deliveryDetails &&
                    deliveryDetails[0] &&
                    deliveryDetails[0].value) ||
                    ""}
                </div>
                <Stripes
                  emi={formatAmount(calculateLowestEmi(emidata, price))}
                  isEmiAvailable={false}
                  warrantyPeriod={warrantyPeriod}
                  fkCatalogSupplier={fkCatalogSupplier}
                  brand={brand}
                  freeVisit={freeVisit}
                  freeInstallation={freeInstallation}
                  isFurniture={isFurniture}
                >
                  <EmiModal
                    price={formatAmount(checkSpecialPrice)}
                    data={emidata}
                    key="emi"
                    specialPrice={checkSpecialPrice}
                    bflMinAmount={bflMinAmount}
                  />
                </Stripes>
              </Section>
              <Section p="0px" mb="0" className={styles.custom_spec}>
                <div
                  style={{
                    color: "#1d1d1d",
                    background: "rgb(249, 249, 249)",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "15px 20px",
                    borderBottom: "1px solid #a6a5a5",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                  onClick={this.toggleShowMore}
                >
                  <span>Product Details</span>
                  <img src={ArrowDown} alt="Arrow Down" />
                </div>
                <div>
                  {description && this.state.showmore && (
                    <ProductDesc
                      desc={description || ""}
                      details={groupedAttributes[0].Details}
                      showmore={true}
                      toggleShowMore={() => {}}
                    />
                  )}
                </div>
                <Specs
                  specs={groupedAttributes}
                  prodDetail={this.state.prodDetail}
                  pincode={pincode}
                />
              </Section>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
