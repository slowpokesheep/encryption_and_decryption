import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import { client } from '../../../App';
import Output from '../../utils/Output';
import ErrorMessage from '../../utils/ErrorMessage';
import { modeOptions } from './shared';
import { randomMode, randomWord, randomChars } from '../../../utils/random';
import Loader from '../../utils/Loader';

export default function RSAEncryptionForm(props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const keyNode = useRef(null);
  const messageNode = useRef(null);

  useEffect(() => {
    if (props.keySubmit !== null) {
      const { public_key } = props.keyData
      keyNode.current.value = public_key;
    }

  }, [props.keySubmit])

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    
    const public_key = keyNode.current ? keyNode.current.value : null;
    const message = messageNode.current ? messageNode.current.value : null;

    const response = await client.post("rsa/encrypt", { public_key, message });

    let encrypted_message = "";
    
    if (response.ok) {
      setOutput(response.data);
      encrypted_message = response.data.encrypted_message;
      setError(null);
    } else {
      setOutput(null);
      setError(response.data.message);
    }

    setLoading(false);
    props.setEncryptionData({
      encrypted_message,
    });
    props.setEncryptionSubmit(!props.encryptionSubmit);
  }

  async function autoFillForm(e) {
    e.preventDefault();

    // message - message to encrypt
    messageNode.current.value = randomWord();

    props.setAutoFillSubmit(!props.autoFillSubmit);
  }
  
  return (
    <>
      {loading && <Loader />}
      <Form>
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
          <Form.Label>Message:</Form.Label>
          <Form.Control
            type="text"
            required={true}
            placeholder="Enter your message"
            ref={messageNode}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitForm}>
          Submit
        </Button>
        <Button variant="secondary" type="submit" onClick={autoFillForm}>
          Auto Fill
        </Button>
      </Form>
      {output && <Output label="Encrypted message:" output={output.encrypted_message} />}
      {error && <ErrorMessage message={error} />}
    </>
  );
}