import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* ====== Components ====== */
import Box from "hometown-components/lib/Div";
import Image from "hometown-components/lib/Img";

class CategoryBlock extends React.Component {
  render() {
    const { src, title, to, index } = this.props;
    return (
      <Box key={index} style={{ width: "33%" }} height="100%" p="2px" mb="5px">
        <Link to={to}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end"
            }}
            height="100%"
            width={1}
          >
            <Image
              data-src={src}
              src={`${src}?blur=30`}
              alt={title}
              height="auto"
              width="95%"
            />
            {/* <Text fontSize={14} color="label">
          {title}
        </Text> */}
            <div
              style={{
                background: "#F2F2F2",
                padding: "4px 10px",
                width: "85%",
                marginTop: "-15px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "bolder",
                opacity: "90%"
              }}
            >
              {title}
            </div>
          </Box>
        </Link>
      </Box>
    );
  }
}
CategoryBlock.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};
export default CategoryBlock;
