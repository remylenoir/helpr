import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AppIcon from './AppIcon';

// Bootstrap components
import Navbar from 'react-bootstrap/Navbar';

const AppMenu = () => {
  return (
    <Navbar collapseOnSelect fixed='bottom' expand='true' bg='primary'>
      <Fragment>
        <AppIcon url={'/'} icon={'fa-home'} title={'Home'} />
        <AppIcon url={'#'} icon={'fa-search'} title={'Events'} />
        <AppIcon url={'#'} icon={'fa-plus'} title={'Create'} />
        <AppIcon url={'#'} icon={'fa-map-marker-alt'} title={'Map'} />
        <AppIcon url={'#'} icon={'fa-bookmark'} title={'Bookmarks'} />
      </Fragment>
    </Navbar>
  );
};

export default AppMenu;
