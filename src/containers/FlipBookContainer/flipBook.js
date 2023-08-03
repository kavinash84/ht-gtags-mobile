import React from "react";
import Helmet from "react-helmet";
import FlipBook from "../../components/flipBook";

const FlipBookContainer = () => {
  return (
    <div style={{ marginTop: "12vh" }}>
      <Helmet title="Checkout Festive Home Decor & Furniture Catalog Online | HomeTown">
        <meta
          name="description"
          content="Checkout HomeTown's festive home décor & furniture catalog online with all latest designs. Buy ⭐Furniture ⭐Home Decor Items ⭐Tableware & Kitchenware Items online at 60% - 70% 0FF.
        ✔Warranty ✔Easy Returns ✔Low Cost EMI"
        />
      </Helmet>
      <FlipBook />
    </div>
  );
};

export default FlipBookContainer;
