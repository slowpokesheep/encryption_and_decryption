import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Base from '../../components/core/Base';
import AESKey from '../../components/algorithms/AES/key_form';
import AESEncryptionForm from '../../components/algorithms/AES/encryption_form';
import AESDecryptionForm from '../../components/algorithms/AES/decryption_form';
import Description from '../../components/utils/Description';

export default function AESPage() {
  return (
    <Base>
      <Description algorithm="aes" />
      <h2 className="mt-5">Key Generation</h2>
      <AESKey />
      <Row>
        <Col xs="12" lg="6" className="mt-5">
          <h2>AES Encryption</h2>
          <AESEncryptionForm />
        </Col>
        <Col xs="12" lg="6" className="mt-5">
          <h2>AES Decryption</h2>
          <AESDecryptionForm />
        </Col>
      </Row>
    </Base>
  );
}