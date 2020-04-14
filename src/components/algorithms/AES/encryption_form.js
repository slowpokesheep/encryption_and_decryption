import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import { client } from '../../../App';
import Output from '../../utils/Output';
import { randomMode, randomWord, randomChars } from '../../../utils/random';
import ErrorMessage from '../../utils/ErrorMessage';
import { modeOptions } from './shared';
import Loader from '../../utils/Loader';

export default function AESEncryptionForm(props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const keyNode = useRef(null);
  const messageNode = useRef(null);
  const modeNode = useRef(null);

  useEffect(() => {
    if (props.keySubmit !== null) {
      const { key } = props.keyData
      keyNode.current.value = key;
    }

  }, [props.keySubmit])

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    
    const key = keyNode.current ? keyNode.current.value : null;
    const message = messageNode.current ? messageNode.current.value : null;
    const mode = modeNode.current.state.value ? modeNode.current.state.value.value : null;
    const response = await client.post("aes/encrypt", { key, message, mode });
    
    let encrypted_message = "";

    if (response.ok) {
      setOutput(response.data);
      encrypted_message = response.data;
      setError(null);
    } else {
      setOutput(null);
      setError(response.data.message);
    }

    setLoading(false);
    props.setEncryptionData({
      encrypted_message,
      mode,
    });
    props.setEncryptionSubmit(!props.encryptionSubmit);
  }

  async function autoFillForm(e) {
    e.preventDefault()

    // message - message to encrypt
    messageNode.current.value = randomWord();

    // mode - Encryption mode
    const nextMode = randomMode(modeOptions);
    modeNode.current.state.value = nextMode;
    modeNode.current.forceUpdate();

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
        <div className="d-flex justify-content-between">
          <Button variant="info" type="submit" onClick={autoFillForm}>
            Auto Fill
          </Button>
          <Button variant="primary" type="submit" onClick={submitForm}>
            Encrypt
          </Button>
        </div>
      </Form>
      {output && <Output label="Encrypted message:" output={output} />}
      {error && <ErrorMessage message={error} />}
    </>
  );
}