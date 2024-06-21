const { waitFor, getByLabelText, findAllByLabelText, findByLabelText, screen, findByText } = require('@testing-library/dom');
const { default: userEvent } = require('@testing-library/user-event');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
jest.dontMock("fs");

describe("tests interface shows right elements for user to interact with", () => {
    let container;
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        require("../poker-card-tdd/index.js");
        container = document.querySelector(".container"); 
    });
    afterEach(() => jest.resetModules());
    it("renders a card with a white background on top of a dark green background", async() => {
        const card = await findByLabelText(document, "poker card");
        expect(card).toBeInTheDocument();
        expect(card.classList.contains("poker-card")).toBeTruthy();
        const body = await findByLabelText(document, "body");
        expect(body).toHaveStyle({
            "background-color": "darkgreen"
        });
    });
    it("has a card with a face value, a top suit and a bottom suit", async() => {
        const card = await findByLabelText(document, "poker card");
        await expect(findByLabelText(card, "face value")).toBeInTheDocument();
        await expect(findByLabelText(card, "top suit")).toBeInTheDocument();
        await expect(findByLabelText(card, "bottom suit")).toBeInTheDocument();
    });
    it("has a color that matches the suit", async() => {
        const topSuitDiv = await findByLabelText(document, "top suit");
        const suit = topSuitDiv.textContent;
        const faceValueH1 = await findByLabelText(document, "face value");
        const color = faceValueH1.style.color;
        if (["♥", "♦"].includes(suit)) expect(color).toBe("red");
        else expect(color).toBe("black");
    });
    it("has a warning button to redraw", async() => {
        const button = await findByText(document, "Redraw");
        expect(button).toBeInTheDocument();
        expect(button.classList.includes("btn-warning")).toBeTruthy();
    });
    it("creates a new card when button is clicked", async() => {
        const button = await findByText(document, "Redraw");
        const card = await findByLabelText(document, "poker card");
        const firstCardId = card.getAttribute("id");
        const user = userEvent.setup();
        await user.click(button);
        const newCard = await findByLabelText(document, "poker card");
        expect(newCard.id !== firstCardId).toBeTruthy();
    });
});
