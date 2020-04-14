import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Row, Col } from 'react-bootstrap';

import './styles.scss';

export default function Header() {
  return (
    <Navbar className="shadow-sm" id="header" bg="light" expand="lg">
      <Row className="w-100">
        <Col className="brand d-flex align-items-center justify-content-between">
          <Link to="/">Encryption & Decryption Tool</Link>
          <Link className="text-right" to="/about">About this Project</Link>
        </Col>
      </Row>
    </Navbar>
  );
}