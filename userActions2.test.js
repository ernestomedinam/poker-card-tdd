const { findByLabelText, findByText } = require('@testing-library/dom');
const { default: userEvent } = require('@testing-library/user-event');
const fs = require('fs');
const path = require('path');
jest.dontMock("fs");
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe("tests interface shows right elements for user to interact with", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        require("./index.js");
    });
    afterEach(() => {
        jest.resetModules();
        document.documentElement.innerHTML = "";
    });
    // it("creates a new card and replaces current when button is clicked", async () => {
    //     const button = await findByText(document, "Redraw");
    //     const card = await findByLabelText(document, "poker card");
    //     const firstCardId = card.getAttribute("id");
    //     expect(firstCardId).toBeTruthy();
    //     const user = userEvent.setup();
    //     await user.click(button);
    //     const newCard = await findByLabelText(document, "poker card");
    //     expect(newCard.id !== firstCardId).toBeTruthy();
    // });
    it("creates a new card and adds it to row when button is clicked", async () => {
        const button = await findByText(document, "Redraw");
        const card = await findByLabelText(document, "poker card");
        const firstCardId = card.getAttribute("id");
        expect(firstCardId).toBeTruthy();
        const user = userEvent.setup();
        await user.click(button);
        const cards = await findByLabelText(document, "cards container");
        expect(cards.children).toHaveLength(2);
    });
});
