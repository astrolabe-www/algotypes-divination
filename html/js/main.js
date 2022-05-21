const DateTime = luxon.DateTime;
const API_URL = "https://algotypes-divination.herokuapp.com/cards";

const REFRESH_LATER = 1 * 60 * 60 * 1000;
const REFRESH_SOON = 60 * 1000;

const RETRY_LIMIT = 32;
let retryCount = 0;

const PLACEHOLDER = `
Two satellites recently exchanged more than 200 gigabits of data over a distance of about 60 miles (100 kilometers) using laser communication in space. The achievement sets the stage for yet another satellite constellation.
<br><br>
Satellites generally don't communicate directly with each other. Instead, they use radio signals to transfer data down to a ground station on Earth, which then relays this data to another satellite. Optical terminals between satellites are considered to be faster and more secure.
`;

async function getCards() {
  const response = await fetch(API_URL);
  const responseJson = await response.json();
  if (!responseJson.success) {
    throw new Error("getCards was unsuccessful");
  }
  retryCount += 1;
  return responseJson.data;
}

const toHexString = (x) => ("00" + x.toString(16)).slice(-2).toUpperCase();

const fadeCards = (className, val) => {
  const cardEls = Array.from(document.getElementsByClassName(className));
  cardEls.forEach((el) => (el.style.opacity = val));
};

function updateCards(cards) {
  console.log(`update cards with: ${cards}`);
  const cardEls = Array.from(document.getElementsByClassName("card"));

  cardEls.forEach((el) => {
    const numberEl = el.querySelector(".card-number");
    const titleEl = el.querySelector(".card-title");
    const textEl = el.querySelector(".card-text");

    const cardIndex = cards[parseInt(el.getAttribute("data-index"))];
    const cardInfo = CARDS[cardIndex];

    numberEl.innerHTML = `0x${toHexString(cardIndex)}`;
    titleEl.innerHTML = `${cardInfo.name.en}`;
    textEl.innerHTML = `${cardInfo.algorithm.en}<br><br>${cardInfo.message.en}`;
  });

  setTimeout(() => fadeCards("back", 0), 1);
  setTimeout(() => fadeCards("front", 1), 200);
}

function fadeUpdate() {
  setTimeout(() => fadeCards("front", 0), 1);
  setTimeout(() => fadeCards("back", 1), 200);
  setTimeout(() => update(), 1000);
}

function update() {
  getCards()
    .then((res) => {
      const cardTime = DateTime.fromISO(res.timestamp, { zone: "utc" });
      const cardFresh = DateTime.utc().hasSame(cardTime, "day");
      const overLimit = retryCount > RETRY_LIMIT;
      updateCards(res.cards);

      if (cardFresh || overLimit) {
        retryCount = 0;
        setTimeout(fadeUpdate, REFRESH_LATER);
      } else {
        setTimeout(fadeUpdate, REFRESH_SOON);
      }
    })
    .catch((e) => console.log(`${e}`));
}

document.addEventListener("DOMContentLoaded", (_) => {
  fadeUpdate();
});
