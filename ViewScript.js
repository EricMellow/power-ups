var message = document.querySelector('.message');

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  init()
});


function parseQueryString(key) {
  if (typeof window === 'undefined') {
    return null;
  }

  const url = new URL(window.location.href);
  return url.searchParams.get(key);
};

function getPayload () {return JSON.parse(parseQueryString('p'))};

function sendMessage(action, data = {}) {
  if (typeof window !== 'undefined') {
    const messagePayload = {
      source: 'custom_embed',
      action,
      data,
      key: parseQueryString('k'),
    };
    if (action === 'ready') {
      messagePayload.isAnsRequired = true;
    }
    window.parent.postMessage(JSON.stringify(messagePayload), '*');
  }
};

function init() {
  console.log('INIT!!!!!!')
  sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
  const savedMessage = getPayload()
  console.log(savedMessage)
  message.innerText = savedMessage.config?.headline;
}
