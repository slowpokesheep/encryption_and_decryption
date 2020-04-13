import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import { client } from '../../../App';
import Output from '../../utils/Output';
import ErrorMessage from '../../utils/ErrorMessage';
import { modeOptions } from './shared';
import { randomMode, randomWord, randomChars } from '../../../utils/random';
import Loader from '../../utils/Loader';

export default function DES3EncryptionForm(props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const keyNode1 = useRef(null);
  const keyNode2 = useRef(null);
  const keyNode3 = useRef(null);
  const messageNode = useRef(null);
  const modeNode = useRef(null);
  const ivNode = useRef(null);

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    
    const key_1 = keyNode1.current ? keyNode1.current.value : null;
    const key_2 = keyNode2.current ? keyNode2.current.value : null;
    const key_3 = keyNode3.current ? keyNode3.current.value : null;
    const message = messageNode.current ? messageNode.current.value : null;
    const mode = modeNode.current.state.value ? modeNode.current.state.value.value : null;
    const iv = ivNode.current ? ivNode.current.value : null;

    const response = await client.post("des3/encrypt", { key_1, key_2, key_3, message, mode, iv });

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
      key_1,
      key_2,
      key_3,
      encrypted_message,
      mode,
      iv,
    });
    props.setEncryptionSubmit(!props.encryptionSubmit);
  }

  async function autoFillForm(e) {
    e.preventDefault();

    // Key - 3 * 8 bytes
    keyNode1.current.value = randomChars(8);
    keyNode2.current.value = randomChars(8);
    keyNode3.current.value = randomChars(8);

    // message - message to encrypt
    messageNode.current.value = randomWord();

    // mode - Encryption mode
    const nextMode = randomMode(modeOptions);
    //setSelectMode(nextMode);
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
        <Form.Group controlId="key1">
          <Form.Label>Key 1:</Form.Label>
          <Form.Control
            type="text"
            required={true}
            placeholder="Enter your key"
            ref={keyNode1}
          />
        </Form.Group>
        <Form.Group controlId="key2">
          <Form.Label>Key 2:</Form.Label>
          <Form.Control
            type="text"
            required={true}
            placeholder="Enter your key"
            ref={keyNode2}
          />
        </Form.Group>
        <Form.Group controlId="key3">
          <Form.Label>Key 3:</Form.Label>
          <Form.Control
            type="text"
            required={true}
            placeholder="Enter your key"
            ref={keyNode3}
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