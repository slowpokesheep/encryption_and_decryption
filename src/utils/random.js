export const randomMode = (modeOptions) => {
  const keys = Object.keys(modeOptions);
  const r = Math.floor(Math.random() * keys.length);
  return modeOptions[keys[r]];
}

const wordList = [
  'Hello',
  'Goodbye',
  'I like encryption',
  `Yarrr I'am a pirate`,
  'RSA is on of the first public-key cryptosystems',
  'This message is private',
  'Block ciphers',
  'Stream ciphers',
  'Asymmetric cipher',
  'So much fun encrypting',
  'More and more encryption',
  'This is just a random message',
]

export const randomWord = () => {
  const r = Math.floor(Math.random() * wordList.length)
  return wordList[r];
}

const charList = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

export const randomChars = (length) => {

  let randomString = "";

  while (length > 0) {
    const r = Math.floor(Math.random() * charList.length);
    randomString += charList[r];
    length--;
  }
  return randomString;
}

const passphraseList = [
  'christmastree',
  'tabletennis',
  'correctbatterystablehorse',
  'yoga',
  'Blowfish',
  'Bcrypt',
  'Hashcat',
  'verygoodpassphrase',
  'passablepassphrase',
  'upanddowninandout',
  'zeus',
  'windowman',
  'ronald',
  'grassisgreenand'
]

export const randomPassphrase = () => {
  const r = Math.floor(Math.random() * passphraseList.length)
  return passphraseList[r];
}