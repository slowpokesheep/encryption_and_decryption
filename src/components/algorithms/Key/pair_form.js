import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';

import { client } from '../../../App';
import Output from '../../utils/Output';
import Loader from '../../utils/Loader';

export default function KeyPairForm(props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [isEcc, setIsEcc] = useState(false);
  
  const keySizeNode = useRef(null);
  const algNode = useRef(null);
  const curveNode = useRef(null);

  const keySizeOptions = [
    {label: "1024", value: 1024},
    {label: "2048", value: 2048},
    {label: "3072", value: 3072},
  ]

  const curveOptions = [
    {label: "P-256", value: "P-256"},
    {label: "P-384", value: "P-384"},
    {label: "P-521", value: "P-521"},
  ]

  const algorithms = [
    {label: "RSA", value: "rsa"},
    {label: "DSA", value: "dsa"},
    {label: "ECC", value: "ecc"},
  ]

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);

    let resource;
    let params = [];

    if (isEcc) {
      resource = "key/ecc";
      const curve = curveNode.current ? curveNode.current.state.value.value : null;
      params.push(["curve", curve])
    } else {
      const alg = algNode.current ? algNode.current.state.value.value : null;
      resource = `key/${alg}`;
      const key_size = keySizeNode.current ? keySizeNode.current.state.value.value : null;
      params.push(["key_size", key_size]);
    }
    const response = await client.get(resource, params);
    setOutput(response.data);
    setLoading(false);
  }

  function algChange(e) {
    if (e.value === "ecc") {
      setIsEcc(true);
    } else {
      setIsEcc(false);
    }
  }

  return (
    <>
      {loading && <Loader />}
      <Form onSubmit={submitForm}>
        <Form.Group controlId="algorithm">
          <Form.Label>Algorithm:</Form.Label>
          <Select
            options={algorithms}
            defaultValue={algorithms[0]}
            isMulti={false}
            placeholder="Choose an algorithm"
            onChange={algChange}
            ref={algNode}
          />
        </Form.Group>
        {!isEcc && (
          <Form.Group controlId="keySize">
            <Form.Label>Key Size:</Form.Label>
            <Select
              options={keySizeOptions}
              defaultValue={keySizeOptions[1]}
              isMulti={false}
              placeholder="Choose a key size (in bits)"
              ref={keySizeNode}
            />
          </Form.Group>
        )} 
        {isEcc && (
          <Form.Group controlId="curve">
            <Form.Label>Elliptic Curve:</Form.Label>
            <Select
              options={curveOptions}
              defaultValue={curveOptions[0]}
              isMulti={false}
              placeholder="Choose a curve"
              ref={curveNode}
            />
          </Form.Group>
        )}
        <Button variant="primary" type="submit">
          Generate a new key pair
        </Button>
      </Form>
      {output && <Output label="Your public key:" output={output["public_key"]} />}
      {output && <Output label="Your private key:" output={output["private_key"]} />}
    </>
  );
}