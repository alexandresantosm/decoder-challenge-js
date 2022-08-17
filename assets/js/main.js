const textInput = document.querySelector("#input-text");
const sectionOutput = document.querySelector(".output");
const portugueseAlphabet = ["e", "i", "a", "o", "u"];
const encodeAlphabet = ["enter", "imes", "ai", "ober", "ufat"];

textInput.addEventListener("keyup", handleInputChange);

function handleClickEncode() {
  const textOutput = document.querySelector("#output-text");
  const messageToEncode = textInput.value;
  const messageEncoded = encode(messageToEncode);

  textOutput.value = messageEncoded;
  clearInput(textInput);
}

function handleClickDecode() {
  const textOutput = document.querySelector("#output-text");
  const messageToDecode = textInput.value;
  const messageDecoded = decode(messageToDecode);

  textOutput.value = messageDecoded;
  clearInput(textInput);
}

function handleClickCopy() {
  copyToClipboard();
}

function handleInputChange() {
  const message = textInput.value;

  if (message.length == 1) {
    sectionOutput.classList.toggle("has-message");
    sectionOutput.innerHTML = `
      <textarea
        class="output-text"
        name="output-text"
        id="output-text"
        cols="30"
        rows="10"
        readonly>
      </textarea>

      <div class="copy">
        <span class="popup-text" id="popup">Mensagem copiada com sucesso!</span>

        <input
          class="copy-btn btn"
          type="button"
          value="Copiar"
          onclick="handleClickCopy()"
        />
      </div>
    `;
  } else {
    return;
  }
}

function encode(message) {
  let messageEncode = message;

  for (let i = 0; i < portugueseAlphabet.length; i++) {
    if (message.includes(portugueseAlphabet[i])) {
      const search = portugueseAlphabet[i];
      const searchRegExp = new RegExp(search, "g");

      messageEncode = messageEncode.replace(searchRegExp, encodeAlphabet[i]);
    }
  }
  return messageEncode;
}

function decode(message) {
  let messageDecode = message;

  for (let i = 0; i < encodeAlphabet.length; i++) {
    if (message.includes(encodeAlphabet[i])) {
      const search = encodeAlphabet[i];
      const searchRegExp = new RegExp(search, "g");

      messageDecode = messageDecode.replace(
        searchRegExp,
        portugueseAlphabet[i]
      );
    }
  }
  return messageDecode;
}

function clearInput(input) {
  input.value = "";
}

function copyToClipboard() {
  const textOutput = document.querySelector(".output-text");
  const copyText = textOutput.value;

  navigator.clipboard.writeText(copyText).then(() => {
    showPopup();
  });
}

function showPopup() {
  const popup = document.getElementById("popup");

  popup.classList.toggle("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 5000);
}
