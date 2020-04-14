import React from 'react';

import Base from '../../components/core/Base';
import Description from '../../components/utils/Description';

import './styles.scss';

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
      <h2 className="about-header">About this project</h2>
      <p>Made by Guðmundur Óli Norland (<a href="https://github.com/nachos5" target="_blank" rel="noopener noreferrer">nachos5 on Github</a>) and Hjalti Geir Garðarsson (<a href="https://github.com/slowpokesheep" target="_blank" rel="noopener noreferrer">slowpokesheep on Github</a>).</p>
      <p><a href="https://github.com/nachos5/encryption_and_decryption_api" target="_blank" rel="noopener noreferrer">Click here</a> to visit the projects repository on Github.</p>
      <p><a href="https://github.com/nachos5/encryption_and_decryption_api" target="_blank" rel="noopener noreferrer">Click here</a> to visit this projects API repository on Github.</p>
      <h2 className="about-header mt-5">Information (glossary)</h2>
      <p className="about-small-header">IV (Initalization vector)</p>
      <Description subject="iv" />
      <div className="mb-5" />
      <h3>Block cipher mode of operation</h3>
      <Description subject="mode" />
      <p className="about-small-header">ECB (Electronic codebook)</p>
      <Description subject="ecb" />
      <p className="about-small-header">CBC (Cipher block chaining)</p>
      <Description subject="cbc" />
      <p className="about-small-header">CFB (Cipher feedback)</p>
      <Description subject="cfb" />
      <p className="about-small-header">OFB (Output feedback)</p>
      <Description subject="ofb" />
      <p className="about-small-header">CTR (Counter)</p>
      <Description subject="ctr" />

      <h2 className="about-header">Documentation</h2>
      <div className="mb-5">
        {aboutText.map((text, i) => {
          return (
          <p key={i}>{text} <a className="doc-link" href={aboutLinks[i]}>{aboutLinks[i]}</a></p>
          );
        })}
      </div>
      <>
        {resourcesText.map((text, i) => {
          return (
          <p key={i}>{text} <a className="doc-link" href={resourcesLinks[i]}>{resourcesLinks[i]}</a></p>
          );
        })}
      </>
    </Base>
  );
}