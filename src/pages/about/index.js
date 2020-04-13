import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import Base from '../../components/core/Base';
import Description from '../../components/utils/Description';

export default function About() {

  const aboutText = [
    "All cryptographic processes are handled by pycryptodome:",
    "AES documentation:",
    "DES documentation:",
    "3DES documentation:",
    "RSA documentation:",
    "RSA key generation:",
    "DSA key generation:",
    "ECC key generation:",
  ];
  const aboutLinks = [
    'https://pycryptodome.readthedocs.io/en/latest/',
    'https://pycryptodome.readthedocs.io/en/latest/src/cipher/aes.html',
    'https://pycryptodome.readthedocs.io/en/latest/src/cipher/des.html',
    'https://pycryptodome.readthedocs.io/en/latest/src/cipher/des3.html',
    'https://pycryptodome.readthedocs.io/en/latest/src/cipher/oaep.html',
    'https://pycryptodome.readthedocs.io/en/latest/src/public_key/rsa.html',
    'https://pycryptodome.readthedocs.io/en/latest/src/public_key/dsa.html',
    'https://pycryptodome.readthedocs.io/en/latest/src/public_key/ecc.html',
  ];

  const resourcesText = [
    "More about AES: ",
    "More about DSA: ",
    "More about 3DSA: ",
    "More about RSA",
    "More about mode of operation:",
    "More about initalization vector:"
  ]

  const resourcesLinks = [
    'https://en.wikipedia.org/wiki/Advanced_Encryption_Standard',
    'https://en.wikipedia.org/wiki/Data_Encryption_Standard',
    'https://en.wikipedia.org/wiki/Triple_DES',
    'https://en.wikipedia.org/wiki/RSA_(cryptosystem)',
    'https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation',
    'https://en.wikipedia.org/wiki/Initialization_vector'
  ]

  return (
    <Base>
      <h3>IV (Initalization vector)</h3>
      <Description subject="iv" />
      <h2>Block cipher mode of operation</h2>
      <Description subject="mode" />
      <h3>ECB (Electronic codebook)</h3>
      <Description subject="ecb" />
      <h3>CBC (Cipher block chaining)</h3>
      <Description subject="cbc" />
      <h3>CFB (Cipher feedback)</h3>
      <Description subject="cfb" />
      <h3>OFB (Output feedback)</h3>
      <Description subject="ofb" />
      <h3>CTR (Counter)</h3>
      <Description subject="ctr" />

      <h2>About the project</h2>
      <h3>Backend</h3>
      <>
        {aboutText.map((text, i) => {
          return (
          <p key={i}>{text} <a href={aboutLinks[i]}>{aboutLinks[i]}</a></p>
          );
        })}
      </>
      <h3>Information</h3>
      <>
        {resourcesText.map((text, i) => {
          return (
          <p key={i}>{text} <a href={resourcesLinks[i]}>{resourcesLinks[i]}</a></p>
          );
        })}
      </>
    </Base>
  );
}