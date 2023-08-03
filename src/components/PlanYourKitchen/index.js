import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MK_URL } from 'helpers/Constants';
import MainSlider from 'components/MainSlider';
import Footer from 'components/Footer';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Theme from 'hometown-components/lib/Theme';
import Button from 'hometown-components/lib/Buttons';
import ResponsiveModal from 'components/Modal';
import Img from 'hometown-components/lib/Img';
import SlickSlider from '../SlickSlider';
import Header from 'components/ModularKitchenMicro/Header';
import Box from 'hometown-components/lib/Div';
import { sendData, getData } from "redux/modules/services";

import ModularKitchenFormModal from '../ModularKitchenMicro/ModularKitchenFormModal';
import '../ModularKitchenMicro/Slider.css';

const rectangle = require('../../../static/mkNew/Rectangle.png');
const style = require('./PlanYourKitchen.scss');

const newSettings = {
  autoplay: false,
  arrows: false
};

const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 1.2 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

@connect(({ services, modularkitchen, userLogin, profile }) => ({
  planyourkitchen: modularkitchen.data.items.text.planYourKitchen,
  duracucine: modularkitchen.data.items.text.duracucine,
  stepOne: modularkitchen.data.items.text.stepOne,
  stepTwo: modularkitchen.data.items.text.stepTwo,
  stepThree: modularkitchen.data.items.text.stepThree,
  stepFour: modularkitchen.data.items.text.stepFour,
  stepFive: modularkitchen.data.items.text.stepFive,
  stepSix: modularkitchen.data.items.text.stepSix,
  stepSeven: modularkitchen.data.items.text.stepSeven,
  stepEight: modularkitchen.data.items.text.stepEight,
  beginJourney: modularkitchen.data.items.text.beginJourney,
  modularkitchen,
  isLoggedIn: userLogin.isLoggedIn,
  fullName: profile.data ? profile.data.full_name : undefined,
  ...services.modularkitchen
}),
{ sendFormData: sendData, loadPincodeDetails: getData }
)
export default class PlanYourKitchen extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    if (data && data.items) {
      const {
        items: {
          text: { sections }
        }
      } = data;
      sections.map(item => {
        this[item.name] = React.createRef();
        return null;
      });
    }
  }
  state = {
    openModal: false
  };
  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };
  render() {
    const styles = require('./PlanYourKitchen.scss');
    const correctIcon = require("../../../static/correct.svg");
    const { data } = this.props;
    const {
      planyourkitchen,
      duracucine,
      stepOne,
      modularkitchen,
      stepTwo,
      stepThree,
      stepFour,
      stepFive,
      stepSix,
      stepSeven,
      stepEight,
      beginJourney,
      fullName,
      isLoggedIn,
      loading,
      loaded,
    } = this.props;
    return (
      <Div display="block">
        <Header
          text="Plan Your Kitchen"
          display={false}
          handleModal={this.handleModal}
          isLoggedIn={isLoggedIn}
          fullName={fullName}
        />
        <Div>
          <Img data-src={duracucine.topBanner.image} src={`${duracucine.topBanner.image}?blur=30`} alt="top banner" />
        </Div>
        <Div>
          <Div p="0px 15%" mt="15px">
            <Img
              src={rectangle}
              alt="Rectange"
              style={{ height: '130px', width: '73px' }}
              mt="-15px"
              mb="-120px"
              ml="-20px"
            />
            <Heading color="#323131" fontSize="32px" fontFamily="light" fontWeight="normal" mb="0px">
              {planyourkitchen.titleOne}
            </Heading>
            <Heading color="#323131" fontSize="32px" fontFamily="regular" mt="5px">
              {planyourkitchen.titleTwo}
            </Heading>
          </Div>
          <Div p="0pc 15%" pr="0px">
            {planyourkitchen.steps.map((val, index) => (
              <Div key={index} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Text
                  mt="5px"
                  mb="5px"
                  style={{
                    height: '23px',
                    width: '23px',
                    backgroundColor: '#E0DFDF',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold'
                  }}
                  mr="15px"
                  fontSize="12px"
                >
                  {val.id}
                </Text>
                <Text fontSize="14px" mt="5px" mb="5px">
                  {val.text}
                </Text>
              </Div>
            ))}
            <div
              style={{
                height: '250px',
                width: '1px',
                border: '2px dashed #E0DFDF',
                marginTop: '10px',
                marginLeft: '10px'
              }}
            ></div>
          </Div>
        </Div>
        <Div mt="30px">
          <Heading
            ta="center"
            pt="5px"
            pb="15px"
            m="auto"
            mb="0px"
            fontSize="32px"
            style={{
              backgroundColor: '#252525',
              width: '70%',
              borderRadius: '15px 15px 0px 0px',
              color: '#FFFFFF'
            }}
          >
            {stepOne.step}
          </Heading>
          <Div
            style={{
              backgroundImage: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)'
            }}
          >
            <Heading ta="center" color="#323131" fontSize="22px" fontFamily="regular">
              {stepOne.title}
            </Heading>
            <Text
              p="0px 10%"
              ta="center"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepOne.description}
            </Text>
          </Div>
          <Img data-src={stepOne.image} src={`${stepOne.image}?blur=30`} alt="Determine your need" />
          <Div p="30px" pr="0px" className="offset">
            <SlickSlider settings={adjustSlides(8)}>
              {stepOne.data.map((data, index) => (
                <Div pr="30px" key={index}>
                  <Div bg="#FBF2ED" p="20px" pt="30px" style={{ height: '280px' }}>
                    <Div>
                      <Img
                        m="auto"
                        style={{
                          width: '34px',
                          height: 'auto',
                          display: 'block'
                        }}
                        data-src={data.icon}
                        alt={data.title}
                      />
                    </Div>
                    <Heading
                      ta="center"
                      color="#323131"
                      fontSize="18px"
                      mt="40px"
                      style={{
                        whiteSpace: 'normal',
                        overflow: 'visible'
                      }}
                    >
                      {data.title}
                    </Heading>
                    <Text ta="center" color="#888888" fontSize="14px" style={{ lineHeight: '20px' }}>
                      {data.description}
                    </Text>
                  </Div>
                </Div>
              ))}
            </SlickSlider>
          </Div>
        </Div>

        {/* step2 */}

        <Div mt="10px">
          <Heading
            ta="center"
            pt="5px"
            pb="15px"
            m="auto"
            mb="0px"
            fontSize="32px"
            style={{
              backgroundColor: '#252525',
              width: '70%',
              borderRadius: '15px 15px 0px 0px',
              color: '#FFFFFF'
            }}
          >
            {stepTwo.step}
          </Heading>
          <Div
            style={{
              backgroundImage: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)'
            }}
          >
            <Heading ta="center" color="#323131" fontSize="22px" fontFamily="regular">
              {stepTwo.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepTwo.description}
            </Text>
          </Div>

          <Text
            p="10px 0 "
            ta="center"
            color="#323131"
            fontSize="18px"
            fontFamily="regular"
            style={{ fontWeight: 'bold' }}
          >
            {stepTwo.principleOne.title}
          </Text>

          <Div>
            <Img
              m="auto"
              mb="20px"
              style={{ height: 'auto', width: '90%' }}
              data-src={stepTwo.principleOne.image}
              src={`${stepTwo.principleOne.image}?blur=30`}
              alt="5 zone principle"
            />
          </Div>

          <Text
            p="10px 10%"
            ta="center"
            color="#888888"
            fontSize="14px"
            style={{
              lineHeight: '20px'
            }}
          >
            {stepTwo.principleOne.description}
          </Text>

          <Text
            p="10px 0 "
            ta="center"
            color="#323131"
            fontSize="18px"
            fontFamily="regular"
            style={{ fontWeight: 'bold' }}
          >
            {stepTwo.principleTwo.title}
          </Text>

          <Div>
            <Img m="auto" mb="20px" style={{ width: '90%' }} data-src={stepTwo.principleTwo.image} src={`${stepTwo.principleTwo.image}?blur=30`} alt="3C principle" />
          </Div>

          <Text
            p="10px 10%"
            ta="center"
            color="#888888"
            fontSize="14px"
            style={{
              lineHeight: '20px'
            }}
          >
            {stepTwo.principleTwo.description}
          </Text>

          <Div p="30px" ml="5%" pr="0px" bg="#F7F0F0" style={{ width: '90%' }}>
            <Heading
              ta="left"
              color="#323131"
              fontSize="18px"
              mt="10px"
              style={{
                whiteSpace: 'normal',
                overflow: 'visible'
              }}
            >
              {stepTwo.data.title}
            </Heading>
            <Div className="offset">
              <SlickSlider settings={adjustSlides(8)}>
                {stepTwo.data.carouselData.map((data, index) => (
                  <Div pr="30px" key={index}>
                    <Div pt="10px">
                      <Div>
                        <Img mb="10px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                      </Div>

                      <Text
                        ta="left"
                        color="#323131"
                        fontWeight="bolder"
                        fontSize="16px"
                        style={{ fontWeight: 'bold' }}
                      >
                        {data.title}
                      </Text>

                      <Text ta="left" color="#888888" fontSize="16px" style={{ lineHeight: '22px' }}>
                        {data.description}
                      </Text>
                    </Div>
                  </Div>
                ))}
              </SlickSlider>
            </Div>
          </Div>
        </Div>

        {/* step3 */}

        <Div mt="30px">
          <Heading
            ta="center"
            pt="5px"
            pb="15px"
            m="auto"
            mb="0px"
            fontSize="32px"
            style={{
              backgroundColor: '#252525',
              width: '70%',
              borderRadius: '15px 15px 0px 0px',
              color: '#FFFFFF'
            }}
          >
            {stepThree.step}
          </Heading>
          <Div
            style={{
              backgroundImage: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)'
            }}
          >
            <Heading ta="center" color="#323131" fontSize="22px" fontFamily="regular">
              {stepThree.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepThree.description}
            </Text>
          </Div>

          <Div p="20px" pb="0px" ml="5%" pr="0px" bg="#F7F0F0" style={{ width: '90%' }} className="offset">
            <Heading
              ta="left"
              color="#323131"
              fontSize="18px"
              mt="20px"
              style={{
                whiteSpace: 'normal',
                overflow: 'visible'
              }}
            >
              {stepThree.dataOne.title}
            </Heading>
            <Text
              pb="10px"
              ta="left"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepThree.dataOne.description}
            </Text>
            <SlickSlider settings={adjustSlides(8)}>
              {stepThree.dataOne.carouselData.map((data, index) => (
                <Div pr="30px" key={index}>
                  <Div pt="10px">
                    <Div>
                      <Img mb="10px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                    </Div>

                    <Text ta="left" color="#323131" style={{ fontWeight: 'bold' }} fontSize="16px">
                      {data.title}
                    </Text>
                    <Text ta="left" color="#707070" mb="30px" mt="10px" fontSize="14px" style={{ lineHeight: '14px' }}>
                      {data.description}
                    </Text>
                  </Div>
                </Div>
              ))}
            </SlickSlider>
          </Div>

          <Div p="20px" pb="0px" ml="5%" pr="0px" mt="30px" bg="#F7F0F0" style={{ width: '90%' }} className="offset">
            <Heading
              ta="left"
              color="#323131"
              fontSize="18px"
              mt="20px"
              style={{
                whiteSpace: 'normal',
                overflow: 'visible'
              }}
            >
              {stepThree.dataTwo.title}
            </Heading>

            <Text
              pb="10px"
              ta="left"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepThree.dataTwo.description}
            </Text>
            <SlickSlider settings={adjustSlides(8)}>
              {stepThree.dataTwo.carouselData.map((data, index) => (
                <Div pr="30px" key={index}>
                  <Div pt="10px">
                    <Div>
                      <Img mb="10px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                    </Div>

                    <Text ta="left" color="#323131" style={{ fontWeight: 'bold' }} fontSize="16px">
                      {data.title}
                    </Text>
                    <Text ta="left" color="#707070" mb="30px" mt="10px" fontSize="14px" style={{ lineHeight: '14px' }}>
                      {data.description}
                    </Text>
                  </Div>
                </Div>
              ))}
            </SlickSlider>
          </Div>
        </Div>

        {/* step4 */}

        <Div mt="30px" mb="30px">
          <Heading
            ta="center"
            pt="5px"
            pb="15px"
            m="auto"
            mb="0px"
            fontSize="32px"
            style={{
              backgroundColor: '#252525',
              width: '70%',
              borderRadius: '15px 15px 0px 0px',
              color: '#FFFFFF'
            }}
          >
            {stepFour.step}
          </Heading>
          <Div
            style={{
              backgroundImage: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)'
            }}
          >
            <Heading
              p="0px 15%"
              ta="center"
              color="#323131"
              fontSize="22px"
              fontFamily="regular"
              style={{
                whiteSpace: 'normal'
              }}
            >
              {stepFour.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepFour.description}
            </Text>
          </Div>

          <Row justifyContent="center" ml="-5px" mr="-5px" mt="25px">
            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepFour.data.imageOne.image} src={`${stepFour.data.imageOne.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div
                  className={style.textWrapper}
                // style={{
                //   background: '#F2F2F2',
                //   padding: '4px 10px',
                //   width: '80%',
                //   height: '40px',
                //   marginTop: '-15px',
                //   display: flex,
                //   justifyContent: 'center',
                //   alignItems: 'center',
                //   fontSize: '14px',
                //   fontWeight: 'bolder',
                //   opacity: '90%'
                // }}
                >
                  {stepFour.data.imageOne.title}
                </div>
              </Box>
            </Box>

            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepFour.data.imageTwo.image} src={`${stepFour.data.imageTwo.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepFour.data.imageTwo.title}</div>
              </Box>
            </Box>
          </Row>
          <Row justifyContent="center" ml="-5px" mr="-5px" mt="25px">
            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepFour.data.imageThree.image} src={`${stepFour.data.imageThree.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepFour.data.imageThree.title}</div>
              </Box>
            </Box>

            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepFour.data.imageFour.image} src={`${stepFour.data.imageFour.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepFour.data.imageFour.title}</div>
              </Box>
            </Box>
          </Row>
          <Row justifyContent="center" ml="-5px" mr="-5px" mt="25px">
            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepFour.data.imageFive.image} src={`${stepFour.data.imageFive.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepFour.data.imageFive.title}</div>
              </Box>
            </Box>

            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepFour.data.imageSix.image} src={`${stepFour.data.imageSix.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepFour.data.imageSix.title}</div>
              </Box>
            </Box>
          </Row>
          <Row justifyContent="center" ml="-5px" mr="-5px" mt="25px">
            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepFour.data.imageSeven.image} src={`${stepFour.data.imageSeven.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepFour.data.imageSeven.title}</div>
              </Box>
            </Box>

            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepFour.data.imageEight.image} src={`${stepFour.data.imageEight.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepFour.data.imageEight.title}</div>
              </Box>
            </Box>
          </Row>
        </Div>

        {/* step5 */}

        <Div mt="0px">
          <Heading
            ta="center"
            pt="5px"
            pb="15px"
            m="auto"
            mb="0px"
            fontSize="32px"
            style={{
              backgroundColor: '#252525',
              width: '70%',
              borderRadius: '15px 15px 0px 0px',
              color: '#FFFFFF'
            }}
          >
            {stepFive.step}
          </Heading>
          <Div
            style={{
              backgroundImage: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)'
            }}
          >
            <Heading ta="center" color="#323131" fontSize="22px" fontFamily="regular">
              {stepFive.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepFive.description}
            </Text>
          </Div>

          <Div p="20px" pb="0" ml="5%" pr="0px" bg="#F7F0F0" style={{ width: '90%' }} className="offset">
            <Heading
              ta="left"
              color="#323131"
              fontSize="18px"
              mt="20px"
              style={{
                whiteSpace: 'normal',
                overflow: 'visible'
              }}
            >
              {stepFive.dataOne.title}
            </Heading>

            <Text
              pb="10px"
              ta="left"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepFive.dataOne.description}
            </Text>
            <SlickSlider settings={adjustSlides(8)}>
              {stepFive.dataOne.carouselData.map((data, index) => (
                <Div pr="30px" key={index}>
                  <Div pt="1px">
                    <Div>
                      <Img mb="10px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                    </Div>

                    <Text ta="left" color="#323131" style={{ fontWeight: 'bolder' }} fontSize="16px">
                      {data.title}
                    </Text>
                    <Text ta="left" color="#707070" mb="30px" mt="10px" fontSize="14px" style={{ lineHeight: '14px' }}>
                      {data.description}
                    </Text>
                  </Div>
                </Div>
              ))}
            </SlickSlider>
          </Div>

          <Div p="20px" ml="5%" pb="0" pr="0px" mt="30px" bg="#F7F0F0" style={{ width: '90%' }} className="offset">
            <Heading
              ta="left"
              color="#323131"
              fontSize="18px"
              mt="20px"
              style={{
                whiteSpace: 'normal',
                overflow: 'visible'
              }}
            >
              {stepFive.dataTwo.title}
            </Heading>

            <Text
              pb="10px"
              ta="left"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepFive.dataTwo.description}
            </Text>
            <SlickSlider settings={adjustSlides(8)}>
              {stepFive.dataTwo.carouselData.map((data, index) => (
                <Div pr="30px" key={index}>
                  <Div pt="10px">
                    <Div>
                      <Img mb="10px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                    </Div>
                  </Div>
                </Div>
              ))}
            </SlickSlider>
          </Div>
        </Div>

        {/* step6 */}

        <Div mt="30px" mb="30px">
          <Heading
            ta="center"
            pt="5px"
            pb="15px"
            m="auto"
            mb="0px"
            fontSize="32px"
            style={{
              backgroundColor: '#252525',
              width: '70%',
              borderRadius: '15px 15px 0px 0px',
              color: '#FFFFFF'
            }}
          >
            {stepSix.step}
          </Heading>
          <Div
            style={{
              backgroundImage: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)'
            }}
          >
            <Heading ta="center" color="#323131" fontSize="22px" fontFamily="regular">
              {stepSix.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepSix.description}
            </Text>
          </Div>
          <Div>
            <Img data-src={stepSix.image} src={`${stepSix.image}?blur=30`} alt="top banner" height="auto" />
          </Div>
        </Div>

        {/* step7 */}

        <Div mt="10px" mb="30px">
          <Heading
            ta="center"
            pt="5px"
            pb="15px"
            m="auto"
            mb="0px"
            fontSize="32px"
            style={{
              backgroundColor: '#252525',
              width: '70%',
              borderRadius: '15px 15px 0px 0px',
              color: '#FFFFFF'
            }}
          >
            {stepSeven.step}
          </Heading>
          <Div
            style={{
              backgroundImage: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)'
            }}
          >
            <Heading
              ta="center"
              p="0px 15%"
              color="#323131"
              fontSize="22px"
              fontFamily="regular"
              style={{
                whiteSpace: 'normal'
              }}
            >
              {stepSeven.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepSeven.description}
            </Text>
          </Div>

          <Row justifyContent="center" ml="-5px" mr="-5px" mt="25px">
            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepSeven.dataOne.imageOne.image} src={`${stepSeven.dataOne.imageOne.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepSeven.dataOne.imageOne.title}</div>
              </Box>
            </Box>

            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepSeven.dataOne.imageTwo.image} src={`${stepSeven.dataOne.imageTwo.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepSeven.dataOne.imageTwo.title}</div>
              </Box>
            </Box>
          </Row>
          <Row justifyContent="center" ml="-5px" mr="-5px" mt="25px">
            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepSeven.dataOne.imageThree.image} src={`${stepSeven.dataOne.imageThree.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepSeven.dataOne.imageThree.title}</div>
              </Box>
            </Box>

            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepSeven.dataOne.imageFour.image} src={`${stepSeven.dataOne.imageFour.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepSeven.dataOne.imageFour.title}</div>
              </Box>
            </Box>
          </Row>
          <Row justifyContent="center" ml="-5px" mr="-5px" mt="25px">
            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepSeven.dataOne.imageFive.image} src={`${stepSeven.dataOne.imageFive.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepSeven.dataOne.imageFive.title}</div>
              </Box>
            </Box>

            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepSeven.dataOne.imageSix.image} src={`${stepSeven.dataOne.imageSix.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepSeven.dataOne.imageSix.title}</div>
              </Box>
            </Box>
          </Row>

          <Div p="20px" mt="20px" m="5%" pb="0" pr="0px" bg="#F7F0F0" style={{ width: '90%' }} className="offset">
            <Heading
              ta="left"
              color="#323131"
              fontSize="18px"
              mt="20px"
              style={{
                whiteSpace: 'normal',
                overflow: 'visible'
              }}
            >
              {stepSeven.dataTwo.title}
            </Heading>

            <Text
              pb="10px"
              ta="left"
              pr="10px"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepSeven.dataTwo.description}
            </Text>
            <SlickSlider settings={adjustSlides(8)}>
              {stepSeven.dataTwo.carouselData.map((data, index) => (
                <Div pr="30px" key={index}>
                  <Div pt="10px">
                    <Div>
                      <Img mb="10px" data-src={data.image} src={`${data.image}?blur=30`} alt={data.title} />
                    </Div>

                    <Text ta="left" color="#323131" style={{ fontWeight: 'bold' }} fontSize="16px">
                      {data.title}
                    </Text>
                    <Text ta="left" color="#707070" mb="30px" mt="10px" fontSize="14px" style={{ lineHeight: '14px' }}>
                      {data.description}
                    </Text>
                  </Div>
                </Div>
              ))}
            </SlickSlider>
          </Div>
        </Div>

        {/* step8 */}

        <Div mt="0px" mb="30px">
          <Heading
            ta="center"
            pt="5px"
            pb="15px"
            m="auto"
            mb="0px"
            fontSize="32px"
            style={{
              backgroundColor: '#252525',
              width: '70%',
              borderRadius: '15px 15px 0px 0px',
              color: '#FFFFFF'
            }}
          >
            {stepEight.step}
          </Heading>
          <Div
            style={{
              backgroundImage: 'linear-gradient(to bottom, #F8F8F8, #FFFFFF)'
            }}
          >
            <Heading ta="center" color="#323131" fontSize="22px" fontFamily="regular">
              {stepEight.title}
            </Heading>
            <Text
              p="0px 10% 20px"
              ta="center"
              color="#888888"
              fontSize="14px"
              style={{
                lineHeight: '20px'
              }}
            >
              {stepEight.description}
            </Text>
          </Div>

          <Row justifyContent="center" ml="-5px" mr="-5px" mt="25px">
            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepEight.data.imageOne.image} src={`${stepEight.data.imageOne.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepEight.data.imageOne.title}</div>
              </Box>
            </Box>

            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepEight.data.imageTwo.image} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepEight.data.imageTwo.title}</div>
              </Box>
            </Box>
          </Row>
          <Row justifyContent="center" ml="-5px" mr="-5px" mt="25px">
            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepEight.data.imageThree.image} src={`${stepEight.data.imageThree.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepEight.data.imageThree.title}</div>
              </Box>
            </Box>

            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepEight.data.imageFour.image} src={`${stepEight.data.imageFour.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepEight.data.imageFour.title}</div>
              </Box>
            </Box>
          </Row>
          <Row justifyContent="center" ml="-5px" mr="-5px" mt="25px">
            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepEight.data.imageFive.image} src={`${stepEight.data.imageFive.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepEight.data.imageFive.title}</div>
              </Box>
            </Box>

            <Box style={{ width: '45%' }} height="100%" p="2px" mb="5px">
              <Box
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
              >
                <Img data-src={stepEight.data.imageSix.image} src={`${stepEight.data.imageSix.image}?blur=30`} alt="hello" width="90%" height="auto" />

                <div className={style.textWrapper}>{stepEight.data.imageSix.title}</div>
              </Box>
            </Box>
          </Row>
        </Div>
        <Div mt="30px">
          <a onClick={this.handleModal}>
            <Img data-src={beginJourney.image} src={`${beginJourney.image}?blur=30`} alt={beginJourney.title} />
          </a>
        </Div>
        <ResponsiveModal classNames={{ modal: 'mkModal' }} onCloseModal={this.handleModal} open={this.state.openModal}>
          <ModularKitchenFormModal
          />
        </ResponsiveModal>
        

        <Footer />
      </Div>
    );
  }
}
PlanYourKitchen.defaultProps = {
  data: null
};
PlanYourKitchen.propTypes = {
  data: PropTypes.object
};
