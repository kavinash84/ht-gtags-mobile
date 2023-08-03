import React from 'react';
import Div from 'hometown-components/lib/Div';
import { Label } from 'hometown-components/lib/Label';
import Button from 'hometown-components/lib/Buttons';
import Img from 'hometown-components/lib/Img';
import Row from 'hometown-components/lib/Row';

import CardForm from './CardForm';
import BankCard from './BankCard';
import CardFormEasyEmi from './CardFormEasyEmi';
import Emi from './Emi';
import EmiZero from './EmiZero';
import UpiForm from './UpiForm';

import { BASE_IMAGE_URL } from "helpers/Constants";


const styles = require('./Checkout.scss');

const initial = {
  CreditCard: {
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expMonth: '',
    expYear: '',
    type: 'other'
  },
  DebitCard: {
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expMonth: '',
    expYear: '',
    type: 'other'
  },
  Emi: {
    nameOnCard: '',
    cardNumber: '',
    type: 'other',
    cvv: '',
    expMonth: '',
    expYear: '',
    emiBank: '',
    emiCode: ''
  },
  EmiZero: {
    nameOnCard: '',
    cardNumber: '',
    type: 'other',
    cvv: '',
    expMonth: '',
    expYear: '',
    emiBank: '',
    emiCode: ''
  },
  NetBanking: {
    bankCode: ''
  },
  Wallet: {
    walletName: ''
  },
  EasyEmi: {
    cardNumber: '',
    type: 'other',
    is_seamless: 1,
    session: '',
    easyemi_otp_code: '',
    easyEmiConfig: '',
    gateway: ''
  },
  Upi: {
    payment_method_type: 'Upi',
    payment_method: 'Payu',
    pg_upi: 'UPI',
    upi_bank_code: 'UPI',
    upi_vpa: ''
  }
};

const onChangeGateway = (dispatcher, value, session) => () => {
  dispatcher(value, initial[value], session);
};

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};

