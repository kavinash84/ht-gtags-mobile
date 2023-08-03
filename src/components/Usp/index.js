import React from 'react';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/HeadingH6';
import Img from 'hometown-components/lib/Img';

const styles = require('./Usp.scss');
const usp1Icon = require('../../../static/usp-1.png');
const usp2Icon = require('../../../static/usp-2.png');
const usp3Icon = require('../../../static/usp-3.png');
const usp4Icon = require('../../../static/usp-4.png');
const usp5Icon = require('../../../static/usp-5.png');
const usp6Icon = require('../../../static/usp-6.png');

const Usp = () => (
  <Section p="0.5rem 0.625rem" mt="0" mb="0.3125rem">
    <Row className={styles.uspWrapper} m="0">
      <Div col="4" ta="center" className={styles.uspImg}>
        <Img src={usp1Icon} height="22px" width="auto" m="auto" mb="5px" alt="Free Delivery" va="bottom" />
        <Heading color="uspTitle" fontSize="0.5625rem" lh="1.5" mb="0" tt="uppercase" ta="center" mt="0">
          Free Delivery <br />
          Above Rs.499
        </Heading>
      </Div>
      <Div col="4" ta="center" className={styles.uspImg}>
        <Img src={usp2Icon} height="22px" width="auto" m="auto" mb="5px" alt="Assured Quality" va="bottom" />
        <Heading color="uspTitle" fontSize="0.5625rem" lh="1.5" mb="0" tt="uppercase" ta="center" mt="0">
          Assured <br />
          Quality
        </Heading>
      </Div>
      <Div col="4" ta="center" className={styles.uspImg}>
        <Img src={usp3Icon} height="22px" width="auto" m="auto" mb="5px" alt="Easy Finance" va="bottom" />
        <Heading color="uspTitle" fontSize="0.5625rem" lh="1.5" mb="0" tt="uppercase" ta="center" mt="0">
          Easy <br />
          Finance
        </Heading>
      </Div>
      <Div col="4" ta="center" className={styles.uspImg}>
        <Img src={usp4Icon} height="22px" width="auto" m="auto" mb="5px" alt="1 Year Warranty*" va="bottom" />
        <Heading color="uspTitle" fontSize="0.5625rem" lh="1.5" mb="0" tt="uppercase" ta="center" mt="0">
          1 Year <br />
          Warranty*
        </Heading>
      </Div>
      <Div col="4" ta="center" className={styles.uspImg}>
        <Img src={usp5Icon} height="22px" width="auto" m="auto" mb="5px" alt="Free Assembly" va="bottom" />
        <Heading color="uspTitle" fontSize="0.5625rem" lh="1.5" mb="0" tt="uppercase" ta="center" mt="0">
          Free Assembly <br />
          within 48 Hours
        </Heading>
      </Div>
      <Div col="4" ta="center" className={styles.uspImg}>
        <Img src={usp6Icon} height="22px" width="auto" m="auto" mb="5px" alt="Free Service Support" va="bottom" />
        <Heading color="uspTitle" fontSize="0.5625rem" lh="1.5" mb="0" tt="uppercase" ta="center" mt="0">
          Lifetime <br />
          Service
        </Heading>
      </Div>
    </Row>
  </Section>
);

export default Usp;
