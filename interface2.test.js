const { findByLabelText, findByText } = require('@testing-library/dom');
const fs = require('fs');
const path = require('path');
jest.dontMock("fs");


describe("tests interface shows right elements for user to interact with", () => {
    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
        document.documentElement.innerHTML = html.toString();
        jest.resetModules();
        require("./index.js");
    });
    afterEach(() => {
        document.documentElement.innerHTML = "";
    });
    it("has a card with a face value, a top suit and a bottom suit and has a color that matches the suit", async () => {
        const topSuitDiv = await findByLabelText(document, "top suit");
        const suit = topSuitDiv.textContent;
        const faceValueH1 = await findByLabelText(document, "face value");
        const color = faceValueH1.style.color;
        if (["♥", "♦"].includes(suit)) expect(color).toBe("red");
        else expect(color).toBe("black");
    });
});
