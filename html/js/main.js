const API_URL = "https://algotypes-divination.herokuapp.com/cards";

const FADE_DURATION = 500;

async function getCards() {
  const response = await fetch(API_URL);
  const responseJson = await response.json();
  if (!responseJson.success) {
    throw new Error("getCards was unsuccessful");
  }
  return responseJson.data;
}

const toHexString = (x) => ("00" + x.toString(16)).slice(-2).toUpperCase();

const setFadeDelay = () => {
  [0, 1, 2]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .forEach((g, i) => {
      const delay = `${0.5 + i * 0.25}s`;
      Array.from(document.getElementsByClassName(`card-group-${g}`)).forEach(
        (el) => (el.style.transitionDelay = delay)
      );
    });
};

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
  setTimeout(() => fadeCards("front", 1), FADE_DURATION);
}

function fadeUpdate() {
  setFadeDelay();
  setTimeout(() => fadeCards("front", 0), 1);
  setTimeout(() => fadeCards("back", 1), FADE_DURATION);
  setTimeout(() => update(), 1000);
}

function update() {
  getCards()
    .then((res) => {
      updateCards(res.cards);
      setTimeout(fadeUpdate, parseInt(res.nextGetDelayMillis));
    })
    .catch((e) => console.log(`${e}`));
}

document.addEventListener("DOMContentLoaded", (_) => {
  fadeUpdate();
});
