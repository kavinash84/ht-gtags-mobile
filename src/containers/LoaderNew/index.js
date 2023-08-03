import React from 'react';
import LoadMoreFilters from 'hometown-components/lib/LoadMore';
import Section from 'hometown-components/lib/Section';

const CustomLoader = () => (
  <Section height="100vh" p="0" mb="0">
    <LoadMoreFilters />
  </Section>
);

export default CustomLoader;
