import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import { client } from '../../../App';
import Output from '../../utils/Output';
import ErrorMessage from '../../utils/ErrorMessage';
import { modeOptions, ivModeOptions } from './shared';
import Loader from '../../utils/Loader';

export default function RSADecryptionForm(props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const keyNode = useRef(null);
  const messageNode = useRef(null);

  useEffect(() => {
    if (props.encryptionSubmit !== null) {
      const { encrypted_message } = props.encryptionData;
      messageNode.current.value = encrypted_message;
    }

  }, [props.encryptionSubmit])

  useEffect(() => {
    if (props.keySubmit !== null) {
      const { private_key } = props.keyData
      keyNode.current.value = private_key;
    }

  }, [props.keySubmit])

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    
    const private_key = keyNode.current ? keyNode.current.value : null;
    const encrypted_message = messageNode.current ? messageNode.current.value : null;

    const response = await client.post("rsa/decrypt", { private_key, encrypted_message });
    
    if (response.ok) {
      setOutput(response.data);
      setError(null);
    } else {
      setOutput(null);
      setError(response.data.message);
    }

    setLoading(false);
  }

  return (
    <>
      {loading && <Loader />}
      <Form onSubmit={submitForm}>
        <Form.Group controlId="key">
          <Form.Label>Key:</Form.Label>
          <Form.Control
            type="text"
            required={true}
            placeholder="Enter your key"
            ref={keyNode}
          />
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Encrypted Message:</Form.Label>
          <Form.Control
            type="text"
            required={true}
            placeholder="Enter your message"
            ref={messageNode}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {output && <Output label="Decrypted message:" output={output.decrypted_message} />}
      {error && <ErrorMessage message={error} />}
    </>
  )
}