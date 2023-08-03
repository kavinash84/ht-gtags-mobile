import React from 'react';
import { provideHooks } from 'redial';
import { loadMyAddress } from 'redux/modules/myaddress';
import MyAddressContainer from 'components/MyAddress';
import Menu from 'components/OtherMenu';
import Footer from 'components/Footer';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadMyAddress()).catch(error => console.log(error));
  }
};
const MyAddress = () => (
  <div>
    <Menu />
    <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem" pb="0.3125rem">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Heading fontSize="1.125rem" color="textDark" mb="0px" mt="0px" fontFamily="light">
            My Address
          </Heading>
        </Row>
      </Container>
    </Section>
    <MyAddressContainer />
    <Footer />
  </div>
);

export default provideHooks(hooks)(MyAddress);