const CommonPayments = (
  paymentType,
  onChange,
  selectedGateway,
  setPaymentDetails,
  data,
  session,
  paymentDetails,
  resetEasyEmi
) => {
  switch (paymentType) {
    case 'CreditCard':
      return (
        <Row
          display='block'
          mr='0'
          ml='0'
          mt='7px'
          pb='0'
          className={`${styles.paymentOptionsBlock} ${
            selectedGateway === 'CreditCard' ? styles.active : ''
          }`}
          key={paymentType}
        >
          <Div col='12' pb='5px' pt='0' className={styles.paymentHeader}>
            {/* <Img
              float='left'
              height='20px'
              width='auto'
              mt='10px'
              ml='10px'
              src={creditcardIcon}
              alt='Credit Card'
            /> */}
            <Button
              btnType='custom'
              fontSize='0.825rem'
              fontWeight='400'
              color='secondary'
              ml='0.4rem'
              mb='0'
              pl='0'
              pb='0.625rem'
              pt='0.625rem'
              onClick={onChangeGateway(onChange, paymentType, session)}
            >
              Credit Card
              <span>❯</span>
            </Button>
          </Div>
          {selectedGateway === paymentType && (
            <Div
              col='12'
              mt='0'
              mb='0'
              p='0.5rem'
              className={styles.paymentOptionsContent}
            >
              <CardForm
                setPaymentDetails={setPaymentDetails}
                gateway={selectedGateway}
              />
            </Div>
          )}
        </Row>
      );
    case 'DebitCard':
      return (
        <Row
          display='block'
          mr='0'
          ml='0'
          mt='7px'
          pb='0'
          className={`${styles.paymentOptionsBlock} ${
            selectedGateway === 'DebitCard' ? styles.active : ''
          }`}
          key={paymentType}
        >
          <Div col='12' pb='5px' pt='10px' className={styles.paymentHeader}>
            {/* <Img
              float='left'
              height='20px'
              width='auto'
              mt='10px'
              ml='10px'
              src={debitcardIcon}
              alt='Credit Card'
            /> */}
            <Button
              btnType='custom'
              fontSize='0.825rem'
              fontWeight='400'
              color='secondary'
              ml='0.4rem'
              mb='0'
              pl='0'
              pb='0.625rem'
              pt='0.625rem'
             
              onClick={onChangeGateway(
                onChange,
                paymentType,
                session,
                selectedGateway
              )}
            >
              Debit Card
              <span>❯</span>
            </Button>
          </Div>
          {selectedGateway === paymentType && (
            <Div
              col='12'
              mt='0'
              mb='0'
              p='0.5rem'
              className={styles.paymentOptionsContent}
            >
              <CardForm
                setPaymentDetails={setPaymentDetails}
                gateway={selectedGateway}
              />
            </Div>
          )}
          <div className={styles.line}></div>
        </Row>
        
      );
      
    case 'NetBanking':
      return (
        <Row
          display='block'
          mr='0'
          ml='0'
          mt='7px'
          pb='0'
          className={`${styles.paymentOptionsBlock} ${
            selectedGateway === 'NetBanking' ? styles.active : ''
          }`}
          key={paymentType}
        >
          <Div col='12' pb='5px' pt='10px' className={styles.paymentHeader}>
            {/* <Img
              float='left'
              height='20px'
              width='auto'
              mt='10px'
              ml='10px'
              src={intBankingIcon}
              alt='Credit Card'
            /> */}
            <Button
              btnType='custom'
              fontSize='0.825rem'
              fontWeight='400'
              color='secondary'
              ml='0.4rem'
              mb='0'
              pl='0'
              pb='0.625rem'
              pt='0.625rem'
             
              checked={selectedGateway === paymentType}
              onClick={onChangeGateway(
                onChange,
                paymentType,
                session,
                selectedGateway
              )}
            >
              Internet Banking
              <span>❯</span>
            </Button>
          </Div>
          {selectedGateway === paymentType && (
            <Div
              col='12'
              mt='0'
              mb='0'
              className={styles.paymentOptionsContent}
            >
              <Div className={styles.paymentBlock}>
                <Div col='12' mb='1rem'>
                  <Label htmlFor='bankOptions1' pl='0' color='textLight'>
                    Choose From Preferred Bank
                  </Label>
                </Div>

                <BankCard
                  setPaymentDetails={setPaymentDetails}
                  gateway={selectedGateway}
                  name='HDFB'
                  detailkey='bankCode'
                  img={`${BASE_IMAGE_URL}/media/cms/BankLOGO/hdfc.gif`}
                  currentSelection={paymentDetails.NetBanking.bankCode}
                />
                <BankCard
                  setPaymentDetails={setPaymentDetails}
                  gateway={selectedGateway}
                  name='ICIB'
                  detailkey='bankCode'
                  img={`${BASE_IMAGE_URL}/media/cms/BankLOGO/icici.gif`}
                  currentSelection={paymentDetails.NetBanking.bankCode}
                />
                <BankCard
                  setPaymentDetails={setPaymentDetails}
                  gateway={selectedGateway}
                  name='AXIB'
                  detailkey='bankCode'
                  img={`${BASE_IMAGE_URL}/media/cms/BankLOGO/axis.gif`}
                  currentSelection={paymentDetails.NetBanking.bankCode}
                />
                <BankCard
                  setPaymentDetails={setPaymentDetails}
                  gateway={selectedGateway}
                  name='SBIB'
                  detailkey='bankCode'
                  img={`${BASE_IMAGE_URL}/media/cms/BankLOGO/sbi.gif`}
                  currentSelection={paymentDetails.NetBanking.bankCode}
                />

                <Div col='12' mt='1rem'>
                  <select
                    className={`${styles.dropDown} ${styles.selectBank}`}
                    name='bankCode'
                    onChange={onChangeDetails(
                      setPaymentDetails,
                      selectedGateway
                    )}
                    value={paymentDetails.NetBanking.bankCode}
                  >
                    <option value=''>Select Bank</option>
                    {Object.keys(data.netBankingBanks).map((k, i) => (
                      <option value={k} key={String(i)}>
                        {Object.values(data.netBankingBanks)[i]}
                      </option>
                    ))}
                  </select>
                </Div>
              </Div>
            </Div>
          )}
          <div className={styles.line}></div>
        </Row>
      );
    case 'Emi':
      return (
        <Row
          display='block'
          mr='0'
          ml='0'
          mt='7px'
          pb='0'
          className={`${styles.paymentOptionsBlock} ${
            selectedGateway === 'Emi' ? styles.active : ''
          }`}
          key={paymentType}
        >
          <Div col='12' pb='5px' pt='10px' className={styles.paymentHeader}>
            {/* <Img
              float='left'
              height='20px'
              width='auto'
              mt='10px'
              ml='10px'
              src={emiIcon}
              alt='Credit Card'
            /> */}
            <Button
              btnType='custom'
              fontSize='0.825rem'
              fontWeight='400'
              color='secondary'
              ml='0.4rem'
              mb='0'
              pl='0'
              pb='0.625rem'
              pt='0.625rem'
             
              onClick={onChangeGateway(
                onChange,
                paymentType,
                session,
                selectedGateway
              )}
            >
              EMI
              <span>❯</span>
            </Button>
          </Div>
          {selectedGateway === paymentType && paymentDetails.Emi && (
            <Div
              col='12'
              mt='0'
              mb='0'
              className={styles.paymentOptionsContent}
            >
              <Emi
                selectedGateway={selectedGateway}
                setPaymentDetails={setPaymentDetails}
                currentSelection={paymentDetails.Emi.emiBank}
              />
            </Div>
          )}
          <div className={styles.line}></div>
        </Row>
      );
    case 'EmiZero':
      return (
        <Row
          display='block'
          mr='0'
          ml='0'
          mt='7px'
          pb='0'
          className={`${styles.paymentOptionsBlock} ${
            selectedGateway === 'EmiZero' ? styles.active : ''
          }`}
          key={paymentType}
        >
          <Div col='12' pb='5px' pt='10px' className={styles.paymentHeader}>
            {/* <Img
              float='left'
              height='20px'
              width='auto'
              mt='10px'
              ml='10px'
              src={emiIcon}
              alt='Credit Card'
            /> */}
            <Button
              btnType='custom'
              fontSize='0.825rem'
              fontWeight='400'
              color='secondary'
              ml='0.4rem'
              mb='0'
              pl='0'
              pb='0.625rem'
              pt='0.625rem'
              
              onClick={onChangeGateway(
                onChange,
                paymentType,
                session,
                selectedGateway
              )}
            >
              No Cost EMI
              <span>❯</span>
            </Button>
          </Div>
          {selectedGateway === paymentType && paymentDetails.EmiZero && (
            <Div
              col='12'
              mt='0'
              mb='0'
              className={styles.paymentOptionsContent}
            >
              <EmiZero
                selectedGateway={selectedGateway}
                setPaymentDetails={setPaymentDetails}
                currentSelection={paymentDetails.EmiZero.emiBank}
              />
            </Div>
          )}
          <div className={styles.line}></div>
        </Row>
      );

    case 'Wallet':
      return (
        <Row
          display='block'
          mr='0'
          ml='0'
          mt='7px'
          pb='0'
          className={`${styles.paymentOptionsBlock} ${
            selectedGateway === 'Wallet' ? styles.active : ''
          }`}
          key={paymentType}
        >
          <Div col='12' pb='5px' pt='10px' className={styles.paymentHeader}>
            {/* <Img
              float='left'
              height='20px'
              width='auto'
              mt='10px'
              ml='10px'
              src={walletIcon}
              alt='Credit Card'
            /> */}
            <Button
              btnType='custom'
              fontSize='0.825rem'
              fontWeight='400'
              color='secondary'
              ml='0.4rem'
              mb='0'
              pl='0'
              pb='0.625rem'
              pt='0.625rem'
            
              onClick={onChangeGateway(
                onChange,
                paymentType,
                session,
                selectedGateway
              )}
            >
              Wallet
              <span>❯</span>
            </Button>
          </Div>
          {selectedGateway === paymentType && (
            <Div
              col='12'
              mt='0'
              mb='0'
              className={styles.paymentOptionsContent}
            >
              <Div className={styles.paymentBlock}>
                <Div col='12' pb='0' pt='0.625rem'>
                  <Label htmlFor='bankOptions1' pl='0' color='textLight'>
                    Select From your preferred Wallet
                  </Label>
                </Div>
                {data.isPaytmWalletEnable && (
                  <BankCard
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    name='Paytm'
                    detailkey='walletName'
                    img={`${BASE_IMAGE_URL}/images/local_v2/onestepcheckout/logo/paytm.jpg`}
                    currentSelection={paymentDetails.Wallet.walletName}
                  />
                )}
                {data.isPayuWalletEnable && (
                  <BankCard
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    name='Payu'
                    detailkey='walletName'
                    img={`${BASE_IMAGE_URL}/images/local_v2/onestepcheckout/logo/payu.jpg`}
                    currentSelection={paymentDetails.Wallet.walletName}
                  />
                )}
                {data.isMobikwikWalletEnable && (
                  <BankCard
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    name='Mobikwik'
                    detailkey='walletName'
                    img={`${BASE_IMAGE_URL}/images/local_v2/onestepcheckout/logo/mobikwik.jpg`}
                    currentSelection={paymentDetails.Wallet.walletName}
                  />
                )}
              </Div>
            </Div>
          )}
          <div className={styles.line}></div>
        </Row>
      );
    case 'EasyEmi':
      return (
        <Row
          display='block'
          mr='0'
          ml='0'
          mt='7px'
          pb='0'
          className={`${styles.paymentOptionsBlock} ${
            selectedGateway === 'EasyEmi' ? styles.active : ''
          }`}
          key={paymentType}
        >
          <Div col='12' pb='5px' pt='10px' className={styles.paymentHeader}>
            {/* <Img
              float='left'
              height='20px'
              width='auto'
              mt='10px'
              ml='10px'
              src={emiIcon}
              alt='Easy Emi'
            /> */}
            <Button
              btnType='custom'
              fontSize='0.825rem'
              fontWeight='400'
              color='secondary'
              ml='0.4rem'
              mb='0'
              pl='0'
              pb='0.625rem'
              pt='0.625rem'
             
              onClick={() => {
                resetEasyEmi();
                onChangeGateway(
                  onChange,
                  paymentType,
                  session,
                  selectedGateway
                )();
              }}
            >
              Bajaj Finance EMI
              <span>❯</span>
            </Button>
          </Div>
          {selectedGateway === paymentType && (
            <Div
              col='12'
              mt='0'
              mb='0'
              p='1rem'
              className={styles.paymentOptionsContent}
            >
              <CardFormEasyEmi
                setPaymentDetails={setPaymentDetails}
                gateway={selectedGateway}
              />
            </Div>
          )}
        </Row>
      );
    case 'Upi':
      return (
        <Row
          display='block'
          mr='0'
          ml='0'
          mt='7px'
          pb='0'
          className={`${styles.paymentOptionsBlock} ${
            selectedGateway === 'Upi' ? styles.active : ''
          }`}
          key={paymentType}
        >
          <Div col='12' pb='5px' pt='10px' className={styles.paymentHeader}>
            {/* <Img
              float='left'
              height='20px'
              width='auto'
              mt='10px'
              ml='10px'
              src={creditcardIcon}
              alt='Upi'
            /> */}
            <Button
              btnType='custom'
              fontSize='0.825rem'
              fontWeight='400'
              color='secondary'
              ml='0.4rem'
              mb='0'
              pl='0'
              pb='0.625rem'
              pt='0.625rem'
              
              onClick={onChangeGateway(
                onChange,
                paymentType,
                session,
                selectedGateway
              )}
            >
              UPI
              <span>❯</span>
            </Button>
          </Div>
          {selectedGateway === paymentType && (
            <Div
              col='12'
              mt='0'
              mb='0'
              className={styles.paymentOptionsContent}
            >
              <UpiForm
                setPaymentDetails={setPaymentDetails}
                gateway={selectedGateway}
                padding='3rem 2rem'
              />
            </Div>
          )}
          <div className={styles.line}></div>
        </Row>
      );
    default:
      return null;
  }
};

export default CommonPayments;
