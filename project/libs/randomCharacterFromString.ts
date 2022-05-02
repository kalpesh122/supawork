function randomCharacterFromString(string: string) {
  return string[Math.floor(Math.random() * string.length)];
}

export default randomCharacterFromString;
