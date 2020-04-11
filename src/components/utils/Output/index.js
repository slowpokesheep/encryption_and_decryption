import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './styles.scss';

export default function Output(props) {
  const { label, output } = props;
  const [copied, setCopied] = useState(false);

  return (
    <>
      <Row className="justify-content-center mt-2">
        <Col xs="3">
          <span>{label}</span>
        </Col>
        <Col xs="6">
          <textarea className="output w-100" value={output} readOnly={true} />
        </Col>
        <Col xs="3">
          <CopyToClipboard
            text={output}
            onCopy={() => setCopied(true)}>
            <Button variant='outline-primary' className="w-100">Copy to Clipboard</Button>
          </CopyToClipboard>
          {copied && <p className="w-100 text-center text-success">Copied!</p>}
        </Col>
      </Row>
    </>
  );
}