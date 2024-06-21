window.onload = () => {
    const card = document.createElement("div");
    card.classList.add("poker-card");
    card.setAttribute("aria-label", "poker card");
    const container = document.querySelector(".container");
    container.appendChild(card);
    document.body.style.backgroundColor = "darkgreen";
};

function chooseRandomItem(array) {

};

function buildPokerCardObject(faceValue, suit) {

};

module.exports = {
    chooseRandomItem,
    buildPokerCardObject
};