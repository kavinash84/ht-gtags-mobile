import cookie from "js-cookie";

const getChannelForAdmitAd = name => {
  const source = cookie.get(name);
  let channel;
  if (!source) {
    channel = "na";
  } else if (source && window && window.deduplication_cookie_value) {
    if (source != window.deduplication_cookie_value) channel = source;
  } else {
    channel = "adm";
  }
  return channel;
};

export default function admitadMiddleware() {
  return ({ getState }) => next => action => {
    if (__CLIENT__) {
      const { type } = action;
      if (window && window.ADMITAD) {
        const {
          location: { pathname }
        } = getState().router;
        if (
          type === "PUSH_TO_DATALAYER" &&
          pathname &&
          pathname === "/payment-success"
        ) {
          const {
            paymentstatus: { data }
          } = getState();

          if (data) {
            const {
              order_no: orderNo,
              sub_total_amount: newOrderAmount
            } = data;

            const orderedItem = [];
            orderedItem.push({
              Product: {
                productID: "",
                category: "1",
                price: newOrderAmount,
                priceCurrency: "INR"
              },
              orderQuantity: "1",
              additionalType: "sale"
            });

            const channel = getChannelForAdmitAd("source");
            if (
              window.ADMITAD.Invoice &&
              window.ADMITAD.Invoice.referencesOrder
            ) {
              window.ADMITAD.Invoice.referencesOrder =
                window.ADMITAD.Invoice.referencesOrder || [];
              window.ADMITAD.Invoice.referencesOrder.push({
                orderNumber: orderNo,
                orderedItem
              });
              window.ADMITAD.Invoice.broker = channel;
            }
          }
        }
      }
    }
    return next(action);
  };
}
