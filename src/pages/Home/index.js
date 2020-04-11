import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../App.css';

import Base from '../../components/core/Base';

import NavImageBox from '../../components/navigation/NavImageBox';

export default function Home(props) {

  return (
    <Base>
      <Row>
        <Col xs="6" className="mb-5">
          <NavImageBox backgroundUrl="/imagebox_1.jpg" text="AES" link="/aes" />
        </Col>
        <Col xs="6" className="mb-5">
          <NavImageBox backgroundUrl="/imagebox_2.jpg" text="DES" link="/des" />
        </Col>
        <Col xs="6">
          <NavImageBox backgroundUrl="/imagebox_3.jpg" text="DES3" link="/des3" />
        </Col>
        <Col xs="6">
          <NavImageBox backgroundUrl="/imagebox_4.jpg" text="RSA" link="/rsa" />
        </Col>
      </Row>
    </Base>
  );
}
