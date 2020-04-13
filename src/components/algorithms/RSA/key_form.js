import React, { useState, useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';

import { client } from '../../../App';
import { randomPassphrase } from '../../../utils/random';
import Output from '../../utils/Output';
import Loader from '../../utils/Loader';

export default function RSAKeyForm(props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  
  const keySizeNode = useRef(null);
  
  const keySizeOptions = [
    {label: "1024", value: 1024},
    {label: "2048", value: 2048},
    {label: "3072", value: 3072},
  ];

  useEffect(() => {
    if (props.autoFillSubmit !== null) {
      submitForm(null);
    }

  }, [props.autoFillSubmit])

  async function submitForm(e) {
    if (e !== null) e.preventDefault();
    setLoading(true);
    const key_size = keySizeNode.current ? keySizeNode.current.state.value.value : null;
    const response = await client.post("key/rsa", { key_size });
    setOutput(response.data);
    setLoading(false);

    const { public_key, private_key } = response.data;

    props.setKeyData({
      public_key: public_key.replace(/\n/g, '\\n'),
      private_key: private_key.replace(/\n/g, '\\n'),
    });
    props.setKeySubmit(!props.keySubmit);
  }

  return (
    <>
      {loading && <Loader />}
      <Form>
        <Form.Group controlId="keySize">
          <Form.Label>Key Size:</Form.Label>
          <Select
            options={keySizeOptions}
            defaultValue={keySizeOptions[0]}
            isMulti={false}
            placeholder="Choose a key size (in bits)"
            ref={keySizeNode}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitForm}>
          Generate a new key
        </Button>
      </Form>
      {output && <Output label="Your key:" output={output.private_key.replace(/\n/g, '\\n')} />}
      {output && <Output label="Your key:" output={output.public_key.replace(/\n/g, '\\n')} />}
    </>
  )
}