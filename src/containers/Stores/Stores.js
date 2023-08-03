import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import OtherMenuFooter from 'containers/OtherMenuFooter';
import StoreDetails from 'components/Stores/StoreDetails';

const getStoreInfo = (data, props) =>
  data.filter(store => store.meta.url.split('/')[3] === props.match.params.storeName);

@connect(({ stores: { data } }, props) => ({
  stores: getStoreInfo((data && data.items && data.items.text) || [], props)
}))
class Stores extends Component {
  render() {
    const [storeInfo] = this.props.stores;
    const { meta: { title, description, keyword } } = storeInfo;
    return (
      <OtherMenuFooter pageTitle={title}>
        <Helmet>
          <meta name="keywords" content={keyword} />
          <meta name="description" content={description} />
        </Helmet>
        <StoreDetails store={storeInfo} />
      </OtherMenuFooter>
    );
  }
}

Stores.propTypes = {
  stores: PropTypes.object
};

Stores.defaultProps = {
  stores: {}
};

export default Stores;
