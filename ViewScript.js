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

function init() {
  console.log('INIT!!!!!!')
  sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
  const savedMessage = getPayload()
  message.innerText = savedMessage.data?.config?.headline;
}
