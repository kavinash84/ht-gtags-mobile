import React from "react";
import BulkOrderContainer from "components/BulkOrder";
import OtherMenuFooter from "containers/OtherMenuFooter";

export default () => (
  <div className="wrapper">
    <OtherMenuFooter
      backBtn
      menuIcon={false}
      Footer
      pageTitle="Buy Corporate Gifting Homeware Products Online | HomeTown"
      seoDescription="Buy exclusive collection of corporate gifting items like ⭐Home Decor ⭐Furniture ⭐Tableware ⭐Kitchenware ⭐Electronics. Explore best corporate gift hampers online at HomeTown. 
    ✔Assured Quality ✔Flexible Order Size"
    >
      <BulkOrderContainer />
    </OtherMenuFooter>
  </div>
);
