import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
// import { Label } from 'hometown-components/lib/Label';
import Heading from 'hometown-components/lib/Heading';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import { getImageURL } from 'utils/helper';

const statusIcon = require('../../../static/status-pending.svg');
const statusActiveIcon = require('../../../static/status-active.svg');

class TrackingDetails extends Component {
  render() {
    const stylesModal = require('./index.scss');
    const styles = require('./MyOrder.scss');
    const { data, error } = this.props;
    return (
      <div className={stylesModal.trackingModal}>
        <Row type="block" m="0" mb="1rem" className={styles.blockHeading}>
          <Div col="6" pt="5px">
            <Heading fontSize="1.25rem" color="textLight" mb="0px" mt="0px" fontFamily="light">
              {error ? 'Error' : 'Order Tracking'}
            </Heading>
          </Div>
        </Row>
        <Div p="25px 25px 13px">
          {error ? (
            <span style={{ color: 'red', padding: '10px' }}>{error}</span>
          ) : (
            data.map((item, index) => {
              const {
                image,
                product_name: name,
                status,
                bill_of_landing: AWB,
                transport_id: transportId,
                quantity
              } = item;
              return (
                <Row className={stylesModal.blockWrapper} type="block" ml="0" mr="0" mb="1.5rem" key={String(index)}>
                  {transportId && (
                    <Div col="12">
                      <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                        {`Delivery Partner - ${transportId || '--'}`}
                      </Text>
                    </Div>
                  )}
                  {AWB && (
                    <Div col="12">
                      <Text mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                        {`AWB Number - ${AWB || '--'}`}
                      </Text>
                    </Div>
                  )}
                  <Div col="4">
                    <ImageShimmer src={getImageURL(image, 'catalog_360')} height="auto">
                      {imageURL => <Img src={imageURL} alt="" />}
                    </ImageShimmer>
                  </Div>
                  <Div col="8" pl="10px" pr="10px">
                    <Text fontSize="12px" mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                      {name}
                    </Text>
                    <Text fontSize="12px" mt="0" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                      {`Qty-${quantity}`}
                    </Text>
                  </Div>
                  <Div col="12">
                    <Row ml="0" mr="0" flexWrap="wrap" className={stylesModal.timeline}>
                      {status.map((statusDetails, i) => {
                        const { status: StatusKey, display: active } = statusDetails;
                        return (
                          <Div
                            key={String(i)}
                            className={`${stylesModal.trackBlock} ${active === 1 ? stylesModal.active : ''}`}
                            mb="20px"
                          >
                            <Div className={stylesModal.round}>
                              <Img width="16px" height="16px" src={active === 1 ? statusActiveIcon : statusIcon} />
                            </Div>
                            <Text className={stylesModal.stepText} fontSize="12px">
                              {StatusKey || 'NA'}
                            </Text>
                            <Div className={stylesModal.line} />
                          </Div>
                        );
                      })}
                    </Row>
                  </Div>
                </Row>
              );
            })
          )}
          {/* <Div>
            <Label fontSize="14px" lh="1.5" mt="0" mr="5px">
              <b>Note :</b>
            </Label>
            <Label fontSize="12px" lh="1.5" mt="0">
              During the national lockdown the material movements were affected and the product delivery shall be
              delayed. We are working on the stock movements and resuming the services. We deeply regret the
              inconvenience caused.
            </Label>
          </Div> */}
        </Div>
      </div>
    );
  }
}

TrackingDetails.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired
};
export default TrackingDetails;
