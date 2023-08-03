import React from 'react';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';

import HeaderLogo from '../../../static/htexclusive/HeaderLogo.svg';

export default function Logo() {
  return (
    <Div>
      <Row justifyContent="center" pt="10px" pb="10px">
        <Img src={HeaderLogo} alt="ht-exclusive-logo" />
      </Row>
    </Div>
  );
}
