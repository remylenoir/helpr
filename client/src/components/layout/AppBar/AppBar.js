import React, { Fragment } from 'react';

import Item from './Item';
import PopMenu from './PopMenu';

// Bootstrap components
import Navbar from 'react-bootstrap/Navbar';

const AppMenu = () => {
  return (
    <Navbar collapseOnSelect fixed='bottom' expand='true' bg='primary'>
      <Fragment>
        <Item url={'/'} icon={'fa-home'} title={'Home'} />
        <Item url={'#'} icon={'fa-search'} title={'Events'} />

        <PopMenu />

        <Item url={'#'} icon={'fa-map-marker-alt'} title={'Map'} />
        <Item url={'#'} icon={'fa-bookmark'} title={'Bookmarks'} />
      </Fragment>
    </Navbar>
  );
};

export default AppMenu;
