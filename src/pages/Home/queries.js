const baseUrl = 'https://api-enc-dec.herokuapp.com'

export const key = {
  'dsa': {
    'query': {
      'key_size': {
        '1024': `${baseUrl}/key/dsa?key_size=1024`,
        '2048': `${baseUrl}/key/dsa?key_size=2048`,
        '3072': `${baseUrl}/key/dsa?key_size=3072`
      }
    }
  },
  'ecc': {
    'query': {
      'curve': {
        '256': `${baseUrl}/key/ecc?curve=P-256`,
        '384': `${baseUrl}/key/ecc?curve=P-384`,
        '521': `${baseUrl}/key/ecc?curve=P-521`
      }
    }
  },
  'rsa': {
    'query': {
      'key_size': {
        '1024': `${baseUrl}/key/rsa?key_size=1024`,
        '2048': `${baseUrl}/key/rsa?key_size=2048`,
        '3072': `${baseUrl}/key/rsa?key_size=3072`
      }
    }
  }
}

// DES

const desDecrypt = (key, mode, message, ivMode='', iv='') => {
  const keyQuery = `key=${key}`
  const modeQuery = `mode=${mode}`
  const messageQuery = `encrypted_message=${encodeURIComponent(message)}`
  const ivModeQuery = `iv_mode=${ivMode}`
  const ivQuery = `iv=${iv}`
  
  let url = `${baseUrl}/des/decrypt?${keyQuery}&${modeQuery}`

  if (ivMode !== '' || iv !== '') url += `&${ivModeQuery}&${ivQuery}&${messageQuery}`
  else url += `&${messageQuery}`

  return url
}

const desEncrypt = (key, mode, message, iv='') => {
  const keyQuery = `key=${key}`
  const modeQuery = `mode=${mode}`
  const messageQuery = `message=${message}`
  const ivQuery = `iv=${iv}`
  
  let url = `${baseUrl}/des/encrypt?${keyQuery}&${modeQuery}`

  if (iv !== '') url += `&${ivQuery}&${messageQuery}`
  else url += `&${messageQuery}`


  return url
}

export const des = {
  'decrypt': desDecrypt,
  'encrypt': desEncrypt
}

// DES3

const des3Decrypt = (key1, key2, key3, mode, message, ivMode='', iv='') => {
  const key1Query = `key_1=${key1}`
  const key2Query = `key_2=${key2}`
  const key3Query = `key_3=${key3}`
  const keyQuery = `${key1Query}&${key2Query}&${key3Query}`

  const modeQuery = `mode=${mode}`
  const messageQuery = `encrypted_message=${encodeURIComponent(message)}`
  const ivModeQuery = `iv_mode=${ivMode}`
  const ivQuery = `iv=${iv}`
  
  let url = `${baseUrl}/des3/decrypt?${keyQuery}&${modeQuery}`

  if (ivMode !== '' || iv !== '') url += `&${ivModeQuery}&${ivQuery}&${messageQuery}`
  else url += `&${messageQuery}`

  return url
}

const des3Encrypt = (key1, key2, key3, mode, message, iv='') => {
  const key1Query = `key_1=${key1}`
  const key2Query = `key_2=${key2}`
  const key3Query = `key_3=${key3}`
  const keyQuery = `${key1Query}&${key2Query}&${key3Query}`

  const modeQuery = `mode=${mode}`
  const messageQuery = `message=${message}`
  const ivQuery = `iv=${iv}`
  
  let url = `${baseUrl}/des3/encrypt?${keyQuery}&${modeQuery}`

  if (iv !== '') url += `&${ivQuery}&${messageQuery}`
  else url += `&${messageQuery}`

  return url
}

export const des3 = {
  'decrypt': des3Decrypt,
  'encrypt': des3Encrypt
}


// RSA

const rsaDecrypt = (key, message) => {
  const keyQuery = `private_key=${encodeURIComponent(key)}`
  const messageQuery = `encrypted_message=${encodeURIComponent(message)}`

  const url = `${baseUrl}/rsa/decrypt?${keyQuery}&${messageQuery}`

  return url
}

const rsaEncrypt = (key, message) => {
  const keyQuery = `public_key=${encodeURIComponent(key)}`
  const messageQuery = `message=${message}`

  const url = `${baseUrl}/rsa/encrypt?${keyQuery}&${messageQuery}`

  return url
}

export const rsa = {
  'decrypt': rsaDecrypt,
  'encrypt': rsaEncrypt
}

// HTTP Requests

const header = {
  get: { method: 'GET' },
}

export async function get(url = '') {
  return fetch(url, header.get)
  .then((response) => response.json())
  .then((data) => {
    return data
  })
  .catch((error) => {
    console.error(error);
  });
}
