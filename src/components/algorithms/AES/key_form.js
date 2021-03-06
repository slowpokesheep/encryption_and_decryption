import React, { useState, useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';

import { client } from '../../../App';
import { randomPassphrase } from '../../../utils/random';
import Output from '../../utils/Output';
import Loader from '../../utils/Loader';

export default function AESKeyForm(props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  
  const keySizeNode = useRef(null);
  const passNode = useRef(null);
  
  const keySizeOptions = [
    {label: "128", value: 128},
    {label: "192", value: 192},
    {label: "256", value: 256},
  ];

  useEffect(() => {
    if (props.autoFillSubmit !== null) {
      passNode.current.value = randomPassphrase();
      submitForm(null);
    }

  }, [props.autoFillSubmit])

  async function submitForm(e) {
    if (e !== null) e.preventDefault();
    setLoading(true);
    const key_size = keySizeNode.current ? keySizeNode.current.state.value.value : null;
    const passphrase = passNode.current ? passNode.current.value : null;
    const response = await client.post("key/aes", { key_size, passphrase });
    setOutput(response.data);
    setLoading(false);

    props.setKeyData({
      key: response.data,
    });
    props.setKeySubmit(!props.keySubmit);
  }

  async function autoFillForm(e) {
    e.preventDefault()
    passNode.current.value = randomPassphrase();
    submitForm(e);
  }

  return (
    <>
      {loading && <Loader />}
      <Form>
        <Form.Group controlId="keySize">
          <Form.Label>Key Size:</Form.Label>
          <Select
            options={keySizeOptions}
            defaultValue={keySizeOptions[2]}
            isMulti={false}
            placeholder="Choose a key size (in bits)"
            ref={keySizeNode}
          />
        </Form.Group>
        <Form.Group controlId="passphrase">
          <Form.Label>Passphrase:</Form.Label>
          <Form.Control
            type="text"
            required={true}
            placeholder="Enter a passphrase"
            ref={passNode}
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button variant="info" type="submit" onClick={autoFillForm}>
            Auto Fill
          </Button>
          <Button variant="primary" type="submit" onClick={submitForm}>
            Generate a new key
          </Button>
        </div>
      </Form>
      {output && <Output label="Your key:" output={output} />}
    </>
  )
}