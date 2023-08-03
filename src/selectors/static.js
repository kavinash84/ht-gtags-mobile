import { createSelector } from 'reselect';

export const pageData = blockData => {
  const content = blockData.data && blockData.data.items && blockData.data.items.text ? blockData.data.items.text : '';
  return content;
};

export const getPageContent =
  createSelector(
    [pageData],
    text => text
  ) || [];
