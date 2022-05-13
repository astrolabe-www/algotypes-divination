const DateTime = luxon.DateTime;
const API_URL = "https://algotypes-divination.herokuapp.com/cards";

const REFRESH_LATER = 6 * 60 * 60 * 1000;
const REFRESH_SOON = 60 * 1000;

const RETRY_LIMIT = 32;
let retryCount = 0;

async function getCards() {
  const response = await fetch(API_URL);
  const responseJson = await response.json();
  if (!responseJson.success) {
    throw new Error("getCards was unsuccessful");
  }
  retryCount += 1;
  return responseJson.data;
}

function updateCards(cards) {
  console.log(`update cards with: ${cards}`);
  // TODO: update DOM with content, fade in/out etc
}

function update() {
  getCards()
    .then((res) => {
      const cardTime = DateTime.fromISO(res.timestamp, { zone: "utc" });
      const cardFresh = DateTime.utc().hasSame(cardTime, "day");
      const overLimit = retryCount > RETRY_LIMIT;
      const updateTime = cardFresh || overLimit ? REFRESH_LATER : REFRESH_SOON;
      updateCards(res.cards);
      setTimeout(update, updateTime);
    })
    .catch((e) => console.log(`${e}`));
}

document.addEventListener("DOMContentLoaded", (_) => {
  update();
});
