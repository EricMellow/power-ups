var cancelButton = document.querySelector('.cancel-btn');
var saveButton = document.querySelector('.save-btn');
var messageInput = document.querySelector('.search-input');

saveButton.addEventListener('click', function() {save()});
cancelButton.addEventListener('click', function() {cancel()});

messageInput.addEventListener('input', function() {
  console.log('hit', messageInput.value)
})

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

function getStarterPowerUpANS (idPrefix = 'custom_powerup') {
  const dateNow = Date.now();
  return {
    id: `${idPrefix}_${dateNow}`,
    url: '/',
    config: {},
  };
};

function cancel() {
  console.log('SEARCH CANCEL')
  sendMessage('cancel');
}

function init() {
  console.log('INIT!!!!!!')
  sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
}

function save() {
  const ansStarter = getStarterPowerUpANS();
  const headline = messageInput.value
  console.log(ansStarter)
  console.log('HEADLINE', headline)
  const ansCustomEmbed = {
      ...ansStarter,
      config: {
        headline,
      },
    };

    sendMessage('data', ansCustomEmbed);
}


