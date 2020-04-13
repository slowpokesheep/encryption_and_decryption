import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import { client } from '../../../App';
import Output from '../../utils/Output';
import ErrorMessage from '../../utils/ErrorMessage';
import { modeOptions } from './shared';
import { randomMode, randomWord, randomChars } from '../../../utils/random';
import Loader from '../../utils/Loader';

export default function DESEncryptionForm(props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const keyNode = useRef(null);
  const messageNode = useRef(null);
  const modeNode = useRef(null);
  const ivNode = useRef(null);

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    
    const key = keyNode.current ? keyNode.current.value : null;
    const message = messageNode.current ? messageNode.current.value : null;
    const mode = modeNode.current.state.value ? modeNode.current.state.value.value : null;
    const iv = ivNode.current ? ivNode.current.value : null;

    const response = await client.post("des/encrypt", { key, message, mode, iv });

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
      key,
      encrypted_message,
      mode,
      iv,
    });
    props.setEncryptionSubmit(!props.encryptionSubmit);
  }

  async function autoFillForm(e) {
    e.preventDefault();

    // Key - 8 bytes
    keyNode.current.value = randomChars(8);

    // message - message to encrypt
    messageNode.current.value = randomWord();

    // mode - Encryption mode
    const nextMode = randomMode(modeOptions);
    modeNode.current.state.value = nextMode;
    modeNode.current.forceUpdate();

    // IV - 8 bytes, not used in ECB mode
    if (nextMode.value !== 'ECB') {
      ivNode.current.value = randomChars(8);
    } else {
      ivNode.current.value = "";
    }
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
        <Form.Group>
          <Form.Label>Mode:</Form.Label>
          <Select
            options={modeOptions}
            defaultValue={modeOptions[0]}
            isMulti={false}
            placeholder="Choose a mode"
            ref={modeNode}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>IV:</Form.Label>
          <Form.Control
            type="text"
            required={false}
            placeholder="Initalization Vector"
            ref={ivNode}
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
      {output && <Output label="Initalization Vector:" output={output.iv} />}
      {error && <ErrorMessage message={error} />}
    </>
  );
}