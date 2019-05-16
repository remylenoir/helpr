import React, { Fragment } from 'react';

import Item from './Item';
import PopMenu from './PopMenu';

// Bootstrap components
import Navbar from 'react-bootstrap/Navbar';

const AppMenu = () => {
  return (
    <Navbar
      collapseOnSelect
      fixed='bottom'
      expand='true'
      className='bottom-app-bar justify-content-between'
    >
      <Fragment>
        <Item url={'/'} icon={'fa-home'} title={'Home'} />
        <Item url={'/explore'} icon={'fa-search'} title={'Explore'} />

        <PopMenu />

        <Item url={'/map'} icon={'fa-map-marker-alt'} title={'Map'} />
        <Item url={'/bookmarks'} icon={'fa-bookmark'} title={'Bookmarks'} />
      </Fragment>
    </Navbar>
  );
};

export default AppMenu;
