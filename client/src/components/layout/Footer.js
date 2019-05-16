import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Fragment>
      <Row>
        <footer>
          <ul>
            <li>
              <Link>Some link</Link>
            </li>
            <li>
              <Link>Some link</Link>
            </li>
            <li>
              <Link>Some link</Link>
            </li>
            <li>
              <Link>Some link</Link>
            </li>
            <li>
              <Link>Some link</Link>
            </li>
            <li>
              <Link>Some link</Link>
            </li>
          </ul>
        </footer>
      </Row>
    </Fragment>
  );
};

export default Footer;
