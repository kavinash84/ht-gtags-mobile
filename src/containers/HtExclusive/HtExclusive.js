import React from 'react';
import Container from 'hometown-components/lib/Container';

import Footer from 'components/Footer';
import Menu from 'components/OtherMenu';
import Logo from 'components/HtExclusive/Logo';
import Template1 from 'components/HtExclusive/HtExclusiveTemplate1';
import Template2 from 'components/HtExclusive/HtExclusiveTemplate2';
import Template3 from 'components/HtExclusive/HtExclusiveTemplate3';
import Template4 from 'components/HtExclusive/HtExclusiveTemplate4';
import Template5 from 'components/HtExclusive/HtExclusiveTemplate5';

import htExclusiveData from '../../data/ht-exclusive';

function HtExclusive() {
  const {
    section1,
    section2,
    section3,
    section4,
    section5,
    section6,
    section7,
    section8,
    section9,
    section10,
    section11
  } = htExclusiveData;

  return (
    <div>
      <Menu />
      <Logo />
      <Template1 data={section1} />
      <Template2 data={section2} />
      <Template2 data={section3} />
      <Template2 data={section4} />
      <Template1 data={section5} />
      <Template3 data={section6} />
      <Template3 data={section7} />
      <Template3 data={section8} />
      {/* <Template4 data={section9} />
      <Template4 data={section10} /> */}
      <Template5 data={section11} />
      <Footer />
    </div>
  );
}

export default HtExclusive;
