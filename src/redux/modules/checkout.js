const SEND_DELIVERY_ADDRESS = "checkout/SEND_DELIVERY_ADDRESS";
const SEND_DELIVERY_ADDRESS_SUCCESS = "checkout/SEND_DELIVERY_ADDRESS_SUCCESS";
const SEND_DELIVERY_ADDRESS_FAIL = "checkout/SEND_DELIVERY_ADDRESS_FAIL";

const RESET_NEXTSTEP = "checkout/RESET_NEXTSTEP";

const initialState = {
  loading: false,
  loaded: false,
  error: "",
  nextstep: false,
  showAddAddress: true,
  paymentData: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEND_DELIVERY_ADDRESS:
      return {
        ...state,
        loading: true,
        loaded: false,
        showAddAddress: true,
        error: ""
      };
    case SEND_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        nextstep: action.result,
        paymentData: action.result.paymentData,
        showAddAddress: false,
        error: ""
      };
    case SEND_DELIVERY_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        nextstep: false,
        showAddAddress: true,
        error: "Some Error Occured"
      };
    case RESET_NEXTSTEP:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export const sendDeliveryAddress = (
  sessionId,
  data
  // isLoggedIn
) => (dispatch, getState) =>
  dispatch({
    types: [
      SEND_DELIVERY_ADDRESS,
      SEND_DELIVERY_ADDRESS_SUCCESS,
      SEND_DELIVERY_ADDRESS_FAIL
    ],
    promise: async ({ client }) => {
      try {
        let postData;
        const {
          shippingAddress,
          billingAddress,
          shippingIsBilling,
          cartTotal = 0
        } = data;
        const {
          address: {
            shipping: { address_id: addressId }
          }
        } = getState();
        if (!shippingIsBilling) {
          postData = {
            session_id: sessionId,
            email: shippingAddress.email,
            fullname: shippingAddress.fullName,
            mobile: shippingAddress.phone,
            cartTotal,
            shipping_info: {
              email: shippingAddress.email,
              fullname: shippingAddress.fullName,
              mobile: shippingAddress.phone,
              pincode: shippingAddress.pincode,
              address: shippingAddress.address,
              gst: shippingAddress.gst,
              address1: shippingAddress.address1,
              address2: shippingAddress.address2,
              address3: shippingAddress.address3,
              address_id: addressId || ""
            },
            is_billing_address_same: shippingIsBilling,
            billing_info: {
              email: billingAddress.email,
              fullname: billingAddress.fullName,
              mobile: billingAddress.phone,
              pincode: billingAddress.pincode,
              gst: shippingAddress.gst,
              address1: billingAddress.address1,
              address2: billingAddress.address2,
              address3: billingAddress.address3,
              address_id: addressId || ""
            }
          };
        } else {
          postData = {
            session_id: sessionId,
            email: shippingAddress.email,
            fullname: shippingAddress.fullName,
            mobile: shippingAddress.phone,
            cartTotal,
            shipping_info: {
              email: shippingAddress.email,
              fullname: shippingAddress.fullName,
              mobile: shippingAddress.phone,
              pincode: shippingAddress.pincode,
              gst: shippingAddress.gst,
              address1: shippingAddress.address1,
              address2: shippingAddress.address2,
              address3: shippingAddress.address3,
              address_id: addressId
            },
            is_billing_address_same: shippingIsBilling,
            billing_form: {
              email: shippingAddress.email,
              fullname: shippingAddress.fullName,
              mobile: shippingAddress.phone,
              pincode: shippingAddress.pincode,
              gst: shippingAddress.gst,
              address1: shippingAddress.address1,
              address2: shippingAddress.address2,
              address3: shippingAddress.address3,
              address_id: addressId
            }
          };
        }
        if (window && window.webengage) {
          window.webengage.user.setAttribute("we_email", shippingAddress.email);
          window.webengage.user.setAttribute(
            "we_phone",
            `91${shippingAddress.phone}`
          );
          window.webengage.user.setAttribute(
            "we_first_name",
            shippingAddress.fullName
          );
        }

        return client.post("/tesla/checkout/customer-registration", postData);
      } catch (error) {
        throw error;
      }
    }
  });

export const resetGuestRegisterFlag = () => ({
  type: RESET_NEXTSTEP
});
