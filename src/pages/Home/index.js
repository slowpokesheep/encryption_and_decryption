import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

import { key, des, des3, rsa, get } from './queries'

export default function Home(props) {

  
  async function queriesTester() {
    // DES

    console.log('Testing DES')
    console.log('Testing ECB')
    console.log(await get(des.encrypt('12345678', 'ECB', 'hallo')));
    console.log(await get(des.decrypt('12345678', 'ECB', '4O4Z9XJGJT8=')));

    console.log('Testing CBC')
    console.log(await get(des.encrypt('12345678', 'CBC', 'hallo', '12121212')));
    console.log(await get(des.decrypt('12345678', 'CBC', 'vF5T0UwMTxs=', 'utf-8', '12121212')));
    console.log(await get(des.decrypt('12345678', 'CBC', 'vF5T0UwMTxs=', 'base64', 'MTIxMjEyMTI=')));

    console.log('Testing CFB')
    console.log(await get(des.encrypt('12345678', 'CFB', 'hallo', '12121212')));
    console.log(await get(des.decrypt('12345678', 'CFB', '2PM/8Us=', 'utf-8', '12121212')));
    console.log(await get(des.decrypt('12345678', 'CFB', '2PM/8Us=', 'base64', 'MTIxMjEyMTI=')));

    console.log('Testing OFB')
    console.log(await get(des.encrypt('12345678', 'OFB', 'hallo', '12121212')));
    console.log(await get(des.decrypt('12345678', 'OFB', '2LM0QJI=', 'utf-8', '12121212')));
    console.log(await get(des.decrypt('12345678', 'OFB', '2LM0QJI=', 'base64', 'MTIxMjEyMTI=')));

    // DES3

    console.log('Testing DES3')
    console.log('Testing ECB')
    console.log(await get(des3.encrypt('12345678', '11112222', '12345678', 'ECB', 'hallo')));
    console.log(await get(des3.decrypt('12345678', '11112222', '12345678', 'ECB', 'swu3sFzUcl4=')));

    console.log('Testing CBC')
    console.log(await get(des3.encrypt('12345678', '11112222', '12345678', 'CBC', 'hallo', '12121212')));
    console.log(await get(des3.decrypt('12345678', '11112222', '12345678', 'CBC', 'rHsN+wb2Vbw=', 'utf-8', '12121212')));
    console.log(await get(des3.decrypt('12345678', '11112222', '12345678', 'CBC', 'rHsN+wb2Vbw=', 'base64', 'MTIxMjEyMTI=')));

    console.log('Testing CFB')
    console.log(await get(des3.encrypt('12345678', '11112222', '12345678', 'CFB', 'hallo', '12121212')));
    console.log(await get(des3.decrypt('12345678', '11112222', '12345678', 'CFB', 'krHuTuE=', 'utf-8', '12121212')));
    console.log(await get(des3.decrypt('12345678', '11112222', '12345678', 'CFB', 'krHuTuE=', 'base64', 'MTIxMjEyMTI=')));

    console.log('Testing OFB')
    console.log(await get(des3.encrypt('12345678', '11112222', '12345678', 'OFB', 'hallo', '12121212')));
    console.log(await get(des3.decrypt('12345678', '11112222', '12345678', 'OFB', 'ki4HoMg=', 'utf-8', '12121212')));
    console.log(await get(des3.decrypt('12345678', '11112222', '12345678', 'OFB', 'ki4HoMg=', 'base64', 'MTIxMjEyMTI=')));

    // RSA
    console.log('Testing RSA')
    console.log(await get(rsa.encrypt('-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDaT8g2noS5xsA1gziVqdCIFGQ6\nIbOU9Qd/Y8JCFnvwysmC3jUXobT7khJ8iEF2rEcwjvx/O7lg2VZy89rSeRJezeOE\nXMSfWxG6bRj2tCMQ7ik26z1zpCW3ak4I1QESZS94u+X8GQMYc32Gubt/6m9WLeBg\nFNWDrJCKSSgGlbGFPQIDAQAB\n-----END PUBLIC KEY-----', 'hallo')))
    console.log(await get(rsa.decrypt('-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQDaT8g2noS5xsA1gziVqdCIFGQ6IbOU9Qd/Y8JCFnvwysmC3jUX\nobT7khJ8iEF2rEcwjvx/O7lg2VZy89rSeRJezeOEXMSfWxG6bRj2tCMQ7ik26z1z\npCW3ak4I1QESZS94u+X8GQMYc32Gubt/6m9WLeBgFNWDrJCKSSgGlbGFPQIDAQAB\nAoGAJC2wD5MmCjZ8gHHCVRUbBI4ijPqsTM1thGg3F2Yr/HvSuMAT2tp2yHEM5Lvc\n42qJ8qtjfz9ZyYnC+JJea15ak3KceY2LLOIMLZ0MHMkrS9f7JWn/y8CnaO+whe4W\nR2FEtnTpU1Oqc7gHQsl3xOmdlgGBn0RLew2mGa6EVAxqjpECQQDoxHn+WfTZZhep\n6Ej7tqmKA9VaXjdcjztoR8MZ6LgZ+YZf+e3h5MVRlNqGEUMjoWQU8IOasAQMlUXa\nns+PvqntAkEA8Bnwez0fWuaBumYQsdzkDWMKLC1ZoHoAomQ8Xtm8oB+dGXNmshIT\njMHZeHxFSdkfFiuT/3b7SCbjwIilzr+ekQJAO8+AqWLkD5i0K+yMFGHzXottnzLm\ndto3IayO7XFnHQWJCdBm18y5ByWAoUJ+RgGKffbvWigwYitZL7vvCbisYQJBANDM\nrg5udDMX3F9eXUxgHU7q/zC164icMKsIYlvWHKxfcb5tVjSrdabl+ZpG7/atw9QC\n57y1Gwd/EncgHplymJECQE10/PVrOt9AdnoJuT1QAvn+6WY+WUiswdlKIaJF+crK\nZOGo/Y7sPIU1H+czqVwDiJwjydHIKqgqgSOdGaNfLaQ=\n-----END RSA PRIVATE KEY-----', 'Iy9+Zs7IHwl1F3oT3jY8wKox0RpYN8m3hHbXoRMNp2SZRTe6pO9bH5Cfs435Cnte0csFnS+gcYgz8wDYjijA3O5AoKD+U3tbL2qMBmJqg07UT/LfJK8zQIgZ6r8k6txGQU70VOSFewLSNBOeGfwDTM8rQidubdbjEAVjMcxzVzc=')))

    // DSA KEY
    console.log('Testing DSA key')
    console.log(await get(key.dsa.query.key_size[1024]));
    console.log(await get(key.dsa.query.key_size[2048]));
    console.log(await get(key.dsa.query.key_size[3072]));

    // ECC KEY
    console.log('Testing ECC key')
    console.log(await get(key.ecc.query.curve[256]));
    console.log(await get(key.ecc.query.curve[384]));
    console.log(await get(key.ecc.query.curve[521]));

    // RSA KEY
    console.log('Testing RSA key')
    console.log(await get(key.rsa.query.key_size[1024]));
    console.log(await get(key.rsa.query.key_size[2048]));
    console.log(await get(key.rsa.query.key_size[3072]));
  }

  queriesTester();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
