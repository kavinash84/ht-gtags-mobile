import React from 'react';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Menu from 'components/OtherMenu';

const ProductNotFoundIcon = require('../../../static/product-empty.png');

const ProductNotFoundContainer = () => (
  <div>
    <Menu filter search />
    <Div type="block">
      <Section display="flex" p="0" mb="0" bg="sectionBgDark" boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)">
        <Empty
          title="Product not found !"
          subTitle="Add products to it"
          btnName="Continue Shopping"
          url="/"
          bg="#fafafa"
        >
          <Img src={ProductNotFoundIcon} width="initial" m="auto" alt="Product not found !" />
        </Empty>
      </Section>
    </Div>
  </div>
);

export default ProductNotFoundContainer;
