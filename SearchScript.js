init()

import * as ComposerHandler from './utils.js'

var cancelButton = document.querySelector('.cancel-btn');
var saveButton = document.querySelector('.save-btn');
var messageInput = document.querySelector('.search-input');

function cancel() {
  console.log('SEARCH CANCEL')
  ComposerHandler.sendMessage('cancel');
}

function init() {
  console.log('INIT!!!!!!')
  ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
}

function save() {
  const ansStarter = ComposerHandler.getStarterPowerUpANS();
  const headline = messageInput.value
  console.log(ansStarter)
  console.log('HEADLINE', headline)
  const ansCustomEmbed = {
      ...ansStarter,
      config: {
        headline,
      },
    };

    ComposerHandler.sendMessage('data', ansCustomEmbed);
}

saveButton.addEventListener('click', function() {save()});
cancelButton.addEventListener('click', function() {cancel()});

messageInput.addEventListener('input', function() {
  console.log('hit', messageInput.value)
})

