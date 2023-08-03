import React from "react";

/* ====== Components ====== */
import Row from "hometown-components/lib/Row";
import Box from "hometown-components/lib/Div";
import Heading from "hometown-components/lib/Heading";

/* ====== Page Components ====== */
import CategoryBlock from "./CategoryBlock";

const ShopByCategories = ({ styleYourHome }) => (
  <Box pl="20px" pr="20px" pt="10px" mt="30px" pb="20px">
    <Row justifyContent="center" mx={0}>
      <Heading
        fontFamily="medium"
        style={{ textAlign: "center", color: "#323131" }}
        fontSize="22px"
        mt="0px"
        mb="10px"
      >
        {styleYourHome.mainTitle}
      </Heading>
    </Row>
    <div
      style={{
        width: "30px",
        borderTop: "2px solid #222222",
        margin: "auto",
        marginBottom: "10px"
      }}
    />
    <Row justifyContent="center" ml="-5px" mr="-5px" mt="25px">
      {styleYourHome.data.map((val, index) => (
        <CategoryBlock
          src={val.image}
          to={val.url_key}
          title={val.title}
          index={index}
        />
      ))}
    </Row>
  </Box>
);

export default ShopByCategories;
