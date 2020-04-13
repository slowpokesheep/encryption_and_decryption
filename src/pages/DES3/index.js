import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import Base from '../../components/core/Base';
import DES3EncryptionForm from '../../components/algorithms/DES3/encryption_form';
import DES3DecryptionForm from '../../components/algorithms/DES3/decryption_form';
import Description from '../../components/utils/Description';

export default function DES3Page() {

  const [encryptionSubmit, setEncryptionSubmit] = useState(null);
  const [encryptionData, setEncryptionData] = useState(null);

  return (
    <Base>
      <Description subject="des3" />
      <Row>
        <Col xs="12" lg="6" className="mt-5">
          <h2>3DES Encryption</h2>
          <DES3EncryptionForm
            encryptionSubmit={encryptionSubmit}
            setEncryptionSubmit={setEncryptionSubmit}
            setEncryptionData={setEncryptionData}
          />
        </Col>
        <Col xs="12" lg="6" className="mt-5">
          <h2>3DES Decryption</h2>
          <DES3DecryptionForm
            encryptionSubmit={encryptionSubmit}
            encryptionData={encryptionData}
          />
        </Col>
      </Row>
    </Base>
  );
}