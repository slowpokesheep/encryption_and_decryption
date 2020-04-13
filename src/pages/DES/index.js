import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import Base from '../../components/core/Base';
import DESEncryptionForm from '../../components/algorithms/DES/encryption_form';
import DESDecryptionForm from '../../components/algorithms/DES/decryption_form';
import Description from '../../components/utils/Description';

export default function DESPage() {

  const [encryptionSubmit, setEncryptionSubmit] = useState(null);
  const [encryptionData, setEncryptionData] = useState(null);

  return (
    <Base>
      <Description algorithm="des" />
      <Row>
        <Col xs="12" lg="6" className="mt-5">
          <h2>DES Encryption</h2>
          <DESEncryptionForm
            encryptionSubmit={encryptionSubmit}
            setEncryptionSubmit={setEncryptionSubmit}
            setEncryptionData={setEncryptionData}
          />
        </Col>
        <Col xs="12" lg="6" className="mt-5">
          <h2>DES Decryption</h2>
          <DESDecryptionForm
            encryptionSubmit={encryptionSubmit}
            encryptionData={encryptionData}
          />
        </Col>
      </Row>
    </Base>
  );
}