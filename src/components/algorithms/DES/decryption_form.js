import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import { client } from '../../../App';
import Output from '../../utils/Output';
import ErrorMessage from '../../utils/ErrorMessage';
import { modeOptions, ivModeOptions } from './shared';
import Loader from '../../utils/Loader';

export default function DESDecryptionForm(props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const keyNode = useRef(null);
  const messageNode = useRef(null);
  const modeNode = useRef(null);
  const ivModeNode = useRef(null);
  const ivNode = useRef(null);

  useEffect(() => {
    if (props.encryptionSubmit !== null) {
      updateForm();
    }

  }, [props.encryptionSubmit])

  function updateForm() {
    const {key, encrypted_message, mode, iv} = props.encryptionData;

    keyNode.current.value = key;
    messageNode.current.value = encrypted_message;
    console.log(mode)
    modeNode.current.state.value = { label: mode, value: mode };
    modeNode.current.forceUpdate();
    ivModeNode.current.state.value = { label: 'base64', value: 'base64' }
    ivModeNode.current.forceUpdate();
    ivNode.current.value = iv;
  }

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    
    const key = keyNode.current ? keyNode.current.value : null;
    const encrypted_message = messageNode.current ? messageNode.current.value : null;
    const mode = modeNode.current.state.value ? modeNode.current.state.value.value : null;
    const ivMode = ivModeNode.current.state.value ? ivModeNode.current.state.value.value : null;
    const iv = ivNode.current ? ivNode.current.value : null;

    const response = await client.post("des/decrypt", { key, encrypted_message, mode, ivMode, iv });
    
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
        <Form.Group>
          <Form.Label>IV Mode:</Form.Label>
          <Select
            options={ivModeOptions}
            defaultValue={null}
            isMulti={false}
            placeholder="Choose an IV mode"
            ref={ivModeNode}
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
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            Decrypt
          </Button>
        </div>
      </Form>
      {output && <Output label="Decrypted message:" output={output.decrypted_message} />}
      {error && <ErrorMessage message={error} />}
    </>
  )
}