import React from "react";
import Proptypes from "prop-types";
import TitleBar from "components/TitleBar";
import Container from "hometown-components/lib/Container";
import Div from "hometown-components/lib/Div";
import Row from "hometown-components/lib/Row";
import Heading from "hometown-components/lib/Heading";
import Text from "hometown-components/lib/Text";
import Img from "hometown-components/lib/Img";
import Section from "hometown-components/lib/Section";
import Helmet from "react-helmet";

const faqData = require("../../data/FAQ");

const styles = require("./StaticPages.scss");
const CloseIcon = require("../../../static/minus-round.svg");
const OpenIcon = require("../../../static/plus-round.svg");

const getFaqs = faqs => {
  let arr = [];
  faqs.map(item => {
    arr = [...arr, ...item.data];
  });
  const seoFaq = arr.map(faq => {
    const ques = Object.values(faq)[0];
    if (faq) {
      return {
        "@type": "Question",
        name: ques,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.ans
        }
      };
    }
    return "";
  });
  return JSON.stringify(seoFaq);
};

class FaqItem extends React.Component {
  state = {
    open: false
  };
  static propTypes = {
    faqContent: Proptypes.object.isRequired
  };
  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const { faqContent } = this.props;
    const { open } = this.state;
    return (
      <Div className={styles.collposeBlock} onClick={this.handleClick}>
        <Helmet>
          <script type="application/ld+json">
            {`
              {
                "@context" : "http://schema.org",
                "@type" : "FAQPage",
                "mainEntity": ${getFaqs(faqData)}
              }
            `}
          </script>
        </Helmet>
        <Heading
          fontFamily="regular"
          color="textDark"
          lh="1.5"
          ellipsis={false}
          fontSize="0.875rem"
          mb="0"
          className={styles.collopseHeading}
        >
          <button onClick={this.handleClick}>
            {open ? (
              <Img src={CloseIcon} alt="Close" float="left" mr="0.625rem" />
            ) : (
              <Img src={OpenIcon} alt="Open" float="left" mr="0.625rem" />
            )}
            {faqContent.que}
          </button>
          {open && (
            <Text
              color="rgba(0,0,0,0.5)"
              fontSize="0.875rem"
              mb="1rem"
              ml="2.125rem"
              dangerouslySetInnerHTML={{ __html: faqContent.ans }}
            />
          )}
        </Heading>
      </Div>
    );
  }
}
const FAQ = () => (
  <Section display="block" p="0" mb="0" height="auto">
    <TitleBar title="Frequently Asked Questions" />
    <Container type="container" pr="0.5rem" pl="0.5rem">
      <Div
        className={styles.staticPageWrapper}
        type="block"
        p="0 0.625rem 1rem"
      >
        {/* eslint-disable */}
        <Row ml="0" mr="0">
          {faqData.map((faqItem, index) => (
            <Div mb="1rem" key={String(index)}>
              <Heading fontFamily="700" fontSize="1rem" color="text">
                {faqItem.key}
              </Heading>
              {faqItem.data.map((faqContent, index) => (
                <FaqItem faqContent={faqContent} key={String(index)} />
              ))}
            </Div>
          ))}
        </Row>
      </Div>
    </Container>
  </Section>
);

export default FAQ;
