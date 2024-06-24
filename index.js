window.onload = () => {
    const card = document.createElement("div");
    card.classList.add("poker-card");
    card.setAttribute("aria-label", "poker card");
    document.body.style.backgroundColor = "darkgreen";
    const faceValueDiv = document.createElement("div");
    const h1 = document.createElement("h1");
    const pokerCardObject = buildPokerCardObject(
        chooseRandomItem(faceValues), // random face value
        chooseRandomItem(suits) // random suit
    );
    h1.textContent = pokerCardObject.faceValue;
    h1.setAttribute("aria-label", "face value");
    h1.style.color = pokerCardObject.suit.color;
    faceValueDiv.appendChild(h1);
    faceValueDiv.classList.add("face-value");
    const topSuitDiv = document.createElement("div");
    topSuitDiv.classList.add("suit", "top-suit");
    topSuitDiv.setAttribute("aria-label", "top suit");
    const topSuitSpan = document.createElement("span");
    topSuitSpan.style.color = pokerCardObject.suit.color;
    topSuitSpan.textContent = pokerCardObject.suit.label;
    topSuitDiv.appendChild(topSuitSpan);
    const bottomSuitDiv = document.createElement("div");
    bottomSuitDiv.classList.add("suit", "bottom-suit");
    bottomSuitDiv.setAttribute("aria-label", "bottom suit");
    const bottomSuitSpan = document.createElement("span");
    bottomSuitSpan.style.color = pokerCardObject.suit.color;
    bottomSuitSpan.textContent = pokerCardObject.suit.label;
    bottomSuitDiv.appendChild(bottomSuitSpan);
    card.append(topSuitDiv, faceValueDiv, bottomSuitDiv);
    
    
    // const row = document.createElement("div");
    // row.classList.add("row", "d-flex", "justify-content-center");
    // const button = document.createElement("button");
    // button.textContent = "Redraw";
    // button.classList.add("btn", "btn-warning");



    const container = document.querySelector(".container");
    container.appendChild(card);
    // container.appendChild(row);
};

function chooseRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function buildPokerCardObject(faceValue, suit) {
    return {
        faceValue: faceValue,
        suit: {
            label: suit,
            color: ["♥", "♦"].includes(suit)
                ? "red"
                : "black"
        }
    };
};

const faceValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["♥", "♦", "♠", "♣"];

if (this !== window) module.exports = {
    chooseRandomItem,
    buildPokerCardObject
};
