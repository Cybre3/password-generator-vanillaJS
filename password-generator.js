const charAmountRange = document.getElementById('characterAmountRange');
const charAmountNumber = document.getElementById('characterAmountNumber');
const form = document.getElementById('genPassForm');
const passwordDisplay = document.getElementById('passDisplay');
const includeUppercaseElement = document.getElementById('includeUpperCase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');

const LOWERCASE_CHAR_CODES = arrayLowToHigh(97, 122);
const UPPERCASE_CHAR_CODES = arrayLowToHigh(65, 90);
const NUMBER_CHAR_CODES = arrayLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayLowToHigh(33, 47)
  .concat(arrayLowToHigh(58, 64))
  .concat(arrayLowToHigh(91, 96))
  .concat(arrayLowToHigh(123, 126));

charAmountRange.addEventListener('input', syncCharAmount);
charAmountNumber.addEventListener('input', syncCharAmount);

function syncCharAmount(e) {
  const value = e.target.value;

  charAmountRange.value = value;
  charAmountNumber.value = value;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const passwordLength = charAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  const password = generatePassword(
    passwordLength,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );

  passwordDisplay.innerText = password;
});

function generatePassword(characterAmountNumber, includeUppercase, includeNumbers, includeSymbols) {
  let selectedChars = LOWERCASE_CHAR_CODES;
  const generatedPassword = [];

  if (includeUppercase) selectedChars = selectedChars.concat(UPPERCASE_CHAR_CODES);
  if (includeNumbers) selectedChars = selectedChars.concat(NUMBER_CHAR_CODES);
  if (includeSymbols) selectedChars = selectedChars.concat(SYMBOL_CHAR_CODES);

  for (let i = 0; i <= characterAmountNumber - 1; i++) {
    const charCode = selectedChars[Math.floor(Math.random() * selectedChars.length)];

    generatedPassword.push(String.fromCharCode(charCode));
  }

  return generatedPassword.join('');
}

function arrayLowToHigh(lowNum, highNum) {
  const arr = [];

  for (let i = lowNum; i <= highNum; i++) {
    arr.push(i);
  }

  return arr;
}
