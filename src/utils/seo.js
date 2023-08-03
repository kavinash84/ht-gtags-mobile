/* eslint-disable max-len */
import { formatProductURL } from 'utils/helper';

export const productName = ({
  family = '', material = '', category = '', color = '', brand = 'HomeTown'
}) =>
  `${family} ${material} ${category} in ${color} Color By ${brand}`;

export const productPageTitle = name => `Buy ${name} Online at Best Price-HomeTown`;

export const productMetaDescription = (name, productType = '', materialProductType = '', color = '') =>
  `Buy ${name} online at Best Price. Shop ${materialProductType} in ${color} color from amazing designs. Avail discounts upto 50% on ${productType} which will elevate the decor of your house. ✔Fast Shipping ✔Easy Finance Options ✔Free Assembly`;

export const productMetaKeywords = (productType = '', material = '') =>
  `${productType}, ${productType} online, buy ${productType}, ${productType} price, ${productType} sale, ${material} ${productType} online shopping`;

export const productUrl = (family = '', material = '', category = '', color = '', brand = 'HomeTown') =>
  `${family}-${material}-${category}-${color}-${brand}`;

export const listItemsSchema = products =>
  products.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `https://m.hometown.in${formatProductURL(product.data.name, product.data.sku)}`,
    name: product.data.name
  }));
