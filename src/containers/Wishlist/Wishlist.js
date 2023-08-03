import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Empty from "hometown-components/lib/Empty";
import Img from "hometown-components/lib/Img";
import Section from "hometown-components/lib/Section";
import Wishlist from "components/Wishlist";
import Menu from "components/OtherMenu";
import { getSKUList } from "../../selectors/wishlist";
import { BASE_IMAGE_URL } from "helpers/Constants";

@connect(({ wishlist }) => ({
  wishlist,
  wishListedSKUs: getSKUList(wishlist),
  loadingList: wishlist.loadingList
}))
export default class WishlistContainer extends Component {
  static propTypes = {
    wishlist: PropTypes.object,
    wishListedSKUs: PropTypes.array.isRequired
  };
  static defaultProps = {
    wishlist: {}
  };
  render() {
    const {
      wishlist: { data },
      wishListedSKUs
    } = this.props;
    return (
      <div>
        <Menu />
        {data && data.length ? (
          <Wishlist list={data} wishList={wishListedSKUs} />
        ) : (
          <Section
            display="flex"
            p="0"
            mb="0"
            mt="0.5rem"
            bg="sectionBgDark"
            boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
          >
            <Empty
              title="No items yet !!"
              subTitle="Add items to it"
              btnName="Continue Shopping"
              url="/"
              bg="#fafafa"
              height="calc(100vh - 55px)"
            >
              <Img
                src={`${BASE_IMAGE_URL}/media/cms/extras/wishlist-empty.png`}
                width="initial"
                m="auto"
                alt="No items yet !!"
              />
            </Empty>
          </Section>
        )}
      </div>
    );
  }
}
