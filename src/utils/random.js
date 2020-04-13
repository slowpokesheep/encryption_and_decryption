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
]

export const randomPassphrase = () => {
  const r = Math.floor(Math.random() * passphraseList.length)
  return passphraseList[r];
}