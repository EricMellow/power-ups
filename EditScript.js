var cancelButton = document.querySelector('.cancel-btn');
var saveButton = document.querySelector('.save-btn');
var messageInput = document.querySelector('.search-input');

saveButton.addEventListener('click', function() {save()});
cancelButton.addEventListener('click', function() {cancel()});

window.addEventListener("load", (event) => {
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

function cancel() {
  sendMessage('cancel');
}

function init() {
  sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
}

function save() {
  const ansStarter = getPayload();
  const headline = messageInput.value
  const ansCustomEmbed = {
      ...ansStarter,
      config: {
        headline,
      },
    };

    sendMessage('data', ansCustomEmbed);
}
