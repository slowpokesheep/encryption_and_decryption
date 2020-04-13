import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import Base from '../../components/core/Base';
import RSAKeyForm from '../../components/algorithms/RSA/key_form';
import RSAEncryptionForm from '../../components/algorithms/RSA/encryption_form';
import RSADecryptionForm from '../../components/algorithms/RSA/decryption_form';
import Description from '../../components/utils/Description';

export default function RSAPage() {

  const [keySubmit, setKeySubmit] = useState(null);
  const [keyData, setKeyData] = useState(null);
  const [autoFillSubmit, setAutoFillSubmit] = useState(null);
  const [encryptionSubmit, setEncryptionSubmit] = useState(null);
  const [encryptionData, setEncryptionData] = useState(null);

  return (
    <Base>
      <Description subject="rsa" />
      <h2 className="mt-5">Key Generation</h2>
      <RSAKeyForm
        keySubmit={keySubmit}
        setKeySubmit={setKeySubmit}
        autoFillSubmit={autoFillSubmit}
        setKeyData={setKeyData}
      />
      <Row>
        <Col xs="12" lg="6" className="mt-5">
          <h2>RSA Encryption</h2>
          <RSAEncryptionForm
            encryptionSubmit={encryptionSubmit}
            setEncryptionSubmit={setEncryptionSubmit}
            setEncryptionData={setEncryptionData}
            autoFillSubmit={autoFillSubmit}
            setAutoFillSubmit={setAutoFillSubmit}
            keySubmit={keySubmit}
            keyData={keyData}
          />
        </Col>
        <Col xs="12" lg="6" className="mt-5">
          <h2>RSA Decryption</h2>
          <RSADecryptionForm
            encryptionSubmit={encryptionSubmit}
            encryptionData={encryptionData}
            keySubmit={keySubmit}
            keyData={keyData}
          />
        </Col>
      </Row>
    </Base>
  );
}