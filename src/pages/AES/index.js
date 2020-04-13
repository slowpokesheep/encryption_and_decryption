import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import Base from '../../components/core/Base';
import AESKeyForm from '../../components/algorithms/AES/key_form';
import AESEncryptionForm from '../../components/algorithms/AES/encryption_form';
import AESDecryptionForm from '../../components/algorithms/AES/decryption_form';
import Description from '../../components/utils/Description';

export default function AESPage() {

  const [keySubmit, setKeySubmit] = useState(null);
  const [keyData, setKeyData] = useState(null);
  const [autoFillSubmit, setAutoFillSubmit] = useState(null);
  const [encryptionSubmit, setEncryptionSubmit] = useState(null);
  const [encryptionData, setEncryptionData] = useState(null);

  return (
    <Base>
      <Description subject="aes" />
      <h2 className="mt-5">Key Generation</h2>
      <AESKeyForm
        keySubmit={keySubmit}
        setKeySubmit={setKeySubmit}
        autoFillSubmit={autoFillSubmit}
        setKeyData={setKeyData}
      />
      <Row>
        <Col xs="12" lg="6" className="mt-5">
          <h2>AES Encryption</h2>
          <AESEncryptionForm
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
          <h2>AES Decryption</h2>
          <AESDecryptionForm
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