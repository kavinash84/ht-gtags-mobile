import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components/lib/Div';
import Image from 'hometown-components/lib/Img';

import './Offer.css';

export default class OfferItems extends React.Component {
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem('HiscrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem('HiscrollPosition');
      }, 2000);
    }
  };
  render() { 
    const {image, title, url_key} = this.props;
    if (url_key) {
      return (
        <Box variant="section.catSliderItem" height="auto">
          <Link to={url_key}
          onClick={() => {
                sessionStorage.setItem('HiscrollPosition', window.pageYOffset);
              }}>
            {image ? (
              <div style={{ position: 'relative' }}>
                <Image data-src={image} src={`${image}?blur=30`} alt={title} height="auto" width="90%" />
              </div>
            ) : null}          
          </Link>
        </Box>
      );
    }
    return (
      <Box variant="section.catSliderItem" sx={{ position: 'relative' }}>
        {image ? (
          <div style={{ position: 'relative' }}>
            <Image data-src={image} src={`${image}?blur=30`} alt={title} height="160px" />
          </div>
        ) : null}
      </Box>
    );
  };
  }



// const OfferItems = ({ image, title, url_key}) => {
//   if (url_key) {
//     return (
//       <Box variant="section.catSliderItem" height="auto">
//         <Link to={url_key}>
//           {image ? (
//             <div style={{ position: 'relative' }}>
//               <Image src={image} alt={title} height="auto" width="90%" />
//             </div>
//           ) : null}          
//         </Link>
//       </Box>
//     );
//   }
//   return (
//     <Box variant="section.catSliderItem" sx={{ position: 'relative' }}>
//       {image ? (
//         <div style={{ position: 'relative' }}>
//           <Image src={image} alt={title} height="160px" />
//         </div>
//       ) : null}
//     </Box>
//   );
// };

OfferItems.defaultProps = {
  image: '',
  url_key:'',
  title:''
};

OfferItems.propTypes = {
  image: PropTypes.string,
  url_key: PropTypes.string,
  title: PropTypes.string,
};

