const ADD = 'recently/ADD';

const initialState = {
  loaded: false,
  data: []
};
const formProuductData = (state, product) => {
  /* eslint-disable */
  const {
    productDescription: {
      meta: { name, max_special_price, price, max_saving_percentage, sku },
      image,
      reviews
    }
  } = product;
  /* eslint-enable */
  if (state.data.filter(item => item.meta.sku === sku).length > 0) {
    return state.data;
  }
  return [
    {
      meta: {
        name,
        max_special_price,
        price,
        max_saving_percentage,
        sku
      },
      image,
      reviews
    },
    ...state.data
  ];
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        data: formProuductData(state, action.product)
      };
    default:
      return state;
  }
}

export const setRecentlyViewedLocal = product => ({
  type: ADD,
  product
});
