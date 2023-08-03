import React from "react";

/* ====== Components ====== */
import Row from "hometown-components/lib/Row";
import Box from "hometown-components/lib/Div";
import Heading from "hometown-components/lib/Heading";

/* ====== Page Components ====== */
import CategoryBlock from "./CategoryBlock";

const ShopByCategories = ({ shopByCategories }) => (
  <Box
    p="16px 20px"
    mt="40px"
    pb="10px"
    style={{ float: "none", display: "block" }}
  >
    <Row justifyContent="center" mx={0} mb={0}>
      <Heading
        fontFamily="medium"
        style={{ textAlign: "center", color: "#323131" }}
        fontSize="22px"
        mt="0px"
        mb="10px"
      >
        {shopByCategories.mainTitle}
      </Heading>
    </Row>
    <div
      style={{ width: "30px", borderTop: "2px solid #222222", margin: "auto" }}
    />
    <Row justifyContent="center" style={{ width: "100%", margin: "auto" }}>
      {shopByCategories.categories.map((val, index) => (
        <CategoryBlock
          to={val.url_key}
          src={val.image}
          title={val.title}
          index={index}
        />
      ))}
    </Row>
  </Box>
);

export default ShopByCategories;
