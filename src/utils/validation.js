import { isBlank } from 'js-utility-functions';
import moment from 'moment';

export const isEmpty = rawValue => {
  const value = rawValue ? rawValue.trim() : '';
  return value === undefined || value === null || value === '';
};

const join = rules => (value, data, params) => rules.map(rule => rule(value, data, params)).filter(error => !!error)[0];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function pincode(value) {
  if (!isEmpty(value) && !/^[1-9][0-9]{5}$/i.test(value)) {
    return true;
  }
  return false;
}

export function ies(value) {
  if (!isEmpty(value)) {
    return true;
  }
  return false;
}

export const validateFullname = value => {
  if (isBlank(value)) {
    return true;
    // return validationProps(true, 'Please enter your first name and last name');
  } else if (value.length < 3) {
    return true;
    // return validationProps(true, 'Name should be atleast 3 characters');
  } else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(value)) {
    return true;
    // return validationProps(true, 'Please enter firstname, lastname seperated with a space.');
  }
  return false;
  // return validationProps(false, '');
};

// export const checkSpecialChar = text => {
//   const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; //eslint-disable-line
//   const check = format.test(text);
//   return check;
// };

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!isEmpty(value) && !Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!enumeration.includes(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function createValidator(rules, params) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach(key => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data, { key, ...params });
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

/* Need to move */

export const validatePassword = (value, message, validLength = 6) => {
  if (isBlank(value) || value.length < validLength) {
    return { error: true, errorMessage: message };
  }
  return { error: false, errorMessage: '' };
};

export const validateInputs = inputs => {
  const details = Object.values(Object.values(inputs)[0]);
  return details.filter(detail => detail === '').length > 0;
};

export const validatePaymentDetails = data => {
  // const type = Object.keys(data)[0];
  const details = Object.values(data);
  return validateInputs(details);
};

export const getCardType = num => {
  switch (true) {
    case new RegExp(/^4\d{12}(\d{3})?$/).test(num):
      return 'visa';
    case new RegExp(/^(5[1-5]\d{4}|677189)\d{10}$/).test(num):
      return 'mast';
    case new RegExp(/^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/).test(num):
      return 'maestro';
    case new RegExp(/^3[47]\d{13}$/).test(num):
      return 'amex';
    case new RegExp(/^3(0[0-5]|[68]\d)\d{11}$/).test(num):
      return 'diners';
    case new RegExp(/^6(?:011|5[0-9]{2})[0-9]{12}$/).test(num):
      return 'discover';
    case new RegExp(/^6[0-9]{15}$/).test(num):
      return 'rupay';
    case new RegExp(/^(?:2131|1800|35\d{3})\d{11}$/).test(num):
      return 'jcb';
    case new RegExp(/^(5078\d{2})(\d{2})(\d{11})$/).test(num):
      return 'aura';
    case new RegExp(/^(606282\d{10}(\d{3})?)|(3841\d{15})$/).test(num):
      return 'hipercard';
    default:
      return 'other';
  }
};

export const validateMobile = num => RegExp(/^[6-9]\d{9}$/).test(num);
export const validateAddress = (value, key) => {
  const errorObject = {
    error: false,
    errorMessage: ''
  };
  switch (key) {
    case 'address1':
      errorObject.error = isEmpty(value) || value.length > 40;
      errorObject.errorMessage = isEmpty(value) ? 'Address 1 can not be empty' : 'Max 40 characters allowed';
      break;
    case 'address2':
      errorObject.error = isEmpty(value) || value.length > 40;
      errorObject.errorMessage = 'Max 40 characters allowed';
      break;
    case 'address3':
      errorObject.error = !isEmpty(value) && value.length > 40;
      errorObject.errorMessage = 'Max 40 characters allowed';
      break;
    default:
  }
  return errorObject;
};

export const trimSpecialChar = text => {
  const newText = text.replace(/[^a-zA-Z ]/g, '');
  return newText;
};

export const checkSpecialChar = text => {
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~0-9]/; //eslint-disable-line
  const check = format.test(text);
  return check;
};

/*eslint-disable*/
export const validateEmail = email =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
/* eslint-enable */

// export const validateOtp = otp => RegExp(/^(([0-9]){6}))$/).test(otp);
export const validateOtp = otp => RegExp(/^[0-9]\d{6}$/).test(otp);

export const validateVPA = vpa => /^[.a-zA-Z0-9\-_]{3,}@[A-Za-z0-9]+$/.test(vpa);

export const validateName = fullName => {
  const nameSplit = fullName.trim().split(' ');
  const firstName = nameSplit[0];
  const lastName = nameSplit.splice(1).join(' ');

  if (isEmpty(fullName)) {
    return {
      msg: 'Name Cannot be Left Empty !',
      error: true
    };
  }
  if (checkSpecialChar(fullName)) {
    return {
      msg: 'Numbers and special characters are not allowed !',
      error: true
    };
  }
  if (firstName.length > 50) {
    return {
      msg: 'First Name cannot be more than 50 characters',
      error: true
    };
  }

  if (lastName.length > 50) {
    return {
      msg: 'Last Name cannot be more than 50 characters',
      error: true
    };
  }
  return false;
};

export const validateDob = dob => {

  if (!dob) {
    return {
      msg: 'Date of Birth Cannot be Left Empty !',
      error: true
    };
  }
  if (dob === '') {
    return {
      msg: 'Date of Birth Cannot be Left Empty !',
      error: true
    };
  }

  // if (moment.isMoment(moment(dob))){
  //   if (moment(dob).isValid()){
  //   return{
  //     msg: 'Date of Birth Cannot Consist of Alphabets',
  //     error: true
  //   }
  // }
  // if (moment().isSameOrBefore(moment())) {
  //   return {
  //     msg: 'Date of Birth Cannot be Future Date !',
  //     error: true
  //   };
  // }
  return false;
};

export const validateFuturePay = (balance, cartValue) => {
  // If balance is greater than available balance

  if (balance > cartValue) {
    return {
      msg: 'Balance cannot be more than cart value',
      error: true
    };
  }

  return false;
};
