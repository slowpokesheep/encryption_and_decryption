import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import { client } from '../../../App';
import Output from '../../utils/Output';
import ErrorMessage from '../../utils/ErrorMessage';
import { modeOptions } from './shared';
import Loader from '../../utils/Loader';

export default function AESDecryptionForm(props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const keyNode = useRef(null);
  const messageNode = useRef(null);
  const modeNode = useRef(null);

  useEffect(() => {
    if (props.encryptionSubmit !== null) {
      const { encrypted_message, mode } = props.encryptionData;
      messageNode.current.value = encrypted_message;
      modeNode.current.state.value = { label: mode, value: mode };
      modeNode.current.forceUpdate();
    }

  }, [props.encryptionSubmit])

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
    const encrypted_message = messageNode.current ? messageNode.current.value : null;
    const mode = modeNode.current.state.value ? modeNode.current.state.value.value : null;
    const response = await client.post("aes/decrypt", { key, encrypted_message, mode });
    
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {output && <Output label="Decrypted message:" output={output} />}
      {error && <ErrorMessage message={error} />}
    </>
  )
}