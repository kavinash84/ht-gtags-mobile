import React from 'react';
import Loadable from 'react-loadable';
import LoadMoreFilters from 'hometown-components/lib/LoadMore';
import Section from 'hometown-components/lib/Section';

const CustomLoader = () => (
  <Section height="100vh" p="0" mb="0">
    <LoadMoreFilters />
  </Section>
);

export default function HomeTownLoader(opts) {
  return Loadable(Object.assign(
    {
      loading: CustomLoader,
      delay: 200,
      timeout: 10
    },
    opts
  ));
}
