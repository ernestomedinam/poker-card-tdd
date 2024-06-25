window.onload = () => {
    document.body.style.backgroundColor = "darkgreen";
    const deck = buildDeck();
    window.state = {};
    setState({
        tableCards: [],
        deck: deck
    });
    drawCard();
    const row = document.createElement("div");
    row.classList.add("row", "d-flex", "justify-content-center");
    const button = document.createElement("button");
    button.textContent = "Redraw";
    button.classList.add("btn", "btn-warning");
    button.addEventListener("click", drawCard);
    row.appendChild(button);
    const container = document.querySelector(".container");
    container.appendChild(row);
};

function buildDeck() {
    const deck = [];
    for (const faceValue of faceValues) {
        for (const suit of suits) {
            deck.push({
                faceValue: faceValue,
                suit: {
                    label: suit,
                    color: ["♥", "♦"].includes(suit)
                        ? "red"
                        : "black"
                }
            });
        }
    }
    return deck;
};

function setState(newState) {
    // update the window.state object
    window.state = newState;
    // MAKE SURE THE INTERFACE RENDERS AGAIN!!!
    render(); 
};

function render() {
    // get the cards container
    // debugger;
    const cardsDiv = document.querySelector(".cards");
    // empty it
    cardsDiv.innerHTML = "";
    // for each card on window.state.tableCards, append a card div
    for (const tableCard of window.state.tableCards) {
        const card = renderCard(tableCard);
        cardsDiv.appendChild(card);
    }
};

function renderCard(pokerCardObject) {
    // debugger;
    const card = document.createElement("div");
    card.classList.add("poker-card");
    card.setAttribute("aria-label", "poker card");
    card.setAttribute("id", new Date().getTime())
    const faceValueDiv = document.createElement("div");
    const h1 = document.createElement("h1");
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
    card.addEventListener("click", function (event) {
        sendBackToDeck(pokerCardObject);
    });
    return card;
};

function sendBackToDeck(cardToSendBack) {
    // grab the deck
    const deck = [...window.state.deck];
    // grab the tableCards
    let tableCards = [...window.state.tableCards];
    // remove card from tableCards
    tableCards = tableCards.filter((card) => !(
        card.faceValue === cardToSendBack.faceValue &&
        card.suit.label === cardToSendBack.suit.label
    ));
    // push card to deck
    deck.push(cardToSendBack);
    setState({
        deck: deck,
        tableCards: tableCards
    });
};

function drawCard() {
    // choose a random card from deck
    const deck = [...window.state.deck];
    const randomIndex = Math.floor(Math.random() * deck.length);
    // remove it from there
    const drawnCard = deck.splice(randomIndex, 1)[0];
    // add it to tableCards
    const tableCards = [...window.state.tableCards];
    tableCards.push(drawnCard);
    setState({
        deck: deck,
        tableCards: tableCards
    });
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
