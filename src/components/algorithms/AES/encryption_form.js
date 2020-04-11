import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import { client } from '../../../App';
import Output from '../../utils/Output';
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

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    
    const key = keyNode.current ? keyNode.current.value : null;
    const message = messageNode.current ? messageNode.current.value : null;
    const mode = modeNode.current.state.value ? modeNode.current.state.value.value : null;
    const response = await client.post("aes/encrypt", { key, message, mode });
    
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {output && <Output label="Encrypted message:" output={output} />}
      {error && <ErrorMessage message={error} />}
    </>
  );
}