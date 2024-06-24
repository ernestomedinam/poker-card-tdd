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
    it("renders a card with a white background on top of a dark green background", async () => {
        const card = await findByLabelText(document, "poker card");
        expect(card).toBeInTheDocument();
        expect(card.classList.contains("poker-card")).toBeTruthy();
        const body = await findByLabelText(document, "body");
        expect(body).toHaveStyle({
            "background-color": "darkgreen"
        });
    });
});
