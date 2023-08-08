import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* ====== Components ====== */
import Box from 'hometown-components/lib/Div';
// import Flex from 'hometown-components/lib/Flex';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';

class CategoryBlock extends React.Component {
  render() {
    const { src, title, to, index } = this.props;
    return (
      <Box key={index} style={{ width: '30%', margin: '20px 5px 5px 5px' }}>
        <Link
          to={to}
          onClick={() => {
            sessionStorage.setItem('ShopByCatscrollPosition', window.pageYOffset);
            window.dataLayer.push({
              event: 'pt_global_click_link_banner_click',
              pagetype: '',
              source_page_url: window.location.href,
              previous_page_url: '',
              destination_page_url: to||"",
              login_status: '',
              user_id: '',
              page_url: window.location.href,
              banner_id: '',
              click_text: title
            });
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: '100%'
            }}
            height={96}
            width={1}
            py={0}
          >
            <Image data-src={src} src={`${src}?blur=30`} alt={title} m={5} width="90px" height="80px" style={{ zIndex: 10, height: '80px' }} />
            <Box
              mt="-58px"
              style={{
                backgroundColor: '#F2F2F2',
                padding: '30px 44px',
                borderRadius: '5px'
              }}
            />
          </Box>
          <Text fontSize="12px" color="label" mt="10px" ta="center" mb="0px">
            {title}
          </Text>
        </Link>
      </Box>
    );
  }
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem('ShopByCatscrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function () {
        sessionStorage.removeItem('ShopByCatscrollPosition');
      }, 2000);
    }
  };
}
CategoryBlock.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};
export default CategoryBlock;
