import React from 'react';
import Div from 'hometown-components/lib/Div';
import MenuSidebar from 'components/Menu/MenuSidebar';

const styles = require('../Menu/Menu.scss');

const MenuWithoutSearch = ({ ...rest }) => (
  <Div className={styles.menuWrapper}>
    <MenuSidebar {...rest} />
  </Div>
);

export default MenuWithoutSearch;
