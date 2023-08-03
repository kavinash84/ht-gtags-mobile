import React from "react";
import { BASE_IMAGE_URL } from 'helpers/Constants';

const LandingPageLogo = () => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div>
      <a href="https://www.hometown.in" target="_blank">
        <img className="img-fluid" src={`${BASE_IMAGE_URL}/media/cms/hometownnew/HT-Logo-210.png?width=210`} alt="" />
      </a>
    </div>
  </div>
);

export default LandingPageLogo;
