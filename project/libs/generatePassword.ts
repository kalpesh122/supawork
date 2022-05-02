import randomCharacterFromString from "./randomCharacterFromString";

function generatePassword(length: number) {
  let password = "";
  const possibleCharacters = "abcdefghijklmnopABCDEFGHIJKLMNOP0123456789$!#";

  for (let i = 0; i < length; i++) {
    password += randomCharacterFromString(possibleCharacters);
  }

  return password;
}

export default generatePassword;
